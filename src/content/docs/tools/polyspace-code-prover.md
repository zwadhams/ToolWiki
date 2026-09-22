---
title: "Polyspace Code Prover"
description: "Use abstract interpretation to prove selected C and C++ runtime checks safe or identify possible and definite failures."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Abstract interpretation","Formal verification"]
  languages: ["C","C++"]
  languageNote: "Handwritten or generated C/C++ source. Simulink integration can configure analysis of generated code; it does not make this entry a temporal falsifier of the original model."
  targets: ["Embedded software","Generated C/C++ code"]
  findings: ["Memory safety","Logic errors"]
  findingNote: "Selected runtime checks include bounds, invalid accesses, division by zero, and numerical errors. A proof applies to the configured program/environment model; an unproven check is not automatically a confirmed bug."
  environment: "The current product requirements list Windows, Linux, and Mac, with release-specific limits; ARM-based Windows is excluded. Verify the exact host and compiler combination."
  setup: "Requires Polyspace Bug Finder. Configure source, includes, macros, target types, entry points, and environment assumptions. Standalone analysis does not require MATLAB or Simulink, instrumentation, or runtime tests."
  licenseCategory: "Proprietary"
  license: "Commercial MathWorks product license; required products and optional integrations have separate entitlements"
  cost: ["Paid"]
  costNote: "Paid product with quote and trial options. A trial is not a continuing free edition. Include the required Polyspace Bug Finder entitlement; existing institutional access depends on the actual license."
  editionGroup: "polyspace"
  website: "https://www.mathworks.com/products/polyspace-code-prover.html"
  verified: "2026-09-22"
  scope: "Polyspace Code Prover C/C++ analysis, not the entire Polyspace family. Desktop, Server, Bug Finder, and model-integration workflows have different purposes and licensing."
  sources:
    - label: "Purpose, result meanings, product differences, and trial"
      url: https://www.mathworks.com/products/polyspace-code-prover.html
    - label: "Required products and supported platforms"
      url: https://www.mathworks.com/support/requirements/polyspace-code-prover.html
    - label: "Getting started with Code Prover"
      url: https://www.mathworks.com/help/codeprover/getting-started-with-polyspace-code-prover.html
    - label: "Result review and reporting documentation"
      url: https://www.mathworks.com/help/codeprover/run-time-error-review.html
---

## What it establishes

Code Prover examines a configured model of C/C++ behavior and classifies selected runtime checks. Its goal differs from simply collecting suspicious code patterns. [Frama-C Eva](../frama-c/) is another useful reference for understanding abstract-interpretation results.

A result about generated C code is a result about that code and configuration. It is not a general proof about a Simulink controller's temporal requirements.

## Worked example: a division precondition

**Illustrative evaluation, not run here.** Add this C function to a licensed Code Prover project:

```c
int quotient(int denominator) {
    return 12 / denominator;
}
```

Configure it as an analyzed entry point with an input domain that includes zero, then inspect the division check. It cannot be established safe for that entire domain. The exact result presentation depends on the analysis setup.

Now constrain the input to positive values and repeat. A safe result under that restriction requires evidence that the real callers enforce it. Alternatively, implement and analyze a guard for zero.

## Read the result categories

Distinguish checks proved safe, checks proved to fail, unreachable code, and checks left unproven. An unproven result may require a code fix, better environment modeling, or more precise analysis.

Record target integer sizes, stubs, ranges, and excluded code with the report. For a concrete execution-based comparison, see [memory-error detection](../../guides/memory-error-detection/).
