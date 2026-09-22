# Semgrep CE: evidence record

Access/review date: 2026-09-22. Existing scope: Community Edition engine. Do not assume Semgrep Code platform capabilities are included.

File: `src/content/docs/tools/semgrep-ce.md`. Baseline SHA-256: `9944e96b0518454f932dab5bec7ea7c4e7b00563dd552cbd7712fa5c518060c5`. Reviewed SHA-256: `1a3247c809d1f6dd29d1c849d97e87e8e8408d7ea6256739914892276d55db68`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The separate CE matrix supports every listed CE language but limits data flow to a single function and describes community support. Code supports the listed languages at different analysis depths. The plan table supports Pro rules and cross-file analysis on Free Edition, 10 private repositories, 10 contributors, and unlimited public repositories. The prerequisite page lists Linux, macOS, Windows beta, and Python. CE is LGPL-2.1; Pro rules and analyses are proprietary. Local CE is independent of platform quotas.

Source sections: CE language matrix: Semgrep Code and CE; product language matrix; Prerequisites; Pricing: Compare Plans and FAQ; CE philosophy: Single-file analysis; repository License

- [S1](https://docs.semgrep.dev/prerequisites)
- [S2](https://semgrep.dev/pricing/)
- [S3](https://docs.semgrep.dev/usage-and-billing/overview)
- [S4](https://github.com/semgrep/semgrep)
- [S5](https://semgrep.dev/docs/contributing/semgrep-philosophy)
- [S6](https://docs.semgrep.dev/semgrep-ce-languages)
- [S7](https://docs.semgrep.dev/semgrep-ce-languages)

Correction: Clarified single-function data flow and community support on CE; replaced the general product matrix citation with the CE-specific matrix.

## Claims and dispositions

Counts: {"supported":34,"supported with qualification":13,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Semgrep CE | supported | See evidence assessment E1. |
| description | Match code patterns and apply local data flow checks using customizable analysis rules. | supported | See evidence assessment E1. |
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
| tool.languageNote | Selected community-supported language examples, not an exhaustive list. CE support is best effort, and its documented data flow analysis is limited to a single function. Check the CE column for syntax-version limits rather than applying the Code product's support to CE. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The standalone Community Edition engine is free. Semgrep Code is a separate platform offering with a limited free plan and paid plans. | supported | See evidence assessment E1. |
| tool.editionGroup | semgrep | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.license | LGPL-2.1 engine; rules may have different licenses. | supported | See evidence assessment E1. |
| tool.website | https://github.com/semgrep/semgrep | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Community Edition engine. Do not assume Semgrep Code platform capabilities are included. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Unsafe API use | supported | See evidence assessment E1. |
| tool.findings[2] | Coding conventions | supported | See evidence assessment E1. |
| tool.findingNote | Selected local rules and supported local taint checks. Cross-file platform features and separate Supply Chain detection are outside CE scope. | supported | See evidence assessment E1. |
| tool.environment | Linux and macOS; native Windows is documented as beta. Requires the supported Python runtime. | supported | See evidence assessment E1. |
| tool.setup | Source and selected rules; no application build or runtime harness for the normal CE workflow. Rule licensing and language maturity vary. | supported | See evidence assessment E1. |
| tool.sources[0] | Host prerequisites: https://docs.semgrep.dev/prerequisites | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Semgrep Free Edition and paid plans: https://semgrep.dev/pricing/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Semgrep usage and billing: https://docs.semgrep.dev/usage-and-billing/overview | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Semgrep CE project and license: https://github.com/semgrep/semgrep | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Semgrep CE design and scope: https://semgrep.dev/docs/contributing/semgrep-philosophy | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | CE language support and analysis limits: https://docs.semgrep.dev/semgrep-ce-languages | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 40 | Semgrep CE matches source-code structures using rules that resemble the code being checked. Rules can express security checks or project-specific conventions, including supported local taint-analysis checks. | supported | See evidence assessment E1. |
| When it is useful, line 44 | Use it when you want to turn a recognizable coding mistake into a repeatable check. A small custom rule can be easier to maintain than a manual search performed during every review. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 48 | CE and [Semgrep Code](../../../src/content/docs/tools/semgrep-code.md) have different analysis capabilities. CE's documented data flow analysis is limited to a single function. Cross-file analysis and Pro rules are platform capabilities available even on its limited free plan; they are not features of standalone CE. Rule quality and language support influence what a scan finds. | supported | See evidence assessment E1. |
| Getting started, line 52 | Start with a small, relevant rule set, inspect the findings, and tune the rules against representative examples. Check rule licenses separately from the engine license. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Related research, line 56 | **Related product family:** The [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used Semgrep alongside SonarQube and language-specific analyzers. It does not supply enough edition detail to attribute its results specifically to today's CE engine or Semgrep Code. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
| Related research, line 58 | Read [comparing SAST tools](../../../src/content/docs/research/comparing-tools.md) for lessons about rule scope, execution failures, and zero-finding runs. Use the current CE scope above when selecting a configuration. | supported with qualification | Historical attribution only; see the research reconciliation record. No current-edition performance inference. |
