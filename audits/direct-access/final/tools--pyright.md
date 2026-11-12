# Pyright

## Where it fits

Pyright provides another Python type-checking workflow alongside [mypy](https://zwadhams.github.io/ToolWiki/tools/mypy/). It complements [Ruff](https://zwadhams.github.io/ToolWiki/tools/ruff/) linting; these tools answer different questions.

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

[Compare Pyright and mypy](https://zwadhams.github.io/ToolWiki/compare/?tools=tools%2Fpyright%2Ctools%2Fmypy).
Use the [comparison guidance](https://zwadhams.github.io/ToolWiki/tools/mypy/#compare-python-type-checkers) to align the
two checks' scope and investigate disagreements.

- **Summary:** Check Python types and imports using configurable static analysis.
- **Use it for:** Check Python types and imports using configurable static analysis.
- **What you need:** Provide Python source, dependencies or stubs, and a pyrightconfig.json or pyproject.toml configuration.
- **Checks and limits:** Reports selected type and import problems. Unknown types, Any, exclusions, and diagnostic settings affect coverage.
- **Finding scope:** Reports selected type and import problems. Unknown types, Any, exclusions, and diagnostic settings affect coverage.

## Compatibility and scope

- **Also known as:** Pyright type checker
- **Analysis mode:** Static
- **What it examines:** Source code
- **Context:** Python applications, Type stubs, Libraries
- **Techniques:** Type checking
- **Finding categories:** Type errors
- **Where it runs:** Node.js command-line installation or the documented editor integration.
- **Languages / ecosystem:** Python
- **Language support:** Python code and stubs. Target Python versions, platforms, and import environments must match the project.
- **Edition and scope:** The open-source Pyright checker; Pylance-specific editor features are excluded.

## Cost and editions

- **Cost:** Free
- **Cost conditions:** Free open-source checker. Pylance is a separate editor product with its own scope and terms.
- **License category:** Open source
- **License:** MIT

Cost information checked 2026-09-26. Runtimes, hosting, and compute may cost extra. Free trials are not counted as free editions.

## Sources and evidence

[Official website](https://github.com/microsoft/pyright)

- [Project overview](https://github.com/microsoft/pyright)
- [Command-line usage](https://raw.githubusercontent.com/microsoft/pyright/main/docs/command-line.md)
- [Configuration and diagnostic settings](https://raw.githubusercontent.com/microsoft/pyright/main/docs/configuration.md)
- [License](https://raw.githubusercontent.com/microsoft/pyright/main/LICENSE.txt)
- [Pinned CLI package requirements](https://github.com/microsoft/pyright/blob/1.1.407/packages/pyright/package.json)

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/tools/pyright/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/pyright.json).

- **Documentation reviewed:** 2026-09-26
- **Execution evidence:** not-recorded
- **Execution scope:** No structured execution record for this document. Read the text for illustrative examples and limitations.

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
