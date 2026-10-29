---
title: Ruff
description: Find Python lint violations, common mistakes, and selected security patterns with configurable built-in rules.
tool:
  decision:
    useWhen: Use Ruff to check Python files for unused imports, common mistakes, and coding conventions.
    result: Diagnostics with a rule code and file location. Some rules offer fixes you can review.
    limit: Checks depend on the rules you enable. Security rules need deliberate selection; use a separate type checker for type consistency.
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
        - Unsafe API use
      caveat: Selected lint families; security-related rules require configuration. Ruff is not a Python
        type checker.
      sources:
        - https://docs.astral.sh/ruff/installation/
        - https://docs.astral.sh/ruff/
        - https://docs.astral.sh/ruff/linter/
        - https://docs.astral.sh/ruff/configuration/
        - https://docs.astral.sh/ruff/faq/
        - https://github.com/astral-sh/ruff/blob/main/LICENSE
      requires: []
      hostPlatforms:
        - Windows
        - Linux
        - macOS
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Python]
  languageNote: Supported syntax and modernization suggestions depend on the configured Python target version. Notebook rules have additional restrictions.
  targets: [Source code, Notebooks]
  licenseCategory: Open source
  license: MIT, with third-party notices in the project license file
  cost: [Free]
  costNote: Free open-source linter and formatter, with no paid analyzer edition required. Editor integration and local checks do not require a hosted account.
  website: https://docs.astral.sh/ruff/
  verified: '2026-09-22'
  scope: Ruff's Python linter, including documented notebook support. Formatting is a separate operation.
  findings: ["Logic errors","Coding conventions","Unsafe API use"]
  findingNote: "Selected lint families; security-related rules require configuration. Ruff is not a Python type checker."
  environment: "Windows, Linux, and macOS through supported binary distributions or Python packages."
  setup: "Python files or supported notebooks and an installed Ruff command. Choose the target Python version and rules for your project."
  sources:
    - label: First lint check tutorial
      url: https://docs.astral.sh/ruff/tutorial/
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

<span id="what-it-does"></span>
<span id="a-useful-first-evaluation"></span>

## First try

**Illustrative example; not executed in this review.** [Install Ruff](https://docs.astral.sh/ruff/installation/), then save this as `sample.py`:

```python
import math

print("Ready")
```

Run this in the directory containing the file. It checks for unused imports without changing the file or loading project configuration:

```sh
ruff check --isolated --select F401 sample.py
```

Representative diagnostic excerpt, not captured output (formatting varies by version):

```text
sample.py:1:8: F401 `math` imported but unused
```

The location identifies the import; `F401` identifies the unused-import rule. Remove that line and repeat the check. A clean result means this selected rule found no violation in this file.

<span id="inputs-and-workflow"></span>

## Use it on your project

Follow the [Ruff tutorial](https://docs.astral.sh/ruff/tutorial/) to configure rule selection, file exclusions, and the target Python version. Run `ruff check` for linting; `ruff format` only formats code. Start without automatic fixes so you can inspect the diagnostics.

## Fixes and limitations

Ruff distinguishes safe and unsafe fixes. Review proposed changes and run your tests after applying them. Record the tool version, configuration, and preview setting for repeatable results.

<span id="what-it-does-not-replace"></span>

## Alternatives and complements

Pair Ruff with [mypy](../mypy/) or [Pyright](../pyright/) when you also need type checking. Consider [Bandit](../bandit/) for a dedicated Python security-rule workflow.

[Pylint](../pylint/) uses inference and supports plugins; Ruff provides built-in rule families. Their rules overlap but are not interchangeable. Before switching, compare the diagnostics and plugin requirements of your project. The [official comparison](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-pylint) explains these differences.
