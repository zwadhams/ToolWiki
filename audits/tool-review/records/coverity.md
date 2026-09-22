# Coverity (commercial): evidence record

Access/review date: 2026-09-22. Existing scope: Commercial Coverity source analysis using public vendor documentation. Private release documentation, exact host support, purchased entitlements, and pricing were not independently verified.

File: `src/content/docs/tools/coverity.md`. Baseline SHA-256: `b9a713a3c6a0292b5993d8bc04a20ca259f30d974da2c79ab9a496b76e33f956`. Reviewed SHA-256: `f035862c58bbd8d237a4156409a46e0a441e10836141a35c4b0953338b90ba2c`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The commercial matrix explicitly lists every language tagged on the commercial page. Scan advertises a narrower seven-language list. The FAQ supports memory, logic and concurrency findings and approval-dependent free use, including discretionary approval for corporate projects and quotas by size. The agreement grants rights only for the registered project. Public commercial documentation supports capture, source analysis and review, but not an exact release host/compiler matrix or purchased entitlements. The illustrative double-free recipe is conditional on enabled checkers and is not a captured result.

Source sections: Coverity product overview; Languages and Frameworks: version 2025.6.0 and later; Scan homepage language list; Scan FAQ: defects, eligibility, registration and submission frequency; Scan policy: Registered Project Use

- [S1](https://www.blackduck.com/static-analysis-tools-sast/coverity.html)
- [S2](https://www.blackduck.com/static-analysis-tools-sast/languages-and-frameworks.html)
- [S3](https://scan.coverity.com/faq)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":44,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Coverity (commercial) | supported | See evidence assessment E1. |
| description | Analyze source code for quality and security defects with commercial Coverity analysis and review workflows. | supported | See evidence assessment E1. |
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
| tool.languages[5] | TypeScript | supported | See evidence assessment E1. |
| tool.languages[6] | Python | supported | See evidence assessment E1. |
| tool.languages[7] | Go | supported | See evidence assessment E1. |
| tool.languages[8] | Ruby | supported | See evidence assessment E1. |
| tool.languages[9] | PHP | supported | See evidence assessment E1. |
| tool.languages[10] | Kotlin | supported | See evidence assessment E1. |
| tool.languages[11] | Scala | supported | See evidence assessment E1. |
| tool.languages[12] | Swift | supported | See evidence assessment E1. |
| tool.languages[13] | Objective-C | supported | See evidence assessment E1. |
| tool.languages[14] | Fortran | supported | See evidence assessment E1. |
| tool.languages[15] | Dart | supported | See evidence assessment E1. |
| tool.languages[16] | Apex | supported | See evidence assessment E1. |
| tool.languages[17] | JSP | supported | See evidence assessment E1. |
| tool.languages[18] | VB.NET | supported | See evidence assessment E1. |
| tool.languages[19] | CUDA | supported | See evidence assessment E1. |
| tool.languageNote | Selected languages from the vendor's commercial support page. Checker, compiler, and framework coverage varies by language and release. This list must not be applied to the free Scan service. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.targets[1] | Embedded software | supported | See evidence assessment E1. |
| tool.findings[0] | Injection risks | supported | See evidence assessment E1. |
| tool.findings[1] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[2] | Logic errors | supported | See evidence assessment E1. |
| tool.findings[3] | Concurrency issues | supported | See evidence assessment E1. |
| tool.findingNote | Selected defect classes across supported languages. Findings depend on enabled checkers, captured code, and models; not every class applies to every language. | supported | See evidence assessment E1. |
| tool.environment | Commercial capture, analysis, and review tooling with self-managed deployment options. Verify the release-specific OS/compiler matrix; the public overview does not establish every supported host combination. | supported | See evidence assessment E1. |
| tool.setup | Configure the licensed product and capture or prepare the source project using the appropriate language workflow. Compiled-language analysis needs accurate compiler options and dependencies; no runtime test harness is required. | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.license | Commercial Black Duck license; deployment and entitlement terms depend on the agreement | supported | See evidence assessment E1. |
| tool.cost[0] | Paid | supported | See evidence assessment E1. |
| tool.costNote | Commercial pricing is by quote. The separately listed Coverity Scan service offers eligible open-source projects free access under its own language scope and submission limits; it is not unrestricted free commercial Coverity. | supported | See evidence assessment E1. |
| tool.editionGroup | coverity | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://www.blackduck.com/static-analysis-tools-sast/coverity.html | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Commercial Coverity source analysis using public vendor documentation. Private release documentation, exact host support, purchased entitlements, and pricing were not independently verified. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Commercial capabilities, deployment, and quote model: https://www.blackduck.com/static-analysis-tools-sast/coverity.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Commercial language and framework coverage: https://www.blackduck.com/static-analysis-tools-sast/languages-and-frameworks.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Free Scan eligibility and submission limits: https://scan.coverity.com/faq | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| When to use it, line 34 | Evaluate Coverity when you need source analysis across a mixed-language codebase and a managed review process. Establish the actual languages, compiler versions, and defect classes you want to compare before using an overall issue count as a metric. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: review a C memory defect, line 38 | **Illustrative evaluation, not run here.** In a small C project, add this function to a file included in its build: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: review a C memory defect, line 40 | ```c<br>#include &lt;stdlib.h&gt;<br>void release_twice(void) {<br>    int *item = malloc(sizeof(*item));<br>    if (!item) return;<br>    free(item);<br>    free(item);<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: review a C memory defect, line 50 | With an authorized Coverity installation: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: review a C memory defect, line 52 | 1. Configure the C compiler and project using the installed release's instructions.<br>2. Capture the build and confirm the file was included.<br>3. Run analysis with the relevant memory checkers enabled.<br>4. Review any duplicate-release finding and its event path.<br>5. Remove the second release and compare the results. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: review a C memory defect, line 58 | This is an evaluation recipe, not a transcript from a licensed run. Commands and server setup depend on the installed product version. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Commercial versus Scan, line 62 | [Coverity Scan](../../../src/content/docs/tools/coverity-scan.md) has separate eligibility, listed languages, and submission limits. Use that entry when filtering for a free option. | supported | See evidence assessment E1. |
| Commercial versus Scan, line 64 | A clean commercial scan still needs evidence that the intended code and configuration were analyzed. For C/C++ verification claims, also compare [Polyspace Code Prover](../../../src/content/docs/tools/polyspace-code-prover.md) and [Frama-C](../../../src/content/docs/tools/frama-c.md). | supported | See evidence assessment E1. |
