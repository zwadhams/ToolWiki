---
title: Staticcheck
description: Detect Go bugs, suspicious API use, simplification opportunities, and performance-related code issues.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Linting, Bug finding]
  languages: [Go]
  languageNote: Go source packages. The Go version, build tags, target platform, and loaded package set affect which code is analyzed.
  targets: [Source code]
  licenseCategory: Open source
  license: MIT
  cost: [Free]
  costNote: The project offers Staticcheck free of charge as open-source software. Sponsorship supports development; it does not unlock a required paid analysis tier.
  website: https://staticcheck.dev/
  verified: '2026-09-22'
  scope: Standalone Staticcheck and its documented checks; distinct from Go's built-in vet command or a wrapper that aggregates multiple linters.
  findings: ["Logic errors","Coding conventions"]
  findingNote: "Selected Go correctness, simplification, and style checks; performance patterns are not runtime profiling measurements."
  environment: "A supported Go toolchain host; prebuilt packages and the selected Go release determine platform compatibility."
  setup: "A loadable/buildable Go package set, dependencies, and correct build tags. No runtime test harness."
  sources:
    - label: Installation requirements
      url: https://staticcheck.dev/docs/getting-started/
    - label: Staticcheck overview and free availability
      url: https://staticcheck.dev/docs/
    - label: Running Staticcheck and selecting packages
      url: https://staticcheck.dev/docs/running-staticcheck/cli/
    - label: Check descriptions
      url: https://staticcheck.dev/docs/checks/
    - label: Configuration and Go version settings
      url: https://staticcheck.dev/docs/configuration/
    - label: Staticcheck license
      url: https://github.com/dominikh/go-tools/blob/master/LICENSE
---

## What it does

Staticcheck analyzes Go packages to flag likely bugs and questionable code. Its check families include correctness checks, simplifications, style checks, and unused-code detection. Examples include ineffective operations, incorrect use of standard-library APIs, and code that can be simplified.

Performance-related diagnostics point to code patterns; they are not runtime profiling or measurements of a program's actual latency.

## Inputs and workflow

Provide a buildable Go project with dependencies available to the Go toolchain. The command accepts package patterns like the Go tools do. Configure the target Go version and relevant build tags, and choose the package set you intend to check.

Findings carry a check identifier, source location, and explanation. The command can run locally, in CI, or through editor integrations. Use the individual check documentation to understand the condition behind a diagnostic.

## Scope and limitations

Code excluded by a platform setting or build tag needs a corresponding analysis configuration if you want it checked. A run for one build configuration does not cover every possible build.

Some checks concern style or simplification; others indicate correctness problems. Their identifiers and descriptions help distinguish those cases. Use narrow suppressions when a finding is inapplicable, and preserve the explanation for future reviewers.

## A useful first evaluation

Run Staticcheck alongside the Go toolchain's existing checks on a representative package set. Resolve package-loading or build errors, review the most relevant findings, and choose which checks should fail CI. Record the analyzer version, Go version, build tags, and package selection so future results are comparable.
