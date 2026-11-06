param([string]$OutputPath)

# Reader replay of the visible wiki commands. Run only on native Windows x64.
# Output capture, guards, and metadata are harness additions, not guide commands.
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
if (-not $OutputPath) { throw 'OutputPath is required.' }
$OutputPath = [IO.Path]::GetFullPath($OutputPath)
New-Item -ItemType Directory -Path $OutputPath -Force | Out-Null
$workPath = Join-Path $OutputPath ('memory-reader-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $workPath | Out-Null
$startingLocation = Get-Location
$steps = [System.Collections.Generic.List[object]]::new()
$record = [ordered]@{
    status = 'running'
    startedUtc = [DateTime]::UtcNow.ToString('o')
    guide = 'http://127.0.0.1:4363/ToolWiki/guides/windows-memory-check/'
    acquisitionGuide = 'http://127.0.0.1:4363/ToolWiki/guides/get-examples/'
    exampleRevision = '506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
    workPath = $workPath
    powershellVersion = $PSVersionTable.PSVersion.ToString()
    osArchitecture = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString()
    processArchitecture = [System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture.ToString()
    osDescription = [System.Runtime.InteropServices.RuntimeInformation]::OSDescription
    runnerImageOS = $env:ImageOS
    runnerImageVersion = $env:ImageVersion
    githubSha = $env:GITHUB_SHA
    githubRunId = $env:GITHUB_RUN_ID
    asanOptions = $env:ASAN_OPTIONS
    steps = $steps
}

function Begin-Step([string]$Name, [string]$Command) {
    $step = [ordered]@{
        name = $Name
        command = $Command
        workingDirectory = (Get-Location).Path
        startedUtc = [DateTime]::UtcNow.ToString('o')
        status = 'running'
        nativeExitCode = $null
    }
    $steps.Add($step)
    $script:currentStep = $step
}

function Finish-Step($NativeExitCode = $null) {
    $script:currentStep.nativeExitCode = $NativeExitCode
    $script:currentStep.status = 'completed'
    $script:currentStep.completedUtc = [DateTime]::UtcNow.ToString('o')
}

try {
    # The harness supplies the empty working directory requested by Get the examples.
    Set-Location $workPath
    if (@(Get-ChildItem -LiteralPath . -Force).Count -ne 0) { throw 'Download directory is not empty.' }

    Begin-Step 'download' "Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip' -OutFile examples.zip"
    Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip' -OutFile examples.zip
    Finish-Step
    $record.archiveSha256 = (Get-FileHash -LiteralPath examples.zip -Algorithm SHA256).Hash

    Begin-Step 'extract' 'Expand-Archive -LiteralPath examples.zip -DestinationPath .'
    Expand-Archive -LiteralPath examples.zip -DestinationPath .
    Finish-Step

    Begin-Step 'repository-directory' "Set-Location '.\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'"
    Set-Location '.\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
    Finish-Step

    Begin-Step 'example-directory' 'Set-Location ./examples/windows-memory'
    Set-Location ./examples/windows-memory
    Finish-Step

    Begin-Step 'host-preflight' '[System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture'
    [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture | Out-File (Join-Path $OutputPath 'host-architecture.txt')
    if ([System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString() -ne 'X64') {
        throw 'The guide requires native Windows x64. Do not compile or run on this host.'
    }
    if (-not [System.Runtime.InteropServices.RuntimeInformation]::IsOSPlatform([System.Runtime.InteropServices.OSPlatform]::Windows)) {
        throw 'The guide requires Windows.'
    }
    Finish-Step

    Begin-Step 'developer-shell' @'
$vswhere = "${env:ProgramFiles(x86)}/Microsoft Visual Studio/Installer/vswhere.exe"
if (-not (Test-Path $vswhere)) { throw 'Install Visual Studio 2022 C++ tools first.' }
$vs = & $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
if (-not $vs) { throw 'VS 2022 17.7+ with x64 C++ tools was not found.' }
& "$vs/Common7/Tools/Launch-VsDevShell.ps1" -Arch amd64 -HostArch amd64 -SkipAutomaticLocation
'@
    $vswhere = "${env:ProgramFiles(x86)}/Microsoft Visual Studio/Installer/vswhere.exe"
    if (-not (Test-Path $vswhere)) { throw 'Install Visual Studio 2022 C++ tools first.' }
    $vs = & $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
    $record.vswhereExit = $LASTEXITCODE
    if (-not $vs) { throw 'VS 2022 17.7+ with x64 C++ tools was not found.' }
    $record.visualStudioPath = $vs
    & "$vs/Common7/Tools/Launch-VsDevShell.ps1" -Arch amd64 -HostArch amd64 -SkipAutomaticLocation *> (Join-Path $OutputPath 'developer-shell.txt')
    Finish-Step

    # Additional version capture identifies the selected installed VS instance.
    Begin-Step 'visual-studio-version-metadata' @'
& $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationVersion
'@
    $record.visualStudioVersion = & $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationVersion
    Finish-Step $LASTEXITCODE

    Begin-Step 'compiler-banner' 'cl'
    cl 1> (Join-Path $OutputPath 'compiler-stdout.txt') 2> (Join-Path $OutputPath 'compiler-stderr.txt')
    $compilerExit = $LASTEXITCODE
    Finish-Step $compilerExit

    Begin-Step 'compiler-runtime-preflight' @'
$env:VSCMD_ARG_HOST_ARCH
$env:VSCMD_ARG_TGT_ARCH
$compiler = (Get-Command cl.exe -ErrorAction Stop).Source
$runtime = Join-Path (Split-Path $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
if (-not (Test-Path $runtime)) { throw 'Add C++ AddressSanitizer in the VS 2022 Installer.' }
'@
    $env:VSCMD_ARG_HOST_ARCH | Out-File (Join-Path $OutputPath 'compiler-host-architecture.txt')
    $env:VSCMD_ARG_TGT_ARCH | Out-File (Join-Path $OutputPath 'compiler-target-architecture.txt')
    $compiler = (Get-Command cl.exe -ErrorAction Stop).Source
    $runtime = Join-Path (Split-Path $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
    if (-not (Test-Path $runtime)) { throw 'Add C++ AddressSanitizer in the VS 2022 Installer.' }
    $record.compiler = $compiler
    $record.compilerVersion = (Get-Item -LiteralPath $compiler).VersionInfo.FileVersion
    $record.runtime = $runtime
    $record.runtimeVersion = (Get-Item -LiteralPath $runtime).VersionInfo.FileVersion
    $record.hostCompilerArchitecture = $env:VSCMD_ARG_HOST_ARCH
    $record.targetArchitecture = $env:VSCMD_ARG_TGT_ARCH
    if ($env:VSCMD_ARG_HOST_ARCH -ne 'x64' -or $env:VSCMD_ARG_TGT_ARCH -ne 'x64') {
        throw 'The guide requires both compiler architecture values to be x64.'
    }
    $banner = (Get-Content -LiteralPath (Join-Path $OutputPath 'compiler-stdout.txt') -Raw) + (Get-Content -LiteralPath (Join-Path $OutputPath 'compiler-stderr.txt') -Raw)
    if ($banner -notmatch 'for x64') { throw 'Compiler banner does not say for x64.' }
    Finish-Step

    Begin-Step 'build-directory' 'New-Item -ItemType Directory -Path build -Force | Out-Null'
    New-Item -ItemType Directory -Path build -Force | Out-Null
    Finish-Step

    Begin-Step 'bad-build' 'cl /nologo /Od /Zi /fsanitize=address ./bad/bounds.c /Fe:build/bad.exe /Fo:build/bad.obj /Fd:build/bad-compile.pdb /link /DEBUG /INCREMENTAL:NO'
    cl /nologo /Od /Zi /fsanitize=address ./bad/bounds.c /Fe:build/bad.exe /Fo:build/bad.obj /Fd:build/bad-compile.pdb /link /DEBUG /INCREMENTAL:NO 1> (Join-Path $OutputPath 'bad-build-stdout.txt') 2> (Join-Path $OutputPath 'bad-build-stderr.txt')
    $badBuildExit = $LASTEXITCODE
    Finish-Step $badBuildExit
    if ($LASTEXITCODE -ne 0) { throw 'Build failed; resolve the compiler or linker error before running.' }

    Begin-Step 'bad-run' "./build/bad.exe`n`$LASTEXITCODE"
    ./build/bad.exe 1> (Join-Path $OutputPath 'bad-run-stdout.txt') 2> (Join-Path $OutputPath 'bad-run-stderr.txt')
    $badExit = $LASTEXITCODE
    $LASTEXITCODE | Out-File (Join-Path $OutputPath 'bad-run-exit.txt')
    Finish-Step $badExit

    Begin-Step 'good-build' 'cl /nologo /Od /Zi /fsanitize=address ./good/bounds.c /Fe:build/good.exe /Fo:build/good.obj /Fd:build/good-compile.pdb /link /DEBUG /INCREMENTAL:NO'
    cl /nologo /Od /Zi /fsanitize=address ./good/bounds.c /Fe:build/good.exe /Fo:build/good.obj /Fd:build/good-compile.pdb /link /DEBUG /INCREMENTAL:NO 1> (Join-Path $OutputPath 'good-build-stdout.txt') 2> (Join-Path $OutputPath 'good-build-stderr.txt')
    $goodBuildExit = $LASTEXITCODE
    Finish-Step $goodBuildExit
    if ($LASTEXITCODE -ne 0) { throw 'Corrected build failed.' }

    Begin-Step 'good-run' "./build/good.exe`n`$LASTEXITCODE"
    ./build/good.exe 1> (Join-Path $OutputPath 'good-run-stdout.txt') 2> (Join-Path $OutputPath 'good-run-stderr.txt')
    $goodExit = $LASTEXITCODE
    $LASTEXITCODE | Out-File (Join-Path $OutputPath 'good-run-exit.txt')
    Finish-Step $goodExit

    # Record only the example files and generated outputs, not repository sources.
    $record.fileDigests = @(
        Get-Item -LiteralPath './bad/bounds.c', './good/bounds.c', $compiler, $runtime
        Get-ChildItem -LiteralPath './build' -File
    ) | ForEach-Object {
        [ordered]@{ path = $_.FullName; sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash; bytes = $_.Length }
    }
    $badText = (Get-Content -LiteralPath (Join-Path $OutputPath 'bad-run-stdout.txt') -Raw) + (Get-Content -LiteralPath (Join-Path $OutputPath 'bad-run-stderr.txt') -Raw)
    $goodText = (Get-Content -LiteralPath (Join-Path $OutputPath 'good-run-stdout.txt') -Raw) + (Get-Content -LiteralPath (Join-Path $OutputPath 'good-run-stderr.txt') -Raw)
    $record.observedChecks = [ordered]@{
        badNonzero = $badExit -ne 0
        heapBufferOverflow = $badText -match 'ERROR: AddressSanitizer: heap-buffer-overflow'
        writeSizeFour = $badText -match 'WRITE of size 4'
        sourceLineFive = $badText -match 'bounds\.c(?::5(?=[:\s)]|$)|\(5\))'
        goodExitZero = $goodExit -eq 0
        goodNoAsanError = $goodText -notmatch 'ERROR: AddressSanitizer'
    }
    $failedChecks = @($record.observedChecks.Keys | Where-Object { -not $record.observedChecks[$_] })
    if ($failedChecks.Count -gt 0) { throw ('Reader expectations not met: ' + ($failedChecks -join ', ')) }
    $record.status = 'completed'
}
catch {
    $record.status = 'failed'
    $record.failure = $_.ToString()
    if ($script:currentStep -and $script:currentStep.status -eq 'running') { $script:currentStep.status = 'failed' }
    $_ | Out-String | Out-File (Join-Path $OutputPath 'failure.txt')
    throw
}
finally {
    $record.finishedUtc = [DateTime]::UtcNow.ToString('o')
    $record | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath (Join-Path $OutputPath 'reader-run.json') -Encoding utf8
    Set-Location $startingLocation
}
