# gosec: evidence record

Access/review date: 2026-09-22. Existing scope: Current gosec v2 documentation. Pin a release for repeatable checks; rule IDs and language requirements can change.

File: `src/content/docs/tools/gosec.md`. Baseline SHA-256: `3be8f358f2ad6616baa42b216774c3e67168eaf7e6078b8943976b7ec5c363a5`. Reviewed SHA-256: `c273c124b7b8be0e5ff1f260a2b833800ee7ae907814a28f4434ef4a7017757b`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The README specifies Go 1.25+, Go packages, build tags and dependency context. Pattern, SSA/value-flow and taint rule families support the stated security categories. JSON output and -out are documented; G402 covers the TLS example. Suppression/no-fail behavior cannot be interpreted as absence of findings. Apache-2.0 supports the free scanner classification. The dependency-advisory distinction and historical OCPP attribution remain appropriate.

Source sections: README: Features, Local Installation, Usage, Output formats, Build tags, suppressions; RULES: G2xx/G4xx/G7xx; LICENSE

- [S1](https://github.com/securego/gosec)
- [S2](https://github.com/securego/gosec/blob/master/RULES.md)
- [S3](https://github.com/securego/gosec/blob/master/LICENSE.txt)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | gosec | supported | See evidence assessment E1. |
| description | Inspect Go source for security problems using syntax, value-flow, and selected taint checks. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Pattern matching | supported | See evidence assessment E1. |
| tool.techniques[2] | Data flow analysis | supported | See evidence assessment E1. |
| tool.languages[0] | Go | supported | See evidence assessment E1. |
| tool.languageNote | Go packages and their supported build context. This does not inspect arbitrary executables compiled from Go. | supported | See evidence assessment E1. |
| tool.targets[0] | Go applications | supported | See evidence assessment E1. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findings[2] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Findings depend on the installed rule set, package loading, build tags, and suppressions. Security patterns and taint checks do not prove end-to-end exploitability. | supported | See evidence assessment E1. |
| tool.environment | Runs with a compatible Go toolchain and supported host. The current installation documentation requires Go 1.25 or newer; check the selected release. | supported | See evidence assessment E1. |
| tool.setup | Provide a loadable Go module or packages and their dependencies. Match build tags and dependency access to the intended build; tests and generated files have scan options. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free local scanner and project-maintained CI integration. No paid edition is required for the documented rule set. | supported | See evidence assessment E1. |
| tool.website | https://github.com/securego/gosec | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current gosec v2 documentation. Pin a release for repeatable checks; rule IDs and language requirements can change. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Installation, scanning, and result formats: https://github.com/securego/gosec | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Individual rule descriptions: https://github.com/securego/gosec/blob/master/RULES.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/securego/gosec/blob/master/LICENSE.txt | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Where it fits, line 33 | Use gosec alongside [Staticcheck](../../../src/content/docs/tools/staticcheck.md) when reviewing Go: their selected checks and intended emphasis differ. Start with the same module revision and build configuration so a comparison does not accidentally scan different packages. | supported | See evidence assessment E1. |
| Worked example: a module report, line 37 | **Illustrative workflow, not run here.** With a compatible Go toolchain and gosec installed, run in the module directory: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: a module report, line 39 | ```sh<br>gosec -fmt json -out gosec-results.json ./...<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: a module report, line 43 | Open `gosec-results.json` and inspect an issue's rule, severity, confidence, and code location. A useful trial is a small project containing a TLS client configured to skip certificate verification, followed by a corrected version. Treat any finding as something to investigate in the application's context. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Coverage and exclusions, line 47 | Confirm packages loaded successfully before interpreting a low issue count. Document build tags, selected rules, and exclusions with the result. An inline suppression can conceal a real problem if its scope is too broad. | supported | See evidence assessment E1. |
| Coverage and exclusions, line 49 | A nonzero exit can reflect findings or a processing error. A zero exit under a configured no-fail option is not evidence that the scan found nothing. These details matter when interpreting CI results. | supported | See evidence assessment E1. |
| Coverage and exclusions, line 51 | Dependency advisory matching is a separate job; see [OSV-Scanner](../../../src/content/docs/tools/osv-scanner.md). | supported | See evidence assessment E1. |
| Related research, line 55 | **Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used gosec as its Go-specific analyzer alongside SonarQube and Semgrep. The study examined one Go implementation and did not validate finding accuracy. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 57 | [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) explains why successful execution, rule scope, and project context matter when interpreting such counts. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
