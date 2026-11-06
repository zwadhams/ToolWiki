# Windows memory reader retest

Status: PASS for the documented native Windows x64 route with preinstalled Visual Studio tools. Fresh execution produced the expected source-attributed heap-buffer-overflow report and a clean corrected run. A minor compiler-preflight wording mismatch did not impede completion.

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

`reader-commands-initial.ps1` writes top-level `reader-run.json`, `reader-commands.txt`, `reader-environment.json`, `reader-digests.json`, per-step stdout/stderr `.txt` files, and copies of the two source files as `.txt`. The snapshot and generated executable/PDB digests are included. The downloaded checkout and build files remain under the fresh work directory.

## Observed execution results

The unchanged reader script ran in [CI run 42305217668](https://github.com/zwadhams/ToolWiki/actions/runs/42305217668), job `128192739649`, at commit `56bc97faa43a0448ee5fbe73d293c3b0ce291b9d`. Its recorded execution interval was 2026-11-06 22:30:52-22:30:57 UTC. The result below comes from inspecting the retained command, compiler, build, runtime, source, environment, and digest files in `ci-42305217668`, rather than relying on the job conclusion or manifest assertions.

The command record shows public snapshot acquisition into the newly created `memory-reader-work-c73e14cafc89406686a663bd10c98684` directory, extraction of revision `506c522ca86fd8c9d7b688f35a4d37f842d04cc9`, and transition into its Windows memory example. Download and extraction completed without PowerShell errors. The source copies contain the documented two-integer allocation and the bad/good index difference.

The environment record identifies Windows build `10.0.20348`, native OS and process architecture `X64`, PowerShell `7.6.9`, and runner image `win22` version `20261101.353.1`. The actual architecture command printed `X64`. Developer-shell output identifies VS 2022 `17.14.44`; `vswhere` identifies Enterprise 2022 with installation version `17.14.37827.9`. The compiler banner reports MSVC `19.44.35229 for x64`, and both developer-shell architecture variables printed `x64`. The runtime DLL presence check succeeded. Its file-version fields were null, so the retained record does not establish a separate ASan DLL version. `ASAN_OPTIONS` was unset.

| Operation | Native exit | Directly observed output |
| --- | ---: | --- |
| Bare `cl` preflight | 0 | x64 compiler banner on stderr and usage on stdout |
| Build faulty example | 0 | `bounds.c` on stdout; empty stderr |
| Run faulty example | 1 | ASan heap-buffer-overflow report, write and allocation source locations, then `ABORTING` |
| Build correction | 0 | `bounds.c` on stdout; empty stderr |
| Run correction | 0 | Empty stderr; stdout contains only `0` from the documented `$LASTEXITCODE` command |

The bad-run stderr reports `ERROR: AddressSanitizer: heap-buffer-overflow`, followed by `WRITE of size 4`. Its top write frame identifies `main` at `bad/bounds.c:5`. It says the address is `0 bytes after 8-byte region`, and the allocation stack identifies `malloc` and `main` at `bad/bounds.c:3`. The source copy shows line 3 allocating `2 * sizeof(*values)` and line 5 writing `values[2] = 7`. Together, these establish a four-byte write immediately beyond the allocated two-integer region. This is a diagnosed memory error with source attribution, not merely a nonzero process exit.

The correction's source changes only that index to `values[1] = 7`. It was compiled separately with the same `/Od /Zi /fsanitize=address` and `/link /DEBUG /INCREMENTAL:NO` instrumentation and debug flags. Its build and execution both returned 0, and the retained runtime stderr is empty. The successful corrected process also supplies evidence that the runtime loads and executes in this environment. The reader can therefore connect the report to the offending access and verify this correction using the documented workflow.

## Evidence integrity and limits

The provenance file identifies artifact `13546391430` and archive SHA-256 `b3dea816c4eae263bf2e804e2568c20b96e892201393e6272be59b1e47f7f3e1`. The coordinator supplied the archive verification and provenance; this review independently recomputed hashes for all 32 retained files listed there. All matched their retained hashes, and all 32 provenance raw hashes equal the retained hashes. Thus the recorded normalization procedure made no byte changes to these memory evidence files. All 31 available files also listed in the runtime digest manifest match its recorded raw hashes; `reader-digests.json` does not hash itself.

The retained source copies use CRLF line endings and are 172 bytes each, while the snapshot source files were 164 bytes each. Reconstructing LF line endings from each copy produces exactly the original source SHA-256 recorded by the run. The original bad source hash is `F01C2E0E14B3438BF14357CC940990DBDFFD03D68967D5BDC656BA2323884AC7`; the good source hash is `85CC90C157FC6F7C7B76EFC6ACDD84B5FEEB44AE3766F44D3CE370C0E09CCC34`.

The runtime manifest additionally records the acquired ZIP and generated EXE, OBJ, and PDB sizes and hashes. These binaries and the ZIP are not present in the retained top-level text artifact, so their original bytes were not independently rehashed during this review. Their recorded digests supplement the commands and diagnostic evidence; they are not a claim of a second local execution.

No missing operational instruction or runtime blocker appeared within the approved scope, and the harness preserved the bad exit while continuing to the corrected run. One minor documentation mismatch remains: the guide says bare `cl` also reports that a source filename is missing. Here it printed usage and returned 0. The required x64 banner was present, so this difference did not affect the procedure or diagnosis. Suggested wording is that a usage or missing-source message may appear during this preflight.

This retest validates one fresh snapshot acquisition and the documented bad/corrected experiment on the specified preinstalled native x64 CI environment. It does not validate a fresh Visual Studio installation, ARM64 or x64 emulation, the separate Clang route, other compiler/runtime versions, executable-only analysis, or a reader's unrelated crashing application. The corrected run establishes that this exercised access succeeds under the selected instrumentation; it does not prove that all program inputs or paths are memory-safe. No product files were changed.

## Follow-up disposition

The coordinator corrected the bare-cl wording after this retest. This initial script was preserved as `reader-commands-initial.ps1`; its original execution is also pinned by CI commit 56bc97faa43a0448ee5fbe73d293c3b0ce291b9d. A new agent will repeat the affected memory scenario. These initial observations and outputs are unchanged.
