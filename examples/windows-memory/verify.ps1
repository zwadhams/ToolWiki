#Requires -Version 7.0
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
$outputDirectory = [IO.Path]::GetFullPath($OutputPath)
if (Test-Path -LiteralPath $outputDirectory) {
    throw "Refusing to overwrite existing output: $outputDirectory"
}
New-Item -ItemType Directory -Path $outputDirectory | Out-Null
$commands = [Collections.Generic.List[object]]::new()
$result = [ordered]@{
    status = 'failed'
    startedUtc = [DateTime]::UtcNow.ToString('o')
    os = [Runtime.InteropServices.RuntimeInformation]::OSDescription
    osArchitecture = [Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString()
    processArchitecture = [Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture.ToString()
    powershell = $PSVersionTable.PSVersion.ToString()
    runnerImage = $env:ImageOS
    runnerImageVersion = $env:ImageVersion
    commit = $env:GITHUB_SHA
    runId = $env:GITHUB_RUN_ID
    runAttempt = $env:GITHUB_RUN_ATTEMPT
    sources = @()
    commands = $commands
    asanOptions = 'symbolize=1'
}

function Invoke-RecordedProcess {
    param([string]$Name, [string]$Executable, [string[]]$Arguments, [string]$Directory)
    $start = [Diagnostics.ProcessStartInfo]::new()
    $start.FileName = $Executable
    $start.WorkingDirectory = $Directory
    $start.UseShellExecute = $false
    $start.CreateNoWindow = $true
    $start.RedirectStandardOutput = $true
    $start.RedirectStandardError = $true
    $start.Environment['ASAN_OPTIONS'] = $result.asanOptions
    foreach ($argument in $Arguments) { $start.ArgumentList.Add($argument) }
    $process = [Diagnostics.Process]::new()
    $process.StartInfo = $start
    $record = [ordered]@{
        name = $Name; executable = $Executable; arguments = $Arguments
        directory = $Directory; exitCode = $null; timedOut = $false
        stdout = "$Name.stdout.txt"; stderr = "$Name.stderr.txt"
    }
    $commands.Add($record)
    try {
        [void]$process.Start()
        $stdout = $process.StandardOutput.ReadToEndAsync()
        $stderr = $process.StandardError.ReadToEndAsync()
        if (-not $process.WaitForExit(60000)) {
            $record.timedOut = $true
            $process.Kill($true)
            $process.WaitForExit()
        }
        $record.exitCode = $process.ExitCode
        $outText = $stdout.GetAwaiter().GetResult()
        $errText = $stderr.GetAwaiter().GetResult()
        [IO.File]::WriteAllText((Join-Path $outputDirectory $record.stdout), $outText)
        [IO.File]::WriteAllText((Join-Path $outputDirectory $record.stderr), $errText)
        if ($record.timedOut) { throw "$Name exceeded 60 seconds." }
        return [pscustomobject]@{ ExitCode = $record.exitCode; Text = "$outText`n$errText" }
    }
    finally { $process.Dispose() }
}

try {
    foreach ($variant in @('bad', 'good')) {
        $source = Join-Path $PSScriptRoot "$variant/bounds.c"
        $result.sources += [ordered]@{
            path = "$variant/bounds.c"
            sha256 = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
        }
    }
    if (-not $IsWindows -or $result.osArchitecture -ne 'X64' -or $result.processArchitecture -ne 'X64') {
        throw 'This check requires native Windows x64 and x64 PowerShell 7. Use a native x64 machine or the windows-2022 validation job; ARM64 emulation is outside this route.'
    }
    $vswhere = Join-Path ${env:ProgramFiles(x86)} 'Microsoft Visual Studio/Installer/vswhere.exe'
    if (-not (Test-Path -LiteralPath $vswhere)) {
        throw 'Visual Studio discovery is missing. Install Visual Studio 2022 with Desktop development with C++ and C++ AddressSanitizer.'
    }
    $discovery = Invoke-RecordedProcess -Name 'vswhere' -Executable $vswhere -Arguments @(
        '-latest', '-products', '*', '-version', '[17.7,18.0)',
        '-requires', 'Microsoft.VisualStudio.Component.VC.Tools.x86.x64', '-property', 'installationPath'
    ) -Directory $PSScriptRoot
    $vsPath = $discovery.Text.Trim()
    if ($discovery.ExitCode -ne 0 -or -not $vsPath -or -not (Test-Path -LiteralPath $vsPath)) {
        throw 'Visual Studio 2022 17.7+ with x64 C++ tools was not found. Modify the VS 2022 installation to add Desktop development with C++.'
    }
    $result.visualStudioPath = $vsPath
    $result.developerShellCommand = '& Launch-VsDevShell.ps1 -Arch amd64 -HostArch amd64 -SkipAutomaticLocation'
    & (Join-Path $vsPath 'Common7/Tools/Launch-VsDevShell.ps1') -Arch amd64 -HostArch amd64 -SkipAutomaticLocation *> (Join-Path $outputDirectory 'developer-shell.txt')
    $result.visualStudioVersion = $env:VSCMD_VER
    $result.compilerHost = $env:VSCMD_ARG_HOST_ARCH
    $result.compilerTarget = $env:VSCMD_ARG_TGT_ARCH
    $result.toolsetVersion = $env:VCToolsVersion
    if ($result.compilerHost -ne 'x64' -or $result.compilerTarget -ne 'x64') {
        throw 'Developer PowerShell did not select an x64 host and target.'
    }
    $compiler = (Get-Command cl.exe -CommandType Application -ErrorAction Stop).Source
    $result.compilerPath = $compiler
    $result.compilerVersion = (Get-Item -LiteralPath $compiler).VersionInfo.FileVersion
    $runtime = Join-Path (Split-Path -Parent $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
    if (-not (Test-Path -LiteralPath $runtime)) {
        throw 'The x64 ASan runtime DLL is missing beside cl.exe. Modify Visual Studio 2022 to add C++ AddressSanitizer, then open a new shell.'
    }
    $result.runtimePath = $runtime
    $result.runtimeVersion = (Get-Item -LiteralPath $runtime).VersionInfo.FileVersion
    $buildDirectory = Join-Path $outputDirectory 'build'
    New-Item -ItemType Directory -Path $buildDirectory | Out-Null
    foreach ($variant in @('bad', 'good')) {
        $source = Join-Path $PSScriptRoot "$variant/bounds.c"
        $build = Invoke-RecordedProcess -Name "$variant-build" -Executable $compiler -Arguments @(
            '/nologo', '/Od', '/Zi', '/fsanitize=address', $source,
            "/Fe:$variant.exe", "/Fo:$variant.obj", "/Fd:$variant-compile.pdb", '/link', '/DEBUG', '/INCREMENTAL:NO'
        ) -Directory $buildDirectory
        if ($build.ExitCode -ne 0) { throw "$variant compilation failed; see $variant-build output." }
    }
    # Run both variants before checking the verdict, so two crashes remain visible.
    $bad = Invoke-RecordedProcess -Name 'bad-run' -Executable (Join-Path $buildDirectory 'bad.exe') -Arguments @() -Directory $buildDirectory
    $good = Invoke-RecordedProcess -Name 'good-run' -Executable (Join-Path $buildDirectory 'good.exe') -Arguments @() -Directory $buildDirectory
    $result.checks = [ordered]@{
        badNonzero = ($bad.ExitCode -ne 0)
        badHeapOverflow = ($bad.Text -match 'ERROR: AddressSanitizer: heap-buffer-overflow')
        badWriteSize = ($bad.Text -match 'WRITE of size 4')
        badSourceLine = ($bad.Text -match '(?im)bounds\.c(?:\(|:)5(?:\)|\b)')
        goodZero = ($good.ExitCode -eq 0)
        goodNoAsanError = ($good.Text -notmatch '(?i)(ERROR|SUMMARY): AddressSanitizer')
    }
    if ($result.checks.Values -contains $false) {
        throw 'Expected a sourced heap-buffer-overflow for bad and a clean zero exit for good. Inspect both run logs; a crash alone does not pass.'
    }
    $result.status = 'passed'
}
catch {
    $result.failure = $_.Exception.Message
    [IO.File]::WriteAllText((Join-Path $outputDirectory 'failure.txt'), $result.failure)
    Write-Host $result.failure
}
finally {
    $result.finishedUtc = [DateTime]::UtcNow.ToString('o')
    $result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $outputDirectory 'run.json') -Encoding utf8
}

if ($result.status -ne 'passed') { exit 1 }
Write-Host 'PASS: faulty write diagnosed at bounds.c:5; corrected program exited zero without an ASan error.'
