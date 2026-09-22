# PMD: evidence record

Access/review date: 2026-09-22. Existing scope: PMD 7.27.0 rule analysis. CPD is described for comparison but is not the language scope of this catalog entry.

File: `src/content/docs/tools/pmd.md`. Baseline SHA-256: `c4dc08757938fec4185df7264f742e35f356edf2ca3681e195a7c211d9b705e8`. Reviewed SHA-256: `d73f2e1f7a7ad6077383262374f26e4af7a7d3a1bd6902153484452e7c948fb8`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The homepage and 7.27.0 rule reference support each listed rule-analysis language. Scala has parser support but no supplied rules; C++ belongs to CPD and is correctly excluded. Java/XPath extensions, auxiliary classpaths and CLI/build integrations are documented. Java runtime requirements and Windows/Linux/macOS routes are explicit. The BSD-style license includes an acknowledgment clause and additional Apache components.

Source sections: PMD 7.27.0 homepage and documentation index; Installation and basic CLI usage; license

- [S1](https://pmd.github.io/)
- [S2](https://docs.pmd-code.org/latest/)
- [S3](https://docs.pmd-code.org/latest/pmd_userdocs_installation.html)
- [S4](https://github.com/pmd/pmd/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":35,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | PMD | supported | See evidence assessment E1. |
| description | Apply language-specific rules to find coding defects and maintainability problems across several source languages. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Linting | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | Java | supported | See evidence assessment E1. |
| tool.languages[1] | Apex | supported | See evidence assessment E1. |
| tool.languages[2] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[3] | Kotlin | supported | See evidence assessment E1. |
| tool.languages[4] | Swift | supported | See evidence assessment E1. |
| tool.languages[5] | Modelica | supported | See evidence assessment E1. |
| tool.languages[6] | PL/SQL | supported | See evidence assessment E1. |
| tool.languages[7] | HTML | supported | See evidence assessment E1. |
| tool.languages[8] | XML | supported | See evidence assessment E1. |
| tool.languages[9] | Visualforce | supported | See evidence assessment E1. |
| tool.languages[10] | JSP | supported | See evidence assessment E1. |
| tool.languageNote | Selected languages with documented PMD rule support. The bundled CPD duplicate-code detector has a different, broader language list; its languages are not inherited by these rule-analysis tags. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-style license with an acknowledgment clause; additional Apache-2.0 components | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source analyzer and bundled CPD utility. Local use and CI do not require a PMD subscription. Build infrastructure costs are separate. | supported | See evidence assessment E1. |
| tool.website | https://pmd.github.io/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | PMD 7.27.0 rule analysis. CPD is described for comparison but is not the language scope of this catalog entry. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[1] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Language-specific rules only. CPD duplication support does not imply defect-rule support for the same language. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, or macOS with the supported Java runtime; CLI and build-plugin prerequisites vary. | supported | See evidence assessment E1. |
| tool.setup | Source and a ruleset; Java type resolution may need dependency classpaths. No runtime harness or executed target. | supported | See evidence assessment E1. |
| tool.sources[0] | PMD and CPD language coverage: https://pmd.github.io/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | PMD rule references and integration documentation: https://docs.pmd-code.org/latest/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Installation and basic usage: https://docs.pmd-code.org/latest/pmd_userdocs_installation.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | PMD licenses: https://github.com/pmd/pmd/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | PMD parses source code and applies a configured set of rules. Depending on the language and ruleset, findings can cover suspicious constructs, unused code, error handling, complexity, and maintainability. Rules can be extended through Java or XPath. | supported | See evidence assessment E1. |
| What it does, line 37 | Java and Salesforce Apex are major use cases. Other supported languages have their own rule inventories; selecting a language does not promise equivalent detection depth across all languages. | supported | See evidence assessment E1. |
| PMD versus CPD, line 41 | \| Component \| Main job \| Language caveat \|<br>\| --- \| --- \| --- \|<br>\| PMD rule analysis \| Report violations of coding rules. \| Use the rule reference for the chosen language. \|<br>\| CPD, bundled with PMD \| Find repeated code fragments. \| Its larger language list includes languages that do not have PMD bug-finding rules. \| | supported | See evidence assessment E1. |
| PMD versus CPD, line 46 | For example, CPD's C++ support does not make PMD a C++ defect analyzer. Likewise, parser support alone is insufficient: the documentation lists Scala parsing but no supplied Scala rules. These cases are excluded from this entry's language tags. | supported | See evidence assessment E1. |
| Inputs and results, line 50 | Provide source files, a compatible Java runtime for PMD, a language configuration, and a ruleset. Java analysis may also need an auxiliary classpath for dependencies so type resolution has the right information. | supported | See evidence assessment E1. |
| Inputs and results, line 52 | You can run PMD from its command line or through build integrations such as Maven and Gradle. Reports identify violated rules and source locations. Keep rule priorities, exclusions, and suppressions with the results. | supported | See evidence assessment E1. |
| A useful first evaluation, line 56 | Choose one language and inspect its available rules before adopting a ruleset. Run it on representative source, review several findings, and adjust rules that do not express your project's requirements. A quality gate based on rule violations is a configured policy, not a proof that all defects have been found. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
