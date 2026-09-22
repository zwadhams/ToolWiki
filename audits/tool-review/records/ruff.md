# Ruff: evidence record

Access/review date: 2026-09-22. Existing scope: Ruff's Python linter, including documented notebook support. The formatter is separate functionality; Ruff is not a type checker.

File: `src/content/docs/tools/ruff.md`. Baseline SHA-256: `2dd5743ab71c1fecd43de52da5ff8d3c354807e26adef688a6327d89e8c6f22e`. Reviewed SHA-256: `c4dec4ecc0638d88fee0bacc9a2e73cc09baf5a9b81c1012f94f4a5ce092da9a`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Ruff analyzes Python, including supported notebook cells, rather than Rust source. Installation supports the listed platforms. The documented check/format distinction, configurable security rules, target Python version, preview rules, and safe/unsafe fixes support the notes. The FAQ distinguishes type checking and disallows arbitrary third-party lint rules. MIT licensing includes third-party notices; no required paid analyzer tier is documented.

Source sections: Overview; Installation; Linter: selection and fix safety; Configuration: discovery and notebooks; FAQ: type checkers and plugins; LICENSE

- [S1](https://docs.astral.sh/ruff/installation/)
- [S2](https://docs.astral.sh/ruff/)
- [S3](https://docs.astral.sh/ruff/linter/)
- [S4](https://docs.astral.sh/ruff/configuration/)
- [S5](https://docs.astral.sh/ruff/faq/)
- [S6](https://github.com/astral-sh/ruff/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":28,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Ruff | supported | See evidence assessment E1. |
| description | Find Python lint violations, common mistakes, and selected security patterns with configurable built-in rules. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | Python | supported | See evidence assessment E1. |
| tool.languageNote | Ruff analyzes Python source. Its implementation in Rust does not make it a Rust analyzer. Supported syntax and modernization suggestions depend on the configured Python target version. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.targets[1] | Notebooks | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT, with third-party notices in the project license file | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source linter and formatter, with no paid analyzer edition required. Editor integration and local checks do not require a hosted account. | supported | See evidence assessment E1. |
| tool.website | https://docs.astral.sh/ruff/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Ruff's Python linter, including documented notebook support. The formatter is separate functionality; Ruff is not a type checker. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Coding conventions | supported | See evidence assessment E1. |
| tool.findings[2] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findingNote | Selected lint families; security-related rules require configuration. Ruff is not a Python type checker. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS through supported binary distributions or Python packages. | supported | See evidence assessment E1. |
| tool.setup | Python source or supported notebooks plus configuration. No target build or runtime harness; linting and formatting are separate operations. | supported | See evidence assessment E1. |
| tool.sources[0] | Installation platforms: https://docs.astral.sh/ruff/installation/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Ruff overview: https://docs.astral.sh/ruff/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Linter configuration and fix safety: https://docs.astral.sh/ruff/linter/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | File discovery and notebook support: https://docs.astral.sh/ruff/configuration/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Ruff limitations and comparison with type checkers: https://docs.astral.sh/ruff/faq/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | Ruff license and third-party notices: https://github.com/astral-sh/ruff/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 39 | Ruff checks Python files and supported notebook cells against selected lint rules. Its rule families include unused imports, suspicious constructs, import organization, modernization, and selected security patterns. It implements many checks associated with other Python linting tools. | supported | See evidence assessment E1. |
| What it does, line 41 | The `check` operation performs linting. The formatter is a separate operation; formatting a file does not mean you have run its lint rules. | supported | See evidence assessment E1. |
| What it does not replace, line 45 | Ruff is not a Python type checker. Its documentation recommends combining linting with a type checker for deeper type errors. It also does not provide arbitrary third-party lint plugins in the same way as Flake8; a rule you used elsewhere may not have a Ruff equivalent. | supported | See evidence assessment E1. |
| What it does not replace, line 47 | Security-related rules must be selected deliberately. Their presence in the rule catalog does not mean they run by default or that Ruff provides whole-application security coverage. Compare [Bandit](../../../src/content/docs/tools/bandit.md) for a dedicated Python security-rule workflow. | supported | See evidence assessment E1. |
| Inputs and workflow, line 51 | Provide Python source or supported notebooks and configure the target Python version, file exclusions, and rule selection in the project's Ruff configuration. Findings carry rule identifiers and locations. The tool supports editor, command-line, and CI use. | supported | See evidence assessment E1. |
| Inputs and workflow, line 53 | Avoid assuming that every notebook cell has the same behavior as a standalone Python file; consult the documented notebook and rule restrictions when results differ. | supported | See evidence assessment E1. |
| Fixes and limitations, line 57 | Ruff distinguishes fixes intended to preserve behavior from unsafe fixes that can change it. Review proposed changes and run the project's tests when applying fixes. Preview rules and defaults may change, so record whether preview mode is enabled and pin the tool version for repeatable results. | supported | See evidence assessment E1. |
| A useful first evaluation, line 61 | Run the linter without applying fixes, inspect a few diagnostics, and select the rule families you want. Compare the result with your existing lint and type-checking configuration before replacing any part of that workflow. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
