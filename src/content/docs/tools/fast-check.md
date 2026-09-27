---
title: "fast-check"
description: "Generate and shrink JavaScript and TypeScript test inputs for user-defined properties."
tool:
  aliases: ["fast check"]
  searchTerms: ["JavaScript property testing","TypeScript property testing","property based testing","shrinking","test generators"]
  modes: ["Dynamic"]
  inputTypes: ["Callable code"]
  techniques: ["Property-based testing"]
  languages: ["JavaScript","TypeScript"]
  languageNote: "JavaScript and TypeScript code invoked by the project's test environment."
  targets: ["Libraries","Application logic","Property tests"]
  findings: ["Specification violations"]
  findingNote: "Finds counterexamples to the properties supplied by the user. Generated values, assumptions, and test budgets determine coverage."
  environment: "A compatible JavaScript runtime and the project's chosen test runner."
  setup: "Install fast-check as a development dependency, define generators and predicates, and invoke them from tests."
  license: "MIT"
  costNote: "Free open-source testing library."
  website: "https://fast-check.dev/"
  scope: "The fast-check property-testing library; it supplies generated cases and shrinking, not automatically inferred application requirements."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Introduction"
      url: https://fast-check.dev/docs/introduction/
    - label: "Installation and first property"
      url: https://fast-check.dev/docs/introduction/getting-started/
    - label: "Runs, seeds, and configuration"
      url: https://fast-check.dev/docs/configuration/
    - label: "License"
      url: https://raw.githubusercontent.com/dubzzz/fast-check/main/LICENSE
---

## Where it fits

fast-check provides a JavaScript and TypeScript counterpart to the property-testing workflow represented by [Hypothesis](../hypothesis/).

## State the property first

Choose an invariant, round-trip behavior, or relationship between operations. Define generators that reach meaningful inputs, then connect the property to the existing test runner. Use the documented asynchronous property API when the predicate is asynchronous.

## Reproduce a failure

Retain the counterexample and reproduction settings. Shrinking can simplify a failing case, but its usefulness still depends on the generator and property. Record run counts and time limits when comparing results.
