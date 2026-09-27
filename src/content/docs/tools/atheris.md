---
title: "Atheris"
description: "Generate coverage-guided inputs for Python code and instrumented CPython extensions."
tool:
  aliases: ["Atheris Python fuzzer"]
  searchTerms: ["Python fuzzing","Python fuzzer","CPython extensions","coverage guided"]
  modes: ["Dynamic"]
  inputTypes: ["Callable code"]
  techniques: ["Coverage-guided fuzzing"]
  languages: ["Python"]
  languageNote: "Python targets, with a separately documented workflow for native CPython extensions."
  targets: ["Python libraries","Parsers","CPython extensions"]
  findings: ["Crashes and hangs","Specification violations"]
  findingNote: "Finds failures exposed by the harness, including uncaught exceptions. Semantic properties need user assertions; native memory checks need compatible sanitizer instrumentation."
  environment: "Supported Python release on Linux or macOS. Native extension fuzzing can require a matching Clang/libFuzzer build."
  setup: "Write an input callback, instrument the exercised code, and supply a corpus or input-generation strategy."
  license: "Apache-2.0"
  costNote: "Free open-source fuzzing engine."
  website: "https://github.com/google/atheris"
  scope: "Atheris Python fuzzing and the documented CPython extension workflow; coverage depends on instrumentation and harness reach."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Setup and harness guide"
      url: https://raw.githubusercontent.com/google/atheris/master/README.md
    - label: "Native extension instrumentation"
      url: https://raw.githubusercontent.com/google/atheris/master/native_extension_fuzzing.md
    - label: "License"
      url: https://raw.githubusercontent.com/google/atheris/master/LICENSE
---

## Where it fits

Atheris adds coverage-guided fuzzing to a Python testing workflow. [Hypothesis](../hypothesis/) offers another approach based on explicitly generated data and properties.

## Design a narrow harness

Start with one parser or library operation. Handle expected input rejection deliberately while allowing unexpected failures to remain visible. For a native extension, follow the separate build guide before interpreting coverage or sanitizer findings.

## Save useful inputs

Turn confirmed failures into regression cases. Review what the harness reaches and the conditions it checks; a long run alone does not establish broad behavioral coverage.
