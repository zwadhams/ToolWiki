---
title: Trivy
description: Find known package vulnerabilities and infrastructure misconfigurations in container images, dependency inventories, and configuration files.
tool:
  analysisWorkflows:
    - id: dependencies
      label: Dependency vulnerability matching
      subject: component
      inputs:
        - Dependency metadata
      languageScope: ecosystem
      languages:
        - Python
        - JavaScript
        - Java
        - .NET
        - Ruby
        - PHP
      findings:
        - Known vulnerable dependencies
      caveat: Package findings depend on component identification and advisory data. Configuration checks
        inspect supported definitions. Neither establishes application exploitability or verifies the
        behavior of a running deployment.
      sources:
        - https://trivy.dev/docs/latest/getting-started/installation/
        - https://trivy.dev/docs/latest/guide/scanner/vulnerability/
        - https://trivy.dev/docs/latest/guide/coverage/language/
        - https://trivy.dev/docs/latest/guide/scanner/misconfiguration/
        - https://trivy.dev/docs/latest/guide/target/sbom/
        - https://github.com/aquasecurity/trivy/blob/main/LICENSE
      hostPlatforms:
        - Windows
        - Linux
        - macOS
    - id: image
      label: Container package vulnerability matching
      subject: component
      inputs:
        - Container images
      languageScope: independent
      languages: []
      findings:
        - Known vulnerable dependencies
      caveat: Package findings depend on component identification and advisory data. Configuration checks
        inspect supported definitions. Neither establishes application exploitability or verifies the
        behavior of a running deployment.
      sources:
        - https://trivy.dev/docs/latest/getting-started/installation/
        - https://trivy.dev/docs/latest/guide/scanner/vulnerability/
        - https://trivy.dev/docs/latest/guide/coverage/language/
        - https://trivy.dev/docs/latest/guide/scanner/misconfiguration/
        - https://trivy.dev/docs/latest/guide/target/sbom/
        - https://github.com/aquasecurity/trivy/blob/main/LICENSE
      hostPlatforms:
        - Windows
        - Linux
        - macOS
    - id: configuration
      label: Infrastructure configuration checks
      subject: component
      inputs:
        - Configuration files
      languageScope: configuration
      languages:
        - Terraform
        - Docker
        - Kubernetes/Helm
        - CloudFormation
        - Azure Resource Manager
      findings:
        - Security misconfiguration
      caveat: Package findings depend on component identification and advisory data. Configuration checks
        inspect supported definitions. Neither establishes application exploitability or verifies the
        behavior of a running deployment.
      sources:
        - https://trivy.dev/docs/latest/getting-started/installation/
        - https://trivy.dev/docs/latest/guide/scanner/vulnerability/
        - https://trivy.dev/docs/latest/guide/coverage/language/
        - https://trivy.dev/docs/latest/guide/scanner/misconfiguration/
        - https://trivy.dev/docs/latest/guide/target/sbom/
        - https://github.com/aquasecurity/trivy/blob/main/LICENSE
      hostPlatforms:
        - Windows
        - Linux
        - macOS
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
    - label: Image targets and access preparation
      url: https://trivy.dev/docs/latest/guide/target/container_image/
    - label: OSV-Scanner supported artifacts for comparison
      url: https://google.github.io/osv-scanner/supported-languages-and-lockfiles/
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

## Inspect a container image

**Illustrative command; not executed here.** Replace `IMAGE_REFERENCE` with the
image you intend to inspect, preferably an immutable registry digest such as
`REGISTRY/PROJECT/IMAGE@sha256:DIGEST`. Those uppercase terms are placeholders.
Prepare registry access and Trivy's vulnerability data using the
[image-target guide](https://trivy.dev/docs/latest/guide/target/container_image/).
An image in a local container engine needs access to that engine; a private
registry may require authentication.

```sh
trivy image --scanners vuln IMAGE_REFERENCE
```

For an existing image archive, use the guide's `--input` route instead of a
registry reference. Record the image identity and database state. Inspect the
package, installed version, advisory, and fixed version in each finding. Trivy
does not run the image, and a package match does not establish exploitability.

## Interpret findings

For related workflows, compare [Grype](../grype/) for package vulnerabilities, [Checkov](../checkov/) for infrastructure policies, and [Hadolint](../hadolint/) for Dockerfile linting. Their input and finding categories differ.

For a vulnerability, inspect the identified package, installed version, advisory source, and available fix. For configuration findings, review the affected resource and rule in the context of the intended deployment.

Different inventories and data sources can produce different reports. Record the scanner version, database state, target identity, selected scanners, and exclusions before comparing runs. A package match is evidence to investigate, not proof that an attacker can reach the vulnerable code.

[Compare Trivy and OSV-Scanner](../../compare/?tools=tools%2Ftrivy%2Ctools%2Fosv-scanner) by inputs, findings, setup, and scope.

## Compare package scanners

Trivy and OSV-Scanner both match identified packages to vulnerability data.
Compare them on the same image digest or dependency snapshot, checking which
packages each actually extracted. Their supported artifacts and advisory sources
can differ, so a larger finding count alone does not establish a better scan.
Use the [OSV-Scanner artifact table](https://google.github.io/osv-scanner/supported-languages-and-lockfiles/)
and [Trivy coverage table](https://trivy.dev/docs/latest/guide/coverage/language/)
for the input in hand.

Trivy's separate configuration checks answer a different question about
infrastructure definitions. This comparison does not attribute those checks to
OSV-Scanner or turn either tool into a general source-code analyzer.

Check the [execution and data boundaries](../../guides/execution-and-data/) for database retrieval, telemetry, and offline preparation.
