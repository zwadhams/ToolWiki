# Check Python linting and types together

[Ruff](https://zwadhams.github.io/ToolWiki/tools/ruff/) and [mypy](https://zwadhams.github.io/ToolWiki/tools/mypy/) answer different questions.
This recipe gives both the same fixture: an unused import and a call that passes
text to an integer parameter. Ruff checks only `F401`; mypy checks the annotated
call. Neither runs the target program.

Start with [Get the examples](https://zwadhams.github.io/ToolWiki/guides/get-examples/) to download or clone the
repository. From the downloaded repository's root, enter the fixture directory:

```powershell
Set-Location examples/python-checks
```

[`examples/python-checks`](https://github.com/zwadhams/ToolWiki/tree/main/examples/python-checks)
contains `bad/greeting.py`, the corrected `good/greeting.py`, a shared
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

On Windows, select an interpreter and check it before creating the environment:

```powershell
$Python = "python"
& $Python --version
```

Expect `Python 3.13.x`. If that command is missing or reports another version,
set `$Python` to your Python 3.13 executable, such as
`$Python = "C:\path\to\Python313\python.exe"`, and repeat the check.
Continue from `examples/python-checks` once the version matches:

```powershell
& $Python -m venv .venv
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

| Tool | Expected finding                  | Meaning                                                             |
| ---- | --------------------------------- | ------------------------------------------------------------------- |
| Ruff | `F401` for `math`                 | The imported module is unused.                                      |
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

<a id="adapt-the-recipe"></a>

## Use it on your project

`run_checks.py` accepts only `bad` and `good`; it is a demonstration runner.
For your code, run the tools directly. From `examples/python-checks`, keep the
checker interpreter's absolute path, then enter your project's root:

```powershell
$CheckPython = (Resolve-Path .\.venv\Scripts\python.exe).Path
Set-Location "C:\path\to\YOUR_PROJECT"
```

Replace `C:\path\to\YOUR_PROJECT` with your project directory. Use its existing
analyzer configuration. If it has none, add these tables to its root
`pyproject.toml`, creating the file only if absent. Merge settings into any
existing tables instead of replacing the file:

```toml
[tool.ruff]
target-version = "py313"

[tool.ruff.lint]
select = ["E4", "E7", "E9", "F"]

[tool.mypy]
python_version = "3.13"
strict = true
show_error_codes = true
pretty = false
```

Match both target-version settings to the Python version your project supports.
The fixture selects only `F401`; this starting selection adds other Pyflakes
and selected pycodestyle checks. Review the
[Ruff configuration](https://docs.astral.sh/ruff/configuration/) for your project.
If your settings live in `ruff.toml` or `mypy.ini`, use those paths in the
corresponding config arguments below.

The checker environment needs access to your project's dependencies and type
stubs. Install the project's declared dependencies and needed stub packages in
that environment, or use a project environment with the checkers installed by
setting `$CheckPython` to its interpreter. Resolve
[missing imports and stubs](https://mypy.readthedocs.io/en/stable/running_mypy.html#missing-imports)
before treating a clean result as useful type coverage.

Choose one small source directory and a new report directory for this run:

```powershell
$Target = ".\src\YOUR_PACKAGE"
$Reports = ".\check-reports\first-run"
New-Item -ItemType Directory -Path $Reports -ErrorAction Stop | Out-Null

& $CheckPython -m ruff check --no-fix --no-cache --config pyproject.toml `
  --output-format json $Target > "$Reports\ruff.json" 2> "$Reports\ruff.stderr.txt"
$RuffExit = $LASTEXITCODE
$RuffExit | Set-Content "$Reports\ruff.exit.txt"

& $CheckPython -m mypy --no-incremental --cache-dir "$Reports\mypy-cache" `
  --config-file pyproject.toml $Target > "$Reports\mypy.txt" 2> "$Reports\mypy.stderr.txt"
$MypyExit = $LASTEXITCODE
$MypyExit | Set-Content "$Reports\mypy.exit.txt"
```

Replace `src\YOUR_PACKAGE` with the directory you want checked. Use a different
`$Reports` path for every run; stop if directory creation fails. These commands
make no automatic source fixes. Read `ruff.json`, `mypy.txt`, and both stderr
files with their separate exit codes. Ruff returns `0` for no findings, `1` for
findings, and `2` for a failed run. A completed mypy run reports either success
or a diagnostic summary; an empty report or a setup error is not a clean result.

Review and correct findings, then repeat with a new report directory. Record
the source revision, selected configuration, exclusions, and environment using
the [run record](https://zwadhams.github.io/ToolWiki/guides/run-record/). Keep diagnostics separate; do not compare raw
issue counts as measures of quality.

Use the [CI result-handling guide](https://zwadhams.github.io/ToolWiki/guides/ci-checks/) to decide which completed
findings block a change and how to retain failed or incomplete runs.

## Sources

- [Python virtual environments](https://docs.python.org/3.13/library/venv.html)
- [Ruff rule selection and exit behavior](https://docs.astral.sh/ruff/linter/)
- [Ruff 0.14.3 distribution](https://pypi.org/project/ruff/0.14.3/)
- [mypy 1.18.2 distribution](https://pypi.org/project/mypy/1.18.2/)
- [mypy file and import scope](https://mypy.readthedocs.io/en/stable/running_mypy.html)

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/guides/python-checks/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/guides/python-checks.json).

- **Documentation reviewed:** Not recorded
- **Execution evidence:** recorded
- **Execution scope:** Windows with Python 3.13.15, Ruff 0.14.3 and mypy 1.18.2; selected findings in faulty and corrected examples. Other hosts were not executed.
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/examples/python-checks/evidence.md)

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
