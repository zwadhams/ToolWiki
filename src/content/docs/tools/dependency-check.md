---
title: "OWASP Dependency-Check"
description: "Identify known vulnerabilities associated with application dependencies."
tool:
  analysisWorkflows:
    - id: dependencies
      label: Dependency artifact vulnerability matching
      subject: component
      inputs:
        - Dependency metadata
      languageScope: ecosystem
      languages:
        - Java
        - .NET
      findings:
        - Known vulnerable dependencies
      caveat: Matches dependency evidence to vulnerability data. Review component identification and false
        positives; source-level exploitability is not established.
      sources:
        - https://dependency-check.github.io/DependencyCheck/dependency-check-cli/
        - https://dependency-check.github.io/DependencyCheck/analyzers/index.html
        - https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/README.md
        - https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/LICENSE.txt
    - id: java-artifacts
      label: Java archive vulnerability matching
      subject: component
      inputs:
        - Binaries
      languageScope: ecosystem
      languages:
        - Java
      findings:
        - Known vulnerable dependencies
      caveat: Matches dependency evidence to vulnerability data. Review component identification and false
        positives; source-level exploitability is not established.
      sources:
        - https://dependency-check.github.io/DependencyCheck/dependency-check-cli/
        - https://dependency-check.github.io/DependencyCheck/analyzers/index.html
        - https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/README.md
        - https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/LICENSE.txt
      binaryFormats:
        - JVM bytecode
    - id: dotnet-artifacts
      label: .NET assembly vulnerability matching
      subject: component
      inputs:
        - Binaries
      languageScope: ecosystem
      languages:
        - .NET
      findings:
        - Known vulnerable dependencies
      caveat: Matches dependency evidence to vulnerability data. Review component identification and false
        positives; source-level exploitability is not established.
      sources:
        - https://dependency-check.github.io/DependencyCheck/dependency-check-cli/
        - https://dependency-check.github.io/DependencyCheck/analyzers/index.html
        - https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/README.md
        - https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/LICENSE.txt
      binaryFormats:
        - .NET assembly
  aliases: ["Dependency-Check","dependency check"]
  searchTerms: ["SCA","dependency CVE","NVD","Java dependencies","NuGet vulnerabilities"]
  modes: ["Static"]
  inputTypes: ["Dependency metadata","Binaries"]
  techniques: ["Software composition analysis","Known vulnerability detection"]
  languages: ["Java",".NET"]
  languageNote: "Selected Java and .NET dependency workflows. Additional ecosystem analyzers have their own prerequisites and experimental status."
  targets: ["JAR dependencies",".NET assemblies","Package manifests"]
  findings: ["Known vulnerable dependencies"]
  findingNote: "Matches dependency evidence to vulnerability data. Review component identification and false positives; source-level exploitability is not established."
  environment: "A compatible Java runtime. .NET assembly analysis also requires the documented .NET runtime or SDK."
  setup: "Select scan artifacts, initialize vulnerability data, and configure relevant analyzers. Plan NVD API access and caching."
  license: "Apache-2.0"
  costNote: "Free open-source analyzer. Optional external data services can require credentials and have separate usage terms."
  website: "https://dependency-check.github.io/DependencyCheck/"
  scope: "OWASP Dependency-Check CLI and supported dependency analyzers, with Java and .NET examples; not a source-code bug checker."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "CLI installation and usage"
      url: https://dependency-check.github.io/DependencyCheck/dependency-check-cli/
    - label: "Analyzer coverage"
      url: https://dependency-check.github.io/DependencyCheck/analyzers/index.html
    - label: "Requirements and data-service notices"
      url: https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/README.md
    - label: "License"
      url: https://raw.githubusercontent.com/dependency-check/DependencyCheck/main/LICENSE.txt
---

## Where it fits

Dependency-Check reviews the components a project uses. It complements application-source checks such as [SpotBugs](../spotbugs/) and [PMD](../pmd/).

## Prepare the data sources

Follow the selected release's prerequisites and initialize its local vulnerability data. The project recommends an NVD API key and caching for repeated builds. Optional analyzers can need extra tools or authenticated services; check which ones actually ran.

## Review component identification

Inspect the dependency, identifying evidence, and advisory before accepting or suppressing a finding. Keep suppressions specific and reviewable. Retain the scan configuration and data-update status so a later result can be interpreted in context.
