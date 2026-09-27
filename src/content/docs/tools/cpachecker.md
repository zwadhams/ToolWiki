---
title: "CPAchecker"
description: "Verify selected properties of C programs using configurable program analyses."
tool:
  aliases: ["CPA checker"]
  searchTerms: ["C verification","configurable program analysis","predicate analysis","software verification"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Model checking","Abstract interpretation","Formal verification"]
  languages: ["C"]
  languageNote: "The documented C verification workflow supports a substantial subset of GNU C. Parsing and analysis support depend on the configuration."
  targets: ["C programs","Verification tasks"]
  findings: ["Specification violations"]
  findingNote: "Checks the selected specification, such as assertions and error reachability. Results apply to that configuration and program model."
  environment: "Compatible Java runtime and solver dependencies; Linux x86-64 or the documented container route offers the broadest supplied dependency coverage."
  setup: "Prepare C input, choose an analysis configuration and specification, and verify solver compatibility and license terms."
  license: "Apache-2.0 for CPAchecker; bundled solvers and libraries have separate licenses."
  costNote: "Free open-source analyzer. The bundled MathSAT terms restrict use to research and evaluation; select an appropriately licensed alternative when needed."
  website: "https://cpachecker.sosy-lab.org/"
  scope: "C program verification with an explicitly chosen analysis and solver. Other language or property configurations are not assumed."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Project documentation"
      url: https://cpachecker.sosy-lab.org/doc.php
    - label: "Preparation, verification, and licensing"
      url: https://raw.githubusercontent.com/sosy-lab/cpachecker/main/README.md
    - label: "Installation requirements"
      url: https://raw.githubusercontent.com/sosy-lab/cpachecker/main/INSTALL.md
    - label: "Configuration reference"
      url: https://raw.githubusercontent.com/sosy-lab/cpachecker/main/doc/Configuration.md
---

## Where it fits

CPAchecker provides another configurable verification workflow beside [CBMC](../cbmc/) and [Frama-C](../frama-c/).

## Define the question

Start from a documented example, then select the specification and analysis configuration for the property you need. Keep preprocessing choices and external assumptions with the input.

## Preserve the verification context

Review counterexamples against the original program. Treat an unknown result or resource limit as unresolved. A successful result answers the selected property under the recorded assumptions; it is not a claim about every behavior of the full application.
