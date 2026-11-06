---
title: "Pyright"
description: "Check Python types and imports using configurable static analysis."
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
        - Type errors
      caveat: Reports selected type and import problems. Unknown types, Any, exclusions, and diagnostic
        settings affect coverage.
      sources:
        - https://github.com/microsoft/pyright
        - https://raw.githubusercontent.com/microsoft/pyright/main/docs/command-line.md
        - https://raw.githubusercontent.com/microsoft/pyright/main/docs/configuration.md
        - https://raw.githubusercontent.com/microsoft/pyright/main/LICENSE.txt
      requires: []
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
    - label: Pinned CLI package requirements
      url: https://github.com/microsoft/pyright/blob/1.1.407/packages/pyright/package.json
---

## Where it fits

Pyright provides another Python type-checking workflow alongside [mypy](../mypy/). It complements [Ruff](../ruff/) linting; these tools answer different questions.

## First try

**Illustrative example; not executed here.** This path uses Pyright 1.1.407's
npm CLI with Node.js 24 and a Python 3.13 target. In a new example directory,
install the pinned checker locally:

```sh
npm install --save-dev pyright@1.1.407
```

Save `sample.py`:

```python
def double(value: int) -> int:
    return value * 2

double("two")
```

Save `pyrightconfig.json` beside it:

```json
{
  "include": ["sample.py"],
  "pythonVersion": "3.13",
  "typeCheckingMode": "strict"
}
```

Check the file without executing it:

```sh
npx --no-install pyright --project pyrightconfig.json
```

Expect an argument-type diagnostic at `double("two")`: a string does not fit
the integer parameter. Replace it with `double(2)` and repeat the command.
That diagnostic should disappear. Preserve the configuration and installed
checker version; diagnostic wording can change between releases.

The [pinned package metadata](https://github.com/microsoft/pyright/blob/1.1.407/packages/pyright/package.json)
and [CLI reference](https://github.com/microsoft/pyright/blob/main/docs/command-line.md)
describe installation requirements and invocation. This minimal file has no
third-party imports.

## Start with the project environment

Point Pyright at a small package. Configure the intended Python interpreter, target version and platform, dependencies, stubs, and import paths before interpreting missing-import or unknown-type messages. Choose a diagnostic mode deliberately and review its defaults.

## Interpret the result

Check both the analyzed-file scope and the diagnostic configuration. A clean result cannot establish runtime behavior or validate arbitrary external data. Keep the configuration and checker version with comparison results.

[Compare Pyright and mypy](../../compare/?tools=tools%2Fpyright%2Ctools%2Fmypy).
Use the [comparison guidance](../mypy/#compare-python-type-checkers) to align the
two checks' scope and investigate disagreements.
