---
title: Ruff
description: Find Python lint violations, common mistakes, and selected security patterns with configurable built-in rules.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Python]
  languageNote: Ruff analyzes Python source. Its implementation in Rust does not make it a Rust analyzer. Supported syntax and modernization suggestions depend on the configured Python target version.
  targets: [Source code, Notebooks]
  licenseCategory: Open source
  license: MIT, with third-party notices in the project license file
  cost: [Free]
  costNote: Free open-source linter and formatter, with no paid analyzer edition required. Editor integration and local checks do not require a hosted account.
  website: https://docs.astral.sh/ruff/
  verified: '2026-09-22'
  scope: Ruff's Python linter, including documented notebook support. The formatter is separate functionality; Ruff is not a type checker.
  findings: ["Logic errors","Coding conventions","Unsafe API use"]
  findingNote: "Selected lint families; security-related rules require configuration. Ruff is not a Python type checker."
  environment: "Windows, Linux, and macOS through supported binary distributions or Python packages."
  setup: "Python source or supported notebooks plus configuration. No target build or runtime harness; linting and formatting are separate operations."
  sources:
    - label: Installation platforms
      url: https://docs.astral.sh/ruff/installation/
    - label: Ruff overview
      url: https://docs.astral.sh/ruff/
    - label: Linter configuration and fix safety
      url: https://docs.astral.sh/ruff/linter/
    - label: File discovery and notebook support
      url: https://docs.astral.sh/ruff/configuration/
    - label: Ruff limitations and comparison with type checkers
      url: https://docs.astral.sh/ruff/faq/
    - label: Ruff license and third-party notices
      url: https://github.com/astral-sh/ruff/blob/main/LICENSE
---

## What it does

Ruff checks Python files and supported notebook cells against selected lint rules. Its rule families include unused imports, suspicious constructs, import organization, modernization, and selected security patterns. It implements many checks associated with other Python linting tools.

The `check` operation performs linting. The formatter is a separate operation; formatting a file does not mean you have run its lint rules.

## What it does not replace

Ruff is not a Python type checker. Its documentation recommends combining linting with a type checker for deeper type errors. It also does not provide arbitrary third-party lint plugins in the same way as Flake8; a rule you used elsewhere may not have a Ruff equivalent.

Security-related rules must be selected deliberately. Their presence in the rule catalog does not mean they run by default or that Ruff provides whole-application security coverage. Compare [Bandit](../bandit/) for a dedicated Python security-rule workflow.

## Inputs and workflow

Provide Python source or supported notebooks and configure the target Python version, file exclusions, and rule selection in the project's Ruff configuration. Findings carry rule identifiers and locations. The tool supports editor, command-line, and CI use.

Avoid assuming that every notebook cell has the same behavior as a standalone Python file; consult the documented notebook and rule restrictions when results differ.

## Fixes and limitations

Ruff distinguishes fixes intended to preserve behavior from unsafe fixes that can change it. Review proposed changes and run the project's tests when applying fixes. Preview rules and defaults may change, so record whether preview mode is enabled and pin the tool version for repeatable results.

## A useful first evaluation

Run the linter without applying fixes, inspect a few diagnostics, and select the rule families you want. Compare the result with your existing lint and type-checking configuration before replacing any part of that workflow.
