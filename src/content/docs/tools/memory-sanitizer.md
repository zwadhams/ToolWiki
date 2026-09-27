---
title: "MemorySanitizer"
description: "Detect uses of uninitialized values while an instrumented native program runs."
tool:
  aliases: ["MSan","Memory Sanitizer"]
  searchTerms: ["uninitialized memory","uninitialized values","Clang memory sanitizer"]
  modes: ["Dynamic"]
  inputTypes: ["Binaries"]
  techniques: ["Runtime memory checking","Sanitizer instrumentation"]
  languages: ["C","C++"]
  languageNote: "Clang-instrumented native code with compatible runtime and dependencies."
  targets: ["Native programs","Libraries"]
  findings: ["Memory safety"]
  findingNote: "Detects selected uninitialized-value uses on executed paths. Incomplete instrumentation can produce misleading reports."
  environment: "Clang and compiler-rt on supported Linux, NetBSD, or FreeBSD configurations."
  setup: "Rebuild with MemorySanitizer, arrange instrumented dependencies, and provide a workload. Debug information and a symbolizer improve reports."
  license: "Apache-2.0 WITH LLVM-exception; see compiler-rt notices."
  costNote: "Free open-source Clang and compiler-rt tooling."
  website: "https://clang.llvm.org/docs/MemorySanitizer.html"
  scope: "Clang MemorySanitizer runtime checks. Platform and library instrumentation requirements differ from other sanitizers."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Usage, platforms, and limitations"
      url: https://clang.llvm.org/docs/MemorySanitizer.html
    - label: "Clang user manual"
      url: https://clang.llvm.org/docs/UsersManual.html
    - label: "Runtime license"
      url: https://raw.githubusercontent.com/llvm/llvm-project/main/compiler-rt/LICENSE.TXT
---

## Where it fits

MemorySanitizer adds an uninitialized-value workflow to the [memory-error detection guide](../../guides/memory-error-detection/). Compare its setup requirements with [Valgrind Memcheck](../valgrind-memcheck/) before selecting a test environment.

## Plan the rebuild

Start with a small target and its dependencies. The documentation calls for instrumenting program code, including libraries; runtime interceptors cover some common external operations. Static linking is not supported.

## Trace the origin

Use the report and optional origin tracking to investigate where an uninitialized value began. Save the failing input as a regression test. A successful run covers the exercised paths and does not establish behavior for other workloads.
