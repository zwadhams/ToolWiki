# Independent reader confirmation: Windows memory errors

Status: PASS for the documented example on native Windows x64 with the required Visual Studio tools already installed. The fresh reader derived the procedure from the visible wiki and its explicit links, and the new replay produced the expected diagnostic and clean correction. No blocking reader gap or contradictory output was found in this scope.

The reader started in a fresh browser tab at the supplied local homepage for site build f930842. No product source, existing audit, previous test, or other agent file was read. The visible guide's historical validation claim was encountered as page text; its execution-record link was not opened and is not evidence for this independent replay.

## Route and decision

1. [Browse tools](http://127.0.0.1:4363/ToolWiki/) exposed the task link "Investigate memory errors".
2. [Choosing memory-error checks](http://127.0.0.1:4363/ToolWiki/guides/memory-error-detection/) explicitly directed native Windows x64 users with source and rebuild access to "Find a memory error on Windows". This matched the assigned environment and task without requiring prior sanitizer knowledge.
3. [Find a memory error on Windows](http://127.0.0.1:4363/ToolWiki/guides/windows-memory-check/) selected MSVC AddressSanitizer and distinguished it from the Clang catalog integration. Its first preparation step linked to "Get the examples".
4. [Get the examples](http://127.0.0.1:4363/ToolWiki/guides/get-examples/) provided a public ZIP at fixed revision 506c522ca86fd8c9d7b688f35a4d37f842d04cc9, literal PowerShell download/extract/directory commands, and the Windows example directory.

The reader chose the documented ZIP route. The replay creates an empty unique subdirectory under its supplied OutputPath, downloads and expands the fixed public archive there, and enters examples/windows-memory. It then follows the guide's developer-shell setup, compiler/runtime preflight, faulty build/run, and corrected build/run. It does not use a downloaded verifier or the current working checkout as the example source.

## Information available before execution

The guide names native Windows x64, PowerShell, Visual Studio 2022 17.7 or later, the Desktop development with C++ workload, x64 MSVC tools, a Windows SDK, and C++ AddressSanitizer. It links Microsoft installation and component instructions. The assigned CI environment already has Visual Studio tools, so installation is outside this replay.

The architecture check must report X64. The guide explicitly says to stop on Arm64 and says x64 compiler selection does not change host architecture. The local ARM64 machine is used only for browser reading, writing artifacts, and syntax validation; no target build or executable runs there.

The developer-shell block locates an eligible Visual Studio installation with vswhere and initializes amd64 host and target settings in the same PowerShell window. Preflight requires a compiler banner containing "for x64", both architecture values equal to x64, and the ASan runtime DLL beside cl.exe. The page correctly distinguishes runtime presence from a successful runtime load.

The bad example allocates two integers and writes values[2] = 7 at bounds.c line 5. The guide explains that only indices 0 and 1 fit. Both builds use /Od, /Zi, /fsanitize=address, /DEBUG, and /INCREMENTAL:NO, with distinct output names. It explains the relevant instrumentation and symbol flags and says to retain PDB files. The supplied correction uses values[1] = 7.

## Pre-run expectations

- Acquisition succeeds from an empty directory and the pinned snapshot contains both examples.
- Host, compiler host, and compiler target are native x64; the runtime DLL exists.
- Both builds exit 0 using the literal documented flags.
- The faulty executable exits nonzero and emits "ERROR: AddressSanitizer: heap-buffer-overflow", "WRITE of size 4", and a source location for bounds.c line 5. The allocation stack should point to the two-integer allocation.
- The corrected executable exits 0 and produces no AddressSanitizer error.
- A crash without the expected diagnostic, or failure of both programs, is an unsuccessful experiment. Success requires both sides of the comparison.

## Outside knowledge and missing steps

No outside technical source was needed to choose the tool, acquire the public example, configure the existing toolchain, or derive the build/run sequence. The visible text and explicit links supplied those steps. The reader did not open the external installation links because no installation was required by the assigned environment.

Harness work uses ordinary PowerShell knowledge to capture stdout/stderr, command strings, working directories, native exit codes, version information, and SHA-256 digests. It supplies a unique empty directory, records the platform, guards the stated x64 requirement, and allows the expected bad-run exit to continue into the good run. These additions preserve the documented setup/build/run commands and are not hidden repairs to the procedure.

No blocking missing step was found for the stated native x64 CI environment with the required Visual Studio components installed. A fresh Visual Studio installation is explicitly outside the guide's validation claim and is not tested here. Broader integration into an existing C/C++ project's build is outside this small example; the page tells the reader to preserve build flags and triggering input and limits clean-run conclusions to executed code.

## Replay artifact

The prepared script is `audits/reader-workflows/retests/memory/reader-commands.ps1` and accepts `param([string]$OutputPath)`. Top-level TXT/JSON output captures are separated from the unique download/build subdirectory. The harness records runner image, GitHub run/revision, and the selected Visual Studio version. Any failed stated expectation makes the replay fail after preserving both run outputs. PowerShell syntax parsing completed without errors; script and report were checked as ASCII. The executed script SHA-256 is `C606BECE41CAFFC794DF8B9994A01BFABE66ECE8417A7D3B283D56938CCB1769`, also rechecked after receiving the output.

## Actual output interpretation

The independent replay ran on 2026-11-06 from 22:40:14 to 22:40:19 UTC in [CI run 42306409445](https://github.com/zwadhams/ToolWiki/actions/runs/42306409445), job 128196748279, at commit `f7e6eec324057646915c0688715ba0e69e9fce71`. The conclusion below follows from the captured command records and raw compiler/build/runtime output, rather than the CI success flag or the script's observedChecks booleans.

| Check | Observed output | Interpretation |
| --- | --- | --- |
| Public example acquisition | Download and extraction completed in a unique empty `memory-reader-...` directory. The recorded commands use the documented fixed ZIP and then enter the snapshot's `examples/windows-memory` directory. | The example was acquired publicly from the documented revision, independently of the checked-out CI source. |
| Native platform | `host-architecture.txt` says `X64`; metadata records both OS and process architecture as `X64`, Windows 10.0.20348, image `win22` version `20261101.353.1`, and PowerShell `7.6.9`. | This is the required native x64 Windows environment. The local ARM64 host was not used to build or run the target. |
| Compiler setup | Developer PowerShell announces Visual Studio 2022 `17.14.44`; selected installationVersion is `17.14.37827.9`. The compiler banner says `19.44.35229 for x64`; host and target captures both say `x64`. | The documented shell setup selected a suitable installed VS 2022 compiler and x64 host/target combination. Bare `cl` printed usage as the page permits. |
| Runtime preflight | The runtime-presence check completed for `clang_rt.asan_dynamic-x86_64.dll` beside the selected HostX64/x64 compiler. The DLL has a recorded size and digest. | The required runtime exists. Actual diagnostic production and the good run provide the stronger execution evidence. |
| Faulty build | Build exit `0`; stdout contains `bounds.c`; stderr is empty. The recorded invocation includes all documented instrumentation, debug, and linker flags. | The instrumented faulty program built successfully, with no captured compiler or linker error. |
| Faulty run | Exit `1`; stdout is empty; stderr reports `ERROR: AddressSanitizer: heap-buffer-overflow` and `WRITE of size 4`. The top `main` frame and summary point to `bad/bounds.c:5`. | The invalid write was reached and diagnosed; this is more specific evidence than a process failure alone. |
| Allocation context | The report says the address is `0 bytes after 8-byte region`; its allocation stack reaches `main` at `bad/bounds.c:3`. | The 4-byte write begins immediately after the two-integer allocation. This agrees with the guide's `values[2]` explanation and identifies both the access and allocation source locations. |
| Corrected build and run | Build exit `0`, stdout `bounds.c`, and empty build stderr. Runtime stdout and stderr are both zero bytes; runtime exit is `0`. The build uses the same instrumentation flags and separate good outputs. | The supplied correction completes cleanly under the same instrumentation. Both required halves of the experiment succeeded. |

Evidence is retained under `ci-42306409445/`. In particular, `bad-run-stderr.txt` contains the full error, access stack, allocation stack, and shadow-byte report; `good-run-exit.txt` records the clean exit; `reader-run.json` retains the actual commands, working directories, native exits, tool metadata, and source/build digests. `ASAN_OPTIONS` was absent. The runtime's file-version field was unavailable, but its SHA-256 was recorded as `3AA742521E8CBD23252F0545AA51D5A15624A3E4430FBE2F81567AFAEB3FC59B` and its behavior was observed directly.

The public example ZIP SHA-256 was `1EA0D5A28C0BCA15B8C5F1481451FB91B3970F1D9CB1D1475BADD242E1F6713E`. The retained provenance separately identifies the downloaded CI artifact archive as `af292bf963ca5f0825dd806d6f83dadc3a7998acfd143c1ea0b86173cd663885`. The reader recomputed all 17 retained capture/metadata file hashes against `provenance.json`; every hash matched, and every recorded raw hash equals its retained hash. Thus the inspected compiler/build/runtime captures are byte-identical to the recorded raw captures.

## Final classification and limits

The visible route and procedure were sufficient for this reader to acquire the public examples, initialize the installed toolchain, recognize the intended failure, and verify the supplied correction. No undocumented setup repair or substitution was needed. The diagnostic demonstrates the intended out-of-bounds heap write in the faulty example; the corrected run demonstrates clean execution of that example with the same instrumentation.

This confirmation covers one native Windows Server 2022 x64 CI image, the recorded VS/MSVC toolchain, and the pinned two-program example. It does not validate fresh Visual Studio installation, Windows ARM64 or emulation, every supported VS version, integration into an arbitrary existing project, other defect classes, or unexecuted code paths. These limits are consistent with the visible guide. The guide's historical execution claim was not used as evidence for this result.
