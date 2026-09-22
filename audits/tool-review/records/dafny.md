# Dafny: evidence record

Access/review date: 2026-09-22. Existing scope: Dafny verification workflow and installation documentation, distinct from running compiled output.

File: `src/content/docs/tools/dafny.md`. Baseline SHA-256: `4f842c188f9db6c5bcdfdccf97fbe75b6b05747bd12f15595a6eee9c23c0fb46`. Reviewed SHA-256: `75c1db5ed92b03828feb5b2d7bbf558a6f1dfad6b0a4b7adb9f6d23b9ef01e1f`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Dafny verifies its own language against annotations; compilation targets are not arbitrary source languages it verifies. Contracts, invariants and termination information generate proof obligations. Host packages and solver/backend prerequisites support the environment notes. Unknown or timed-out obligations do not establish concrete counterexamples. MIT licensing and specification-dependent guarantees are accurately scoped.

Source sections: Online Tutorial: pre/postconditions, loops and termination; Installation: hosts, verifier and backend prerequisites; MIT LICENSE

- [S1](https://dafny.org/)
- [S2](https://dafny.org/latest/OnlineTutorial/guide)
- [S3](https://dafny.org/latest/Installation)
- [S4](https://github.com/dafny-lang/dafny/blob/master/LICENSE.txt)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Dafny | supported | See evidence assessment E1. |
| description | Verify programs written in Dafny against contracts, invariants, and other specifications. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Deductive verification | supported | See evidence assessment E1. |
| tool.techniques[1] | Formal verification | supported | See evidence assessment E1. |
| tool.findings[0] | Specification violations | supported | See evidence assessment E1. |
| tool.findings[1] | Type errors | supported | See evidence assessment E1. |
| tool.findingNote | Checks Dafny program well-formedness and verification obligations. An unproved obligation does not by itself demonstrate an executable counterexample. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS distributions; command-line and editor workflows. Compiling output requires the chosen backend's toolchain. | supported | See evidence assessment E1. |
| tool.setup | Write Dafny source with contracts, invariants, and supporting annotations; use the verifier and supported solver. Ordinary runtime tests are not required to discharge proof obligations. | supported | See evidence assessment E1. |
| tool.languages[0] | Dafny | supported | See evidence assessment E1. |
| tool.languageNote | Dafny is the input programming and specification language. Compilation targets such as C# or Java are not languages of arbitrary existing source that Dafny automatically verifies. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT; dependencies and compilation runtimes have separate licenses | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source language and verification toolchain. Optional hosting, support, or backend toolchains can have separate costs; there is no required paid verification tier. | supported | See evidence assessment E1. |
| tool.website | https://dafny.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Dafny verification workflow and installation documentation, distinct from running compiled output. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Dafny project: https://dafny.org/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Language and verification tutorial: https://dafny.org/latest/OnlineTutorial/guide | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Installation and backend prerequisites: https://dafny.org/latest/Installation | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Dafny license: https://github.com/dafny-lang/dafny/blob/master/LICENSE.txt | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | Dafny combines a programming language with a verifier. You describe expected behavior using preconditions, postconditions, assertions, loop invariants, and termination information. Verification checks whether the implementation satisfies those obligations under the stated assumptions. | supported | See evidence assessment E1. |
| What it does, line 37 | It is useful for learning specification-driven development or implementing components whose properties you want to reason about explicitly. | supported | See evidence assessment E1. |
| Specifications are part of the work, line 41 | A function contract can describe what a caller must provide and what the function guarantees. Loops may need invariants that make the reasoning visible to the verifier. Proofs can require helper lemmas or more precise specifications. | supported | See evidence assessment E1. |
| Specifications are part of the work, line 43 | A weak or mistaken specification can prove the wrong property. Verification does not substitute for deciding what the software should do. | supported | See evidence assessment E1. |
| Interpreting failures, line 47 | When a property cannot be established, examine the reported obligation, assumptions, and annotations. The implementation might be incorrect, but the verifier may also need an invariant or more solver resources. Keep timeouts and unknown results separate from demonstrated violations. | supported | See evidence assessment E1. |
| A useful first evaluation, line 51 | Follow the introductory tutorial with a small method and a precise postcondition. Try a deliberately incorrect implementation and observe the verification result, then repair it. Treat generated executable code and external integrations as additional boundaries to review and test. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
