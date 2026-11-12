---
title: mypy
description: Check Python types to find incompatible arguments, return values, and operations without running the program.
executionEvidence:
  status: recorded
  scope: "mypy 1.18.2 on Windows with Python 3.13.15 checked the single-file greeting fixture under its supplied strict configuration. The faulty fixture produced arg-type and exited 1; the corrected fixture exited 0. Target code was not executed. This does not establish runtime correctness, missing-dependency behavior, or results for other configurations and Python versions."
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json
tool:
  decision:
    useWhen: Check whether Python annotations, calls, and return values agree in a configured project.
    result: Diagnostics name the file, line, type mismatch, and error code, such as arg-type for an incompatible argument.
    limit: Any, missing stubs, untyped code, and suppressions can hide mistakes. A clean check does not validate runtime input or behavior.
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
      caveat: Checks type consistency in the analyzed code. Any, missing stubs, ignored errors, and
        untyped functions can reduce coverage; it does not prove runtime correctness.
      sources:
        - https://mypy.readthedocs.io/en/stable/
        - https://mypy.readthedocs.io/en/stable/getting_started.html
        - https://mypy.readthedocs.io/en/stable/running_mypy.html
        - https://mypy.readthedocs.io/en/stable/common_issues.html
        - https://github.com/python/mypy/blob/master/LICENSE
      requires: []
  aliases: [mypy type checker]
  searchTerms: [Python type checker, static typing, type hints, type annotations, gradual typing]
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Type checking]
  languages: [Python]
  languageNote: Python source and type stubs. Match the target Python version and platform settings to the project; these can differ from the interpreter running mypy.
  targets: [Python applications, Libraries, Type stubs]
  findings: [Type errors]
  findingNote: Checks type consistency in the analyzed code. Any, missing stubs, ignored errors, and untyped functions can reduce coverage; it does not prove runtime correctness.
  environment: A local or CI Python environment. The current getting-started guide requires Python 3.10 or later to run mypy.
  setup: Provide Python files, type annotations, configuration, and relevant dependencies or stubs. No application execution or test harness is required.
  licenseCategory: Open source
  license: MIT, with additional notices for bundled components
  cost: [Free]
  costNote: Free open-source type checker. Local use does not require a hosted service or paid analyzer edition.
  website: https://mypy.readthedocs.io/en/stable/
  verified: '2026-09-26'
  scope: The mypy command-line type checker and its documented gradual-typing workflow. This entry does not cover general security scanning or runtime type enforcement.
  sources:
    - label: Type checking and gradual typing
      url: https://mypy.readthedocs.io/en/stable/
    - label: Installation, annotations, and strictness
      url: https://mypy.readthedocs.io/en/stable/getting_started.html
    - label: Imports, stubs, and analysis scope
      url: https://mypy.readthedocs.io/en/stable/running_mypy.html
    - label: Missing errors and other limitations
      url: https://mypy.readthedocs.io/en/stable/common_issues.html
    - label: License and bundled notices
      url: https://github.com/python/mypy/blob/master/LICENSE
    - label: Pyright configuration for comparable checks
      url: https://github.com/microsoft/pyright/blob/main/docs/configuration.md
---

## Where it fits

Use mypy to check whether code uses the types described by annotations and stubs consistently. It complements [Ruff](../ruff/) for linting and [Bandit](../bandit/) for selected Python security patterns. A clean lint run is not a type-checking result.

Gradual typing lets a project adopt annotations in stages. By default, bodies of functions without annotations receive limited checking. `Any` and ignored imports can also let type mistakes pass unnoticed.

<span id="worked-example-an-incompatible-argument"></span>

## First try

**Illustrative example, not run here.** Follow the [mypy installation instructions](https://mypy.readthedocs.io/en/stable/getting_started.html) in your selected Python environment, then save this as `sample.py`:

```python
def next_count(count: int) -> int:
    return count + 1

next_count("three")
```

Check it without running the program:

```sh
python -m mypy sample.py
```

Representative diagnostic, not captured output (formatting varies by version):

```text
sample.py:4: error: Argument 1 to "next_count" has incompatible type "str"; expected "int" [arg-type]
```

`sample.py:4` locates the call. `arg-type` identifies an incompatible argument type: text was passed to an integer parameter. Replace the argument with `3` and check again. This example exercises one mismatch, not the entire type system. See the [argument-type diagnostic reference](https://mypy.readthedocs.io/en/stable/error_code_list.html#check-argument-types-arg-type) for details.

Use the [shared Ruff and mypy recipe](../../guides/python-checks/) for a pinned environment, faulty/corrected files, and separate reports.

## Configure a useful check

Supply the project's imports and any required third-party stubs. Start with a small annotated area, inspect errors, and tighten the configuration deliberately. `--check-untyped-defs` can inspect unannotated bodies, while `--strict` enables a broader set of checks.

Record the mypy version, configuration, target Python version, and suppressions. Static types do not validate arbitrary input data at runtime or replace application tests.

[Compare mypy, Ruff, and Bandit](../../compare/?tools=tools%2Fmypy%2Ctools%2Fruff%2Ctools%2Fbandit) to see their different roles.

## Compare Python type checkers

[Pyright](../pyright/) is another Python type checker. Both use annotations and stubs, but configuration, inference, diagnostics, and plugin support differ. For a useful trial, check the same revision with matching Python version, platform, imports, and intended strictness. Investigate disagreements instead of comparing diagnostic counts. Keep [mypy import and stub settings](https://mypy.readthedocs.io/en/stable/running_mypy.html) and [Pyright settings](https://github.com/microsoft/pyright/blob/main/docs/configuration.md) with the reports.

[Compare mypy and Pyright](../../compare/?tools=tools%2Fmypy%2Ctools%2Fpyright). Ruff remains complementary for lint rules; running two type checkers is a deliberate evaluation choice, not a requirement of the Python recipe.
