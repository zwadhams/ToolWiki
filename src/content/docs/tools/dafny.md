---
title: Dafny
description: Verify programs written in Dafny against contracts, invariants, and other specifications.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Deductive verification, Formal verification]
  findings: [Specification violations, Type errors]
  findingNote: Checks Dafny program well-formedness and verification obligations. An unproved obligation does not by itself demonstrate an executable counterexample.
  environment: Windows, Linux, and macOS distributions; command-line and editor workflows. Compiling output requires the chosen backend's toolchain.
  setup: Write Dafny source with contracts, invariants, and supporting annotations; use the verifier and supported solver. Ordinary runtime tests are not required to discharge proof obligations.
  languages: [Dafny]
  languageNote: Dafny is the input programming and specification language. Compilation targets such as C# or Java are not languages of arbitrary existing source that Dafny automatically verifies.
  targets: [Source code]
  licenseCategory: Open source
  license: MIT; dependencies and compilation runtimes have separate licenses
  cost: [Free]
  costNote: Free open-source language and verification toolchain. Optional hosting, support, or backend toolchains can have separate costs; there is no required paid verification tier.
  website: https://dafny.org/
  verified: '2026-09-22'
  scope: Dafny verification workflow and installation documentation, distinct from running compiled output.
  sources:
    - label: Dafny project
      url: https://dafny.org/
    - label: Language and verification tutorial
      url: https://dafny.org/latest/OnlineTutorial/guide
    - label: Installation and backend prerequisites
      url: https://dafny.org/latest/Installation
    - label: Dafny license
      url: https://github.com/dafny-lang/dafny/blob/master/LICENSE.txt
---

## What it does

Dafny combines a programming language with a verifier. You describe expected behavior using preconditions, postconditions, assertions, loop invariants, and termination information. Verification checks whether the implementation satisfies those obligations under the stated assumptions.

It is useful for learning specification-driven development or implementing components whose properties you want to reason about explicitly.

## Specifications are part of the work

A function contract can describe what a caller must provide and what the function guarantees. Loops may need invariants that make the reasoning visible to the verifier. Proofs can require helper lemmas or more precise specifications.

A weak or mistaken specification can prove the wrong property. Verification does not substitute for deciding what the software should do.

## Interpreting failures

When a property cannot be established, examine the reported obligation, assumptions, and annotations. The implementation might be incorrect, but the verifier may also need an invariant or more solver resources. Keep timeouts and unknown results separate from demonstrated violations.

## A useful first evaluation

Follow the introductory tutorial with a small method and a precise postcondition. Try a deliberately incorrect implementation and observe the verification result, then repair it. Treat generated executable code and external integrations as additional boundaries to review and test.
