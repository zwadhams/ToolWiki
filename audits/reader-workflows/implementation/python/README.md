# Python workflow implementation checks

Executed on 2026-11-06 with Windows, PowerShell 7.6.9, and Python 3.13.15.
These are implementation checks, not independent reader acceptance or a human
usability study. The original `audits/reader-usability` evidence was not changed.

## Changes checked

- The Python guide links shared example acquisition, explicitly enters
  `examples/python-checks`, and checks the selected Python interpreter before
  creating its environment. A full interpreter path is an alternative to PATH
  lookup; the commands do not require the Windows `py` launcher.
- The original pinned Ruff/mypy demonstration remains intact. The project
  section uses standalone analyzer commands with a reader-selected directory,
  explicit configuration, separate reports and exit statuses, and no automatic
  source fixes. It explains the fixture's F401-only scope and bad/good runner
  restriction, configuration merging, target Python versions, imports, and stubs.
- The Pylint start section links official install/run instructions and provides
  a pinned 4.1.3 example selecting only unused-import. The page's frontmatter,
  license, scope, and whole-profile verified date are unchanged.

## Execution and results

A new `.venv` was created under
`.preview/reader-implementation/python/example`. The five original recipe input
files were copied into this directory without editing them. Their hashes match
the source files, as recorded in [commands.json](commands.json). The pinned
recipe requirements and Pylint 4.1.3 were installed in that new environment.
The resolved packages are in [installed-packages.txt](installed-packages.txt).
No global packages or settings were changed.

| Check | Faulty input | Corrected input |
| --- | --- | --- |
| Original Ruff/mypy runner | Exit 1; both completed with findings | Exit 0; both completed without findings |
| Pylint unused-import | Exit 4; W0611 for math | Exit 0; no diagnostics |
| Standalone Ruff on receipt package | Exit 1; F401 and F841 | Exit 0; empty diagnostic list |
| Standalone mypy on receipt package | Exit 1; two list-item errors | Exit 0; success for two source files |

The different synthetic project lived under
`.preview/reader-implementation/python/project`, with an empty
`src/receipt/__init__.py` and `src/receipt/totals.py`. Its faulty and corrected
source snapshots and tested configuration are in [inputs](inputs/). The same
documented standalone commands checked both versions, with `src/receipt` as the
selected target and a new report directory for each run. Source hashes were
unchanged by the analyzers. Recreating an existing report directory with the
documented `New-Item -ErrorAction Stop` command was rejected.

The command record includes working directories, variable values, actual exit
codes, expected codes, and a successful explicit-interpreter-path version
check. Reports under [reports](reports/) retain stdout and stderr; original
runner reports retain their own full commands and tool statuses in `run.json`.
Project reports retain each tool's exit code in a separate file. All retained
stderr reports are empty. Caches and virtual environments were not copied into
this evidence directory.

All 11 PowerShell code blocks on the two changed pages parsed without syntax
errors. `git diff --check` passed for the assigned pages and evidence. The
changed text and retained evidence were checked for ASCII-only bytes.

## Boundaries

The execution used isolated copies from the local checkout. Downloading or
cloning a fresh repository and installing Python were not tested in this lane.
No browser was used; the coordinating agent owns full-site build and rendered
navigation verification. These checks do not replace fresh reader acceptance.

The project example has only standard-library imports. Third-party dependency
installation, stub resolution, framework plugins, other configuration formats,
Linux/macOS execution, and application runtime behavior were not tested. The
fixture's historical configuration and runner were not modified. The new
commands are documentation; no general-purpose runner was added.

New claims were checked against the official
[Python venv documentation](https://docs.python.org/3.13/library/venv.html),
[Ruff configuration](https://docs.astral.sh/ruff/configuration/) and
[linter documentation](https://docs.astral.sh/ruff/linter/),
[mypy imports](https://mypy.readthedocs.io/en/stable/running_mypy.html) and
[command line reference](https://mypy.readthedocs.io/en/stable/command_line.html),
and Pylint's
[installation](https://pylint.readthedocs.io/en/stable/user_guide/installation/command_line_installation.html),
[running and exit codes](https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html),
and [unused-import reference](https://pylint.readthedocs.io/en/stable/user_guide/messages/warning/unused-import.html).
The installed pinned releases were used to verify the actual commands.
