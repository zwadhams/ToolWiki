---
title: Syft
description: Inventory software components in supported artifacts and export a software bill of materials.
executionEvidence:
  status: recorded
  scope: Syft 1.57.1 on Windows ARM64 inventoried two local npm lockfile directories with only javascript-lock-cataloger enabled. The baseline contained the project and is-number 7.0.0; the changed fixture additionally exposed is-odd 3.0.1 and its is-number 6.0.0 dependency. No vulnerability scanner, container runtime, or package installation was used for this scan.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/api-supply-tools/evidence/sbom-inventory/run.json
tool:
  cardRequirement: Supply a supported artifact and choose whether you need declared or installed component inventory.
  decision:
    useWhen: Record which packages a supported image or directory contains before passing an SBOM to other checks.
    result: An inventory with package names, versions, identifiers, locations, and cataloger information, exportable as Syft JSON, SPDX, or CycloneDX.
    limit: An inventory is not a vulnerability finding or proof of package reachability. Detection depends on artifact contents, metadata, catalogers, and selected scope.
  analysisWorkflows:
    - id: npm-declarations
      label: Declared npm dependency inventory
      subject: component
      inputs: [Dependency metadata]
      languageScope: ecosystem
      languages: [JavaScript]
      findings: [Software component inventory]
      hostPlatforms: [Windows, Linux, macOS]
      requires: []
      caveat: This workflow reads supported npm lockfile metadata. It records declared package versions, not evidence that those packages are installed, reachable, vulnerable, or executed. Preserve the project's scan scope; the tutorial's explicit cataloger override is only for its fixture.
      sources:
        - https://oss.anchore.com/docs/capabilities/javascript/
        - https://oss.anchore.com/docs/guides/sbom/catalogers/
        - https://oss.anchore.com/docs/installation/syft/
    - id: image-inventory
      label: Container image component inventory
      subject: component
      inputs: [Container images]
      languageScope: independent
      languages: []
      findings: [Software component inventory]
      hostPlatforms: [Windows, Linux, macOS]
      requires: []
      caveat: Supply an accessible supported image source and select the intended layer scope. Image catalogers look for installed packages; supported metadata and packaging determine what can be identified. This workflow does not run the container or query a vulnerability database.
      sources:
        - https://oss.anchore.com/docs/guides/sbom/getting-started/
        - https://oss.anchore.com/docs/guides/sbom/catalogers/
        - https://oss.anchore.com/docs/installation/syft/
  aliases: [Anchore Syft]
  searchTerms: [SBOM, software bill of materials, package inventory, CycloneDX, SPDX, npm lockfile, supply chain]
  modes: [Static]
  inputTypes: [Dependency metadata, Container images]
  findings: [Software component inventory]
  findingNote: Reports detected or declared components and metadata. Vulnerability matching is a separate step, for example with Grype, and package presence does not establish exploitability.
  environment: Official binaries are published for Windows, Linux, and macOS. The retained example uses the Windows ARM64 build of Syft 1.57.1. Select a release asset for the actual host architecture.
  setup: Install the CLI and supply an accessible image or directory containing supported package metadata. Record artifact identity, cataloger selection, and output format with the SBOM.
  techniques: [Software composition analysis, SBOM generation]
  languages: [JavaScript, Python, Java, Go, Rust, .NET]
  languageNote: These are selected package ecosystems supported by Syft, not source-code defect-analysis claims or an exhaustive support list. The executed fixture covers npm lockfiles only.
  targets: [Package inventories, Container images, Filesystem artifacts, SBOMs]
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: The open-source CLI runs locally. Downloading private images or using separate hosted supply-chain services can have their own access requirements and costs.
  website: https://github.com/anchore/syft
  verified: '2026-11-12'
  scope: Syft software-component cataloging and SBOM output. The example pins 1.57.1 and a single npm lockfile cataloger; it does not demonstrate every ecosystem, image source, output format, or license field.
  sources:
    - label: Project scope and supported package ecosystems
      url: https://github.com/anchore/syft
    - label: Installation and release asset selection
      url: https://oss.anchore.com/docs/installation/syft/
    - label: First directory and container-image scans
      url: https://oss.anchore.com/docs/guides/sbom/getting-started/
    - label: Catalogers and declared versus installed packages
      url: https://oss.anchore.com/docs/guides/sbom/catalogers/
    - label: JavaScript package metadata support
      url: https://oss.anchore.com/docs/capabilities/javascript/
    - label: SBOM output formats
      url: https://oss.anchore.com/docs/guides/sbom/formats/
    - label: Syft 1.57.1 release
      url: https://github.com/anchore/syft/releases/tag/v1.57.1
    - label: Syft license
      url: https://github.com/anchore/syft/blob/main/LICENSE
---

## First try

Use the [SBOM inventory example](../../guides/sbom-inventory/) to scan two small
npm lockfile directories. It records the project's direct and transitive package
versions without installing those packages or running application code.

The guide explains why the added dependency appears beside a second version of
an existing package. Neither inventory is labeled faulty: a change is something
to inspect, not automatically a defect.

## Choose the artifact and scope

Decide whether you need an inventory of declared dependencies or the software
actually packaged in a deployment artifact. Syft selects catalogers according to
the source kind. Directory and image defaults differ, and a lockfile inventory
is not proof that its packages exist in a deployed image.

For an existing project, preserve the current source, exclusions, cataloger
selection, and layer scope before comparing results. The example's
`--override-default-catalogers` intentionally replaces defaults to isolate one
cataloger; it is not a neutral command for a general audit.

## Interpret and reuse an SBOM

Inspect a package's name, version, location, and `foundBy` cataloger. Keep the
artifact digest and Syft version with the report. A missing component can reflect
unsupported or absent metadata, an exclusion, or the chosen scan scope.

Use [Grype](../grype/) or another compatible scanner for vulnerability matching.
An SBOM alone does not say that a component is vulnerable or reachable.
[Trivy](../trivy/) offers related inventory and security-scanning workflows;
compare the actual artifact and output requirements before replacing a pipeline.
