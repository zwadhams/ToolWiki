---
title: "Choosing memory-error checks"
description: "Compare source analysis, instrumented builds, and runtime checking of native executables."
---

Memory errors can be investigated before execution or while tests exercise a program. Choose a workflow that fits the source, build control, and executable you actually have.

## Compare the workflows

| Starting point | Tools to consider | Preparation | Important limit |
| --- | --- | --- | --- |
| Source and build configuration | [Infer Pulse](../../tools/infer/), [Cppcheck](../../tools/cppcheck/), [Clang Static Analyzer](../../tools/clang-static-analyzer/) | Capture or configure the source analysis. | Models and selected checkers determine coverage. |
| Source plus an instrumentable build | [AddressSanitizer](../../tools/address-sanitizer/) | Compile and link with instrumentation, then run tests or fuzzing. | It checks executed behavior and does not diagnose every class of memory defect. |
| Uninitialized-value use with rebuild control | [MemorySanitizer](../../tools/memory-sanitizer/) | Instrument the program and arrange compatible dependencies. | Incomplete instrumentation can produce misleading reports; platform restrictions apply. |
| Rust code and a Cargo test suite | [Miri](../../tools/miri/) | Use a compatible nightly toolchain and interpreted tests. | Supported operations and exercised executions limit coverage. |
| A compatible native executable | [Memcheck](../../tools/valgrind-memcheck/), [Dr. Memory](../../tools/dr-memory/) | Run it under the selected checker with a reproducible workload. | Platform support, workload coverage, and runtime overhead matter. |
| A precise property and environment model | [CBMC](../../tools/cbmc/), [Frama-C](../../tools/frama-c/), [Polyspace Code Prover](../../tools/polyspace-code-prover/) | Configure bounds, contracts, ranges, or other required modeling. | Proof claims depend on the model and completeness conditions. |

[Compare Infer, AddressSanitizer, and Memcheck](../../compare/?tools=tools%2Finfer%2Ctools%2Faddress-sanitizer%2Ctools%2Fvalgrind-memcheck).

For a Windows executable, consider [Dr. Memory's documented Windows workflow](../../tools/dr-memory/). It instruments execution without requiring a sanitizer build. Check the selected release's architecture and application limitations, and keep symbols for useful diagnostic locations. [Compare Dr. Memory, Memcheck, and AddressSanitizer](../../compare/?tools=tools%2Fdr-memory%2Ctools%2Fvalgrind-memcheck%2Ctools%2Faddress-sanitizer/) before choosing a setup.

## A useful first experiment

Use the out-of-bounds example on the AddressSanitizer page as a controlled starting point. Keep two revisions: the invalid index and a corrected index.

For a static tool, verify that the intended function was included in analysis. For a runtime tool, verify that the test actually reaches the access. Record build flags and the exercised input with each report.

Then try a defect outside that first check's scope. For example, [Memcheck's manual](https://valgrind.org/docs/manual/mc-manual.html) documents uninitialized-value checks, while [AddressSanitizer's documented checks](https://clang.llvm.org/docs/AddressSanitizer.html) focus on other memory errors. Shared Memory safety tags do not imply identical coverage.

## Add fuzzing deliberately

[AFL++](../../tools/afl-plus-plus/) and [libFuzzer](../../tools/libfuzzer/) can generate executions. A sanitizer makes certain memory errors observable during those executions. The generator and the detector serve different roles.

A crash count is not a count of unique defects. Save, minimize, and reproduce inputs before drawing conclusions.

## Check undefined behavior

[UndefinedBehaviorSanitizer](../../tools/undefined-behavior-sanitizer/) adds selected arithmetic and pointer checks to instrumented executions, including signed integer overflow. Its check groups differ from AddressSanitizer's memory-error coverage. [Compare ASan, UBSan, and TSan](../../compare/?tools=tools%2Faddress-sanitizer%2Ctools%2Fundefined-behavior-sanitizer%2Ctools%2Fthread-sanitizer) and choose the checks appropriate to the suspected defect.

## Races are another question

Two threads can access a valid allocation without appropriate synchronization. [ThreadSanitizer](../../tools/thread-sanitizer/) checks for observed data races; it complements memory-bounds checking. Use separate sanitizer builds and representative concurrent workloads.

A clean test run is evidence about the exercised behavior, not all possible paths and schedules.

[Valgrind Helgrind](../../tools/valgrind-helgrind/) offers another native concurrency workflow; [the Go race detector](../../tools/go-race-detector/) covers race-enabled Go builds.
