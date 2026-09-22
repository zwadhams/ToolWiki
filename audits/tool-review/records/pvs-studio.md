# PVS-Studio: evidence record

Access/review date: 2026-09-22. Existing scope: PVS-Studio source-code analysis and documented licensing options; separate SCA functionality is outside this entry's filter scope.

File: `src/content/docs/tools/pvs-studio.md`. Baseline SHA-256: `7e2fd16d7929f09f4ba7008e8b8f301296b37caa18fcfa7e8204d4168a079ca9`. Reviewed SHA-256: `f4b38d99fdc20114a7230ad56a4515d485691d4c18f360d5d4e5c3c994292204`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The product and documentation list C/C++, C#, Java, JavaScript/TypeScript and Go, with platform-specific integrations and data flow analysis. Diagnostic mappings do not imply complete standard coverage. Free personal-project licensing is renewable annually, excludes commercial/organization projects and mirrors/forks, and requires attribution. The Team comparison supports fewer than ten developers, one OS and IDE-only incremental analysis; Enterprise adds CI incremental and pull/merge-request analysis. Educational access is temporary and does not establish unrestricted commercial use.

Source sections: Product: languages/platforms, integrations, analysis methods; Documentation index; License comparison; Open-source license: terms and usage rules; Students; Pricing request

- [S1](https://pvs-studio.com/en/pvs-studio/)
- [S2](https://pvs-studio.com/en/docs/)
- [S3](https://pvs-studio.com/en/order/license/)
- [S4](https://pvs-studio.com/en/order/open-source-license/)
- [S5](https://pvs-studio.com/en/order/for-students/)
- [S6](https://pvs-studio.com/en/order/)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":35,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | PVS-Studio | supported | See evidence assessment E1. |
| description | Find defects and potential security weaknesses across native, managed, and web application source code. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.techniques[2] | Data flow analysis | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | C# | supported | See evidence assessment E1. |
| tool.languages[3] | Java | supported | See evidence assessment E1. |
| tool.languages[4] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[5] | TypeScript | supported | See evidence assessment E1. |
| tool.languages[6] | Go | supported | See evidence assessment E1. |
| tool.languageNote | These languages appear in the current product's support matrix. Compiler compatibility, diagnostics, and integrations differ by analyzer and license; language support does not imply identical checks. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.license | Commercial license; eligible free use is subject to separate vendor terms | supported | See evidence assessment E1. |
| tool.cost[0] | Free with limits | supported | See evidence assessment E1. |
| tool.cost[1] | Paid | supported | See evidence assessment E1. |
| tool.costNote | Paid licenses are quoted by the vendor. A renewable free license is available for qualifying personal open-source projects with attribution requirements; commercial projects, organization-developed projects, mirrors, and forks are excluded. Educational licenses have separate eligibility and duration rules. A general trial is not the free option counted here. | supported | See evidence assessment E1. |
| tool.editionGroup | pvs-studio | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://pvs-studio.com/en/pvs-studio/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | PVS-Studio source-code analysis and documented licensing options; separate SCA functionality is outside this entry's filter scope. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[2] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[3] | Coding-standard violations | supported | See evidence assessment E1. |
| tool.findingNote | Selected diagnostics and standard mappings. Checks differ by language and analyzer; mappings are not full-standard coverage. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS, subject to analyzer, architecture, compiler, and purchased license scope. | supported | See evidence assessment E1. |
| tool.setup | Source plus the relevant compiler or project context. Build capture, compilation databases, and language-specific integrations supply analysis inputs; no runtime harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Product capabilities and supported languages: https://pvs-studio.com/en/pvs-studio/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Documentation and analyzer-specific setup: https://pvs-studio.com/en/docs/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Team and Enterprise comparison: https://pvs-studio.com/en/order/license/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Free open-source license eligibility: https://pvs-studio.com/en/order/open-source-license/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Educational license terms: https://pvs-studio.com/en/order/for-students/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | Pricing request: https://pvs-studio.com/en/order/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 40 | PVS-Studio analyzes source for programming errors and potential security weaknesses. The vendor describes a combination of pattern checks, data flow analysis, type information, and other semantic analyses. Individual diagnostics can be mapped to weakness classifications or coding standards. | supported | See evidence assessment E1. |
| What it does, line 42 | Typical examples include invalid pointer or reference use, incorrect conditions, and suspicious value handling. Read the language-specific diagnostic explanation to determine what a finding establishes. | supported | See evidence assessment E1. |
| Inputs and integrations, line 46 | Supply source and the build or project information required by the selected analyzer. For C/C++, compiler settings determine which headers, macros, and platform definitions are analyzed. A compilation database or supported build integration can provide that context. | supported | See evidence assessment E1. |
| Inputs and integrations, line 48 | The product supports local and CI workflows, IDE integrations, and report exports. The exact workflow differs for C/C++, .NET, JVM, JavaScript/TypeScript, and Go projects; check the documentation for the chosen language and build system. | supported | See evidence assessment E1. |
| When it is useful, line 52 | Consider it when you want a commercial analyzer with support and several language families, especially when compiler compatibility or integration with an existing build system matters. Compare it with [Cppcheck](../../../src/content/docs/tools/cppcheck.md) for C/C++ work and [SonarQube Server](../../../src/content/docs/tools/sonarqube.md) for broader project review workflows. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 56 | A diagnostic's CWE or coding-standard mapping describes its classification, not complete coverage of that standard. Rules, target platforms, and dependencies need review for each project. Suppressing existing findings changes what reviewers see; it does not resolve the underlying issues. | supported | See evidence assessment E1. |
| What to keep in mind, line 58 | The free open-source program has narrower eligibility than simply having a public repository. Confirm the current terms for your project before relying on free access. | supported | See evidence assessment E1. |
| A useful first evaluation, line 62 | Choose a representative project and the matching analyzer integration. Review a small set of findings against the diagnostic reference, then assess the paid or eligible free license against the platforms and workflow features you need. Record your configuration and exclusions when comparing results with another tool. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
