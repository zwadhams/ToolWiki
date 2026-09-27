---
title: "ESBMC"
description: "Check C and C++ program properties with SMT-based bounded model checking."
tool:
  aliases: ["Efficient SMT-based Context-Bounded Model Checker"]
  searchTerms: ["bounded model checking","BMC","C verification","C++ verification","SMT","assertion checking"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Bounded model checking","Formal verification"]
  languages: ["C","C++"]
  languageNote: "This entry focuses on C and supported C++ constructs. Frontend and library-model limits apply; other ESBMC frontends are outside this scope."
  targets: ["Native program verification","Verification harnesses"]
  findings: ["Memory safety","Specification violations","Undefined behavior"]
  findingNote: "Selected checks include pointer/bounds problems, arithmetic errors, and assertions. Enabled properties, unwinding, and assumptions determine the claim."
  environment: "A supported ESBMC binary or source build with compatible frontend and SMT solver."
  setup: "Provide source and a verification harness, choose properties and solver, and set exploration or induction options."
  license: "Apache-2.0 modifications with inherited BSD and other component notices; see COPYING."
  costNote: "Free open-source checker with appropriately licensed dependencies. Optional solver terms can restrict use."
  website: "https://github.com/esbmc/esbmc"
  scope: "Documented C/C++ verification workflows. A bounded search result is distinct from an unbounded proof."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Project scope and build routes"
      url: https://github.com/esbmc/esbmc
    - label: "Properties, examples, and unwinding"
      url: https://ssvlab.github.io/esbmc/documentation.html
    - label: "Component and solver licenses"
      url: https://raw.githubusercontent.com/esbmc/esbmc/master/COPYING
---

## Where it fits

ESBMC adds another source-verification option beside [CBMC](../cbmc/) and [CPAchecker](../cpachecker/).

## Make bounds visible

Begin with a small documented example and record its assertions, input assumptions, solver, and enabled checks. Use the selected release's supported language and library models.

## Distinguish an error from an insufficient bound

Read the violated property before interpreting a counterexample. An unwinding assertion can mean exploration needs a larger bound. Disabling that assertion does not turn an incomplete search into a proof. Keep bounded bug-finding results separate from results established by an appropriate induction or completeness argument.
