# ThreadSanitizer (Clang): evidence record

Access/review date: 2026-09-22. Existing scope: Clang/LLVM ThreadSanitizer C/C++ data-race checking. Target support and synchronization modeling depend on the compiler/runtime release.

File: `src/content/docs/tools/thread-sanitizer.md`. Baseline SHA-256: `7462ebf0d379d0dbc3588fc8ad60b26b65a2a4c05b68b701eae8477ada9a8b89`. Reviewed SHA-256: `233103db4ff8ad8b0229f3d142658364ff6382d61c44c469995053c861616683`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The official platform list supports the named 64-bit hosts and does not list native Windows. Compile/link instrumentation and observable synchronization are required. The unsynchronized shared counter contains conflicting accesses; the example does not guarantee discovery in every run. TSan addresses races rather than all concurrency failures. Separate ASan/TSan builds and release/target qualifications remain appropriate.

Source sections: Clang ThreadSanitizer: Supported Platforms, Usage and Limitations; C++ manual; compiler-rt LICENSE

- [S1](https://clang.llvm.org/docs/ThreadSanitizer.html)
- [S2](https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual)
- [S3](https://github.com/llvm/llvm-project/blob/main/compiler-rt/LICENSE.TXT)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":21,"supported with qualification":11,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | ThreadSanitizer (Clang) | supported | See evidence assessment E1. |
| description | Detect data races during executions of instrumented multithreaded C and C++ programs. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Runtime race detection | supported | See evidence assessment E1. |
| tool.techniques[1] | Sanitizer instrumentation | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | This entry covers the Clang C/C++ runtime. Go's race detector is a separate toolchain integration and is not included in these language tags. | supported | See evidence assessment E1. |
| tool.targets[0] | Multithreaded native programs | supported | See evidence assessment E1. |
| tool.findings[0] | Concurrency issues | supported | See evidence assessment E1. |
| tool.findingNote | Finds observed conflicting memory accesses without the required synchronization. It is not a general detector of deadlocks, scheduling bugs, or all concurrency failures. | supported | See evidence assessment E1. |
| tool.environment | Supported 64-bit OS/CPU pairs include Linux, macOS, Android, FreeBSD, and NetBSD. The Clang documentation does not list native Windows support. | supported | See evidence assessment E1. |
| tool.setup | Compile and link with ThreadSanitizer and run a workload that exercises shared state. Instrument relevant libraries and use supported synchronization; plan separate ASan and TSan builds. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 WITH LLVM-exception for current LLVM compiler-rt; some components retain other notices | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free compiler/runtime component. The instrumented program can require substantially more time and memory. | supported | See evidence assessment E1. |
| tool.website | https://clang.llvm.org/docs/ThreadSanitizer.html | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Clang/LLVM ThreadSanitizer C/C++ data-race checking. Target support and synchronization modeling depend on the compiler/runtime release. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Clang usage, supported targets, and limitations: https://clang.llvm.org/docs/ThreadSanitizer.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | C/C++ race detection guide and instrumentation requirements: https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Runtime licensing: https://github.com/llvm/llvm-project/blob/main/compiler-rt/LICENSE.TXT | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| When to use it, line 33 | Use ThreadSanitizer when multiple threads access shared data and you need evidence about synchronization. A memory-bounds checker answers a different question; a valid address can still participate in a race. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: two unsynchronized writers, line 37 | **Illustrative example, not run here.** Save `race.cpp` on a supported Clang C++ host: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: two unsynchronized writers, line 39 | ```cpp<br>#include &lt;thread&gt;<br>int counter = 0;<br>void increment() {<br>    for (int i = 0; i &lt; 1000; ++i) ++counter;<br>}<br>int main() {<br>    std::thread first(increment);<br>    std::thread second(increment);<br>    first.join();<br>    second.join();<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: two unsynchronized writers, line 53 | Build and execute the test: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: two unsynchronized writers, line 55 | ```sh<br>clang++ -std=c++17 -O1 -g -fsanitize=thread -pthread race.cpp -o race<br>./race<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: two unsynchronized writers, line 60 | Look for a data-race report with the conflicting accesses and their threads. A meaningful correction is synchronization, such as a mutex or an appropriately designed atomic operation. Merely obtaining the expected final count would not establish race freedom. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 64 | Results depend on the exercised workload and the synchronization the runtime can observe. Missing instrumentation or broad suppressions can obscure relevant events. An execution with no report is not a proof for every possible schedule. | supported | See evidence assessment E1. |
| Limits, line 66 | Use a separate build from [AddressSanitizer](../../../src/content/docs/tools/address-sanitizer.md) when evaluating both kinds of defects. | supported | See evidence assessment E1. |
