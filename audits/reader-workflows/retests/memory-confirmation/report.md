# Independent reader confirmation: Windows memory errors

Status: Pre-run reader review complete; native Windows x64 CI output pending.

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

The prepared script is `audits/reader-workflows/retests/memory/reader-commands.ps1` and accepts `param([string]$OutputPath)`. Top-level TXT/JSON output captures are separated from the unique download/build subdirectory. The harness records runner image, GitHub run/revision, and the selected Visual Studio version. Any failed stated expectation makes the replay fail after preserving both run outputs. PowerShell syntax parsing completed without errors; script and report were checked as ASCII. Native execution is pending parent submission and new CI output.

## Actual output interpretation

Pending the new native CI run. No pass/fail execution conclusion is made from the guide's historical claim.
