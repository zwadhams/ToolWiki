---
title: SonarQube Server
description: Review code quality and security findings across projects using analysis rules and quality gates.
tool:
  cardRequirement: Python source and a configured licensed Server project with scanner access.
  analysisWorkflows:
    - id: python-source
      label: Python source rules in SonarQube Server
      subject: component
      inputs: [Source code]
      languageScope: source
      languages: [Python]
      findings: [Logic errors, Coding conventions]
      hostPlatforms: [Windows, Linux, macOS]
      caveat: Python source analysis through SonarScanner CLI and an already configured licensed Server instance. Verify the scanner runtime, project access, Python version, quality profile, exclusions, and server processing result. This route does not establish advanced security-feature entitlements, test coverage, or compiled-language prerequisites.
      sources:
        - https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/python
        - https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/sonarscanner
  modes: [Static]
  inputTypes: [Source code]
  techniques: [SAST, Bug finding, Data flow analysis]
  languages: [C, C++, 'C#', Java, JavaScript, TypeScript, Python, Go, Kotlin, PHP, Ruby, Rust, Scala, Swift, Objective-C, Terraform]
  languageNote: Selected documented languages and ecosystems, not a complete list. Availability and security-analysis depth depend on edition, version, and analyzer.
  targets: [Source code, Infrastructure as code]
  licenseCategory: Proprietary
  cost: [Paid]
  costNote: This Server entry covers paid editions. The separate SonarQube Community Build is free, with a different language and feature scope; compare the options below.
  editionGroup: sonarqube
  license: Commercial SonarQube Server editions; the separate Community Build has different licensing and features.
  website: https://www.sonarsource.com/products/sonarqube/server/
  verified: '2026-09-22'
  scope: SonarQube Server commercial editions. Community Build, Cloud, and IDE products are separate offerings.
  findings: ["Injection risks","Logic errors","Coding conventions"]
  findingNote: "Selected language-specific quality and security rules. Depth depends on edition, analyzer, and quality profile."
  environment: "Scanner workflows on Windows, Linux, and macOS; the self-hosted server has separate Java, database, and OS requirements."
  setup: "Set up a server and a language-appropriate scanner. Build/bytecode requirements vary by language; no runtime test harness is required for static analysis."
  sources:
    - label: Scanner environment requirements
      url: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/scanner-environment/general-requirements
    - label: Sonar free products and eligibility
      url: https://www.sonarsource.com/open-source-editions/
    - label: SonarQube Server overview
      url: https://www.sonarsource.com/products/sonarqube/server/
    - label: Supported languages by edition
      url: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/overview
    - label: Edition and feature comparison
      url: https://www.sonarsource.com/plans-and-pricing/sonarqube/
    - label: Server Python source analysis
      url: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/python
    - label: Server SonarScanner CLI setup
      url: https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/sonarscanner
---

## What it does

SonarQube Server brings static-analysis findings into a shared view of code quality and security. Analysis rules identify issues, and quality gates evaluate results against configured conditions.

## When it is useful

Use it when you want recurring analysis and a consistent review process across projects. It can help keep security findings alongside reliability and maintainability concerns.

## Editions matter

The SonarQube name covers multiple products. This entry focuses on commercial Server editions. [Community Build](../sonarqube-community/) has its own catalog entry so free-edition searches use its supported languages. Cloud and IDE products also have their own scope.

Check language availability and specific security features for the edition you plan to use. Do not assume that a language being supported means all analysis types are available for it.

## What to keep in mind

A passing quality gate means the configured conditions passed. It is not a guarantee that the code has no vulnerabilities. For comparisons with other tools, record the edition, analyzer versions, rule profile, and exclusions.

## Getting started

Choose the relevant product and edition, then analyze a small representative project. Review the rule profile and findings before defining quality gates for a larger workflow.

## System builder scope

**Documentation reviewed November 12, 2026; not executed here.** The builder
matches Python source through [SonarScanner CLI](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/sonarscanner).
Use a licensed Server instance and project account, configure the source
directories and quality profile, and set
[`sonar.python.version`](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/python)
to the project's supported version. Preserve existing exclusions and supply
the scanner's required runtime.

This static route needs no application test run. Check server processing and
analyzed-file scope before reviewing Python logic and coding-rule findings.
A candidate match does not establish your license's advanced security features
or the build and bytecode prerequisites for other catalog languages. The
separate Community Build route uses that edition's own documentation.

## Related research

- **Used in a case study:** [SAST in CI/CD](../../research/sast-workflow/) explains the SonarQube-to-GitLab integration and developer feedback. [CI/CD paper](https://arxiv.org/abs/2609.00676).
- **Used in an empirical comparison:** [Comparing SAST tools](../../research/comparing-tools/) explains why the OCPP study's report counts cannot rank tools by accuracy. [OCPP paper](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf).
- **Discussed in a proposed approach:** [Software quality models](../../research/software-quality/) connects SonarQube output to quality modeling for EV charging software. [EV charging paper](https://www.cs.montana.edu/izurieta/pubs/Sheppard_CSR_2025.pdf).

These papers name SonarQube; their historical setups do not establish the capabilities or performance of every current Server edition or Community Build.
