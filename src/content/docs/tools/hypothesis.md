---
title: Hypothesis
description: Generate Python test inputs and simplify failing examples for properties you define.
tool:
  modes: [Dynamic]
  inputTypes: [Callable code]
  techniques: [Property-based testing]
  findings: [Specification violations]
  findingNote: Your assertions and test behavior define failure. Hypothesis generates and shrinks examples; it does not provide a universal security or correctness specification for the target.
  environment: Windows, Linux, and macOS are regularly tested, alongside documented Python runtimes. Check the current Python version requirements.
  setup: A Python test harness, input strategies, and properties or assertions are required. Use a supported Python runtime and optionally pytest or unittest; additional target dependencies may require builds.
  languages: [Python]
  languageNote: Python is the test API. A test can call other systems through an integration, but this does not imply direct static analysis of their implementation languages.
  targets: [Functions, Libraries]
  licenseCategory: Open source
  license: MPL-2.0; some third-party files retain additional license terms
  cost: [Free]
  costNote: Free open-source Python testing library. No paid service is required for input generation, shrinking, or the documented local test workflow.
  website: https://hypothesis.readthedocs.io/en/latest/
  verified: '2026-09-22'
  scope: Hypothesis for Python, based on the 6.168.0 documentation. Third-party extensions and external fuzzing backends are separate integrations.
  sources:
    - label: Hypothesis quickstart
      url: https://hypothesis.readthedocs.io/en/latest/quickstart.html
    - label: Hypothesis introduction and example shrinking
      url: https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html
    - label: Supported runtimes and platforms
      url: https://hypothesis.readthedocs.io/en/latest/compatibility.html
    - label: Hypothesis license
      url: https://github.com/HypothesisWorks/hypothesis/blob/master/LICENSE.txt
---

## What it does

You write a test that should hold for many inputs and describe those inputs using strategies. Hypothesis generates examples, runs the test, and tries to simplify a failure into a smaller example that remains useful for debugging.

For example, a serialization test might assert that decoding an encoded value recovers the original value. A generated edge case can reveal a broken assumption that a few handwritten examples miss.

## Properties and strategies

The property defines what is correct; the strategy defines which inputs are explored. A test that only checks that no exception occurs will miss incorrect results that return normally. Overly restrictive strategies can exclude important cases.

Hypothesis works with ordinary Python testing workflows and also supports stateful tests. Stateful operation sequences are different from automatically understanding a physical system's temporal-logic specification.

## Interpreting results

A failing example demonstrates that the test failed for that execution. Investigate whether the problem is in the implementation, the property, or the test setup. Repeatability matters: hidden state and flaky external behavior can interfere with replay and shrinking.

A passing run covers the examples exercised within its configured budget; it is not a proof over every possible input.

## A useful first evaluation

Start with a deterministic function and a meaningful property such as an invariant or round trip. Inspect the reported failing example, preserve a regression case, and refine the strategy when its domain differs from valid production inputs.
