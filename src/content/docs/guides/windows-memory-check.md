---
title: "Find a memory error on Windows"
description: "Build a small C program with MSVC AddressSanitizer, diagnose an out-of-bounds write, and verify its correction."
executionEvidence:
  status: recorded
  scope: Native Windows Server 2022 x64 with VS 2022 17.14.44 and MSVC 19.44.35229; faulty and corrected C examples. ARM64, x64 emulation and fresh VS installation were not validated.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/a81760a9f74ed6d94eb33f80ab03f8bd6fc42362/audits/reader-workflows/implementation/memory/ci-42303178089/run.json
---

Use MSVC AddressSanitizer to find an invalid write in a C program you can rebuild. You will compile a faulty example, read its diagnostic, and run a corrected version.

**Executed on native Windows Server 2022 x64**, with Visual Studio 2022 17.14.44 and MSVC 19.44.35229. The faulty write produced the expected diagnostic and the correction exited successfully; the [execution record](https://github.com/zwadhams/ToolWiki/blob/a81760a9f74ed6d94eb33f80ab03f8bd6fc42362/audits/reader-workflows/implementation/memory/ci-42303178089/run.json) retains commands, versions, and checks. This route requires VS 2022 17.7 or later. Windows ARM64 and x64 emulation are outside its validated scope. The [Clang catalog entry](../../tools/address-sanitizer/) covers a separate compiler integration.

## Prepare the compiler

You need native Windows x64, PowerShell, and Visual Studio 2022 with **Desktop development with C++**, the x64 MSVC tools, a Windows SDK, and **C++ AddressSanitizer**. Get the 2022 installer from Microsoft's [VS 2022 release page](https://learn.microsoft.com/en-us/visualstudio/releases/2022/release-history#release-dates-and-build-numbers), then follow its [C++ installation instructions](https://learn.microsoft.com/en-us/cpp/build/vscpp-step-0-installation?view=msvc-170) and [AddressSanitizer component instructions](https://learn.microsoft.com/en-us/cpp/sanitizers/asan?view=msvc-170#install-addresssanitizer). These steps may require an administrator; this guide does not validate a fresh installation.

1. [Get the examples](../get-examples/), then enter this directory from the extracted repository root:

   ```powershell
   Set-Location ./examples/windows-memory
   ```

2. Check your native host architecture before selecting the compiler. This must print `X64`:

   ```powershell
   [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture
   ```

   If it reports `Arm64`, stop and use a native Windows x64 machine. Selecting an x64 compiler does not change the host architecture.

3. Initialize the VS 2022 x64 developer shell in this PowerShell window:

   ```powershell
   $vswhere = "${env:ProgramFiles(x86)}/Microsoft Visual Studio/Installer/vswhere.exe"
   if (-not (Test-Path $vswhere)) { throw 'Install Visual Studio 2022 C++ tools first.' }
   $vs = & $vswhere -latest -products * -version '[17.7,18.0)' -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -property installationPath
   if (-not $vs) { throw 'VS 2022 17.7+ with x64 C++ tools was not found.' }
   & "$vs/Common7/Tools/Launch-VsDevShell.ps1" -Arch amd64 -HostArch amd64 -SkipAutomaticLocation
   ```

   This locates the installed edition and keeps your working directory. Microsoft documents these [developer-shell arguments](https://learn.microsoft.com/en-us/visualstudio/ide/reference/command-prompt-powershell?view=vs-2022#target-architecture-and-host-architecture).

4. Confirm the compiler, target, and runtime are ready:

   ```powershell
   cl
   $env:VSCMD_ARG_HOST_ARCH
   $env:VSCMD_ARG_TGT_ARCH
   $compiler = (Get-Command cl.exe -ErrorAction Stop).Source
   $runtime = Join-Path (Split-Path $compiler) 'clang_rt.asan_dynamic-x86_64.dll'
   if (-not (Test-Path $runtime)) { throw 'Add C++ AddressSanitizer in the VS 2022 Installer.' }
   ```

   The compiler banner must say `for x64`, and both architecture values must be `x64`. Bare `cl` may also print usage; no source is compiled in this preflight. The runtime DLL check verifies presence, while the corrected run below checks that it actually loads and runs.

## Diagnose the faulty write

`bad/bounds.c` allocates room for two integers, then writes index 2:

```c
#include <stdlib.h>
int main(void) {
    int *values = malloc(2 * sizeof(*values));
    if (!values) return 1;
    values[2] = 7;
    free(values);
    return 0;
}
```

1. Build it in the same PowerShell window:

   ```powershell
   New-Item -ItemType Directory -Path build -Force | Out-Null
   cl /nologo /Od /Zi /fsanitize=address ./bad/bounds.c /Fe:build/bad.exe /Fo:build/bad.obj /Fd:build/bad-compile.pdb /link /DEBUG /INCREMENTAL:NO
   if ($LASTEXITCODE -ne 0) { throw 'Build failed; resolve the compiler or linker error before running.' }
   ```

   `/Od` disables optimization, `/Zi` and `/DEBUG` retain source attribution, and `/fsanitize=address` instruments memory accesses. Keep the generated `.pdb` files with the executables.

2. Run the faulty program and read its exit status:

   ```powershell
   ./build/bad.exe
   $LASTEXITCODE
   ```

   Expect a nonzero exit and a report containing the following markers. This is an expected outline, not captured output; addresses and stack formatting vary:

   ```text
   ERROR: AddressSanitizer: heap-buffer-overflow
   WRITE of size 4
   ... main ... bounds.c:5
   ```

   `heap-buffer-overflow` means the access crossed a heap allocation's boundary. The write stack identifies line 5; the allocation stack identifies the two-integer allocation. Only indices 0 and 1 fit. A process crash without this diagnostic is a failed setup or run, not a successful memory check.

## Verify the correction

The supplied `good/bounds.c` changes `values[2] = 7` to `values[1] = 7`. Build and run it with the same instrumentation:

```powershell
cl /nologo /Od /Zi /fsanitize=address ./good/bounds.c /Fe:build/good.exe /Fo:build/good.obj /Fd:build/good-compile.pdb /link /DEBUG /INCREMENTAL:NO
if ($LASTEXITCODE -ne 0) { throw 'Corrected build failed.' }
./build/good.exe
$LASTEXITCODE
```

Expect no AddressSanitizer error and exit status `0`. Success requires both the faulty program's diagnostic and the corrected program's clean run. If both crash, the experiment has not succeeded.

## Resolve setup failures

| Symptom | Next action |
| --- | --- |
| Host architecture is `Arm64` | Use native Windows x64 or the repository's `windows-2022` validation job. This route does not validate emulation. |
| VS discovery fails, or `cl` is missing | Install or modify VS 2022 to add the C++ workload, then repeat developer-shell initialization. |
| Compiler or target is not x64 | Open a fresh PowerShell window and repeat initialization with both `-Arch amd64` and `-HostArch amd64`. |
| ASan library/DLL is missing, including `LNK1356` | Add C++ AddressSanitizer through the VS 2022 Installer. Run from the initialized developer shell so its runtime directory is on PATH. See [Microsoft's runtime reference](https://learn.microsoft.com/en-us/cpp/sanitizers/asan-runtime?view=msvc-170). |
| Report has no source line | Rebuild with `/Zi` and `/DEBUG` and retain `.pdb` files. [Symbolization is on by default](https://learn.microsoft.com/en-us/cpp/sanitizers/asan-flags?view=msvc-170); check that existing `ASAN_OPTIONS` settings do not disable it. |
| Both programs crash, or the bad program lacks the expected report | Treat this as a failed environment/run. Save both outputs, exit statuses, compiler version, and host/target architecture before investigating. |

When adapting this to your program, keep the build flags and triggering input with each report. A clean run only covers the code that executed; it does not establish that every input is safe. [Choose other memory-error checks](../memory-error-detection/) when you need uninitialized-value checks, executable-only analysis, or another platform.
