---
title: "Pylint"
description: "Inspect Python source for selected programming mistakes, conventions, and maintainability issues."
tool:
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

Run the documented module or package check in the project's Python environment. Inspect import resolution before suppressing diagnostics. Add configuration for conventions the project intentionally follows, and keep plugin choices explicit.

## Interpret the result

Review individual diagnostic codes and locations. A summary score is not a measure of security or an accuracy benchmark. Missing dependencies, generated attributes, ignored messages, and plugin behavior can change what Pylint sees. Run application tests after code changes.
