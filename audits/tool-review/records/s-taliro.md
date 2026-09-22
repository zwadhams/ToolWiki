# S-TaLiRo: evidence record

Access/review date: 2026-09-22. Existing scope: Historical MATLAB S-TaLiRo described in the 2014 tool paper and ARCH-COMP 2019 report; current installation availability is unverified.

File: `src/content/docs/tools/s-taliro.md`. Baseline SHA-256: `b84ba26a0c5521781358db82c94e49577db9afac017047b2d54cf482cb6e6263`. Reviewed SHA-256: `639c2c612a13a7fdea8ef4649118b589ee469f395881e30cd8046ff1c9ce8e83`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The original paper supports MATLAB/Simulink and black-box models, MTL robustness and stochastic falsification. ARCH-COMP discusses MTL/STL requirements and names the GPL without a version. Visual inspection confirms that the superscript 3 is a URL footnote, not GPL version 3. The GPL-3.0 attribution was therefore contradicted by the cited evidence and corrected. The project URL again redirects to Google sign-in; current availability and host compatibility remain unresolved.

Source sections: HSCC 2014 tool demonstration pp. 1-2; ARCH-COMP 2019 p. 3, Participants and footnote 3 (visually inspected); historical project URL

- [S1](https://www.bhoxha.com/papers/HSCC2014ToolDemo.pdf)
- [S2](https://www.sosy-lab.org/research/pub/2019-ARCH.Category_Report_Falsification.pdf)
- [S3](https://www.mathworks.com/pricing-licensing.html)

Correction: Removed the unsupported GPL-3.0 attribution from metadata, cost note and availability notes; retained historical GPL licensing with an explicitly unspecified version.

## Claims and dispositions

Counts: {"supported":21,"supported with qualification":5,"contradicted":0,"unresolved":6}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | S-TaLiRo | supported | See evidence assessment E1. |
| description | Search MATLAB and Simulink model executions for counterexamples to temporal requirements. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Executable models | supported | See evidence assessment E1. |
| tool.inputTypes[1] | Execution traces | supported | See evidence assessment E1. |
| tool.techniques[0] | Model falsification | supported | See evidence assessment E1. |
| tool.techniques[1] | Temporal logic monitoring | supported | See evidence assessment E1. |
| tool.languages[0] | MATLAB | supported | See evidence assessment E1. |
| tool.languages[1] | Simulink | supported | See evidence assessment E1. |
| tool.languageNote | These tags describe model execution and the testing environment. Temporal requirements are evaluated over simulation traces, rather than source code syntax. | supported | See evidence assessment E1. |
| tool.targets[0] | Simulated systems | supported | See evidence assessment E1. |
| tool.targets[1] | Hybrid systems | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | GPL, as reported in ARCH-COMP 2019; the report does not specify the license version | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The historical toolbox was publicly available under the GPL according to the cited report. MATLAB and any required Simulink or additional toolbox licenses are separate. Current distribution availability, exact GPL version, and release terms have not been reverified. | unresolved | Historical GPL scope is supported, but its exact version and current distribution remain unverified. The project URL redirects to Google sign-in. |
| tool.website | https://sites.google.com/a/asu.edu/s-taliro/s-taliro | unresolved | Historical GPL scope is supported, but its exact version and current distribution remain unverified. The project URL redirects to Google sign-in. |
| tool.verified | 2026-09-21 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Historical MATLAB S-TaLiRo described in the 2014 tool paper and ARCH-COMP 2019 report; current installation availability is unverified. | unresolved | Historical GPL scope is supported, but its exact version and current distribution remain unverified. The project URL redirects to Google sign-in. |
| tool.findings[0] | Temporal requirement violations | supported | See evidence assessment E1. |
| tool.findingNote | Historical MATLAB falsification and monitoring workflows. Requirements and search bounds are user supplied; current release availability remains unverified. | unresolved | Historical GPL scope is supported, but its exact version and current distribution remain unverified. The project URL redirects to Google sign-in. |
| tool.environment | Historical MATLAB/Simulink workflow; current host and release compatibility have not been reverified. | unresolved | Historical GPL scope is supported, but its exact version and current distribution remain unverified. The project URL redirects to Google sign-in. |
| tool.setup | A simulation model, temporal requirements, search bounds, and appropriate MATLAB toolboxes. Match the distribution and dependencies used by the experiment. | supported | See evidence assessment E1. |
| tool.sources[0] | S-TaLiRo tool demonstration paper (2014): https://www.bhoxha.com/papers/HSCC2014ToolDemo.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | ARCH-COMP 2019 falsification report, including tool licensing: https://www.sosy-lab.org/research/pub/2019-ARCH.Category_Report_Falsification.pdf | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | MathWorks pricing and licensing: https://www.mathworks.com/pricing-licensing.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | S-TaLiRo searches for simulation inputs or initial conditions that violate a temporal requirement. A robustness score guides optimization toward a counterexample. Published workflows use MATLAB and Simulink models of cyber-physical and hybrid systems. | supported | See evidence assessment E1. |
| What it does, line 35 | The tool papers discuss Metric Temporal Logic (MTL); the ARCH-COMP report also describes STL requirements. Check the syntax and monitoring semantics of the specific release you obtain. | supported | See evidence assessment E1. |
| When it is useful, line 39 | This entry provides context for reading falsification research or reproducing experiments that use MATLAB S-TaLiRo. [PSY-TaLiRo](../../../src/content/docs/tools/psy-taliro.md) is a separate Python implementation of the broader approach. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Availability and setup, line 43 | The historical project link redirected to a Google sign-in page during this review. A current downloadable release and its installation instructions could not be verified. The Free and Open source labels describe the historical toolbox, not a newly inspected distribution. The ARCH-COMP report names the GPL but does not specify its version; the superscript 3 after GPL is a project-link footnote, not a license version. | unresolved | Historical GPL scope is supported, but its exact version and current distribution remain unverified. The project URL redirects to Google sign-in. |
| Availability and setup, line 45 | Before reproducing an experiment, match its toolbox version, model, MATLAB dependencies, and search configuration. | supported | See evidence assessment E1. |
| Interpreting results, line 49 | A violating trace is evidence against the requirement for that model and configuration. Finding no violation within a finite budget does not establish universal correctness. See [model and temporal falsification](../../../src/content/docs/concepts/model-falsification.md). | supported | See evidence assessment E1. |
