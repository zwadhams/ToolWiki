# ZAP: evidence record

Access/review date: 2026-09-22. Existing scope: ZAP core and documented scanning features; add-ons and configuration affect coverage.

File: `src/content/docs/tools/zap.md`. Baseline SHA-256: `8cfcdc3173b499d160724abbff8cf90dc18eca2f72dcf44beefd3c8e9535958f`. Reviewed SHA-256: `18ef9f083fce5d846fb739b60a52ef58f95c9dd301cd6d46a07b5375d41f7d07`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

ZAP supports proxy/passive and active request-based testing with configurable discovery/authentication. Windows/Linux/macOS and container routes are documented, with Java prerequisites. Active requests can change application state. No source-language or universal coverage claim is made. Core free/open-source licensing is separate from surrounding infrastructure.

Source sections: Download: platforms and Java; API guide: passive/active scanning; Authentication methods; project Apache-2.0 license

- [S1](https://www.zaproxy.org/download/)
- [S2](https://www.zaproxy.org/docs/api/)
- [S3](https://www.zaproxy.org/docs/getting-further/authentication/authentication-methods/)
- [S4](https://github.com/zaproxy/zaproxy)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":8,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | ZAP | supported | See evidence assessment E1. |
| description | Inspect web traffic and test running web applications with passive and active security checks. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Running applications | supported | See evidence assessment E1. |
| tool.techniques[0] | DAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Passive scanning | supported | See evidence assessment E1. |
| tool.techniques[2] | Active scanning | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Tests exposed HTTP interfaces rather than parsing a particular server-side language. Coverage depends on discovery, authentication, and enabled rules. | supported | See evidence assessment E1. |
| tool.targets[0] | Web applications | supported | See evidence assessment E1. |
| tool.targets[1] | HTTP APIs | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free and open-source scanner. Core passive and active scanning do not require a paid edition. | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 | supported | See evidence assessment E1. |
| tool.website | https://www.zaproxy.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | ZAP core and documented scanning features; add-ons and configuration affect coverage. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Selected active/passive web scan rules; add-ons, authentication, and reachable endpoints control coverage. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS desktop or supported container deployments, with the required Java runtime. | supported | See evidence assessment E1. |
| tool.setup | A reachable application and discovery inputs or API definition. Configure scope, login, and scan rules; no source build or target harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Downloads and host prerequisites: https://www.zaproxy.org/download/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | ZAP scanning and API guide: https://www.zaproxy.org/docs/api/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | ZAP authentication methods: https://www.zaproxy.org/docs/getting-further/authentication/authentication-methods/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | ZAP project and license: https://github.com/zaproxy/zaproxy | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | ZAP proxies and inspects web traffic. Passive checks examine messages, while active scanning sends test requests to investigate potential vulnerabilities. Discovery and authentication determine which parts of an application it reaches. | supported | See evidence assessment E1. |
| When it is useful, line 39 | Use it to investigate the behavior of a running web application or include security checks in a test workflow. Logged-in functionality requires suitable authentication setup. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 43 | Crawling is discovery, not proof of security coverage. Passive checks and active tests reveal different kinds of evidence. An active scan can change application state, so use an authorized test environment. | supported | See evidence assessment E1. |
| Getting started, line 47 | Start by observing a small test application's traffic. Review the difference between passive and active scanning, then configure the target scope and any login flow before expanding the test. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
