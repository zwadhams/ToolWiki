param([string]$OutputPath)

# Reader procedure: visible wiki on 2026-11-06, integrated46be6de.
# Native Windows x64 with preinstalled VS 2022 C++ and ASan components.
# Logging, assertions, metadata, and digests are this retest's evidence harness.
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
if ([string]::IsNullOrWhiteSpace($OutputPath)) { throw 'Supply -OutputPath.' }
$OutputPath = [System.IO.Path]::GetFullPath($OutputPath)
New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
$runFile = Join-Path $OutputPath 'reader-run.json'
if (Test-Path -LiteralPath $runFile) { throw 'Use a new output directory; reader-run.json already exists.' }

$originalLocation = Get-Location
$workPath = Join-Path $OutputPath ('memory-reader-work-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $workPath | Out-Null
$script:readerSteps = [System.Collections.Generic.List[object]]::new()
$script:readerCommands = [System.Collections.Generic.List[string]]::new()
$script:readerExit = 0
$script:readerFailure = $null
$checks = $null
$examplePath = $null
$started = [DateTime]::UtcNow.ToString('o')
$environmentRecord = [ordered]@{
    OS = [System.Runtime.InteropServices.RuntimeInformation]::OSDescription
    OSArchitecture = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString()
    ProcessArchitecture = [System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture.ToString()
    PowerShellVersion = $PSVersionTable.PSVersion.ToString()
    PowerShellEdition = $PSVersionTable.PSEdition
    RunnerOS = $env:RUNNER_OS
    RunnerArchitecture = $env:RUNNER_ARCH
    ImageOS = $env:ImageOS
    ImageVersion = $env:ImageVersion
    ASAN_OPTIONS = $env:ASAN_OPTIONS
}

function Invoke-ReaderStep {
    param([string]$Name, [scriptblock]$Action)
    $stdoutPath = Join-Path $OutputPath ($Name + '-stdout.txt')
    $stderrPath = Join-Path $OutputPath ($Name + '-stderr.txt')
    $command = $Action.ToString().Trim()
    $script:readerCommands.Add(('### ' + $Name + "`r`nWorking directory: " + (Get-Location).Path + "`r`n" + $command))
    Write-Host ('Running reader step: ' + $Name)
    $global:LASTEXITCODE = $null
    $caught = $null
    $stepStarted = [DateTime]::UtcNow.ToString('o')
    $workingDirectory = (Get-Location).Path
    try {
        & $Action 1> $stdoutPath 2> $stderrPath
    }
    catch {
        $caught = $_
        $_ | Out-String | Add-Content -LiteralPath $stderrPath -Encoding utf8
    }
    $nativeExit = $global:LASTEXITCODE
    if (-not (Test-Path -LiteralPath $stdoutPath)) { '' | Set-Content -LiteralPath $stdoutPath -Encoding utf8 }
    if (-not (Test-Path -LiteralPath $stderrPath)) { '' | Set-Content -LiteralPath $stderrPath -Encoding utf8 }
    $step = [pscustomobject]@{
        Name = $Name
        Command = $command
        WorkingDirectory = $workingDirectory
        StartedUTC = $stepStarted
        FinishedUTC = [DateTime]::UtcNow.ToString('o')
        NativeExitCode = $nativeExit
        PowerShellSucceeded = ($null -eq $caught)
        Error = $(if ($caught) { $caught.ToString() } else { $null })
        Stdout = [System.IO.Path]::GetFileName($stdoutPath)
        Stderr = [System.IO.Path]::GetFileName($stderrPath)
    }
    $script:readerSteps.Add($step)
    if ($caught) { throw $caught }
}

try {
    Set-Location -LiteralPath $workPath
    Invoke-ReaderStep '01-download-snapshot' {
        Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip' -OutFile examples.zip
    }
    Invoke-ReaderStep '02-extract-snapshot' {
        Expand-Archive -LiteralPath examples.zip -DestinationPath .
    }
    Invoke-ReaderStep '03-enter-repository' {
        Set-Location '.\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
    }
    Invoke-ReaderStep '04-enter-example' {
        Set-Location ./examples/windows-memory
    }
    $examplePath = (Get-Location).Path
    Invoke-ReaderStep '05-host-architecture' {
        [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
    }
    if ([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString() -ne 'X64') {
        throw 'The documented route requires native Windows x64; ARM64/emulation is outside scope.'
    }
    Invoke-ReaderStep '06-initialize-developer-shell' {
        $vswhere = "${env:ProgramFiles(x86)}/Microsoft Visual Studio/Installer/vswhere.exe"
        if (-not (Test-Path $vswhere)) { throw 'Install Visual Studio 2022 C++ tools first.' }
        $vs = & $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
        if (-not $vs) { throw 'VS 2022 17.7+ with x64 C++ tools was not found.' }
        & "$vs/Common7/Tools/Launch-VsDevShell.ps1" -Arch amd64 -HostArch amd64 -SkipAutomaticLocation
    }
    Invoke-ReaderStep '07-compiler-banner' {
        cl
    }
    Invoke-ReaderStep '08-target-and-runtime' {
        $env:VSCMD_ARG_HOST_ARCH
        $env:VSCMD_ARG_TGT_ARCH
        $compiler = (Get-Command cl.exe -ErrorAction Stop).Source
        $runtime = Join-Path (Split-Path $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
        if (-not (Test-Path $runtime)) { throw 'Add C++ AddressSanitizer in the VS 2022 Installer.' }
    }
    if ($env:VSCMD_ARG_HOST_ARCH -ne 'x64' -or $env:VSCMD_ARG_TGT_ARCH -ne 'x64') {
        throw 'The documented preflight requires x64 host and target architecture values.'
    }
    # Supplementary version capture, not an additional reader setup requirement.
    Invoke-ReaderStep '09-version-metadata' {
        $vswhere = "${env:ProgramFiles(x86)}/Microsoft Visual Studio/Installer/vswhere.exe"
        & $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -format json
        $compiler = (Get-Command cl.exe -ErrorAction Stop).Source
        $runtime = Join-Path (Split-Path $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
        Get-Item -LiteralPath $compiler, $runtime | Select-Object FullName, @{Name='FileVersion';Expression={$_.VersionInfo.FileVersion}}, @{Name='ProductVersion';Expression={$_.VersionInfo.ProductVersion}} | ConvertTo-Json -Depth 4
    }
    Get-Content -LiteralPath './bad/bounds.c' | Set-Content -LiteralPath (Join-Path $OutputPath 'bad-source.txt') -Encoding utf8
    Get-Content -LiteralPath './good/bounds.c' | Set-Content -LiteralPath (Join-Path $OutputPath 'good-source.txt') -Encoding utf8
    Invoke-ReaderStep '10-build-bad' {
        New-Item -ItemType Directory -Path build -Force | Out-Null
        cl /nologo /Od /Zi /fsanitize=address ./bad/bounds.c /Fe:build/bad.exe /Fo:build/bad.obj /Fd:build/bad-compile.pdb /link /DEBUG /INCREMENTAL:NO
        if ($LASTEXITCODE -ne 0) { throw 'Build failed; resolve the compiler or linker error before running.' }
    }
    Invoke-ReaderStep '11-run-bad' {
        ./build/bad.exe
        $LASTEXITCODE
    }
    Invoke-ReaderStep '12-build-good' {
        cl /nologo /Od /Zi /fsanitize=address ./good/bounds.c /Fe:build/good.exe /Fo:build/good.obj /Fd:build/good-compile.pdb /link /DEBUG /INCREMENTAL:NO
        if ($LASTEXITCODE -ne 0) { throw 'Corrected build failed.' }
    }
    Invoke-ReaderStep '13-run-good' {
        ./build/good.exe
        $LASTEXITCODE
    }

    $badStep = $script:readerSteps | Where-Object Name -eq '11-run-bad'
    $goodStep = $script:readerSteps | Where-Object Name -eq '13-run-good'
    $badOutput = (Get-Content -LiteralPath (Join-Path $OutputPath $badStep.Stdout) -Raw) + (Get-Content -LiteralPath (Join-Path $OutputPath $badStep.Stderr) -Raw)
    $goodOutput = (Get-Content -LiteralPath (Join-Path $OutputPath $goodStep.Stdout) -Raw) + (Get-Content -LiteralPath (Join-Path $OutputPath $goodStep.Stderr) -Raw)
    $checks = [ordered]@{
        BadExitNonzero = ($null -ne $badStep.NativeExitCode -and $badStep.NativeExitCode -ne 0)
        BadHeapBufferOverflow = ($badOutput -match 'ERROR: AddressSanitizer: heap-buffer-overflow')
        BadWriteSize4 = ($badOutput -match 'WRITE of size 4')
        BadSourceLine5 = ($badOutput -match 'bounds\.c(?::|\()5(?:\)|\b)')
        BadAllocationStack = ($badOutput -match 'allocated by thread')
        GoodExitZero = ($goodStep.NativeExitCode -eq 0)
        GoodNoASanError = ($goodOutput -notmatch 'ERROR: AddressSanitizer')
    }
    if (@($checks.Values | Where-Object { -not $_ }).Count -gt 0) {
        $script:readerExit = 1
        $script:readerFailure = 'One or more expected diagnostic or correction checks failed; inspect retained outputs.'
    }
}
catch {
    $script:readerExit = 1
    $script:readerFailure = $_.ToString()
    $_ | Out-String | Set-Content -LiteralPath (Join-Path $OutputPath 'reader-harness-error.txt') -Encoding utf8
}
finally {
    Set-Location -LiteralPath $originalLocation.Path
    $script:readerCommands -join "`r`n`r`n" | Set-Content -LiteralPath (Join-Path $OutputPath 'reader-commands.txt') -Encoding utf8
    $environmentRecord | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath (Join-Path $OutputPath 'reader-environment.json') -Encoding utf8
    [ordered]@{
        StartedUTC = $started
        FinishedUTC = [DateTime]::UtcNow.ToString('o')
        SiteBuild = 'integrated46be6de'
        SnapshotRevision = '506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
        SnapshotURL = 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip'
        WorkingDirectoryCreatedEmpty = $workPath
        Environment = $environmentRecord
        Steps = @($script:readerSteps.ToArray())
        Checks = $checks
        HarnessExitCode = $script:readerExit
        Failure = $script:readerFailure
    } | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $runFile -Encoding utf8
    $digestFiles = [System.Collections.Generic.List[string]]::new()
    $snapshot = Join-Path $workPath 'examples.zip'
    if (Test-Path -LiteralPath $snapshot) { $digestFiles.Add($snapshot) }
    if ($examplePath -and (Test-Path -LiteralPath $examplePath)) {
        foreach ($source in @('bad/bounds.c', 'good/bounds.c')) {
            $sourcePath = Join-Path $examplePath $source
            if (Test-Path -LiteralPath $sourcePath) { $digestFiles.Add($sourcePath) }
        }
        $buildPath = Join-Path $examplePath 'build'
        if (Test-Path -LiteralPath $buildPath) {
            Get-ChildItem -LiteralPath $buildPath -File | ForEach-Object { $digestFiles.Add($_.FullName) }
        }
    }
    Get-ChildItem -LiteralPath $OutputPath -File | Where-Object Extension -in '.txt', '.json' | ForEach-Object { $digestFiles.Add($_.FullName) }
    $digests = foreach ($file in $digestFiles) {
        $hash = Get-FileHash -LiteralPath $file -Algorithm SHA256
        [pscustomobject]@{ Path = $file; SHA256 = $hash.Hash; Bytes = (Get-Item -LiteralPath $file).Length }
    }
    $digests | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $OutputPath 'reader-digests.json') -Encoding utf8
}
exit $script:readerExit
