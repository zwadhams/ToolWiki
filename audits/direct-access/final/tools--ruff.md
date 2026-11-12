# Ruff

<span id="what-it-does"></span> <span id="a-useful-first-evaluation"></span>

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

Follow the [Ruff and mypy recipe](https://zwadhams.github.io/ToolWiki/guides/python-checks/) to check one project with separate lint and type reports. Pair Ruff with [mypy](https://zwadhams.github.io/ToolWiki/tools/mypy/) or [Pyright](https://zwadhams.github.io/ToolWiki/tools/pyright/) when you also need type checking. Consider [Bandit](https://zwadhams.github.io/ToolWiki/tools/bandit/) for a dedicated Python security-rule workflow.

[Pylint](https://zwadhams.github.io/ToolWiki/tools/pylint/) uses inference and supports plugins; Ruff provides built-in rule families. Their rules overlap but are not interchangeable. Before switching, compare the diagnostics and plugin requirements of your project. The [official comparison](https://docs.astral.sh/ruff/faq/#how-does-ruffs-linter-compare-to-pylint) explains these differences.

Use the [finding review workflow](https://zwadhams.github.io/ToolWiki/guides/reviewing-findings/) to investigate a diagnostic and verify a correction.

- **Summary:** Find Python lint violations, common mistakes, and selected security patterns with configurable built-in rules.
- **Use it for:** Use Ruff to check Python files for unused imports, common mistakes, and coding conventions.
- **What you need:** Python files or supported notebooks and an installed Ruff command. Choose the target Python version and rules for your project.
- **What you get:** Diagnostics with a rule code and file location. Some rules offer fixes you can review.
- **Checks and limits:** Checks depend on the rules you enable. Security rules need deliberate selection; use a separate type checker for type consistency.
- **Finding scope:** Selected lint families; security-related rules require configuration. Ruff is not a Python type checker.

## Compatibility and scope

- **Analysis mode:** Static
- **What it examines:** Source code
- **Context:** Source code, Notebooks
- **Techniques:** Linting, Bug finding
- **Finding categories:** Logic errors, Coding conventions, Unsafe API use
- **Where it runs:** Windows, Linux, and macOS through supported binary distributions or Python packages.
- **Languages / ecosystem:** Python
- **Language support:** Supported syntax and modernization suggestions depend on the configured Python target version. Notebook rules have additional restrictions.
- **Edition and scope:** Ruff's Python linter, including documented notebook support. Formatting is a separate operation.

## Cost and editions

- **Cost:** Free
- **Cost conditions:** Free open-source linter and formatter, with no paid analyzer edition required. Editor integration and local checks do not require a hosted account.
- **License category:** Open source
- **License:** MIT, with third-party notices in the project license file

Cost information checked 2026-09-22. Runtimes, hosting, and compute may cost extra. Free trials are not counted as free editions.

## Sources and evidence

[Official website](https://docs.astral.sh/ruff/)

- [First lint check tutorial](https://docs.astral.sh/ruff/tutorial/)
- [Installation platforms](https://docs.astral.sh/ruff/installation/)
- [Ruff overview](https://docs.astral.sh/ruff/)
- [Linter configuration and fix safety](https://docs.astral.sh/ruff/linter/)
- [File discovery and notebook support](https://docs.astral.sh/ruff/configuration/)
- [Ruff limitations and comparison with type checkers](https://docs.astral.sh/ruff/faq/)
- [Ruff license and third-party notices](https://github.com/astral-sh/ruff/blob/main/LICENSE)

Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/tools/ruff/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/tools/ruff.json).

- **Documentation reviewed:** 2026-09-22
- **Execution evidence:** recorded
- **Execution scope:** Ruff 0.14.3 on Windows with Python 3.13.15 checked only F401 in the greeting fixture without fixes. The faulty input produced one unused-import diagnostic and exited 1; the correction produced an empty JSON report and exited 0. Target code was not executed, and this selected-rule example does not exercise the full rule set or formatter.
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json)

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
