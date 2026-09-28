---
title: "go vet"
description: "Find suspicious constructs in Go packages with the Go toolchain's static checks."
tool:
  analysisWorkflows:
    - id: source
      label: Source analysis
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - Go
      findings:
        - Logic errors
      caveat: Heuristic checks report likely mistakes, including selected format-string and
        synchronization-related problems; they are not exhaustive correctness checks.
      sources:
        - https://pkg.go.dev/cmd/vet
        - https://pkg.go.dev/cmd/go
        - https://go.dev/LICENSE
      requires: []
  aliases: ["go tool vet"]
  searchTerms: ["Go bug checker","printf arguments","copylocks","Go static analysis"]
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["Bug finding"]
  languages: ["Go"]
  languageNote: "Go packages under the selected toolchain and build configuration."
  targets: ["Go applications","Libraries"]
  findings: ["Logic errors"]
  findingNote: "Heuristic checks report likely mistakes, including selected format-string and synchronization-related problems; they are not exhaustive correctness checks."
  environment: "Go toolchain with the project's dependencies and build configuration."
  setup: "Select package paths and matching build tags; inspect go tool vet help for the installed toolchain's analyzers."
  license: "BSD-3-Clause; component notices may apply."
  costNote: "Free tool included in the open-source Go toolchain."
  website: "https://pkg.go.dev/cmd/vet"
  scope: "The standard vet analyzers shipped with Go; custom vettool analyzers are outside this entry."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Vet documentation and check list"
      url: https://pkg.go.dev/cmd/vet
    - label: "Go command reference"
      url: https://pkg.go.dev/cmd/go
    - label: "Go license"
      url: https://go.dev/LICENSE
---

## Where it fits

Use go vet as one part of a Go package review. [Staticcheck](../staticcheck/) offers another static-checking workflow, while [the Go race detector](../go-race-detector/) examines executions.

## Match the build

Select the package set and build tags used by the project. Consult the installed toolchain's analyzer help before deciding which checks a pipeline should run.

## Read warnings as hypotheses

Vet uses heuristics to identify suspicious constructs. Investigate each warning in its program context, and keep tests for behavior the checks cannot establish. A clean report is not a proof that the package is correct.
