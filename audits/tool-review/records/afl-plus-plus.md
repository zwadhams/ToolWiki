# AFL++: evidence record

Access/review date: 2026-09-22. Existing scope: Current stable repository documentation identifying version 5.03c. Earlier releases can have different licensing; the current license is not inferred from older Apache-only descriptions.

File: `src/content/docs/tools/afl-plus-plus.md`. Baseline SHA-256: `cc3834c79ba675065bf6760a6b29ff72b6d74a4f5fddeb923d99f086c0067149`. Reviewed SHA-256: `419653ffe060ec61d356f77610948c6943eb9f7eb8c0b2eb5aa0040d62c7a6d0`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The repository identifies 5.03c and the combined fuzzer as AGPL-3.0-or-later, with Apache and other component licenses and an optional donation-based commercial route. Coverage feedback, instrumented builds and binary-only modes are documented with host restrictions. Crashes/timeouts are not equivalent to unique vulnerabilities; assertions/sanitizers supply additional failure signals. No paid feature tier is inferred from licensing alternatives.

Source sections: 5.03c README and Licensing; INSTALL; Binary-only targets

- [S1](https://github.com/AFLplusplus/AFLplusplus)
- [S2](https://github.com/AFLplusplus/AFLplusplus/blob/stable/docs/INSTALL.md)
- [S3](https://github.com/AFLplusplus/AFLplusplus/blob/stable/docs/fuzzing_binary-only_targets.md)
- [S4](https://github.com/AFLplusplus/AFLplusplus/blob/stable/LICENSING.md)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":30,"supported with qualification":6,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | AFL++ | supported | See evidence assessment E1. |
| description | Mutate inputs using execution feedback to find crashes, hangs, and failures exposed by a fuzzing target. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Coverage-guided fuzzing | supported | See evidence assessment E1. |
| tool.findings[0] | Crashes and hangs | supported | See evidence assessment E1. |
| tool.findings[1] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[2] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Crash and hang detection is built in. Memory diagnostics depend on instrumentation such as sanitizers; specification failures require an assertion or another failure signal in the target. | supported | See evidence assessment E1. |
| tool.environment | Linux is a primary workflow. macOS is documented with mode restrictions; binary-only modes depend on architecture, OS, and emulator support. Use a compatible Linux environment from Windows. | supported | See evidence assessment E1. |
| tool.setup | Build an instrumented target when source is available, or configure a supported binary-only mode. Provide an input interface or harness, seed inputs, and a reproducible execution environment. | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | C/C++ source builds are documented workflows. Binary-only modes work at the executable level, so support depends on architecture and execution mode rather than a universal source-language list. | supported | See evidence assessment E1. |
| tool.targets[0] | Native programs | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.targets[2] | Native binaries | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | AGPL-3.0-or-later for the current combined fuzzer; Apache-2.0 and other licenses for specified components | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free under the current open-source terms. The project also documents an optional commercial licensing route with a donation requirement; it changes licensing terms rather than unlocking a paid detection tier. Check the license of the exact release and components you use. | supported | See evidence assessment E1. |
| tool.website | https://aflplus.plus/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current stable repository documentation identifying version 5.03c. Earlier releases can have different licensing; the current license is not inferred from older Apache-only descriptions. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | AFL++ workflow, findings, and current licensing: https://github.com/AFLplusplus/AFLplusplus | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Installation and platform restrictions: https://github.com/AFLplusplus/AFLplusplus/blob/stable/docs/INSTALL.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Binary-only fuzzing modes: https://github.com/AFLplusplus/AFLplusplus/blob/stable/docs/fuzzing_binary-only_targets.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[3] | Licensing details and alternatives: https://github.com/AFLplusplus/AFLplusplus/blob/stable/LICENSING.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 35 | AFL++ evolves a collection of input samples using feedback from repeated target executions. Inputs that expose new behavior help guide later mutations. It saves interesting failures so you can reproduce and investigate them. | supported | See evidence assessment E1. |
| What it does, line 37 | The target may read input from a file or standard input, or use a custom harness for a library. A small deterministic target generally makes failures easier to reproduce. | supported | See evidence assessment E1. |
| Source available versus binary only, line 41 | With source, compile the target with compatible instrumentation. Without source, a supported mode can obtain feedback through mechanisms such as emulation or dynamic instrumentation. Those modes have distinct platform and architecture restrictions. | supported | See evidence assessment E1. |
| Source available versus binary only, line 43 | Both workflows execute a binary. This is dynamic testing, even though a source build or binary preparation step happens first. | supported | See evidence assessment E1. |
| What counts as a failure?, line 47 | Crashes and timeouts are useful starting points. A sanitizer can make otherwise silent memory errors visible; an assertion can expose a violated invariant. Without an appropriate failure detector, an incorrect output may look like an ordinary successful execution. | supported | See evidence assessment E1. |
| What counts as a failure?, line 49 | Deduplicate and replay failures before estimating their significance. More coverage or more saved crashes does not directly measure the number of distinct vulnerabilities. | supported | See evidence assessment E1. |
| What counts as a failure?, line 51 | See [verification and generated tests](../../../src/content/docs/concepts/verification-and-generated-tests.md) for the comparison with property-based testing and temporal falsification. | supported | See evidence assessment E1. |
