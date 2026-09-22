---
title: Semgrep Code
description: Run security analysis with Pro rules, cross-file analysis, and centralized finding management.
tool:
  modes: [Static]
  inputTypes: [Source code]
  techniques: [SAST, Pattern matching, Data flow analysis]
  languages: [C, C++, 'C#', Go, Java, JavaScript, Kotlin, Python, Ruby, Rust, TypeScript, PHP, Scala, Swift, Terraform]
  languageNote: Selected supported languages and ecosystems. Analysis depth varies by language; check the product support matrix for exact features.
  targets: [Source code, Infrastructure as code]
  licenseCategory: Proprietary
  license: Commercial Semgrep Code and Pro features; separate from the open-source CE engine.
  cost: [Free with limits, Paid]
  costNote: Free Edition includes Pro rules and cross-file analysis within contributor and repository limits. Teams and Enterprise are paid plans; standalone Semgrep CE remains a separate free option.
  editionGroup: semgrep
  website: https://semgrep.dev/products/semgrep-code/
  verified: '2026-09-22'
  scope: Semgrep Code on the AppSec Platform, including Free Edition and paid plans. Supply Chain and Secrets are separate products.
  findings: ["Injection risks","Unsafe API use","Security misconfiguration"]
  findingNote: "Selected SAST rules and supported advanced analyses. Known-dependency detection belongs to the separate Supply Chain product."
  environment: "Managed scans or a supported local/CI scanner host; Linux and macOS, with native Windows documented as beta."
  setup: "Connect a repository and configure scans/rules and platform access. Normal source scans do not require a runtime harness or application build."
  sources:
    - label: Host and platform prerequisites
      url: https://docs.semgrep.dev/prerequisites
    - label: Semgrep plans and feature comparison
      url: https://semgrep.dev/pricing/
    - label: Contributor definitions and usage limits
      url: https://docs.semgrep.dev/usage-and-billing/overview
    - label: Language support matrix
      url: https://docs.semgrep.dev/supported-languages
---

## What differs from CE

Semgrep Code provides Pro rules, cross-file analysis, and platform workflows. These capabilities are not all restricted to paid customers: its Free Edition includes them within the published usage limits.

The standalone [CE engine](../semgrep-ce/) is a separate option with different analysis capabilities. Do not apply platform account limits to a local CE-only workflow.

## Free plan limits

The pricing comparison lists a maximum of 10 contributors and 10 private repositories for Free Edition, with unlimited public repositories. Semgrep defines contributors using recent activity in scanned private repositories. Check those definitions and current limits when choosing a plan.

Paid plans expand team and organization support. Product modules and additional AI usage may have separate charges; the edition table links current pricing rather than presenting one universal price.

## Related research

**Related product family:** The [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) included Semgrep, but its reported configuration should not be treated as a benchmark of today's Semgrep Code, Pro rules, or plan features.

[Comparing SAST tools](../../research/comparing-tools/) explains how to interpret differences in reported findings. Check the edition and selected rules when applying those lessons to this platform.
