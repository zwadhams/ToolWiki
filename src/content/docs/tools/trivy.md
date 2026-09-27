---
title: Trivy
description: Find known package vulnerabilities and infrastructure misconfigurations in container images, dependency inventories, and configuration files.
tool:
  aliases: [Aqua Trivy]
  searchTerms: [container scanning, container vulnerabilities, Docker image scanner, dependency scanner, SCA, SBOM, IaC, infrastructure as code, Terraform scanning, Kubernetes configuration]
  modes: [Static]
  inputTypes: [Dependency metadata, Container images, Configuration files]
  techniques: [Software composition analysis, Known vulnerability detection, Configuration analysis]
  languages: [Python, JavaScript, Java, .NET, Ruby, PHP, Terraform, Docker, Kubernetes/Helm, CloudFormation, Azure Resource Manager]
  languageNote: Selected dependency ecosystems and configuration formats. Programming-language tags describe package detection, not source-code defect analysis. Configuration checks and package scanning accept different files; consult the target-specific coverage tables.
  targets: [Dependency manifests, SBOMs, Container images, Infrastructure as code, Dockerfiles, Kubernetes manifests]
  findings: [Known vulnerable dependencies, Security misconfiguration]
  findingNote: Package findings depend on component identification and advisory data. Configuration checks inspect supported definitions. Neither establishes application exploitability or verifies the behavior of a running deployment.
  environment: Official command-line installation routes for Linux, macOS, and Windows; container-based use is also documented.
  setup: Provide a supported image, dependency inventory, or configuration directory. Prepare vulnerability databases and any required checks; registry or module access can require connectivity and credentials.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free open-source CLI. Registry access, CI execution, and commercial Aqua products can have separate costs and terms.
  website: https://trivy.dev/
  verified: '2026-09-26'
  scope: Trivy CLI vulnerability and misconfiguration scanning. Secret scanning, license-policy analysis, and live Kubernetes auditing are outside this entry's filter scope.
  sources:
    - label: Installation and host platforms
      url: https://trivy.dev/docs/latest/getting-started/installation/
    - label: Vulnerability detection and advisory selection
      url: https://trivy.dev/docs/latest/guide/scanner/vulnerability/
    - label: Target-specific package ecosystem coverage
      url: https://trivy.dev/docs/latest/guide/coverage/language/
    - label: Configuration scanning and scanner defaults
      url: https://trivy.dev/docs/latest/guide/scanner/misconfiguration/
    - label: SBOM input and scan limitations
      url: https://trivy.dev/docs/latest/guide/target/sbom/
    - label: License
      url: https://github.com/aquasecurity/trivy/blob/main/LICENSE
---

## Choose the input and scanner

Trivy inspects artifacts without executing the target application. A repository scan can inspect dependency files and infrastructure definitions; it does not imply general source-code analysis.

Image and repository targets can expose different package metadata. An SBOM is also an input option, but results depend on its format and completeness. Compare [OSV-Scanner](../osv-scanner/) for another dependency-vulnerability workflow.

## Example workflows

**Illustrative commands, not run here.** With Trivy installed and its data available, enter a project containing supported dependency files:

```sh
trivy fs --scanners vuln .
```

To inspect infrastructure configuration in the current directory instead:

```sh
trivy config .
```

The first command selects vulnerability matching. The second checks supported configuration files. Misconfiguration scanning is not enabled by default in the `image`, `fs`, and `repo` commands; select it explicitly when needed.

## Interpret findings

For related workflows, compare [Grype](../grype/) for package vulnerabilities, [Checkov](../checkov/) for infrastructure policies, and [Hadolint](../hadolint/) for Dockerfile linting. Their input and finding categories differ.

For a vulnerability, inspect the identified package, installed version, advisory source, and available fix. For configuration findings, review the affected resource and rule in the context of the intended deployment.

Different inventories and data sources can produce different reports. Record the scanner version, database state, target identity, selected scanners, and exclusions before comparing runs. A package match is evidence to investigate, not proof that an attacker can reach the vulnerable code.

[Compare Trivy and OSV-Scanner](../../compare/?tools=tools%2Ftrivy%2Ctools%2Fosv-scanner) by inputs, findings, setup, and scope.
