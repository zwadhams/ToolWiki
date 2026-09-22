# ESLint: evidence record

Access/review date: 2026-09-22. Existing scope: ESLint core linting and the official typescript-eslint integration; third-party security and framework plugins need their own coverage review.

File: `src/content/docs/tools/eslint.md`. Baseline SHA-256: `fe7e783a931ac762865825eed6f41f6e8622ff06593ac24441af87b46a8d316a`. Reviewed SHA-256: `aeab059611b0040381b570aec5f5065451d746d502a2c227a6a036a246e70dfc`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Core ESLint analyzes JavaScript through configured rules, while the TypeScript integration supplies parsing and additional rules. Typed presets require TypeScript project information and additional analysis work; installing only a parser does not enable these checks. Node and configuration prerequisites, editor/CLI/CI output, fixes and suggestions are documented. No general security-scanner capability is attributed to the default setup.

Source sections: Getting Started; Core concepts; Rules; typescript-eslint Getting Started and Typed Linting; MIT LICENSE

- [S1](https://eslint.org/docs/latest/use/getting-started)
- [S2](https://eslint.org/docs/latest/use/core-concepts/)
- [S3](https://eslint.org/docs/latest/rules/)
- [S4](https://typescript-eslint.io/getting-started/)
- [S5](https://typescript-eslint.io/getting-started/typed-linting/)
- [S6](https://github.com/eslint/eslint/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":26,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | ESLint | supported | See evidence assessment E1. |
| description | Apply configurable lint rules to JavaScript and, with typescript-eslint, TypeScript source. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[1] | TypeScript | supported | See evidence assessment E1. |
| tool.languageNote | JavaScript is the core language. TypeScript requires the typescript-eslint parser and rules; rules that use type information require additional configuration. Other plugin languages are outside this entry's scope. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT core; check the licenses of additional plugins | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source linter. The documented local JavaScript and typescript-eslint workflows require no paid ESLint plan. Optional support services and hosted CI are separate. | supported | See evidence assessment E1. |
| tool.website | https://eslint.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | ESLint core linting and the official typescript-eslint integration; third-party security and framework plugins need their own coverage review. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Configured core and plugin rules. TypeScript typed rules require type information; arbitrary security checks are not built into every setup. | supported | See evidence assessment E1. |
| tool.environment | A host supported by the required Node.js release, including standard Windows, Linux, and macOS workflows. | supported | See evidence assessment E1. |
| tool.setup | Source and ESLint configuration; TypeScript needs typescript-eslint, with project type information for typed rules. No executable target or runtime harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Runtime and configuration prerequisites: https://eslint.org/docs/latest/use/getting-started | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | ESLint core concepts and plugin model: https://eslint.org/docs/latest/use/core-concepts/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | ESLint rules: https://eslint.org/docs/latest/rules/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | TypeScript integration: https://typescript-eslint.io/getting-started/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Linting with TypeScript type information: https://typescript-eslint.io/getting-started/typed-linting/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | ESLint license: https://github.com/eslint/eslint/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 39 | ESLint parses source and runs configured rules to identify problematic code. Rules cover potential bugs, suspicious constructs, and coding conventions. Plugins add rules, parsers, or support for frameworks and other file types. | supported | See evidence assessment E1. |
| What it does, line 41 | It is a configurable linting system. Security plugins can add useful checks, but a default ESLint run is not equivalent to a full security analysis of an application. | supported | See evidence assessment E1. |
| JavaScript versus TypeScript, line 45 | \| Setup \| What it provides \|<br>\| --- \| --- \|<br>\| ESLint with its JavaScript parser \| JavaScript parsing and the enabled core or plugin rules. \|<br>\| ESLint with typescript-eslint \| TypeScript parsing and TypeScript-specific lint rules. \|<br>\| TypeScript setup with typed linting enabled \| Additional rules that use TypeScript's type information, with extra setup and analysis cost. \| | supported | See evidence assessment E1. |
| JavaScript versus TypeScript, line 51 | For example, the typescript-eslint rule set includes checks for incorrectly handled promises. The relevant rules require type information; adding a TypeScript parser alone does not enable them. | supported | See evidence assessment E1. |
| Inputs and results, line 55 | Provide source files and a compatible Node.js environment, then configure file patterns, language options, plugins, and rules. The current configuration workflow uses an ESLint configuration file; use guidance matching your installed major version. | supported | See evidence assessment E1. |
| Inputs and results, line 57 | Findings include rule names and source locations and can appear in the terminal, an editor, or a CI report. Some rules supply automatic fixes, while others supply suggestions for a developer to review. | supported | See evidence assessment E1. |
| A useful first evaluation, line 61 | Start with the recommended configuration for your language. For TypeScript, decide whether you need type-aware rules and configure them explicitly. Inspect which files and rules actually run before making lint failures block a build. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| A useful first evaluation, line 63 | Record plugin versions and suppressions. ESLint's capabilities depend strongly on that configuration, so two projects using ESLint may be performing different checks. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
