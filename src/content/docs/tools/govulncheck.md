---
title: "govulncheck"
description: "Find known vulnerabilities affecting Go source or compiled Go programs."
tool:
  analysisWorkflows:
    - id: source
      label: Go dependency reachability from source
      subject: component
      inputs:
        - Source code
      languageScope: ecosystem
      languages:
        - Go
      findings:
        - Known vulnerable dependencies
      caveat: Combines vulnerability records with source analysis or binary information. Reflection,
        unsafe operations, and missing symbols limit precision.
      sources:
        - https://go.dev/doc/security/vuln/
        - https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck
        - https://raw.githubusercontent.com/golang/vuln/master/LICENSE
    - id: binary
      label: Go binary vulnerability checks
      subject: component
      inputs:
        - Binaries
      languageScope: ecosystem
      languages:
        - Go
      findings:
        - Known vulnerable dependencies
      caveat: Combines vulnerability records with source analysis or binary information. Reflection,
        unsafe operations, and missing symbols limit precision.
      sources:
        - https://go.dev/doc/security/vuln/
        - https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck
        - https://raw.githubusercontent.com/golang/vuln/master/LICENSE
      binaryFormats:
        - Native executable
  aliases: ["Go vulnerability checker"]
  searchTerms: ["Go CVE","Go vulnerabilities","SCA","dependency vulnerabilities","vulnerability reachability"]
  modes: ["Static"]
  inputTypes: ["Source code","Binaries"]
  techniques: ["Software composition analysis","Known vulnerability detection"]
  languages: ["Go"]
  languageNote: "Go modules and Go binaries. Source and binary workflows provide different levels of call information."
  targets: ["Go applications","Go dependencies"]
  findings: ["Known vulnerable dependencies"]
  findingNote: "Combines vulnerability records with source analysis or binary information. Reflection, unsafe operations, and missing symbols limit precision."
  environment: "Compatible Go toolchain; the default workflow queries the Go vulnerability database."
  setup: "For source analysis, use the module directory and intended build configuration. For binary analysis, supply a compiled Go program."
  license: "BSD-3-Clause"
  costNote: "Free open-source command and public Go vulnerability database workflow."
  website: "https://go.dev/doc/security/vuln/"
  scope: "govulncheck source and binary modes. Binary reports do not provide the source mode's call stacks."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Go vulnerability management"
      url: https://go.dev/doc/security/vuln/
    - label: "Usage and limitations"
      url: https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck
    - label: "License"
      url: https://raw.githubusercontent.com/golang/vuln/master/LICENSE
---

## Where it fits

govulncheck focuses on known Go vulnerabilities. Use it alongside [go vet](../go-vet/) or [Staticcheck](../staticcheck/), which look for different kinds of source problems.

## Preserve the analysis context

Record the Go version, build tags, selected packages, and database context. Choose the documented source or binary mode to match the available artifact.

## Interpret reachability carefully

A reported path helps prioritize investigation; it does not establish exploitability in a deployment. Conversely, a clean scan cannot identify an unpublished vulnerability. Use the documented limitations when interpreting reflective code or a binary with incomplete symbol information.
