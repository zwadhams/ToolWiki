# Frama-C (Eva and WP): evidence record

Access/review date: 2026-09-22. Existing scope: Frama-C 33.0 documentation, focused on static Eva and WP analyses. E-ACSL runtime checking is outside this entry's filter scope.

File: `src/content/docs/tools/frama-c.md`. Baseline SHA-256: `0ef1b8d248f357746d1f43f8570e843bd692d59aed7b5249a76b3db03bd9878b`. Reviewed SHA-256: `4ced9ef507b68f76fe6e3824ba334d18931b69790797fb2a095223d482bab153`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The site identifies Frama-C 33.0. Eva performs abstract interpretation of C and emits possible-runtime-error alarms; WP discharges ACSL obligations. Their outputs are not automatically concrete bugs. Linux/macOS packages and Windows WSL are documented. The distribution is LGPL with separate support/custom licensing and solver terms. E-ACSL is separate dynamic functionality and not included in the static tags.

Source sections: 33.0 homepage; Eva and WP plugin pages; Get Frama-C; Contact: LGPL and services

- [S1](https://www.frama-c.com/)
- [S2](https://www.frama-c.com/fc-plugins/eva.html)
- [S3](https://www.frama-c.com/fc-plugins/wp.html)
- [S4](https://www.frama-c.com/html/get-frama-c.html)
- [S5](https://www.frama-c.com/html/contact.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":26,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Frama-C (Eva and WP) | supported | See evidence assessment E1. |
| description | Analyze C runtime safety with Eva and verify specified C behavior with WP. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Abstract interpretation | supported | See evidence assessment E1. |
| tool.techniques[1] | Deductive verification | supported | See evidence assessment E1. |
| tool.techniques[2] | Formal verification | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Eva reports possible runtime errors in its supported classes; WP generates proof obligations from specifications. Unproved obligations are not automatically concrete bugs. | supported | See evidence assessment E1. |
| tool.environment | Linux and macOS installation routes; Windows through the documented WSL route. Plugin and solver requirements vary. | supported | See evidence assessment E1. |
| tool.setup | Supply C source and preprocessing context. Eva needs a model of the entry environment; WP usually needs ACSL contracts, loop annotations, and configured proof solvers. No runtime test harness is required for these static plugins. | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languageNote | C with ACSL specifications for the workflows covered here. C++ front ends and other plugins require separate compatibility review. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | LGPL distribution; inspect individual plugins and solver licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | The open-source distribution includes the Eva and WP workflows. Commercial support, customization, and alternative licensing are separate options; optional solvers have their own terms. | supported | See evidence assessment E1. |
| tool.website | https://www.frama-c.com/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Frama-C 33.0 documentation, focused on static Eva and WP analyses. E-ACSL runtime checking is outside this entry's filter scope. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Frama-C analysis overview: https://www.frama-c.com/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Eva value analysis: https://www.frama-c.com/fc-plugins/eva.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | WP deductive verification: https://www.frama-c.com/fc-plugins/wp.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Installation and supported host routes: https://www.frama-c.com/html/get-frama-c.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[4] | Licensing and commercial services: https://www.frama-c.com/html/contact.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Two analyses in one framework, line 37 | \| Plugin \| Main job \| What you interpret \|<br>\| --- \| --- \| --- \|<br>\| Eva \| Approximate possible values and behavior using abstract interpretation. \| Alarms about possible runtime errors and inferred properties. \|<br>\| WP \| Turn annotated requirements into proof obligations. \| Which obligations were proved, remain unknown, or need additional work. \| | supported | See evidence assessment E1. |
| Two analyses in one framework, line 42 | Eva can analyze selected classes of undefined behavior, including invalid memory access and arithmetic errors. WP supports functional specifications expressed as ACSL contracts and annotations. | supported | See evidence assessment E1. |
| What a result means, line 46 | An Eva alarm can reflect a real error or imprecision in the analysis. A failed or timed-out WP proof can reflect a false property, missing annotations, unsupported modeling, or a solver limitation. Investigate before labeling either as a confirmed bug. | supported | See evidence assessment E1. |
| What a result means, line 48 | Successful proofs apply to the modeled program and stated assumptions. Check the environment model, machine configuration, unsupported constructs, and trusted specifications when interpreting a result. | supported | See evidence assessment E1. |
| Where to start, line 52 | Start with a small C routine and a known environment. Use the Eva tutorial to examine value ranges and alarms, or the WP tutorial to state a function contract and inspect its obligations. Add complexity gradually and preserve annotations as part of the code review. | supported | See evidence assessment E1. |
| Where to start, line 54 | Frama-C also includes dynamic techniques such as E-ACSL. They have different execution requirements and should not be inferred from this entry's static tags. | supported | See evidence assessment E1. |
