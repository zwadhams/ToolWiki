# Hypothesis: evidence record

Access/review date: 2026-09-22. Existing scope: Hypothesis for Python, based on the 6.168.0 documentation. Third-party extensions and external fuzzing backends are separate integrations.

File: `src/content/docs/tools/hypothesis.md`. Baseline SHA-256: `059df8c9d01c7a6c5f8bef0412952b076f56fefdcb295998e5ca5849559c7cc3`. Reviewed SHA-256: `29ac29db3a19a0742115386045e9a8583bb9c8bf8a50adc6a84336afe9bc934b`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The documentation version matches the preserved scope. Python strategies generate and shrink failing inputs, with ordinary test-runner and stateful workflows. Compatibility names Windows/macOS/Linux and supported Python runtimes. Properties, strategies, budgets and reproducibility limit conclusions. MPL-2.0 applies to the core, with third-party notices. A passing finite run is not an exhaustive proof.

Source sections: 6.168.0 Quickstart, Introduction, Compatibility and MPL-2.0 LICENSE

- [S1](https://hypothesis.readthedocs.io/en/latest/quickstart.html)
- [S2](https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html)
- [S3](https://hypothesis.readthedocs.io/en/latest/compatibility.html)
- [S4](https://github.com/HypothesisWorks/hypothesis/blob/master/LICENSE.txt)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Hypothesis | supported | See evidence assessment E1. |
| description | Generate Python test inputs and simplify failing examples for properties you define. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Callable code | supported | See evidence assessment E1. |
| tool.techniques[0] | Property-based testing | supported | See evidence assessment E1. |
| tool.findings[0] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Your assertions and test behavior define failure. Hypothesis generates and shrinks examples; it does not provide a universal security or correctness specification for the target. | supported | See evidence assessment E1. |
| tool.environment | Windows, Linux, and macOS are regularly tested, alongside documented Python runtimes. Check the current Python version requirements. | supported | See evidence assessment E1. |
| tool.setup | A Python test harness, input strategies, and properties or assertions are required. Use a supported Python runtime and optionally pytest or unittest; additional target dependencies may require builds. | supported | See evidence assessment E1. |
| tool.languages[0] | Python | supported | See evidence assessment E1. |
| tool.languageNote | Python is the test API. A test can call other systems through an integration, but this does not imply direct static analysis of their implementation languages. | supported | See evidence assessment E1. |
| tool.targets[0] | Functions | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MPL-2.0; some third-party files retain additional license terms | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source Python testing library. No paid service is required for input generation, shrinking, or the documented local test workflow. | supported | See evidence assessment E1. |
| tool.website | https://hypothesis.readthedocs.io/en/latest/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Hypothesis for Python, based on the 6.168.0 documentation. Third-party extensions and external fuzzing backends are separate integrations. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Hypothesis quickstart: https://hypothesis.readthedocs.io/en/latest/quickstart.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Hypothesis introduction and example shrinking: https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Supported runtimes and platforms: https://hypothesis.readthedocs.io/en/latest/compatibility.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Hypothesis license: https://github.com/HypothesisWorks/hypothesis/blob/master/LICENSE.txt | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | You write a test that should hold for many inputs and describe those inputs using strategies. Hypothesis generates examples, runs the test, and tries to simplify a failure into a smaller example that remains useful for debugging. | supported | See evidence assessment E1. |
| What it does, line 37 | For example, a serialization test might assert that decoding an encoded value recovers the original value. A generated edge case can reveal a broken assumption that a few handwritten examples miss. | supported | See evidence assessment E1. |
| Properties and strategies, line 41 | The property defines what is correct; the strategy defines which inputs are explored. A test that only checks that no exception occurs will miss incorrect results that return normally. Overly restrictive strategies can exclude important cases. | supported | See evidence assessment E1. |
| Properties and strategies, line 43 | Hypothesis works with ordinary Python testing workflows and also supports stateful tests. Stateful operation sequences are different from automatically understanding a physical system's temporal-logic specification. | supported | See evidence assessment E1. |
| Interpreting results, line 47 | A failing example demonstrates that the test failed for that execution. Investigate whether the problem is in the implementation, the property, or the test setup. Repeatability matters: hidden state and flaky external behavior can interfere with replay and shrinking. | supported | See evidence assessment E1. |
| Interpreting results, line 49 | A passing run covers the examples exercised within its configured budget; it is not a proof over every possible input. | supported | See evidence assessment E1. |
| A useful first evaluation, line 53 | Start with a deterministic function and a meaningful property such as an invariant or round trip. Inspect the reported failing example, preserve a regression case, and refine the strategy when its domain differs from valid production inputs. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
