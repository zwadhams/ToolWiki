# AddressSanitizer (Clang): evidence record

Access/review date: 2026-09-22. Existing scope: Clang/LLVM AddressSanitizer. Leak and stack-lifetime checks have platform and configuration limits. This is not a binary-only substitute for an instrumented build.

File: `src/content/docs/tools/address-sanitizer.md`. Baseline SHA-256: `e24e0dbbe29652fd1df243a2ac3bd9895639fc5b8faaf285425259ca1d21a99a`. Reviewed SHA-256: `165d35cca1fe4db7151366a9b6eb67a9f0395885e27ea88316952d0bfe2d190e`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The Clang guide supports compile/link instrumentation, executed out-of-bounds and use-after-free checks, platform-dependent leak/stack checks, symbols and excluded-function limitations. It does not promise general uninitialized-value detection. The displayed allocation has two elements, so index 2 is outside it; -O0 avoids optimizing away the demonstration. The intended report was not observed in this audit. LLVM runtime licensing supports the free component classification.

Source sections: Clang AddressSanitizer: Introduction, Usage, Additional checks, Supported Platforms and Limitations; C/C++ guide; compiler-rt LICENSE

- [S1](https://clang.llvm.org/docs/AddressSanitizer.html)
- [S2](https://github.com/google/sanitizers/wiki/AddressSanitizer)
- [S3](https://github.com/llvm/llvm-project/blob/main/compiler-rt/LICENSE.TXT)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":23,"supported with qualification":10,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | AddressSanitizer (Clang) | supported | See evidence assessment E1. |
| description | Detect selected memory errors while executing a program built with AddressSanitizer instrumentation. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Binaries | supported | See evidence assessment E1. |
| tool.techniques[0] | Runtime memory checking | supported | See evidence assessment E1. |
| tool.techniques[1] | Sanitizer instrumentation | supported | See evidence assessment E1. |
| tool.languages[0] | C | supported | See evidence assessment E1. |
| tool.languages[1] | C++ | supported | See evidence assessment E1. |
| tool.languageNote | This entry covers Clang/LLVM C/C++ workflows. Other compiler integrations and language frontends have their own support limits. | supported | See evidence assessment E1. |
| tool.targets[0] | Native programs | supported | See evidence assessment E1. |
| tool.targets[1] | Libraries | supported | See evidence assessment E1. |
| tool.findings[0] | Memory safety | supported | See evidence assessment E1. |
| tool.findingNote | Detects instrumented, executed memory errors such as out-of-bounds access and use-after-free. It does not cover all undefined behavior or general uninitialized-value use. | supported | See evidence assessment E1. |
| tool.environment | Supported Clang/runtime OS and CPU combinations. The documentation lists Linux, macOS, Windows, and other platforms with differences in available checks; verify the chosen target. | supported | See evidence assessment E1. |
| tool.setup | Compile and link with AddressSanitizer, then exercise the resulting executable. Debug symbols help reports; uninstrumented dependencies and excluded functions limit coverage. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | Apache-2.0 WITH LLVM-exception for current LLVM compiler-rt; some components retain other notices | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free compiler/runtime component. No paid analysis edition is required; instrumented execution uses additional memory and compute. | supported | See evidence assessment E1. |
| tool.website | https://clang.llvm.org/docs/AddressSanitizer.html | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Clang/LLVM AddressSanitizer. Leak and stack-lifetime checks have platform and configuration limits. This is not a binary-only substitute for an instrumented build. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Current checks, usage, and platform limits: https://clang.llvm.org/docs/AddressSanitizer.html | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Project guide to C/C++ instrumentation: https://github.com/google/sanitizers/wiki/AddressSanitizer | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Runtime licensing: https://github.com/llvm/llvm-project/blob/main/compiler-rt/LICENSE.TXT | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| Where it fits, line 33 | AddressSanitizer adds a memory-error detector to executions generated by tests or fuzzers. It pairs naturally with [AFL++](../../../src/content/docs/tools/afl-plus-plus.md) or [libFuzzer](../../../src/content/docs/tools/libfuzzer.md). | supported | See evidence assessment E1. |
| Worked example: an out-of-bounds write, line 37 | **Illustrative example, not run here.** With Clang and its sanitizer runtime installed on a supported host, save `bounds.c`: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: an out-of-bounds write, line 39 | ```c<br>#include &lt;stdlib.h&gt;<br>int main(void) {<br>    int *values = malloc(2 * sizeof(*values));<br>    if (!values) return 1;<br>    values[2] = 7;<br>    free(values);<br>    return 0;<br>}<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: an out-of-bounds write, line 50 | Build and run this small test in a Unix-style shell: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Worked example: an out-of-bounds write, line 52 | ```sh<br>clang -O0 -g -fsanitize=address -fno-omit-frame-pointer bounds.c -o bounds<br>./bounds<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Worked example: an out-of-bounds write, line 57 | The intended result is a heap-buffer-overflow report for the write past the two-element allocation. Inspect the reported access and allocation locations. Correct the index to an allocated element and repeat. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Interpret coverage, line 61 | A successful execution only covers the behavior that ran. Keep the build flags, workload, and suppression settings with the report. | supported | See evidence assessment E1. |
| Interpret coverage, line 63 | See [memory-error detection](../../../src/content/docs/guides/memory-error-detection.md) to compare an instrumented build with static checking and Memcheck's executable instrumentation. | supported | See evidence assessment E1. |
