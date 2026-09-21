---
title: "Infer (Pulse)"
description: "Find memory and value errors across function calls using Infer's Pulse analysis."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["SAST","Symbolic execution"]
  languages: ["C","C++","Objective-C","Java","Hack"]
  languageNote: "Selected supported Pulse languages. Other Infer checkers have different coverage; experimental Erlang and Rust support is not included in these tags."
  targets: ["Source code"]
  findings: ["Memory safety","Specification violations"]
  findingNote: "Pulse checks modeled paths for selected memory, value, and assertion errors. Unknown functions and missing models can affect both false positives and missed findings."
  environment: "The official quickstart provides Linux binaries, source builds, and Docker images. Check the release and compiler requirements for your host; use a compatible Linux environment from Windows."
  setup: "Capture a supported compilation with Infer, including dependencies and build configuration. No runtime test inputs are needed for the static analysis."
  licenseCategory: "Open source"
  license: "MIT for Infer; dependencies and bundled components have their own terms"
  cost: ["Free"]
  costNote: "Free local analyzer. Pulse does not require a paid edition; build infrastructure and compute are separate costs."
  website: "https://fbinfer.com/"
  verified: "2026-09-21"
  scope: "Pulse-focused entry using the current 1.3.0 documentation. This is not a combined capability list for every Infer checker."
  sources:
    - label: "Pulse languages, diagnostics, and modeling limits"
      url: https://fbinfer.com/docs/checker-pulse/
    - label: "Installation and supported distribution routes"
      url: https://fbinfer.com/docs/getting-started/
    - label: "Infer license"
      url: https://github.com/facebook/infer/blob/main/LICENSE
---

## When to use it

Use Pulse to investigate errors that involve calls between functions, such as a value becoming null before another function dereferences it. It complements the pattern and rule workflows in [Semgrep CE](../semgrep-ce/).

Capturing the real build matters. A missing compilation unit or an unmodeled library changes the program the analyzer sees. Infer's capture step is preparation for static analysis, even when it invokes a compiler.

## Worked example: a definite null dereference

**Illustrative example, not run here.** With Infer and a compatible Clang installed, save this as `null_access.c`:

```c
int read_value(void) {
    int *value = 0;
    return *value;
}
```

Run the capture and analysis:

```sh
infer run --pulse -- clang -c null_access.c
```

Inspect the report for a null-dereference diagnostic at `*value`. Then give the pointer a valid object and compare the result. The diagnostic demonstrates one selected check; it does not measure coverage across your application.

## Interpret a clean result

Pulse can retain an issue until a caller establishes the conditions needed to report it. It also models missing functions with assumptions. Review capture failures, skipped code, and external models before treating silence as evidence.

For runtime alternatives, see [memory-error detection](../../guides/memory-error-detection/).
