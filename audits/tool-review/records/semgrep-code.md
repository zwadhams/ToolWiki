# Semgrep Code: evidence record

Access/review date: 2026-09-22. Existing scope: Semgrep Code on the AppSec Platform, including Free Edition and paid plans. Supply Chain and Secrets are separate products.

File: `src/content/docs/tools/semgrep-code.md`. Baseline SHA-256: `bc29dcdbf650a4eb1a3f2eee77f713df0d031b8ffc88eb20d47877e1d395943d`. Reviewed SHA-256: `cf056668b488861deb1809b6067c9f3ee06e1c71e0f8f8d1843020c2120fe00f`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The separate CE matrix supports every listed CE language but limits data flow to a single function and describes community support. Code supports the listed languages at different analysis depths. The plan table supports Pro rules and cross-file analysis on Free Edition, 10 private repositories, 10 contributors, and unlimited public repositories. The prerequisite page lists Linux, macOS, Windows beta, and Python. CE is LGPL-2.1; Pro rules and analyses are proprietary. Local CE is independent of platform quotas.

Source sections: CE language matrix: Semgrep Code and CE; product language matrix; Prerequisites; Pricing: Compare Plans and FAQ; CE philosophy: Single-file analysis; repository License

- [S1](https://docs.semgrep.dev/prerequisites)
- [S2](https://semgrep.dev/pricing/)
- [S3](https://docs.semgrep.dev/usage-and-billing/overview)
- [S4](https://docs.semgrep.dev/supported-languages)
- [S5](https://docs.semgrep.dev/semgrep-ce-languages)

Correction: Clarified single-function data flow and community support on CE; replaced the general product matrix citation with the CE-specific matrix.

## Claims and dispositions

Counts: {"supported":41,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Semgrep Code | supported | See evidence assessment E1. |
| description | Run security analysis with Pro rules, cross-file analysis, and centralized finding management. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Pattern matching | supported | See evidence assessment E1. |
| tool.techniques[2] | Data flow analysis | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | C# | supported | See evidence assessment E1. |
| tool.languages[3] | Go | supported | See evidence assessment E1. |
| tool.languages[4] | Java | supported | See evidence assessment E1. |
| tool.languages[5] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[6] | Kotlin | supported | See evidence assessment E1. |
| tool.languages[7] | Python | supported | See evidence assessment E1. |
| tool.languages[8] | Ruby | supported | See evidence assessment E1. |
| tool.languages[9] | Rust | supported | See evidence assessment E1. |
| tool.languages[10] | TypeScript | supported | See evidence assessment E1. |
| tool.languages[11] | PHP | supported | See evidence assessment E1. |
| tool.languages[12] | Scala | supported | See evidence assessment E1. |
| tool.languages[13] | Swift | supported | See evidence assessment E1. |
| tool.languages[14] | Terraform | supported | See evidence assessment E1. |
| tool.languageNote | Selected supported languages and ecosystems. Analysis depth varies by language; check the product support matrix for exact features. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.targets[1] | Infrastructure as code | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.license | Commercial Semgrep Code and Pro features; separate from the open-source CE engine. | supported | See evidence assessment E1. |
| tool.cost[0] | Free with limits | supported | See evidence assessment E1. |
| tool.cost[1] | Paid | supported | See evidence assessment E1. |
| tool.costNote | Free Edition includes Pro rules and cross-file analysis within contributor and repository limits. Teams and Enterprise are paid plans; standalone Semgrep CE remains a separate free option. | supported | See evidence assessment E1. |
| tool.editionGroup | semgrep | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://semgrep.dev/products/semgrep-code/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Semgrep Code on the AppSec Platform, including Free Edition and paid plans. Supply Chain and Secrets are separate products. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findings[2] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Selected SAST rules and supported advanced analyses. Known-dependency detection belongs to the separate Supply Chain product. | supported | See evidence assessment E1. |
| tool.environment | Managed scans or a supported local/CI scanner host; Linux and macOS, with native Windows documented as beta. | supported | See evidence assessment E1. |
| tool.setup | Connect a repository and configure scans/rules and platform access. Normal source scans do not require a runtime harness or application build. | supported | See evidence assessment E1. |
| tool.sources[0] | Host and platform prerequisites: https://docs.semgrep.dev/prerequisites | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Semgrep plans and feature comparison: https://semgrep.dev/pricing/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Contributor definitions and usage limits: https://docs.semgrep.dev/usage-and-billing/overview | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Language support matrix: https://docs.semgrep.dev/supported-languages | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What differs from CE, line 36 | Semgrep Code provides Pro rules, cross-file analysis, and platform workflows. These capabilities are not all restricted to paid customers: its Free Edition includes them within the published usage limits. | supported | See evidence assessment E1. |
| What differs from CE, line 38 | The standalone [CE engine](../../../src/content/docs/tools/semgrep-ce.md) is a separate option with different analysis capabilities. Do not apply platform account limits to a local CE-only workflow. | supported | See evidence assessment E1. |
| Free plan limits, line 42 | The pricing comparison lists a maximum of 10 contributors and 10 private repositories for Free Edition, with unlimited public repositories. Semgrep defines contributors using recent activity in scanned private repositories. Check those definitions and current limits when choosing a plan. | supported | See evidence assessment E1. |
| Free plan limits, line 44 | Paid plans expand team and organization support. Product modules and additional AI usage may have separate charges; the edition table links current pricing rather than presenting one universal price. | supported | See evidence assessment E1. |
| Related research, line 48 | **Related product family:** The [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) included Semgrep, but its reported configuration should not be treated as a benchmark of today's Semgrep Code, Pro rules, or plan features. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 50 | [Comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) explains how to interpret differences in reported findings. Check the edition and selected rules when applying those lessons to this platform. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
