---
title: Check Python linting and types together
description: Run Ruff and mypy against the same small project, inspect separate reports, and repeat the checks after a correction.
---

[Ruff](../../tools/ruff/) and [mypy](../../tools/mypy/) answer different questions.
This recipe gives both the same fixture: an unused import and a call that passes
text to an integer parameter. Ruff checks only `F401`; mypy checks the annotated
call. Neither runs the target program.

The fixture is in
[`examples/python-checks`](https://github.com/zwadhams/ToolWiki/tree/main/examples/python-checks).
Use a checkout of the repository and run the commands from that directory.
It contains `bad/greeting.py`, the corrected `good/greeting.py`, a shared
`pyproject.toml`, pinned requirements, and `run_checks.py`.

**Executed on Windows with Python 3.13.15.** Both expected findings appeared in
the faulty file and both checks were clean on the corrected file. The
[execution record and reports](https://github.com/zwadhams/ToolWiki/blob/main/examples/python-checks/evidence.md)
retain the environment and tested input hashes. Other hosts have not been run
for this recipe.

## Prepare an isolated environment

Use Python 3.13 and the pinned Ruff 0.14.3 and mypy 1.18.2 releases. These versions
are a reproducible example, not a recommendation to downgrade an existing project.
The target Python version is also set to 3.13 in `pyproject.toml`.

On Windows, create the environment and install the requirements:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

On Linux or macOS, use `.venv/bin/python` in place of the Windows interpreter path.
Installing the pinned packages requires package-index access. The fixture has no
application dependencies or service credentials.

## Check the faulty version

Run both checks and keep their reports:

```powershell
.\.venv\Scripts\python.exe run_checks.py bad --output reports/bad
```

The runner verifies versions, runs each tool separately, and saves commands,
input hashes, host details, versions, and return codes in `run.json`. Diagnostics
go in `ruff.json` and `mypy.txt`, with separate stderr files. Read both reports.
Use a new output directory for each rerun; the runner refuses to overwrite
earlier reports. It records setup failures and retains partial output on timeout.

The expected signals are:

| Tool | Expected finding | Meaning |
| --- | --- | --- |
| Ruff | `F401` for `math` | The imported module is unused. |
| mypy | `arg-type` at `greeting("three")` | The argument is text, but the parameter is annotated as an integer. |

The runner returns `1` when the checks complete with findings, `0` when both
complete without findings, and `2` when either cannot complete. These are this
runner's gate rules, not universal analyzer exit codes. Tool completion is
recorded separately from the gate in `run.json`.

## Check the correction

The corrected file removes the unused import and calls `greeting(3)`. Run the
same configuration against it:

```powershell
.\.venv\Scripts\python.exe run_checks.py good --output reports/good
```

Both reports should be clean for this fixture. The known defects and correction
show that the selected checks are active. They do not measure general defect
coverage or prove that the program meets every requirement.

## Adapt the recipe

Start with a small package in your project. Choose Ruff rules deliberately and
provide mypy with the correct imports and stubs. Record the source revision,
configuration, exclusions, and environment using the [run record](../run-record/).
Keep diagnostics separate; do not compare raw issue counts as measures of quality.

Use the [CI result-handling guide](../ci-checks/) to decide which completed
findings block a change and how to retain failed or incomplete runs.

## Sources

- [Ruff rule selection and exit behavior](https://docs.astral.sh/ruff/linter/)
- [Ruff 0.14.3 distribution](https://pypi.org/project/ruff/0.14.3/)
- [mypy 1.18.2 distribution](https://pypi.org/project/mypy/1.18.2/)
- [mypy file and import scope](https://mypy.readthedocs.io/en/stable/running_mypy.html)
