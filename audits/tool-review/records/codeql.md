# CodeQL: evidence record

Access/review date: 2026-09-22. Existing scope: CodeQL CLI and query libraries; catalog license category describes the CLI.

File: `src/content/docs/tools/codeql.md`. Baseline SHA-256: `71c912aace0e3f0a132c593a383bb31ab22ff288d4a3c145817c9511e4cdb59d`. Reviewed SHA-256: `ad913b16f343679ab1f7fca040a8e0a90358c0e627223f4da197aa8dbfa895c3`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

All listed language/ecosystem tags occur in the support matrix, including Rust and GitHub Actions. Database extraction and query execution support source analysis and data flow, with build requirements varying by language. Query-help includes injection, memory, and concurrency checks. The CLI terms distinguish academic/open-source permissions from paid private-repository entitlements and impose automation conditions; public query licensing does not relicense the CLI. Host and Swift-specific restrictions remain qualified.

Source sections: Supported languages and frameworks: Languages and compilers; About CodeQL; CLI setup; query-help language indexes; CLI License: Use Rights and Restrictions

- [S1](https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/scan-from-the-command-line/set-up-codeql-cli)
- [S2](https://codeql.github.com/codeql-query-help/)
- [S3](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli)
- [S4](https://codeql.github.com/docs/codeql-overview/about-codeql/)
- [S5](https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks/)
- [S6](https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":37,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | CodeQL | supported | See evidence assessment E1. |
| description | Query a structured model of code to investigate vulnerabilities and trace data flow. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Data flow analysis | supported | See evidence assessment E1. |
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
| tool.languages[10] | Swift | supported | See evidence assessment E1. |
| tool.languages[11] | TypeScript | supported | See evidence assessment E1. |
| tool.languages[12] | GitHub Actions | supported | See evidence assessment E1. |
| tool.languageNote | These are documented language and ecosystem families. Supported versions, frameworks, extraction modes, and operating systems vary; see the support matrix. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.targets[1] | CI workflows | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.cost[0] | Free with limits | supported | See evidence assessment E1. |
| tool.cost[1] | Paid | supported | See evidence assessment E1. |
| tool.costNote | Free for public repositories and eligible uses under the CodeQL terms. Standard private organization scanning requires a paid GitHub Code Security entitlement. | supported | See evidence assessment E1. |
| tool.editionGroup | codeql | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.license | CodeQL CLI terms; query libraries have separate licenses. Check eligibility for your use. | supported | See evidence assessment E1. |
| tool.website | https://codeql.github.com/docs/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | CodeQL CLI and query libraries; catalog license category describes the CLI. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[2] | Concurrency issues | supported | See evidence assessment E1. |
| tool.findingNote | Selected query families; availability depends on language, query pack, framework models, and extraction mode. | supported | See evidence assessment E1. |
| tool.environment | Windows, macOS, and supported glibc Linux hosts; architecture and language prerequisites vary. | supported | See evidence assessment E1. |
| tool.setup | Create a CodeQL database from source. Some language and extraction modes require a build; others support no-build extraction. Then run a selected query suite. | supported | See evidence assessment E1. |
| tool.sources[0] | CLI host prerequisites: https://docs.github.com/en/code-security/how-tos/find-and-fix-code-vulnerabilities/scan-from-the-command-line/set-up-codeql-cli | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Query families and scope: https://codeql.github.com/codeql-query-help/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | CodeQL free and paid availability: https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | About CodeQL: https://codeql.github.com/docs/codeql-overview/about-codeql/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Supported languages and frameworks: https://codeql.github.com/docs/codeql-overview/supported-languages-and-frameworks/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[5] | CodeQL CLI license terms: https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 40 | CodeQL builds a database representing a codebase, then runs queries against it. Security queries can follow data through a program to identify potentially unsafe paths. | supported | See evidence assessment E1. |
| When it is useful, line 44 | Use it for repeatable security checks or to investigate variants of a known coding problem. Custom queries let an investigation express properties beyond a simple text match. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 48 | Extraction and build requirements depend on the language and configuration. Framework models and query selection affect the results. A language appearing in the catalog does not mean every version or library is supported. | supported | See evidence assessment E1. |
| What to keep in mind, line 50 | The CLI and the public query libraries have different licensing terms. Check the linked CLI terms before adopting it for a particular repository or service. | supported | See evidence assessment E1. |
| Getting started, line 54 | Choose a language, check its support requirements, and start with a documented query suite. Record the CLI and query-pack versions alongside any evaluation results. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
