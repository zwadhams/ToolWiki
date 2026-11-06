# Windows memory reader retest

Status: script ready; fresh native Windows x64 CI evidence is pending. No runtime success is claimed yet.

Reader task: investigate a crashing native C/C++ program on Windows, with source and rebuild access. The approved test environment is a native Windows x64 `windows-2022` runner with preinstalled Visual Studio tools. Installing Visual Studio is outside scope. Discovery used a fresh browser tab, not repository implementation files, prior audits, or previous execution records.

## Navigation and choice

1. Opened `http://127.0.0.1:4363/ToolWiki/`, titled "Browse tools".
2. Selected "Investigate memory errors" under "Start with a task".
3. Read `http://127.0.0.1:4363/ToolWiki/guides/memory-error-detection/`, titled "Choosing memory-error checks". Its table identifies AddressSanitizer for source plus an instrumentable build. Its explicit native Windows x64 paragraph points to "Find a memory error on Windows".
4. Followed that link to `http://127.0.0.1:4363/ToolWiki/guides/windows-memory-check/`. Chose its MSVC AddressSanitizer workflow because the task has source and rebuild access and the approved environment matches its native Windows x64 scope. The guide distinguishes this from its Clang catalog entry and executable-only alternatives.
5. Read "Prepare the compiler", "Diagnose the faulty write", "Verify the correction", and "Resolve setup failures". Did not follow the page's previous execution-record link.
6. Followed step 1's "Get the examples" link to `http://127.0.0.1:4363/ToolWiki/guides/get-examples/`. This supplies the pinned ZIP download, extraction, repository-root transition, and Windows memory example directory.

The observed site build was identified by the coordinator as `integrated46be6de`. The public example revision is `506c522ca86fd8c9d7b688f35a4d37f842d04cc9`.

## Procedure discovered

The download guide says to start in an empty working directory, download the pinned GitHub ZIP, extract it, and enter `ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9`. The Windows guide then says to enter `./examples/windows-memory` and require an `X64` native host.

Compiler setup locates VS 2022 17.7 or later with `vswhere`, initializes `Launch-VsDevShell.ps1` with both `-Arch amd64` and `-HostArch amd64`, and keeps the current directory. It checks the compiler banner, both architecture variables, and the ASan runtime DLL. A missing-source diagnostic from bare `cl` is explicitly expected.

Both builds use `/Od /Zi /fsanitize=address` and `/link /DEBUG /INCREMENTAL:NO`. The bad program writes `values[2]` after allocating two integers. The supplied correction writes `values[1]`. Both are compiled and run with the same instrumentation. The page explains why PDB files must be retained, what the diagnostic means, and how to distinguish a report from an unexplained crash.

The script starts a new, uniquely named empty directory within `OutputPath` and executes the public download and walkthrough commands there. It does not use a preexisting checkout or `verify.ps1`. Compiler, linker, and program output are retained separately for each step, including both native exit codes and PowerShell exceptions. The bad program's expected nonzero exit does not abort the corrected build/run.

## Missing steps and outside knowledge before execution

No missing operational step was apparent for the approved preinstalled VS/native x64 scope. The guide provides the architecture gate, compiler discovery, shell initialization, ASan presence check, source acquisition, builds, runs, expected results, and setup-failure interpretation. Fresh installation has external Microsoft links and is explicitly not validated; this retest makes no installation claim.

No outside knowledge was needed to select the route or construct the compiler/run commands. Ordinary PowerShell scripting knowledge was used only for the requested evidence harness: unique output directory creation, stream redirection, exception handling, JSON serialization, SHA-256 hashes, and result assertions. A supplementary `vswhere -format json` invocation and file-version inspection record installed versions; those are harness additions, not wiki-required setup steps. A local logging probe invoked the actual `Invoke-ReaderStep` helper with harmless `cmd /c exit 7` and `cmd /c exit 0` actions. It retained native exit codes 7 and 0, marked both PowerShell calls successful, and continued after the expected nonzero exit. This harness check is not evidence of the memory workflow succeeding. PowerShell syntax parsing and ASCII-only checks also passed.

The browser opened the requested hidden IAB tab successfully. No browser or discovery obstacle occurred. The current local ARM64 host is not used for runtime testing because the documented workflow excludes it and the user approved native x64 CI.

## Expected interpretation recorded before execution

- Bare `cl` may return nonzero for a missing source filename; its banner must identify an x64 compiler.
- The faulty build should complete successfully.
- The bad executable must return nonzero and print `ERROR: AddressSanitizer: heap-buffer-overflow`, `WRITE of size 4`, a write location at `bounds.c:5` (or equivalent stack formatting), and allocation-stack context. A crash alone does not pass.
- The correction should build successfully, return 0, and print no AddressSanitizer error.
- The diagnosis is a write beyond a two-integer heap allocation: valid indices are 0 and 1. The correction makes this executed access valid. A clean corrected run does not prove all program paths or inputs safe.
- Missing components, non-x64 architecture, absent source attribution, failure to emit the expected report, or a crashing correction require separate diagnosis rather than a pass based only on exit status.

`reader-commands.ps1` writes top-level `reader-run.json`, `reader-commands.txt`, `reader-environment.json`, `reader-digests.json`, per-step stdout/stderr `.txt` files, and copies of the two source files as `.txt`. The snapshot and generated executable/PDB digests are included. The downloaded checkout and build files remain under the fresh work directory.

## Observed execution results

Pending a new native Windows x64 CI run of this script and inspection of the retained outputs. The current report contains only discovery and pre-execution expectations.
