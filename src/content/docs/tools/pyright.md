---
title: "Pyright"
description: "Check Python types and imports using configurable static analysis."
tool:
  aliases: ["Pyright type checker"]
  searchTerms: ["Python type checker","type hints","type annotations","static typing"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Type checking"]
  languages: ["Python"]
  languageNote: "Python code and stubs. Target Python versions, platforms, and import environments must match the project."
  targets: ["Python applications","Type stubs","Libraries"]
  findings: ["Type errors"]
  findingNote: "Reports selected type and import problems. Unknown types, Any, exclusions, and diagnostic settings affect coverage."
  environment: "Node.js command-line installation or the documented editor integration."
  setup: "Provide Python source, dependencies or stubs, and a pyrightconfig.json or pyproject.toml configuration."
  license: "MIT"
  costNote: "Free open-source checker. Pylance is a separate editor product with its own scope and terms."
  website: "https://github.com/microsoft/pyright"
  scope: "The open-source Pyright checker; Pylance-specific editor features are excluded."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Project overview"
      url: https://github.com/microsoft/pyright
    - label: "Command-line usage"
      url: https://raw.githubusercontent.com/microsoft/pyright/main/docs/command-line.md
    - label: "Configuration and diagnostic settings"
      url: https://raw.githubusercontent.com/microsoft/pyright/main/docs/configuration.md
    - label: "License"
      url: https://raw.githubusercontent.com/microsoft/pyright/main/LICENSE.txt
---

## Where it fits

Pyright provides another Python type-checking workflow alongside [mypy](../mypy/). It complements [Ruff](../ruff/) linting; these tools answer different questions.

## Start with the project environment

Use the documented CLI installation and point Pyright at a small package. Configure the intended Python interpreter, target version, and import paths before interpreting missing-import or unknown-type messages. Choose a diagnostic mode deliberately and review its defaults.

## Interpret the result

Check both the analyzed-file scope and the diagnostic configuration. A clean result cannot establish runtime behavior or validate arbitrary external data. Keep the configuration and checker version with comparison results.

[Compare Pyright and mypy](../../compare/?tools=tools%2Fpyright%2Ctools%2Fmypy).
