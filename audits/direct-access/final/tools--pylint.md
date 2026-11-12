# Pylint

## Where it fits

Use Pylint when reviewing Python conventions and inferred code behavior. Compare its messages with [Ruff](https://zwadhams.github.io/ToolWiki/tools/ruff/), and use [mypy](https://zwadhams.github.io/ToolWiki/tools/mypy/) or [Pyright](https://zwadhams.github.io/ToolWiki/tools/pyright/) for a dedicated type-checking workflow.

## Start with a small package

The official [installation guide](https://pylint.readthedocs.io/en/stable/user_guide/installation/command_line_installation.html)
and [run instructions](https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html)
cover setup and configuration. For a first result on Windows, use Python 3.13
and Pylint 4.1.3 with the shared greeting example.

[Get the examples](https://zwadhams.github.io/ToolWiki/guides/get-examples/), then enter the example directory
from the downloaded repository's root and check your interpreter:

```powershell
Set-Location examples/python-checks
$Python = "python"
& $Python --version
```

Expect `Python 3.13.x`. If needed, set `$Python` to your installed Python 3.13
executable, such as `$Python = "C:\path\to\Python313\python.exe"`, and repeat
the check. Create the environment if you have not already created it for this
example, then install the pinned release:

```powershell
& $Python -m venv .venv
.\.venv\Scripts\python.exe -m pip install pylint==4.1.3
```

Check only `unused-import` (`W0611`) so the correction has one clear result:

```powershell
.\.venv\Scripts\python.exe -m pylint --rcfile=pyproject.toml --disable=all `
  --enable=unused-import --score=n --persistent=n bad/greeting.py
$LASTEXITCODE
```

Expect `W0611: Unused import math (unused-import)` and exit code `4`, indicating
a warning. The supplied correction removes that import. Check it with the same
options:

```powershell
.\.venv\Scripts\python.exe -m pylint --rcfile=pyproject.toml --disable=all `
  --enable=unused-import --score=n --persistent=n good/greeting.py
$LASTEXITCODE
```

Expect no diagnostics and exit code `0`. This is an isolated message check;
the explicit fixture config and command options keep its scope small. Normal
project configuration can enable other messages, including convention findings
on these same files. Pylint uses
[bit-encoded exit codes](https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html#exit-codes),
so inspect the diagnostics before classifying a nonzero result.

For your project, run a chosen module or package in an environment with its
dependencies and reviewed Pylint configuration. Inspect import resolution before
suppressing diagnostics, and keep plugin choices explicit. For complementary
lint and type checks with retained reports, follow
[Check Python linting and types together](https://zwadhams.github.io/ToolWiki/guides/python-checks/).

## Interpret the result

Review individual diagnostic codes and locations. A summary score is not a measure of security or an accuracy benchmark. Missing dependencies, generated attributes, ignored messages, and plugin behavior can change what Pylint sees. Run application tests after code changes.

- **Summary:** Inspect Python source for selected programming mistakes, conventions, and maintainability issues.
- **Use it for:** Inspect Python source for selected programming mistakes, conventions, and maintainability issues.
- **What you need:** Install Pylint with project dependencies; choose modules or packages and configure enabled messages and plugins.
- **Checks and limits:** Selected messages use syntax and inference. Dynamic attributes and unavailable dependencies can produce incomplete or misleading results.
- **Finding scope:** Selected messages use syntax and inference. Dynamic attributes and unavailable dependencies can produce incomplete or misleading results.

## Compatibility and scope

- **Also known as:** PyLint
- **Analysis mode:** Static
- **What it examines:** Source code
- **Context:** Python applications, Libraries
- **Techniques:** Linting, Bug finding
- **Finding categories:** Logic errors, Coding conventions, Code complexity
- **Where it runs:** A supported Python environment on a local machine or CI host.
- **Languages / ecosystem:** Python
- **Language support:** Python source. Inference and framework behavior depend on the interpreter, dependencies, and configured plugins.
- **Edition and scope:** Core Pylint checks; third-party framework plugins have separate rules and requirements.

## Cost and editions

- **Cost:** Free
- **Cost conditions:** Free open-source analyzer; local checks require no paid service.
- **License category:** Open source
- **License:** GPL-2.0; consult the repository notices for the selected release

Cost information checked 2026-09-26. Runtimes, hosting, and compute may cost extra. Free trials are not counted as free editions.

## Sources and evidence

[Official website](https://pylint.readthedocs.io/en/stable/)

- [Purpose and installation](https://raw.githubusercontent.com/pylint-dev/pylint/main/README.rst)
- [Running Pylint](https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html)
- [License](https://raw.githubusercontent.com/pylint-dev/pylint/main/LICENSE)

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/tools/pylint/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/pylint.json).

- **Documentation reviewed:** 2026-09-26
- **Execution evidence:** recorded
- **Execution scope:** The retained fresh-reader report records Pylint 4.1.3 on Windows with Python 3.13.15 checking only unused-import in the greeting fixtures. It reports W0611 and exit 4 for the faulty input, then no diagnostic and exit 0 for the correction; the retained script and transcript confirm the selected rule and exit codes. This was not a run of the full default rule set or a runtime test.
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/reader-workflows/retests/python/report.md)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/reader-workflows/retests/python/pylint-inline.ps1)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/reader-workflows/retests/python/pylint-inline.txt)

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
