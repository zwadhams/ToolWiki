# mypy

## Where it fits

Use mypy to check whether code uses the types described by annotations and stubs consistently. It complements [Ruff](https://zwadhams.github.io/ToolWiki/tools/ruff/) for linting and [Bandit](https://zwadhams.github.io/ToolWiki/tools/bandit/) for selected Python security patterns. A clean lint run is not a type-checking result.

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

Use the [shared Ruff and mypy recipe](https://zwadhams.github.io/ToolWiki/guides/python-checks/) for a pinned environment, faulty/corrected files, and separate reports.

## Configure a useful check

Supply the project's imports and any required third-party stubs. Start with a small annotated area, inspect errors, and tighten the configuration deliberately. `--check-untyped-defs` can inspect unannotated bodies, while `--strict` enables a broader set of checks.

Record the mypy version, configuration, target Python version, and suppressions. Static types do not validate arbitrary input data at runtime or replace application tests.

[Compare mypy, Ruff, and Bandit](https://zwadhams.github.io/ToolWiki/compare/?tools=tools%2Fmypy%2Ctools%2Fruff%2Ctools%2Fbandit) to see their different roles.

## Compare Python type checkers

[Pyright](https://zwadhams.github.io/ToolWiki/tools/pyright/) is another Python type checker. Both use annotations and stubs, but configuration, inference, diagnostics, and plugin support differ. For a useful trial, check the same revision with matching Python version, platform, imports, and intended strictness. Investigate disagreements instead of comparing diagnostic counts. Keep [mypy import and stub settings](https://mypy.readthedocs.io/en/stable/running_mypy.html) and [Pyright settings](https://github.com/microsoft/pyright/blob/main/docs/configuration.md) with the reports.

[Compare mypy and Pyright](https://zwadhams.github.io/ToolWiki/compare/?tools=tools%2Fmypy%2Ctools%2Fpyright). Ruff remains complementary for lint rules; running two type checkers is a deliberate evaluation choice, not a requirement of the Python recipe.

- **Summary:** Check Python types to find incompatible arguments, return values, and operations without running the program.
- **Use it for:** Check whether Python annotations, calls, and return values agree in a configured project.
- **What you need:** Provide Python files, type annotations, configuration, and relevant dependencies or stubs. No application execution or test harness is required.
- **What you get:** Diagnostics name the file, line, type mismatch, and error code, such as arg-type for an incompatible argument.
- **Checks and limits:** Any, missing stubs, untyped code, and suppressions can hide mistakes. A clean check does not validate runtime input or behavior.
- **Finding scope:** Checks type consistency in the analyzed code. Any, missing stubs, ignored errors, and untyped functions can reduce coverage; it does not prove runtime correctness.

## Compatibility and scope

- **Also known as:** mypy type checker
- **Analysis mode:** Static
- **What it examines:** Source code
- **Context:** Python applications, Libraries, Type stubs
- **Techniques:** Type checking
- **Finding categories:** Type errors
- **Where it runs:** A local or CI Python environment. The current getting-started guide requires Python 3.10 or later to run mypy.
- **Languages / ecosystem:** Python
- **Language support:** Python source and type stubs. Match the target Python version and platform settings to the project; these can differ from the interpreter running mypy.
- **Edition and scope:** The mypy command-line type checker and its documented gradual-typing workflow. This entry does not cover general security scanning or runtime type enforcement.

## Cost and editions

- **Cost:** Free
- **Cost conditions:** Free open-source type checker. Local use does not require a hosted service or paid analyzer edition.
- **License category:** Open source
- **License:** MIT, with additional notices for bundled components

Cost information checked 2026-09-26. Runtimes, hosting, and compute may cost extra. Free trials are not counted as free editions.

## Sources and evidence

[Official website](https://mypy.readthedocs.io/en/stable/)

- [Type checking and gradual typing](https://mypy.readthedocs.io/en/stable/)
- [Installation, annotations, and strictness](https://mypy.readthedocs.io/en/stable/getting_started.html)
- [Imports, stubs, and analysis scope](https://mypy.readthedocs.io/en/stable/running_mypy.html)
- [Missing errors and other limitations](https://mypy.readthedocs.io/en/stable/common_issues.html)
- [License and bundled notices](https://github.com/python/mypy/blob/master/LICENSE)
- [Pyright configuration for comparable checks](https://github.com/microsoft/pyright/blob/main/docs/configuration.md)

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/tools/mypy/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/mypy.json).

- **Documentation reviewed:** 2026-09-26
- **Execution evidence:** recorded
- **Execution scope:** mypy 1.18.2 on Windows with Python 3.13.15 checked the single-file greeting fixture under its supplied strict configuration. The faulty fixture produced arg-type and exited 1; the corrected fixture exited 0. Target code was not executed. This does not establish runtime correctness, missing-dependency behavior, or results for other configurations and Python versions.
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json)

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
