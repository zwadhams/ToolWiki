# Burp Suite Professional: evidence record

Access/review date: 2026-09-22. Existing scope: Professional edition with Burp Scanner; do not assume these features are present in Community Edition.

File: `src/content/docs/tools/burp-suite-professional.md`. Baseline SHA-256: `b6c1c450ca8ca3769aa96eec5ac928e6380036e7f96bed702751f2bad34523c4`. Reviewed SHA-256: `acf285c02b9a8d3e29a4cd1ae437961bdb953408bb89c17fbbd74f9f5453c38f`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The edition table lists Community proxy/history, Repeater, Decoder, Sequencer, Comparer and demo Intruder; Pro adds scanning, project files, full Intruder, Collaborator, crawling and Pro extensions. Desktop requirements support Windows, Linux and macOS with architecture/browser caveats. Scanner documentation supports dynamic request/response testing and crawl/audit phases. Manual finding categories require the user to design and interpret requests; Community is correctly excluded from automated DAST filtering.

Source sections: Community download: edition comparison; System requirements: OS and embedded browser; Burp Scanner: crawling and auditing; Professional overview

- [S1](https://portswigger.net/burp/documentation/desktop/getting-started/system-requirements)
- [S2](https://portswigger.net/burp/communitydownload)
- [S3](https://portswigger.net/burp/documentation/scanner)
- [S4](https://portswigger.net/burp/pro)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Burp Suite Professional | supported | See evidence assessment E1. |
| description | Investigate web applications manually and use Burp Scanner for automated vulnerability checks. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Running applications | supported | See evidence assessment E1. |
| tool.techniques[0] | DAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Active scanning | supported | See evidence assessment E1. |
| tool.techniques[2] | Passive scanning | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Tests web interfaces rather than source languages. Reachable routes, sessions, API definitions, and scanner configuration determine coverage. | supported | See evidence assessment E1. |
| tool.targets[0] | Web applications | supported | See evidence assessment E1. |
| tool.targets[1] | HTTP APIs | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.cost[0] | Paid | supported | See evidence assessment E1. |
| tool.costNote | Professional requires a paid license beyond any trial. Community Edition is permanently free, but does not include the automated Burp Scanner. | supported | See evidence assessment E1. |
| tool.editionGroup | burp | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.license | Commercial proprietary license | supported | See evidence assessment E1. |
| tool.website | https://portswigger.net/burp/pro | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Professional edition with Burp Scanner; do not assume these features are present in Community Edition. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Automated and manual web testing; reachable endpoints, authentication, and enabled checks determine coverage. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS; browser support and CPU requirements depend on the installer. | supported | See evidence assessment E1. |
| tool.setup | A reachable web application and discovery or API input; configure scope and authentication. No application source build is required. | supported | See evidence assessment E1. |
| tool.sources[0] | Desktop system requirements: https://portswigger.net/burp/documentation/desktop/getting-started/system-requirements | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Community and Professional feature comparison: https://portswigger.net/burp/communitydownload | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Burp Scanner documentation: https://portswigger.net/burp/documentation/scanner | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Burp Suite Professional: https://portswigger.net/burp/pro | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 36 | Burp Scanner discovers application content and audits its behavior for potential vulnerabilities. Professional combines automated scanning with tools for hands-on web testing. | supported | See evidence assessment E1. |
| When it is useful, line 40 | Consider it for investigations that alternate between manual exploration and automated checks. Authenticated scanning can exercise functionality behind a login when its session configuration works correctly. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 44 | This entry covers Professional; [Community Edition](../../../src/content/docs/tools/burp-suite-community.md) has separate manual-testing capabilities. Scan results depend on discovery and configuration; complex authorization and business workflows still need deliberate test cases. Active testing should run against an authorized target with suitable test data. | supported | See evidence assessment E1. |
| Getting started, line 48 | Use the scanner documentation to understand the crawl and audit phases. Configure scope and login behavior, then inspect what the scanner actually reached before interpreting an empty report. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
