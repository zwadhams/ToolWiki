# SonarQube Community Build: evidence record

Access/review date: 2026-09-22. Existing scope: SonarQube Community Build only. Commercial Server and hosted Cloud offerings differ.

File: `src/content/docs/tools/sonarqube-community.md`. Baseline SHA-256: `a5a4be53514676e230de67d7ff8629f35af5079871f42e91e3b058b7dfe4a916`. Reviewed SHA-256: `5372e9645c097d94788b0ad56616ff4299dcce472cfccbf86b18a9dbc4beda08`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The edition matrices support all listed languages in their respective columns; Community does not list C/C++, Objective-C or Swift. Scanner hosts are distinct from server/database requirements. Rules and quality gates support code-quality/security workflows without establishing absence of vulnerabilities. Commercial Server editions are paid; Community Build and IDE are open source and free. The FAQ supports Cloud free open-source analysis and its separate private-project 50k-line plan. Study results are attributed to the historical product family only.

Source sections: Language overview: edition matrix and language-specific links; Scanner general requirements; Server overview; Plans and pricing; Open Source Editions FAQ

- [S1](https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/scanners/scanner-environment/general-requirements)
- [S2](https://docs.sonarsource.com/sonarqube-community-build)
- [S3](https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/overview)
- [S4](https://www.sonarsource.com/open-source-editions/)
- [S5](https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/overview.md)
- [S6](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/overview.md)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":44,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | SonarQube Community Build | supported | See evidence assessment E1. |
| description | Run a free, self-managed service for code quality and security checks on supported languages. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | C# | supported | See evidence assessment E1. |
| tool.languages[1] | Java | supported | See evidence assessment E1. |
| tool.languages[2] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[3] | TypeScript | supported | See evidence assessment E1. |
| tool.languages[4] | Python | supported | See evidence assessment E1. |
| tool.languages[5] | Go | supported | See evidence assessment E1. |
| tool.languages[6] | Kotlin | supported | See evidence assessment E1. |
| tool.languages[7] | PHP | supported | See evidence assessment E1. |
| tool.languages[8] | Ruby | supported | See evidence assessment E1. |
| tool.languages[9] | Rust | supported | See evidence assessment E1. |
| tool.languages[10] | Scala | supported | See evidence assessment E1. |
| tool.languages[11] | Terraform | supported | See evidence assessment E1. |
| tool.languages[12] | HTML | supported | See evidence assessment E1. |
| tool.languages[13] | CSS | supported | See evidence assessment E1. |
| tool.languages[14] | XML | supported | See evidence assessment E1. |
| tool.languages[15] | VB.NET | supported | See evidence assessment E1. |
| tool.languages[16] | Flex | supported | See evidence assessment E1. |
| tool.languages[17] | Docker | supported | See evidence assessment E1. |
| tool.languages[18] | CloudFormation | supported | See evidence assessment E1. |
| tool.languages[19] | Azure Resource Manager | supported | See evidence assessment E1. |
| tool.languages[20] | Kubernetes/Helm | supported | See evidence assessment E1. |
| tool.languageNote | Tags follow the Community Build column of the official language matrix. Do not transfer Server language support or security-analysis depth to this free edition. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.targets[1] | Infrastructure as code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Open-source Community Build; consult the project and bundled analyzer licenses. | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free self-managed software. You operate its server and database; your hosting, maintenance, and compute costs are separate. | supported | See evidence assessment E1. |
| tool.editionGroup | sonarqube | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://docs.sonarsource.com/sonarqube-community-build | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | SonarQube Community Build only. Commercial Server and hosted Cloud offerings differ. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[2] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Community Build rules for supported languages; commercial language coverage and advanced features are not inherited. | supported | See evidence assessment E1. |
| tool.environment | Scanner workflows on Windows, Linux, and macOS; server/database prerequisites are a separate part of setup. | supported | See evidence assessment E1. |
| tool.setup | Set up Community Build and a language-appropriate scanner. Some analyses need build artifacts or bytecode; no runtime test harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Scanner environment requirements: https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/scanners/scanner-environment/general-requirements | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Community Build overview: https://docs.sonarsource.com/sonarqube-community-build | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Community Build language support matrix: https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/overview | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Sonar free products: https://www.sonarsource.com/open-source-editions/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 36 | Community Build analyzes supported code for reliability, maintainability, and security issues in a self-managed service. It provides a way to collect recurring analysis results without purchasing a commercial Server edition. | supported | See evidence assessment E1. |
| What differs from Server, line 40 | The catalog uses Community Build's own language matrix. For example, C/C++, Objective-C, and Swift are not listed as supported in its Community Build column, even though commercial Server supports them. | supported | See evidence assessment E1. |
| What differs from Server, line 42 | Feature depth also varies. Do not treat a shared language name as evidence that the free and paid products run identical security rules or analyses. Compare the edition and analyzer details for your project. | supported | See evidence assessment E1. |
| When it is useful, line 46 | Consider it when you want to maintain your own code-analysis service and its supported checks fit the project. Free software still requires an environment to run it and someone to maintain that environment. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Related research, line 50 | **Related product family:** The [CI/CD case study](../../../src/content/docs/research/sast-workflow.md) used SonarQube, and the [OCPP study](../../../src/content/docs/research/comparing-tools.md) included it in a comparison across languages. Neither note assigns the historical results to today's Community Build or implies that it includes Server's language coverage. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 52 | Read the [CI/CD paper](https://arxiv.org/abs/2609.00676) and [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf). For your own trial, use the current edition scope above and the [SAST adoption checklist](../../../src/content/docs/research/sast-adoption.md). | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
