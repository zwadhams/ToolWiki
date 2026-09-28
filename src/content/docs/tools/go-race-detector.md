---
title: "Go race detector"
description: "Detect data races during Go tests and instrumented application runs."
tool:
  analysisWorkflows:
    - id: instrumented-build
      label: Build and exercise instrumented code
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - Go
      findings:
        - Concurrency issues
      caveat: Finds data races in executed code. It does not establish that every schedule or concurrency
        property is safe.
      sources:
        - https://go.dev/doc/articles/race_detector
        - https://pkg.go.dev/cmd/go
        - https://go.dev/LICENSE
      requires:
        - rebuild
        - instrument
        - testInstance
      binaryFormats: []
  aliases: ["go test -race","Go data race detector"]
  searchTerms: ["Go race conditions","goroutine races","Go concurrency","data races"]
  modes: ["Dynamic"]
  inputTypes: ["Binaries"]
  techniques: ["Runtime race detection","Sanitizer instrumentation"]
  languages: ["Go"]
  languageNote: "Go programs rebuilt with race instrumentation on a supported OS and architecture."
  targets: ["Go tests","Concurrent Go programs"]
  findings: ["Concurrency issues"]
  findingNote: "Finds data races in executed code. It does not establish that every schedule or concurrency property is safe."
  environment: "A supported Go OS/CPU pair with cgo enabled and the required C toolchain; Windows has additional compiler requirements."
  setup: "Rebuild or run tests with the race option and exercise representative concurrent workloads."
  license: "BSD-3-Clause for Go; bundled runtime component notices also apply."
  costNote: "Free capability of the open-source Go toolchain."
  website: "https://go.dev/doc/articles/race_detector"
  scope: "The Go toolchain's dynamic race detector, not the static vet analyzers."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Race detector guide and requirements"
      url: https://go.dev/doc/articles/race_detector
    - label: "Go command reference"
      url: https://pkg.go.dev/cmd/go
    - label: "Go license"
      url: https://go.dev/LICENSE
---

## Where it fits

The race detector examines executions involving goroutines and shared memory. Pair it with [go vet](../go-vet/) and normal behavior tests.

## Use a representative workload

Follow the guide's race-enabled test or build workflow. Confirm the selected platform's cgo and compiler requirements first. Tests must reach the shared-state operations for the detector to observe them.

## Preserve a reproducer

Use both conflicting-access traces to understand a report. Add a test that exercises the failure after fixing synchronization. Budget for instrumentation overhead, and treat a clean run as evidence about that workload rather than all possible executions.
