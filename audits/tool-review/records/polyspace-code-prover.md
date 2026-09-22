# Polyspace Code Prover: evidence record

Access/review date: 2026-09-22. Existing scope: Polyspace Code Prover C/C++ analysis, not the entire Polyspace family. Desktop, Server, Bug Finder, and model-integration workflows have different purposes and licensing.

File: `src/content/docs/tools/polyspace-code-prover.md`. Baseline SHA-256: `21d8337b2fee8855e296f4971dc0e9a5f16c1ddff8a36f787b60e16b41e72fc1`. Reviewed SHA-256: `047a381c2bd1838af5d58f98e841afc81debafa9a4a7269572887df2da094668`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The requirements page lists Mac, Windows and Linux, excludes ARM Windows, requires Bug Finder, and does not require MATLAB/Simulink. Product documentation supports C/C++ abstract interpretation, runtime-check categories and model-dependent results. Source configuration and generated-code claims are correctly distinguished from proving temporal model requirements. The zero-denominator example follows directly from integer division semantics and remains illustrative. Pricing and optional integrations are not asserted as universal entitlements.

Source sections: Code Prover overview: runtime verification and product comparison; Product Requirements; Getting started; Run-time error review

- [S1](https://www.mathworks.com/products/polyspace-code-prover.html)
- [S2](https://www.mathworks.com/support/requirements/polyspace-code-prover.html)
- [S3](https://www.mathworks.com/help/codeprover/getting-started-with-polyspace-code-prover.html)
- [S4](https://www.mathworks.com/help/codeprover/run-time-error-review.html)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Polyspace Code Prover | supported | See evidence assessment E1. |
| description | Use abstract interpretation to prove selected C and C++ runtime checks safe or identify possible and definite failures. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Abstract interpretation | supported | See evidence assessment E1. |
| tool.techniques[1] | Formal verification | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | Handwritten or generated C/C++ source. Simulink integration can configure analysis of generated code; it does not make this entry a temporal falsifier of the original model. | supported | See evidence assessment E1. |
| tool.targets[0] | Embedded software | supported | See evidence assessment E1. |
| tool.targets[1] | Generated C/C++ code | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findingNote | Selected runtime checks include bounds, invalid accesses, division by zero, and numerical errors. A proof applies to the configured program/environment model; an unproven check is not automatically a confirmed bug. | supported | See evidence assessment E1. |
| tool.environment | The current product requirements list Windows, Linux, and Mac, with release-specific limits; ARM-based Windows is excluded. Verify the exact host and compiler combination. | supported | See evidence assessment E1. |
| tool.setup | Requires Polyspace Bug Finder. Configure source, includes, macros, target types, entry points, and environment assumptions. Standalone analysis does not require MATLAB or Simulink, instrumentation, or runtime tests. | supported | See evidence assessment E1. |
| tool.licenseCategory | Proprietary | supported | See evidence assessment E1. |
| tool.license | Commercial MathWorks product license; required products and optional integrations have separate entitlements | supported | See evidence assessment E1. |
| tool.cost[0] | Paid | supported | See evidence assessment E1. |
| tool.costNote | Paid product with quote and trial options. A trial is not a continuing free edition. Include the required Polyspace Bug Finder entitlement; existing institutional access depends on the actual license. | supported | See evidence assessment E1. |
| tool.editionGroup | polyspace | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.website | https://www.mathworks.com/products/polyspace-code-prover.html | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Polyspace Code Prover C/C++ analysis, not the entire Polyspace family. Desktop, Server, Bug Finder, and model-integration workflows have different purposes and licensing. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Purpose, result meanings, product differences, and trial: https://www.mathworks.com/products/polyspace-code-prover.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Required products and supported platforms: https://www.mathworks.com/support/requirements/polyspace-code-prover.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Getting started with Code Prover: https://www.mathworks.com/help/codeprover/getting-started-with-polyspace-code-prover.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Result review and reporting documentation: https://www.mathworks.com/help/codeprover/run-time-error-review.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it establishes, line 36 | Code Prover examines a configured model of C/C++ behavior and classifies selected runtime checks. Its goal differs from simply collecting suspicious code patterns. [Frama-C Eva](../../../src/content/docs/tools/frama-c.md) is another useful reference for understanding abstract-interpretation results. | supported | See evidence assessment E1. |
| What it establishes, line 38 | A result about generated C code is a result about that code and configuration. It is not a general proof about a Simulink controller's temporal requirements. | supported | See evidence assessment E1. |
| Worked example: a division precondition, line 42 | **Illustrative evaluation, not run here.** Add this C function to a licensed Code Prover project: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: a division precondition, line 44 | ```c<br>int quotient(int denominator) {<br>    return 12 / denominator;<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: a division precondition, line 50 | Configure it as an analyzed entry point with an input domain that includes zero, then inspect the division check. It cannot be established safe for that entire domain. The exact result presentation depends on the analysis setup. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: a division precondition, line 52 | Now constrain the input to positive values and repeat. A safe result under that restriction requires evidence that the real callers enforce it. Alternatively, implement and analyze a guard for zero. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Read the result categories, line 56 | Distinguish checks proved safe, checks proved to fail, unreachable code, and checks left unproven. An unproven result may require a code fix, better environment modeling, or more precise analysis. | supported | See evidence assessment E1. |
| Read the result categories, line 58 | Record target integer sizes, stubs, ranges, and excluded code with the report. For a concrete execution-based comparison, see [memory-error detection](../../../src/content/docs/guides/memory-error-detection.md). | supported | See evidence assessment E1. |
