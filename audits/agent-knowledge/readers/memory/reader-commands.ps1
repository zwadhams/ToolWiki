[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$OutputPath)
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
# Ordinary PowerShell/.NET evidence capture mechanics are documented in initial-report.txt.
function Ascii([string]$Value) {
    [regex]::Replace($Value, '[^\x00-\x7F]', { param($m) '\u{0:x4}' -f [int][char]$m.Value })
}
function Save-Json($Value, [string]$Path) {
    [IO.File]::WriteAllText($Path, (Ascii ($Value | ConvertTo-Json -Depth 30)), [Text.Encoding]::ASCII)
}
$root = (Get-Location).Path
$out = [IO.Path]::GetFullPath($OutputPath)
if (Test-Path -LiteralPath $out) { throw "OutputPath already exists; refusing overwrite: $out" }
New-Item -ItemType Directory -Path $out -ErrorAction Stop | Out-Null
$record = [ordered]@{status='pending'; startedUtc=[DateTime]::UtcNow.ToString('o'); repositoryRoot=$root; outputPath=$out; host=@{}; inputs=@(); commands=@(); failure=$null}
function Flush { Save-Json $record (Join-Path $out 'run.json') }
function Native([string]$Name, [string]$Exe, [string[]]$Arguments) {
    $pinfo = New-Object System.Diagnostics.ProcessStartInfo
    $pinfo.FileName = $Exe
    # All arguments in this experiment have no spaces or quotes. Executable path is separate.
    $pinfo.Arguments = $Arguments -join ' '
    $pinfo.WorkingDirectory = (Get-Location).Path
    $pinfo.UseShellExecute = $false
    $pinfo.RedirectStandardOutput = $true
    $pinfo.RedirectStandardError = $true
    $pinfo.CreateNoWindow = $true
    $item = [ordered]@{name=$Name; executable=$Exe; arguments=$Arguments; command=($Exe+' '+$pinfo.Arguments); cwd=$pinfo.WorkingDirectory; exitCode=$null; stdout=''; stderr=''; startUtc=[DateTime]::UtcNow.ToString('o')}
    $record.commands += $item
    Flush
    $proc = New-Object System.Diagnostics.Process
    $proc.StartInfo = $pinfo
    if (-not $proc.Start()) { throw "Cannot start $Exe" }
    $so = $proc.StandardOutput.ReadToEndAsync()
    $se = $proc.StandardError.ReadToEndAsync()
    $proc.WaitForExit()
    $item.stdout = $so.Result
    $item.stderr = $se.Result
    $item.exitCode = $proc.ExitCode
    $item.endUtc = [DateTime]::UtcNow.ToString('o')
    $proc.Dispose()
    Flush
    return $item
}
try {
    $record.host = [ordered]@{os=[Runtime.InteropServices.RuntimeInformation]::OSDescription; osArchitecture=[Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString(); processArchitecture=[Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture.ToString(); machine=$env:COMPUTERNAME; powershell=$PSVersionTable; environmentBefore=@{ASAN_OPTIONS=$env:ASAN_OPTIONS; PATH=$env:PATH}}
    Flush
    if ($env:OS -ne 'Windows_NT' -or $record.host.osArchitecture -ne 'X64' -or $record.host.processArchitecture -ne 'X64') { throw 'Requires native Windows x64 OS and x64 PowerShell; ARM64/emulation is outside guide scope.' }
    $expected = @{bad='F01C2E0E14B3438BF14357CC940990DBDFFD03D68967D5BDC656BA2323884AC7'; good='85CC90C157FC6F7C7B76EFC6ACDD84B5FEEB44AE3766F44D3CE370C0E09CCC34'}
    foreach ($kind in @('bad','good')) {
        $source = Join-Path $root "examples/windows-memory/$kind/bounds.c"
        if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing guide fixture: $source. Run from repository root." }
        $hash = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
        $record.inputs += @{path=$source; sha256=$hash; expectedSha256=$expected[$kind]}
        Flush
        if ($hash -ne $expected[$kind]) { throw "Fixture differs from fresh pinned snapshot: $source" }
        New-Item -ItemType Directory -Path (Join-Path $out $kind) | Out-Null
        Copy-Item -LiteralPath $source -Destination (Join-Path $out "$kind/bounds.c")
    }
    $vswhere = "${env:ProgramFiles(x86)}/Microsoft Visual Studio/Installer/vswhere.exe"
    if (-not (Test-Path -LiteralPath $vswhere)) { throw 'Install Visual Studio 2022 C++ tools first: vswhere missing.' }
    $discovery = Native 'vs-discovery' $vswhere @('-latest','-products','*','-version','[17.7,18.0)','-requires','Microsoft.VisualStudio.Component.VC.Tools.x86.x64','-property','installationPath')
    if ($discovery.exitCode -ne 0 -or -not $discovery.stdout.Trim()) { throw 'VS 2022 17.7+ with x64 C++ tools was not found.' }
    $vs = $discovery.stdout.Trim()
    $version = Native 'vs-version' $vswhere @('-latest','-products','*','-version','[17.7,18.0)','-requires','Microsoft.VisualStudio.Component.VC.Tools.x86.x64','-property','installationVersion')
    if ($version.exitCode -ne 0) { throw 'VS version discovery failed.' }
    $shell = Join-Path $vs 'Common7/Tools/Launch-VsDevShell.ps1'
    if (-not (Test-Path -LiteralPath $shell)) { throw 'VS developer shell missing.' }
    $init = [ordered]@{name='developer-shell'; executable=$shell; arguments=@('-Arch','amd64','-HostArch','amd64','-SkipAutomaticLocation'); command=('& "'+$shell+'" -Arch amd64 -HostArch amd64 -SkipAutomaticLocation'); stdout=''; stderr=''; exitCode=$null; outcome='pending'}
    $record.commands += $init
    Flush
    try {
        $init.stdout = (& $shell -Arch amd64 -HostArch amd64 -SkipAutomaticLocation 2>&1 | Out-String)
        $init.outcome = 'completed; PowerShell script has no native process exit code'
    } catch { $init.stderr = ($_ | Out-String); $init.outcome='failed'; throw } finally { Flush }
    $compiler = (Get-Command cl.exe -ErrorAction Stop).Source
    $runtime = Join-Path (Split-Path $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
    $record.host.toolchain = @{compiler=$compiler; hostArch=$env:VSCMD_ARG_HOST_ARCH; targetArch=$env:VSCMD_ARG_TGT_ARCH; VCToolsVersion=$env:VCToolsVersion; WindowsSDKVersion=$env:WindowsSDKVersion; runtime=$runtime; PATH=$env:PATH; ASAN_OPTIONS=$env:ASAN_OPTIONS}
    Flush
    if ($env:VSCMD_ARG_HOST_ARCH -ne 'x64' -or $env:VSCMD_ARG_TGT_ARCH -ne 'x64' -or $compiler -notmatch '[\\/]Hostx64[\\/]x64[\\/]cl.exe$' -or -not $compiler.StartsWith($vs,[StringComparison]::OrdinalIgnoreCase)) { throw 'Compiler must be the selected VS native Hostx64/x64 toolchain.' }
    if (-not $env:WindowsSDKVersion) { throw 'Windows SDK missing from initialized shell.' }
    if (-not (Test-Path -LiteralPath $runtime)) { throw 'Add C++ AddressSanitizer in VS 2022 Installer: runtime DLL missing.' }
    $record.host.toolchain.runtimeVersion = (Get-Item -LiteralPath $runtime).VersionInfo.FileVersion
    $record.host.toolchain.runtimeSha256 = (Get-FileHash -LiteralPath $runtime -Algorithm SHA256).Hash
    $banner = Native 'compiler-banner' $compiler @()
    if (($banner.stdout+$banner.stderr) -notmatch 'for x64') { throw 'Compiler banner does not identify x64.' }
    Set-Location -LiteralPath $out
    New-Item -ItemType Directory -Path build | Out-Null
    foreach ($kind in @('bad','good')) {
        $build = Native "$kind-build" $compiler @('/nologo','/Od','/Zi','/fsanitize=address',"./$kind/bounds.c","/Fe:build/$kind.exe","/Fo:build/$kind.obj","/Fd:build/$kind-compile.pdb",'/link','/DEBUG','/INCREMENTAL:NO')
        if ($build.exitCode -ne 0) { throw "$kind build failed; inspect captured compiler/linker output." }
        $run = Native "$kind-run" (Join-Path $out "build/$kind.exe") @()
        $diagnostic = $run.stdout + "`n" + $run.stderr
        if ($kind -eq 'bad') {
            if ($run.exitCode -eq 0 -or $diagnostic -notmatch 'ERROR: AddressSanitizer: heap-buffer-overflow' -or $diagnostic -notmatch 'WRITE of size 4' -or $diagnostic -notmatch '\bmain\b' -or $diagnostic -notmatch 'bounds\.c(?:\(5\)|:5\b)') { throw 'Faulty run lacks required nonzero exit, overflow, write-size, main, or bounds.c line 5 diagnostic.' }
        } else {
            if ($run.exitCode -ne 0 -or $diagnostic -match 'AddressSanitizer') { throw 'Correction did not meet clean outcome: exit 0 with no AddressSanitizer report.' }
        }
    }
    $record.status = 'passed'
} catch {
    $record.status = 'failed'
    $record.failure = ($_ | Out-String)
    throw
} finally {
    $record.finishedUtc = [DateTime]::UtcNow.ToString('o')
    Flush
    Set-Location -LiteralPath $root
}