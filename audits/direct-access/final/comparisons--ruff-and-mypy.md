# Linting and type checking work together

Ruff checks lint rules, such as unused imports. mypy checks type consistency, such as passing text where a number is expected. Use both when you want both kinds of checks.

[Run the shared Python recipe](https://zwadhams.github.io/ToolWiki/guides/python-checks/).

[Customize this comparison](https://zwadhams.github.io/ToolWiki/compare/?tools=tools/ruff,tools/mypy).

## Requirements and results

Documentation comparison; shared labels do not establish equal checks or coverage.

| Field | [Ruff](https://zwadhams.github.io/ToolWiki/tools/ruff/) | [mypy](https://zwadhams.github.io/ToolWiki/tools/mypy/) |
| --- | --- | --- |
| Use it for | Use Ruff to check Python files for unused imports, common mistakes, and coding conventions. | Check whether Python annotations, calls, and return values agree in a configured project. |
| What you need | Python files or supported notebooks and an installed Ruff command. Choose the target Python version and rules for your project. | Provide Python files, type annotations, configuration, and relevant dependencies or stubs. No application execution or test harness is required. |
| What you get | Diagnostics with a rule code and file location. Some rules offer fixes you can review. | Diagnostics name the file, line, type mismatch, and error code, such as arg-type for an incompatible argument. |
| Checks and limits | Checks depend on the rules you enable. Security rules need deliberate selection; use a separate type checker for type consistency. | Any, missing stubs, untyped code, and suppressions can hide mistakes. A clean check does not validate runtime input or behavior. |
| Where it runs | Windows, Linux, and macOS through supported binary distributions or Python packages. | A local or CI Python environment. The current getting-started guide requires Python 3.10 or later to run mypy. |
| Cost conditions | Free open-source linter and formatter, with no paid analyzer edition required. Editor integration and local checks do not require a hosted account. | Free open-source type checker. Local use does not require a hosted service or paid analyzer edition. |
| Edition and scope | Ruff's Python linter, including documented notebook support. Formatting is a separate operation. | The mypy command-line type checker and its documented gradual-typing workflow. This entry does not cover general security scanning or runtime type enforcement. |

## Comparison sources and evidence

### Ruff

Docs checked 2026-09-22. Execution: recorded. Ruff 0.14.3 on Windows with Python 3.13.15 checked only F401 in the greeting fixture without fixes. The faulty input produced one unused-import diagnostic and exited 1; the correction produced an empty JSON report and exited 0. Target code was not executed, and this selected-rule example does not exercise the full rule set or formatter.

- [First lint check tutorial](https://docs.astral.sh/ruff/tutorial/)
- [Installation platforms](https://docs.astral.sh/ruff/installation/)
- [Ruff overview](https://docs.astral.sh/ruff/)
- [Linter configuration and fix safety](https://docs.astral.sh/ruff/linter/)
- [File discovery and notebook support](https://docs.astral.sh/ruff/configuration/)
- [Ruff limitations and comparison with type checkers](https://docs.astral.sh/ruff/faq/)
- [Ruff license and third-party notices](https://github.com/astral-sh/ruff/blob/main/LICENSE)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json)

### mypy

Docs checked 2026-09-26. Execution: recorded. mypy 1.18.2 on Windows with Python 3.13.15 checked the single-file greeting fixture under its supplied strict configuration. The faulty fixture produced arg-type and exited 1; the corrected fixture exited 0. Target code was not executed. This does not establish runtime correctness, missing-dependency behavior, or results for other configurations and Python versions.

- [Type checking and gradual typing](https://mypy.readthedocs.io/en/stable/)
- [Installation, annotations, and strictness](https://mypy.readthedocs.io/en/stable/getting_started.html)
- [Imports, stubs, and analysis scope](https://mypy.readthedocs.io/en/stable/running_mypy.html)
- [Missing errors and other limitations](https://mypy.readthedocs.io/en/stable/common_issues.html)
- [License and bundled notices](https://github.com/python/mypy/blob/master/LICENSE)
- [Pyright configuration for comparable checks](https://github.com/microsoft/pyright/blob/main/docs/configuration.md)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json)
- [Execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json)


Source: [ToolWiki page](https://zwadhams.github.io/ToolWiki/comparisons/ruff-and-mypy/). [JSON record and content revision](https://zwadhams.github.io/ToolWiki/knowledge/v1/documents/comparisons/ruff-and-mypy.json).

- **Documentation reviewed:** Not recorded
- **Execution evidence:** not-recorded
- **Execution scope:** No structured execution record for this document. Read the text for illustrative examples and limitations.

Documentation review is separate from execution evidence. A recorded execution applies only to its stated environment and scope; not-recorded means no structured execution record is supplied.
