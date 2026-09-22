# CBMC: evidence record

Access/review date: 2026-09-22. Existing scope: CBMC 6.x C/C++ bounded checking; guarantees depend on the harness, program model, checked properties, and completeness of exploration.

File: `src/content/docs/tools/cbmc.md`. Baseline SHA-256: `362ddf6e2fded0205110ee89f4334e74d54caf4e1c2a23040ea31ba4672beb34`. Reviewed SHA-256: `2526dfda53cf6e7fd86580abb58cf512c506bdca7350171160eb308a2ba4bb79`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The homepage documents C/C++ bounded checking, memory properties and assertions, solver translation and Windows/Linux/macOS packages in the 6.x line. Unwinding assertions establish whether exploration bounds truncate feasible behavior. Harness assumptions and external models limit guarantees. The four-clause BSD license has separate solver/component terms.

Source sections: CBMC homepage: capabilities, hosts and BSD license; Loop unwinding FAQ; project LICENSE

- [S1](https://www.cprover.org/cbmc/)
- [S2](https://model-checking.github.io/cbmc-training/faq/loop-unwinding.html)
- [S3](https://github.com/diffblue/cbmc/blob/develop/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | CBMC | supported | See evidence assessment E1. |
| description | Check C and C++ assertions and memory safety by translating bounded program executions into solver queries. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Bounded model checking | supported | See evidence assessment E1. |
| tool.techniques[1] | Formal verification | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Built-in safety checks and user assertions are evaluated within the modeled environment and exploration bounds. A successful bounded check is not automatically an unbounded proof. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS; compiler and release-package prerequisites differ by host. | supported | See evidence assessment E1. |
| tool.setup | Supply source, an entry point or verification harness, assumptions, and assertions. Configure loop unwinding and model external functions; compiling and running the target as an ordinary application is not required. | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | This entry covers CBMC for C/C++. JBMC for Java and Kani for Rust are separate tools, not additional CBMC language tags. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | BSD-4-Clause; bundled and optional solvers have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source verifier. Optional external solvers and compute have their own requirements; no paid CBMC edition is needed for the workflow described here. | supported | See evidence assessment E1. |
| tool.website | https://www.cprover.org/cbmc/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | CBMC 6.x C/C++ bounded checking; guarantees depend on the harness, program model, checked properties, and completeness of exploration. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | CBMC capabilities and supported hosts: https://www.cprover.org/cbmc/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Loop unwinding and unwinding assertions: https://model-checking.github.io/cbmc-training/faq/loop-unwinding.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | CBMC license: https://github.com/diffblue/cbmc/blob/develop/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | CBMC converts a representation of possible C/C++ executions into constraints for a solver. It checks selected safety properties and assertions and can return a counterexample showing inputs and steps that violate a property. | supported | See evidence assessment E1. |
| What it does, line 35 | This can reveal defects beyond the concrete inputs in an ordinary test suite. Useful targets include small routines with strict memory-safety requirements or explicit input/output contracts. | supported | See evidence assessment E1. |
| Bounds and proof claims, line 39 | Loops are unwound to explore iterations. If a chosen bound cuts off possible behavior, checking within that bound does not establish correctness beyond it. Unwinding assertions help determine whether further iterations remain possible. | supported | See evidence assessment E1. |
| Bounds and proof claims, line 41 | The harness also matters. Assumptions restrict inputs, and models of external functions determine which effects the verifier considers. An overly restrictive assumption can exclude the very behavior you intended to check. | supported | See evidence assessment E1. |
| A useful first evaluation, line 45 | Choose a small function, state a meaningful assertion, and expose the allowed inputs through a harness. Review both property results and unwinding results. Preserve the bounds, assumptions, and external-function models alongside any claim about the outcome. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| A useful first evaluation, line 47 | See [verification and generated tests](../../../src/content/docs/concepts/verification-and-generated-tests.md) for the difference between bounded checking, fuzzing, and falsification. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
