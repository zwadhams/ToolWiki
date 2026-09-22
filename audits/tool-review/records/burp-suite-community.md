# Burp Suite Community Edition: evidence record

Access/review date: 2026-09-22. Existing scope: Community Edition; automated vulnerability scanning is not included.

File: `src/content/docs/tools/burp-suite-community.md`. Baseline SHA-256: `2fc002d64543ab31874c4321a72fca5263197948056f754330b88645efdb307c`. Reviewed SHA-256: `93469b1cb1795342667be58a6dec3f409620da7953516fcf4a76fa18d7daabfe`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The edition table lists Community proxy/history, Repeater, Decoder, Sequencer, Comparer and demo Intruder; Pro adds scanning, project files, full Intruder, Collaborator, crawling and Pro extensions. Desktop requirements support Windows, Linux and macOS with architecture/browser caveats. Scanner documentation supports dynamic request/response testing and crawl/audit phases. Manual finding categories require the user to design and interpret requests; Community is correctly excluded from automated DAST filtering.

Source sections: Community download: edition comparison; System requirements: OS and embedded browser; Burp Scanner: crawling and auditing; Professional overview

- [S1](https://portswigger.net/burp/documentation/desktop/getting-started/system-requirements)
- [S2](https://portswigger.net/burp/communitydownload)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":6,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Burp Suite Community Edition | supported | See evidence assessment E1. |
| description | Inspect and modify web requests with a free toolkit for manual security testing. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Running applications | supported | See evidence assessment E1. |
| tool.techniques[0] | Manual web testing | supported | See evidence assessment E1. |
| tool.techniques[1] | HTTP interception | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Works with web traffic rather than source languages. Manual testing coverage depends on what you explore. | supported | See evidence assessment E1. |
| tool.targets[0] | Web applications | supported | See evidence assessment E1. |
| tool.targets[1] | HTTP APIs | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.license | Free-to-use proprietary Community Edition | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Permanently free manual toolkit. It does not include automated Burp Scanner; Professional is a separate paid edition. | supported | See evidence assessment E1. |
| tool.editionGroup | burp | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://portswigger.net/burp/communitydownload | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Community Edition; automated vulnerability scanning is not included. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Security misconfiguration | supported | See evidence assessment E1. |
| tool.findingNote | Manual investigation using intercepted and edited requests. Community Edition does not include automated Burp Scanner. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS; browser support and CPU requirements depend on the installer. | supported | See evidence assessment E1. |
| tool.setup | A reachable web application, proxy/browser setup, and manual test requests. Authentication is configured for the test; no source build is required. | supported | See evidence assessment E1. |
| tool.sources[0] | Desktop system requirements: https://portswigger.net/burp/documentation/desktop/getting-started/system-requirements | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Community and Professional comparison: https://portswigger.net/burp/communitydownload | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 32 | Community Edition provides a proxy and traffic history, plus manual tools including Repeater, Decoder, Sequencer, and Comparer. It helps you inspect a request and deliberately test variations. | supported | See evidence assessment E1. |
| What differs from Professional, line 36 | Community does not include the automated Burp Scanner. Professional adds automation and workflow features, including project saving, crawling, the full Intruder, and Collaborator. | supported | See evidence assessment E1. |
| What differs from Professional, line 38 | This entry is tagged for manual web testing rather than automated DAST, so filtering for a free automated scanner does not incorrectly include it. | supported | See evidence assessment E1. |
| When it is useful, line 42 | Use it for learning, request inspection, and hands-on investigation. You design the tests and interpret the application's responses. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
