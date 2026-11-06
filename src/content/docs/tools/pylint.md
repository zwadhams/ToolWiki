---
title: "Pylint"
description: "Inspect Python source for selected programming mistakes, conventions, and maintainability issues."
tool:
  analysisWorkflows:
    - id: source
      label: Source analysis
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - Python
      findings:
        - Logic errors
        - Coding conventions
        - Code complexity
      caveat: Selected messages use syntax and inference. Dynamic attributes and unavailable dependencies
        can produce incomplete or misleading results.
      sources:
        - https://raw.githubusercontent.com/pylint-dev/pylint/main/README.rst
        - https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html
        - https://raw.githubusercontent.com/pylint-dev/pylint/main/LICENSE
      requires: []
  aliases: ["PyLint"]
  searchTerms: ["Python linter","unused variables","code smells","Python code quality"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Linting","Bug finding"]
  languages: ["Python"]
  languageNote: "Python source. Inference and framework behavior depend on the interpreter, dependencies, and configured plugins."
  targets: ["Python applications","Libraries"]
  findings: ["Logic errors","Coding conventions","Code complexity"]
  findingNote: "Selected messages use syntax and inference. Dynamic attributes and unavailable dependencies can produce incomplete or misleading results."
  environment: "A supported Python environment on a local machine or CI host."
  setup: "Install Pylint with project dependencies; choose modules or packages and configure enabled messages and plugins."
  license: "GPL-2.0; consult the repository notices for the selected release"
  costNote: "Free open-source analyzer; local checks require no paid service."
  website: "https://pylint.readthedocs.io/en/stable/"
  scope: "Core Pylint checks; third-party framework plugins have separate rules and requirements."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Purpose and installation"
      url: https://raw.githubusercontent.com/pylint-dev/pylint/main/README.rst
    - label: "Running Pylint"
      url: https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html
    - label: "License"
      url: https://raw.githubusercontent.com/pylint-dev/pylint/main/LICENSE
---

## Where it fits

Use Pylint when reviewing Python conventions and inferred code behavior. Compare its messages with [Ruff](../ruff/), and use [mypy](../mypy/) or [Pyright](../pyright/) for a dedicated type-checking workflow.

## Start with a small package

The official [installation guide](https://pylint.readthedocs.io/en/stable/user_guide/installation/command_line_installation.html)
and [run instructions](https://pylint.readthedocs.io/en/stable/user_guide/usage/run.html)
cover setup and configuration. For a first result on Windows, use Python 3.13
and Pylint 4.1.3 with the shared greeting example.

[Get the examples](../../guides/get-examples/), then enter the example directory
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
[Check Python linting and types together](../../guides/python-checks/).

## Interpret the result

Review individual diagnostic codes and locations. A summary score is not a measure of security or an accuracy benchmark. Missing dependencies, generated attributes, ignored messages, and plugin behavior can change what Pylint sees. Run application tests after code changes.
