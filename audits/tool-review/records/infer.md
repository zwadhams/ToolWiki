# Infer (Pulse): evidence record

Access/review date: 2026-09-22. Existing scope: Pulse-focused entry using the current 1.3.0 documentation. This is not a combined capability list for every Infer checker.

File: `src/content/docs/tools/infer.md`. Baseline SHA-256: `b1d6cc7fe2a50fdc857d54d388d3dbe321ae1d1f09252b37ee4e3c1cfe7b7e8f`. Reviewed SHA-256: `d3c0098a7eac4c6d5d74095a1ffce20b11e42c87ce9d8eafef013558d31f61c3`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The versioned documentation supports C/C++/Objective-C, Java and Hack; Erlang and Rust are experimental and appropriately omitted. Pulse is interprocedural and reports manifest memory/value issues; latent issues can become reportable at callers. Installation supports Linux binaries, source builds and Docker. The capture/Pulse command structure follows the official examples. Exact C example output remains unexecuted; missing models and capture failures remain explicit limitations.

Source sections: Infer 1.3.0 Pulse: supported languages, latent issues, unknown functions and issue types; Getting Started; MIT LICENSE

- [S1](https://fbinfer.com/docs/checker-pulse/)
- [S2](https://fbinfer.com/docs/getting-started/)
- [S3](https://github.com/facebook/infer/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":25,"supported with qualification":12,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Infer (Pulse) | supported | See evidence assessment E1. |
| description | Find memory and value errors across function calls using Infer's Pulse analysis. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | SAST | supported | See evidence assessment E1. |
| tool.techniques[1] | Symbolic execution | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | Objective-C | supported | See evidence assessment E1. |
| tool.languages[3] | Java | supported | See evidence assessment E1. |
| tool.languages[4] | Hack | supported | See evidence assessment E1. |
| tool.languageNote | Selected supported Pulse languages. Other Infer checkers have different coverage; experimental Erlang and Rust support is not included in these tags. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Pulse checks modeled paths for selected memory, value, and assertion errors. Unknown functions and missing models can affect both false positives and missed findings. | supported | See evidence assessment E1. |
| tool.environment | The official quickstart provides Linux binaries, source builds, and Docker images. Check the release and compiler requirements for your host; use a compatible Linux environment from Windows. | supported | See evidence assessment E1. |
| tool.setup | Capture a supported compilation with Infer, including dependencies and build configuration. No runtime test inputs are needed for the static analysis. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT for Infer; dependencies and bundled components have their own terms | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free local analyzer. Pulse does not require a paid edition; build infrastructure and compute are separate costs. | supported | See evidence assessment E1. |
| tool.website | https://fbinfer.com/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Pulse-focused entry using the current 1.3.0 documentation. This is not a combined capability list for every Infer checker. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Pulse languages, diagnostics, and modeling limits: https://fbinfer.com/docs/checker-pulse/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation and supported distribution routes: https://fbinfer.com/docs/getting-started/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Infer license: https://github.com/facebook/infer/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| When to use it, line 33 | Use Pulse to investigate errors that involve calls between functions, such as a value becoming null before another function dereferences it. It complements the pattern and rule workflows in [Semgrep CE](../../../src/content/docs/tools/semgrep-ce.md). | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| When to use it, line 35 | Capturing the real build matters. A missing compilation unit or an unmodeled library changes the program the analyzer sees. Infer's capture step is preparation for static analysis, even when it invokes a compiler. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: a definite null dereference, line 39 | **Illustrative example, not run here.** With Infer and a compatible Clang installed, save this as `null_access.c`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: a definite null dereference, line 41 | ```c<br>int read_value(void) {<br>    int *value = 0;<br>    return *value;<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: a definite null dereference, line 48 | Run the capture and analysis: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: a definite null dereference, line 50 | ```sh<br>infer run --pulse -- clang -c null_access.c<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: a definite null dereference, line 54 | Inspect the report for a null-dereference diagnostic at `*value`. Then give the pointer a valid object and compare the result. The diagnostic demonstrates one selected check; it does not measure coverage across your application. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Interpret a clean result, line 58 | Pulse can retain an issue until a caller establishes the conditions needed to report it. It also models missing functions with assumptions. Review capture failures, skipped code, and external models before treating silence as evidence. | supported | See evidence assessment E1. |
| Interpret a clean result, line 60 | For runtime alternatives, see [memory-error detection](../../../src/content/docs/guides/memory-error-detection.md). | supported | See evidence assessment E1. |
