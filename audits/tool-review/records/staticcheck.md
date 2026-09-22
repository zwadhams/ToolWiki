# Staticcheck: evidence record

Access/review date: 2026-09-22. Existing scope: Standalone Staticcheck and its documented checks; distinct from Go's built-in vet command or a wrapper that aggregates multiple linters.

File: `src/content/docs/tools/staticcheck.md`. Baseline SHA-256: `d0d69bb3debfa0ad46a9a58750f284c28da05d90351af262fd336a5269ba0755`. Reviewed SHA-256: `80ef85f34f481ee9d6e7a37df3877f86743049f5432bbd52c4b8b94a01c5f4a6`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The Go package workflow supports build tags, selected packages, Go-version settings, diagnostics and suppressions. The checks index distinguishes SA correctness, S simplification, ST style and U unused-code checks. Pattern-based performance advice is not profiling. The project states that the tool is free and sponsor-supported. The MIT license and package/build requirements support the metadata.

Source sections: Documentation overview; Getting Started; Command-line interface; Configuration; Checks index; MIT LICENSE

- [S1](https://staticcheck.dev/docs/getting-started/)
- [S2](https://staticcheck.dev/docs/)
- [S3](https://staticcheck.dev/docs/running-staticcheck/cli/)
- [S4](https://staticcheck.dev/docs/checks/)
- [S5](https://staticcheck.dev/docs/configuration/)
- [S6](https://github.com/dominikh/go-tools/blob/master/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Staticcheck | supported | See evidence assessment E1. |
| description | Detect Go bugs, suspicious API use, simplification opportunities, and performance-related code issues. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | Go | supported | See evidence assessment E1. |
| tool.languageNote | Go source packages. The Go version, build tags, target platform, and loaded package set affect which code is analyzed. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The project offers Staticcheck free of charge as open-source software. Sponsorship supports development; it does not unlock a required paid analysis tier. | supported | See evidence assessment E1. |
| tool.website | https://staticcheck.dev/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Standalone Staticcheck and its documented checks; distinct from Go's built-in vet command or a wrapper that aggregates multiple linters. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Selected Go correctness, simplification, and style checks; performance patterns are not runtime profiling measurements. | supported | See evidence assessment E1. |
| tool.environment | A supported Go toolchain host; prebuilt packages and the selected Go release determine platform compatibility. | supported | See evidence assessment E1. |
| tool.setup | A loadable/buildable Go package set, dependencies, and correct build tags. No runtime test harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Installation requirements: https://staticcheck.dev/docs/getting-started/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Staticcheck overview and free availability: https://staticcheck.dev/docs/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Running Staticcheck and selecting packages: https://staticcheck.dev/docs/running-staticcheck/cli/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Check descriptions: https://staticcheck.dev/docs/checks/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Configuration and Go version settings: https://staticcheck.dev/docs/configuration/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | Staticcheck license: https://github.com/dominikh/go-tools/blob/master/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 39 | Staticcheck analyzes Go packages to flag likely bugs and questionable code. Its check families include correctness checks, simplifications, style checks, and unused-code detection. Examples include ineffective operations, incorrect use of standard-library APIs, and code that can be simplified. | supported | See evidence assessment E1. |
| What it does, line 41 | Performance-related diagnostics point to code patterns; they are not runtime profiling or measurements of a program's actual latency. | supported | See evidence assessment E1. |
| Inputs and workflow, line 45 | Provide a buildable Go project with dependencies available to the Go toolchain. The command accepts package patterns like the Go tools do. Configure the target Go version and relevant build tags, and choose the package set you intend to check. | supported | See evidence assessment E1. |
| Inputs and workflow, line 47 | Findings carry a check identifier, source location, and explanation. The command can run locally, in CI, or through editor integrations. Use the individual check documentation to understand the condition behind a diagnostic. | supported | See evidence assessment E1. |
| Scope and limitations, line 51 | Code excluded by a platform setting or build tag needs a corresponding analysis configuration if you want it checked. A run for one build configuration does not cover every possible build. | supported | See evidence assessment E1. |
| Scope and limitations, line 53 | Some checks concern style or simplification; others indicate correctness problems. Their identifiers and descriptions help distinguish those cases. Use narrow suppressions when a finding is inapplicable, and preserve the explanation for future reviewers. | supported | See evidence assessment E1. |
| A useful first evaluation, line 57 | Run Staticcheck alongside the Go toolchain's existing checks on a representative package set. Resolve package-loading or build errors, review the most relevant findings, and choose which checks should fail CI. Record the analyzer version, Go version, build tags, and package selection so future results are comparable. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
