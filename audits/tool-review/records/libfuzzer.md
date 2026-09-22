# libFuzzer: evidence record

Access/review date: 2026-09-22. Existing scope: LLVM libFuzzer and its in-process harness workflow.

File: `src/content/docs/tools/libfuzzer.md`. Baseline SHA-256: `2ca6d06e9e593469482727e4b476972f2bff250acbc82f29387d7aae7a306de1`. Reviewed SHA-256: `bd68519692b7a9c353289c3b201e9e0eab443f281b2439b11ce1c755c562c3b7`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The documentation describes in-process coverage-guided execution through LLVMFuzzerTestOneInput, repeated calls and corpus mutation. Sanitizers and target assertions provide checks beyond crashes/timeouts. The project status promises important fixes rather than major new features. C/C++ harness scope and LLVM licensing are accurate; integrations with other languages are deliberately excluded.

Source sections: LLVM LibFuzzer: Status, Introduction, Fuzz Target, Usage, Corpus and Options; LLVM license policy

- [S1](https://llvm.org/docs/LibFuzzer.html)
- [S2](https://llvm.org/docs/DeveloperPolicy.html#license)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":6,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | libFuzzer | supported | See evidence assessment E1. |
| description | Exercise an instrumented function with evolving inputs guided by code coverage. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Coverage-guided fuzzing | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | This entry covers the documented C/C++ harness workflow. Other language integrations exist and need separate verification. | supported | See evidence assessment E1. |
| tool.targets[0] | Native programs | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free engine in the LLVM toolchain. You provide the build environment and fuzzing compute. | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 with LLVM exceptions | supported | See evidence assessment E1. |
| tool.website | https://llvm.org/docs/LibFuzzer.html | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | LLVM libFuzzer and its in-process harness workflow. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Crashes and hangs | supported | See evidence assessment E1. |
| tool.findings[1] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[2] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Execution failures and timeouts; detailed memory errors need sanitizer instrumentation and property failures need assertions or another failure signal. | supported | See evidence assessment E1. |
| tool.environment | A compatible LLVM/Clang runtime on a supported platform; sanitizer and target support vary. | supported | See evidence assessment E1. |
| tool.setup | Build an instrumented target with an in-process fuzzing harness. Supply seed inputs and optional sanitizers or assertions; the target executes repeatedly. | supported | See evidence assessment E1. |
| tool.sources[0] | libFuzzer documentation: https://llvm.org/docs/LibFuzzer.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | LLVM licensing: https://llvm.org/docs/DeveloperPolicy.html#license | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 31 | libFuzzer repeatedly passes generated inputs to a target function inside the same process. Instrumentation reports coverage, helping it retain inputs that explore new behavior. Sanitizers can provide additional error detection. | supported | See evidence assessment E1. |
| When it is useful, line 35 | Consider it for a parser, decoder, or library routine that accepts input bytes. A small harness makes that routine accessible to the fuzzer. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 39 | The harness defines what gets exercised. It needs to handle repeated calls, and the target should not terminate the process for ordinary invalid input. A crash is a starting point for investigation, not automatically a security vulnerability. | supported | See evidence assessment E1. |
| What to keep in mind, line 41 | The project documents continued important bug fixes but no expectation of major new features. Check its status when choosing an engine for new work. | supported | See evidence assessment E1. |
| Getting started, line 45 | Follow the official tutorial to build a harness and a small input corpus. Preserve reproducible failures as regression cases. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
