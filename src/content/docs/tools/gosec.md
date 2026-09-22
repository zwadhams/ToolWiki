---
title: "gosec"
description: "Inspect Go source for security problems using syntax, value-flow, and selected taint checks."
tool:
  modes: ["Static"]
  inputTypes: ["Source code"]
  techniques: ["SAST","Pattern matching","Data flow analysis"]
  languages: ["Go"]
  languageNote: "Go packages and their supported build context. This does not inspect arbitrary executables compiled from Go."
  targets: ["Go applications"]
  findings: ["Injection risks","Unsafe API use","Security misconfiguration"]
  findingNote: "Findings depend on the installed rule set, package loading, build tags, and suppressions. Security patterns and taint checks do not prove end-to-end exploitability."
  environment: "Runs with a compatible Go toolchain and supported host. The current installation documentation requires Go 1.25 or newer; check the selected release."
  setup: "Provide a loadable Go module or packages and their dependencies. Match build tags and dependency access to the intended build; tests and generated files have scan options."
  licenseCategory: "Open source"
  license: "Apache-2.0"
  cost: ["Free"]
  costNote: "Free local scanner and project-maintained CI integration. No paid edition is required for the documented rule set."
  website: "https://github.com/securego/gosec"
  verified: "2026-09-22"
  scope: "Current gosec v2 documentation. Pin a release for repeatable checks; rule IDs and language requirements can change."
  sources:
    - label: "Installation, scanning, and result formats"
      url: https://github.com/securego/gosec
    - label: "Individual rule descriptions"
      url: https://github.com/securego/gosec/blob/master/RULES.md
    - label: "License"
      url: https://github.com/securego/gosec/blob/master/LICENSE.txt
---

## Where it fits

Use gosec alongside [Staticcheck](../staticcheck/) when reviewing Go: their selected checks and intended emphasis differ. Start with the same module revision and build configuration so a comparison does not accidentally scan different packages.

## Worked example: a module report

**Illustrative workflow, not run here.** With a compatible Go toolchain and gosec installed, run in the module directory:

```sh
gosec -fmt json -out gosec-results.json ./...
```

Open `gosec-results.json` and inspect an issue's rule, severity, confidence, and code location. A useful trial is a small project containing a TLS client configured to skip certificate verification, followed by a corrected version. Treat any finding as something to investigate in the application's context.

## Coverage and exclusions

Confirm packages loaded successfully before interpreting a low issue count. Document build tags, selected rules, and exclusions with the result. An inline suppression can conceal a real problem if its scope is too broad.

A nonzero exit can reflect findings or a processing error. A zero exit under a configured no-fail option is not evidence that the scan found nothing. These details matter when interpreting CI results.

Dependency advisory matching is a separate job; see [OSV-Scanner](../osv-scanner/).

## Related research

**Used in a study:** The [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used gosec as its Go-specific analyzer alongside SonarQube and Semgrep. The study examined one Go implementation and did not validate finding accuracy.

[Comparing SAST tools](../../research/comparing-tools/) explains why successful execution, rule scope, and project context matter when interpreting such counts.
