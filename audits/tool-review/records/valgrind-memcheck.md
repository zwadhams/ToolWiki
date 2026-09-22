# Valgrind Memcheck: evidence record

Access/review date: 2026-09-22. Existing scope: Memcheck only; Valgrind includes other tools for different analysis tasks.

File: `src/content/docs/tools/valgrind-memcheck.md`. Baseline SHA-256: `82cc249074663421d526729a8a4165735c40d4f654f3b7c7a80ad8af7207a9a5`. Reviewed SHA-256: `1c7e8c0fdee550e694bf4f480685ea08d0f72e50c068aecd465a5855a797bb68`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

Memcheck instruments executed native code and checks addressability, definedness, allocation/deallocation and leaks. Debug information improves source attribution without requiring sanitizer rebuilding. Linux/FreeBSD and limited Darwin support are documented; Windows is a historical port. GNU GPL-2.0 licensing and free use are supported. Empty results concern only exercised behavior.

Source sections: Memcheck manual: error explanations and suppressions; Platforms; About Valgrind: license

- [S1](https://valgrind.org/info/platforms.html)
- [S2](https://valgrind.org/docs/manual/mc-manual.html)
- [S3](https://valgrind.org/info/)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":21,"supported with qualification":7,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Valgrind Memcheck | supported | See evidence assessment E1. |
| description | Detect invalid memory access, uninitialized-value use, and leaks while a native program runs. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Runtime memory checking | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | C and C++ are the focus of this entry, not an exclusive language list. Support depends on the executable, operating system, and architecture. | supported | See evidence assessment E1. |
| tool.targets[0] | Native programs | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free Memcheck tool in Valgrind. No paid upgrade is needed for the memory checks described here. | supported | See evidence assessment E1. |
| tool.license | GPL-2.0; see the project for component-specific terms. | supported | See evidence assessment E1. |
| tool.website | https://valgrind.org/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Memcheck only; Valgrind includes other tools for different analysis tasks. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findingNote | Observes memory operations in executed paths. Includes invalid accesses, uninitialized values, and leak checks; unexecuted behavior is not covered. | supported | See evidence assessment E1. |
| tool.environment | Supported OS/CPU pairs include Linux and FreeBSD. Darwin support has version limits; native Windows is not a maintained target. | supported | See evidence assessment E1. |
| tool.setup | An executable program and inputs that exercise it. Rebuilding is usually unnecessary; debug information improves reports. | supported | See evidence assessment E1. |
| tool.sources[0] | Supported host platforms: https://valgrind.org/info/platforms.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Memcheck manual: https://valgrind.org/docs/manual/mc-manual.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | About Valgrind and licensing: https://valgrind.org/info/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | Memcheck observes a program's memory operations during execution. It reports problems such as invalid reads and writes, incorrect deallocation, use of uninitialized values, and memory leaks. | supported | See evidence assessment E1. |
| When it is useful, line 37 | Use it to investigate memory behavior while running representative native-code tests. Debug information helps relate reports to the source. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| What to keep in mind, line 41 | It analyzes the execution you exercise. An untested path can still contain a defect. Instrumentation also slows execution, and platform support must be checked before planning a workflow. | supported | See evidence assessment E1. |
| What to keep in mind, line 43 | Memcheck is dynamic analysis, but it is not a web DAST scanner. | supported | See evidence assessment E1. |
| Getting started, line 47 | Begin with the Memcheck manual and a reproducible test case. Review error contexts before suppressing reports, and keep suppressions narrow enough to preserve useful findings. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
