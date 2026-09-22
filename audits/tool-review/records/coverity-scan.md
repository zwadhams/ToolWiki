# Coverity Scan: evidence record

Access/review date: 2026-09-22. Existing scope: Coverity Scan service only. Free access, languages, quotas, and data handling follow the Scan terms rather than commercial Coverity entitlements.

File: `src/content/docs/tools/coverity-scan.md`. Baseline SHA-256: `98f365151955f71ca7c50f95830b6cf59b6956cbb8feb7a831d35876509792a5`. Reviewed SHA-256: `2926447856ba03f97914a5e066ec0c3f577e3248ba032bf5a8d00b246ffc3d05`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The commercial matrix explicitly lists every language tagged on the commercial page. Scan advertises a narrower seven-language list. The FAQ supports memory, logic and concurrency findings and approval-dependent free use, including discretionary approval for corporate projects and quotas by size. The agreement grants rights only for the registered project. Public commercial documentation supports capture, source analysis and review, but not an exact release host/compiler matrix or purchased entitlements. The illustrative double-free recipe is conditional on enabled checkers and is not a captured result.

Source sections: Coverity product overview; Languages and Frameworks: version 2025.6.0 and later; Scan homepage language list; Scan FAQ: defects, eligibility, registration and submission frequency; Scan policy: Registered Project Use

- [S1](https://scan.coverity.com/)
- [S2](https://scan.coverity.com/faq)
- [S3](https://scan.coverity.com/policy)
- [S4](https://www.blackduck.com/static-analysis-tools-sast/coverity.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":30,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Coverity Scan | supported | See evidence assessment E1. |
| description | Use the hosted Coverity Scan service to review defects in eligible registered open-source projects. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Data flow analysis | supported | See evidence assessment E1. |
| tool.techniques[2] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | C# | supported | See evidence assessment E1. |
| tool.languages[3] | Java | supported | See evidence assessment E1. |
| tool.languages[4] | JavaScript | supported | See evidence assessment E1. |
| tool.languages[5] | Ruby | supported | See evidence assessment E1. |
| tool.languages[6] | Python | supported | See evidence assessment E1. |
| tool.languageNote | Languages advertised on the Scan homepage. The broader commercial Coverity language list does not establish support in this free service. | supported | See evidence assessment E1. |
| tool.targets[0] | Registered open-source projects | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[2] | Concurrency issues | supported | See evidence assessment E1. |
| tool.findingNote | Selected defect classes described by the Scan FAQ. Language, capture, and service configuration affect which checks apply. | supported | See evidence assessment E1. |
| tool.environment | Hosted analysis/review service with a compatible local build-capture environment. Use the tool package and platform instructions supplied for the registered project. | supported | See evidence assessment E1. |
| tool.setup | Register an eligible project, obtain its analysis/capture tooling, prepare the build as instructed, and submit it for analysis. This is a hosted upload workflow, not an unrestricted local-only license. | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.license | Coverity Scan User Agreement and service terms; scanning open-source projects does not make the analyzer open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free with limits | supported | See evidence assessment E1. |
| tool.costNote | Free for approved registered open-source projects. Submission quotas vary with project size. Corporate-maintained projects can require discretionary approval; private commercial code is not covered by general free access. | supported | See evidence assessment E1. |
| tool.editionGroup | coverity | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://scan.coverity.com/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Coverity Scan service only. Free access, languages, quotas, and data handling follow the Scan terms rather than commercial Coverity entitlements. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Scan service and advertised languages: https://scan.coverity.com/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Eligibility, setup, findings, and quotas: https://scan.coverity.com/faq | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Scan agreement and service policy: https://scan.coverity.com/policy | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Commercial alternative: https://www.blackduck.com/static-analysis-tools-sast/coverity.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What the free option includes, line 36 | Scan provides a hosted workflow for approved open-source projects. Account and project registration are part of setup. Its local capture tool prepares analysis input; this does not grant an unrestricted license for scanning any private project. | supported | See evidence assessment E1. |
| Worked example: compare two revisions, line 40 | **Illustrative workflow, not run here.** Use an eligible project that you maintain: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: compare two revisions, line 42 | 1. Follow its registered-project capture and submission instructions.<br>2. Analyze a small revision containing a known defect and record the revision and capture configuration.<br>3. Review the resulting source location and evidence with an authorized project account.<br>4. Fix the defect, submit the next revision within the service quota, and compare the findings. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: compare two revisions, line 47 | The [commercial Coverity example](../../../src/content/docs/tools/coverity.md#worked-example-review-a-c-memory-defect) supplies a small C defect suitable for a controlled evaluation. No project has been registered or uploaded as part of preparing this wiki entry. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Interpret the result, line 51 | A difference between revisions can reflect code, configuration, or analyzer changes. Record these separately. A successful submission is not evidence that every intended file was captured. | supported | See evidence assessment E1. |
| Interpret the result, line 53 | For broader language requirements or private commercial analysis, consult [commercial Coverity](../../../src/content/docs/tools/coverity.md). Keep that product's capabilities separate when comparing free alternatives. | supported | See evidence assessment E1. |
