# Windows memory check fixture

This fixture uses MSVC AddressSanitizer on native Windows x64 with Visual Studio 2022 17.7 or later. It does not establish compatibility with Windows ARM64 or x64 emulation. Install the Desktop development with C++ workload, x64 MSVC tools, Windows SDK, and C++ AddressSanitizer component before running it.

`bad/bounds.c` writes index 2 of a two-element allocation. `good/bounds.c` changes only that index to 1. Both compile with `/Od /Zi /fsanitize=address`.

## Capture verification evidence

From the repository root, use x64 PowerShell 7 on native Windows x64:

```powershell
pwsh -NoProfile -File ./examples/windows-memory/verify.ps1 -OutputPath ./memory-verification
```

The output directory must not exist. The script discovers VS 2022, initializes its x64 developer shell, checks the compiler/runtime, builds both files, and records separate standard output, standard error, exit codes, commands, source hashes, and environment metadata in `run.json`. It leaves build products in the output directory. CI uploads only the small text and JSON files.

A pass requires the bad program to exit nonzero with `heap-buffer-overflow`, `WRITE of size 4`, and `bounds.c:5` attribution, followed by exit 0 and no ASan error from the correction. Unsupported architecture, missing tooling, compilation failure, unsymbolized errors, and two crashing programs fail the check. The script accepts only an output path; it does not install software.

The [native execution record](https://github.com/zwadhams/ToolWiki/blob/a81760a9f74ed6d94eb33f80ab03f8bd6fc42362/audits/reader-workflows/implementation/memory/ci-42303178089/run.json) passed on Windows Server 2022 x64 with VS 2022 17.14.44 and MSVC 19.44.35229. The ARM64 development machine was used only to verify that the setup boundary fails clearly.
