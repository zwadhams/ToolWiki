---
title: libFuzzer
description: Exercise an instrumented function with evolving inputs guided by code coverage.
tool:
  modes: [Dynamic]
  inputTypes: [Binaries]
  techniques: [Coverage-guided fuzzing]
  languages: [C, C++]
  languageNote: This entry covers the documented C/C++ harness workflow. Other language integrations exist and need separate verification.
  targets: [Native programs, Libraries]
  licenseCategory: Open source
  cost: [Free]
  costNote: Free engine in the LLVM toolchain. You provide the build environment and fuzzing compute.
  license: Apache-2.0 with LLVM exceptions
  website: https://llvm.org/docs/LibFuzzer.html
  verified: '2026-09-21'
  scope: LLVM libFuzzer and its in-process harness workflow.
  findings: ["Crashes and hangs","Memory safety","Specification violations"]
  findingNote: "Execution failures and timeouts; detailed memory errors need sanitizer instrumentation and property failures need assertions or another failure signal."
  environment: "A compatible LLVM/Clang runtime on a supported platform; sanitizer and target support vary."
  setup: "Build an instrumented target with an in-process fuzzing harness. Supply seed inputs and optional sanitizers or assertions; the target executes repeatedly."
  sources:
    - label: libFuzzer documentation
      url: https://llvm.org/docs/LibFuzzer.html
    - label: LLVM licensing
      url: https://llvm.org/docs/DeveloperPolicy.html#license
---

## What it does

libFuzzer repeatedly passes generated inputs to a target function inside the same process. Instrumentation reports coverage, helping it retain inputs that explore new behavior. Sanitizers can provide additional error detection.

## When it is useful

Consider it for a parser, decoder, or library routine that accepts input bytes. A small harness makes that routine accessible to the fuzzer.

## What to keep in mind

The harness defines what gets exercised. It needs to handle repeated calls, and the target should not terminate the process for ordinary invalid input. A crash is a starting point for investigation, not automatically a security vulnerability.

The project documents continued important bug fixes but no expectation of major new features. Check its status when choosing an engine for new work.

## Getting started

Follow the official tutorial to build a harness and a small input corpus. Preserve reproducible failures as regression cases.
