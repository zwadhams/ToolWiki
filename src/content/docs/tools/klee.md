---
title: "KLEE"
description: "Explore LLVM bitcode symbolically and generate inputs for program paths."
tool:
  analysisWorkflows:
    - id: bitcode
      label: Symbolically explore prepared LLVM bitcode
      subject: component
      inputs:
        - Binaries
      languageScope: source
      languages:
        - C
      findings:
        - Specification violations
        - Memory safety
      caveat: Findings depend on assertions, symbolic inputs, environment models, and completed
        exploration. Interrupted paths remain unresolved.
      sources:
        - https://klee-se.org/getting-started/
        - https://klee-se.org/tutorials/testing-function/
        - https://klee-se.org/tutorials/testing-regex/
        - https://klee-se.org/docs/options/
        - https://klee-se.org/docs/files/
        - https://raw.githubusercontent.com/klee/klee/master/LICENSE.TXT
      binaryFormats:
        - LLVM bitcode
      requires:
        - harness
  aliases: ["KLEE symbolic execution"]
  searchTerms: ["symbolic execution","LLVM bitcode","symbolic inputs","test generation"]
  modes: ["Static"]
  inputTypes: ["Binaries"]
  techniques: ["Symbolic execution"]
  languages: ["C"]
  languageNote: "This entry covers the documented C-to-LLVM-bitcode workflow. Bitcode and runtime compatibility are required."
  targets: ["LLVM bitcode","Native-code test generation"]
  findings: ["Specification violations","Memory safety"]
  findingNote: "Findings depend on assertions, symbolic inputs, environment models, and completed exploration. Interrupted paths remain unresolved."
  environment: "Compatible LLVM/Clang and KLEE runtime/solver setup; documented packages and container images are available."
  setup: "Compile a harness to LLVM bitcode, mark intended inputs symbolic, and configure external calls and exploration limits."
  license: "University of Illinois/NCSA (NCSA); third-party components have separate notices."
  costNote: "Free open-source engine; check the licenses of the chosen dependencies."
  website: "https://klee-se.org/"
  scope: "Symbolic exploration of LLVM bitcode. Listed under Static for model-based path analysis, rather than observing a deployed application's concrete workload."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Installation routes"
      url: https://klee-se.org/getting-started/
    - label: "Small-function tutorial"
      url: https://klee-se.org/tutorials/testing-function/
    - label: "Memory findings and harness assumptions"
      url: https://klee-se.org/tutorials/testing-regex/
    - label: "Analysis and external-call options"
      url: https://klee-se.org/docs/options/
    - label: "Generated files"
      url: https://klee-se.org/docs/files/
    - label: "License"
      url: https://raw.githubusercontent.com/klee/klee/master/LICENSE.TXT
---

## Where it fits

KLEE adds LLVM-based symbolic test generation alongside [angr](../angr/). The accepted program representation and environment model matter when choosing between them.

## Begin with a small harness

Use the official function tutorial to connect symbolic inputs, a compatible bitcode build, and generated test files. Make input constraints explicit and review the policy for external calls.

## Separate completed and interrupted paths

Retain warnings and exploration statistics with generated cases. Replay useful inputs where practical and verify the modeled environment against the real program. Time or memory limits can leave paths unexplored, so an unfinished search does not establish their safety.
