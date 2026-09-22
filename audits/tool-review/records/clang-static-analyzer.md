# Clang Static Analyzer: evidence record

Access/review date: 2026-09-22. Existing scope: Clang Static Analyzer; separate from ordinary compiler warnings and clang-tidy.

File: `src/content/docs/tools/clang-static-analyzer.md`. Baseline SHA-256: `b95d2dd4d6ed2d329212f9f0589cd3ec9b8fd551b8a1ea77722b7f5ab123d28e`. Reviewed SHA-256: `dc48f5a5b18187f6e55641f75a86b6f746a3f1fa78da7a094c02c350c3e785cf`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The official introduction explicitly identifies C, C++, Objective-C and path-sensitive interprocedural symbolic execution. The checker and command-line documentation support memory/logic checks and build-context requirements, with experimental checkers distinguished. LLVM licensing supplies Apache-2.0 with LLVM exceptions. The page does not confuse compiler warnings or clang-tidy with this analyzer.

Source sections: Clang Static Analyzer introduction, Available Checkers and User Docs; LLVM Developer Policy: License

- [S1](https://clang.llvm.org/docs/ClangStaticAnalyzer.html)
- [S2](https://llvm.org/docs/DeveloperPolicy.html#license)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":6,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Clang Static Analyzer | supported | See evidence assessment E1. |
| description | Explore possible execution paths to find bugs in C, C++, and Objective-C code. | supported | See evidence assessment E1. |
| tool.modes[0] | Static | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Source code | supported | See evidence assessment E1. |
| tool.techniques[0] | Symbolic execution | supported | See evidence assessment E1. |
| tool.techniques[1] | Bug finding | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languages[2] | Objective-C | supported | See evidence assessment E1. |
| tool.languageNote | Language and build compatibility depend on the Clang version and the project's compiler options. | supported | See evidence assessment E1. |
| tool.targets[0] | Source code | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Included with the open-source Clang toolchain, without a separate analyzer license fee. | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 with LLVM exceptions | supported | See evidence assessment E1. |
| tool.website | https://clang.llvm.org/docs/ClangStaticAnalyzer.html | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Clang Static Analyzer; separate from ordinary compiler warnings and clang-tidy. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findings[1] | Logic errors | supported | See evidence assessment E1. |
| tool.findingNote | Selected path-sensitive checkers, including pointer and lifetime defects. Checker maturity and modeling limit coverage. | supported | See evidence assessment E1. |
| tool.environment | A compatible Clang build host; command-line and Xcode integrations have different platform prerequisites. | supported | See evidence assessment E1. |
| tool.setup | Supply source and accurate compiler options, commonly through a build capture or compilation database. No runtime harness. | supported | See evidence assessment E1. |
| tool.sources[0] | Clang Static Analyzer documentation: https://clang.llvm.org/docs/ClangStaticAnalyzer.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | LLVM licensing: https://llvm.org/docs/DeveloperPolicy.html#license | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 31 | Clang Static Analyzer performs path-sensitive analysis to find bugs in C-family programs. It reasons about possible execution paths without running the target program on concrete test inputs. | supported | See evidence assessment E1. |
| When it is useful, line 35 | Consider it when working on native code and investigating defects such as invalid pointer use. It is part of Clang and can fit into a build-oriented workflow. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 39 | The analyzer needs an accurate view of the code and build configuration. Its modeled paths do not cover all possible program behavior. Review the available checkers and their maturity before treating their output as equally reliable. | supported | See evidence assessment E1. |
| Getting started, line 43 | Follow the analyzer's documentation for a build-integrated run. Keep the compiler configuration and enabled checker set with your results so later runs are comparable. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
