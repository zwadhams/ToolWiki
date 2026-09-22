# SonarQube Server: evidence record

Access/review date: 2026-09-22. Existing scope: SonarQube Server commercial editions. Community Build, Cloud, and IDE products are separate offerings.

File: `src/content/docs/tools/sonarqube.md`. Baseline SHA-256: `b1700424e371cec43873db2a7c5ad4ccd2574ecc166ab81a3a764b6da7f31a1a`. Reviewed SHA-256: `121506bcee08bb0e39b0070c433f162e51f359d8c1987bf693ca2a424dd7e95b`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The edition matrices support all listed languages in their respective columns; Community does not list C/C++, Objective-C or Swift. Scanner hosts are distinct from server/database requirements. Rules and quality gates support code-quality/security workflows without establishing absence of vulnerabilities. Commercial Server editions are paid; Community Build and IDE are open source and free. The FAQ supports Cloud free open-source analysis and its separate private-project 50k-line plan. Study results are attributed to the historical product family only.

Source sections: Language overview: edition matrix and language-specific links; Scanner general requirements; Server overview; Plans and pricing; Open Source Editions FAQ

- [S1](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/scanner-environment/general-requirements)
- [S2](https://www.sonarsource.com/open-source-editions/)
- [S3](https://www.sonarsource.com/products/sonarqube/server/)
- [S4](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/overview)
- [S5](https://www.sonarsource.com/plans-and-pricing/sonarqube/)
- [S6](https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/overview.md)
- [S7](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/overview.md)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":41,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | SonarQube Server | supported | See evidence assessment E1. |
| description | Review code quality and security findings across projects using analysis rules and quality gates. | supported | See evidence assessment E1. |
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
| tool.languages[6] | Python | supported | See evidence assessment E1. |
| tool.languages[7] | Go | supported | See evidence assessment E1. |
| tool.languages[8] | Kotlin | supported | See evidence assessment E1. |
| tool.languages[9] | PHP | supported | See evidence assessment E1. |
| tool.languages[10] | Ruby | supported | See evidence assessment E1. |
| tool.languages[11] | Rust | supported | See evidence assessment E1. |
| tool.languages[12] | Scala | supported | See evidence assessment E1. |
| tool.languages[13] | Swift | supported | See evidence assessment E1. |
| tool.languages[14] | Objective-C | supported | See evidence assessment E1. |
| tool.languages[15] | Terraform | supported | See evidence assessment E1. |
| tool.languageNote | Selected documented languages and ecosystems, not a complete list. Availability and security-analysis depth depend on edition, version, and analyzer. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.targets[1] | Infrastructure as code | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.cost[0] | Paid | supported | See evidence assessment E1. |
| tool.costNote | This Server entry covers paid editions. The separate SonarQube Community Build is free, with a different language and feature scope; compare the options below. | supported | See evidence assessment E1. |
| tool.editionGroup | sonarqube | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.license | Commercial SonarQube Server editions; the separate Community Build has different licensing and features. | supported | See evidence assessment E1. |
| tool.website | https://www.sonarsource.com/products/sonarqube/server/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | SonarQube Server commercial editions. Community Build, Cloud, and IDE products are separate offerings. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[2] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Selected language-specific quality and security rules. Depth depends on edition, analyzer, and quality profile. | supported | See evidence assessment E1. |
| tool.environment | Scanner workflows on Windows, Linux, and macOS; the self-hosted server has separate Java, database, and OS requirements. | supported | See evidence assessment E1. |
| tool.setup | Set up a server and a language-appropriate scanner. Build/bytecode requirements vary by language; no runtime test harness is required for static analysis. | supported | See evidence assessment E1. |
| tool.sources[0] | Scanner environment requirements: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/scanner-environment/general-requirements | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Sonar free products and eligibility: https://www.sonarsource.com/open-source-editions/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | SonarQube Server overview: https://www.sonarsource.com/products/sonarqube/server/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Supported languages by edition: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/overview | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Edition and feature comparison: https://www.sonarsource.com/plans-and-pricing/sonarqube/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 38 | SonarQube Server brings static-analysis findings into a shared view of code quality and security. Analysis rules identify issues, and quality gates evaluate results against configured conditions. | supported | See evidence assessment E1. |
| When it is useful, line 42 | Use it when you want recurring analysis and a consistent review process across projects. It can help keep security findings alongside reliability and maintainability concerns. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Editions matter, line 46 | The SonarQube name covers multiple products. This entry focuses on commercial Server editions. [Community Build](../../../src/content/docs/tools/sonarqube-community.md) has its own catalog entry so free-edition searches use its supported languages. Cloud and IDE products also have their own scope. | supported | See evidence assessment E1. |
| Editions matter, line 48 | Check language availability and specific security features for the edition you plan to use. Do not assume that a language being supported means all analysis types are available for it. | supported | See evidence assessment E1. |
| What to keep in mind, line 52 | A passing quality gate means the configured conditions passed. It is not a guarantee that the code has no vulnerabilities. For comparisons with other tools, record the edition, analyzer versions, rule profile, and exclusions. | supported | See evidence assessment E1. |
| Getting started, line 56 | Choose the relevant product and edition, then analyze a small representative project. Review the rule profile and findings before defining quality gates for a larger workflow. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Related research, line 60 | - **Used in a case study:** [SAST in CI/CD](../../../src/content/docs/research/sast-workflow.md) explains the SonarQube-to-GitLab integration and developer feedback. [CI/CD paper](https://arxiv.org/abs/2609.00676).<br>- **Used in an empirical comparison:** [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) explains why the OCPP study's report counts cannot rank tools by accuracy. [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf).<br>- **Discussed in a proposed approach:** [Software quality models](../../../src/content/docs/research/software-quality.md) connects SonarQube output to quality modeling for EV charging software. [EV charging paper](https://www.cs.montana.edu/izurieta/pubs/Sheppard_CSR_2025.pdf). | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 64 | These papers name SonarQube; their historical setups do not establish the capabilities or performance of every current Server edition or Community Build. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
