---
title: "Grype"
description: "Match packages in container images, filesystems, and SBOMs against known vulnerabilities."
tool:
  aliases: ["Anchore Grype"]
  searchTerms: ["SBOM","CVE","SCA","container vulnerability scanner","image vulnerabilities","dependency vulnerabilities"]
  modes: ["Static"]
  inputTypes: ["Container images","Dependency metadata"]
  techniques: ["Software composition analysis","Known vulnerability detection"]
  languages: ["Python","JavaScript","Java","Go","PHP",".NET","Dart","Ruby","Rust","Swift","GitHub Actions"]
  languageNote: "Documented package ecosystems, not source-language analysis. Inventory and advisory coverage vary by package type; OS packages are also supported."
  targets: ["Container packages","Software bills of materials","Installed packages"]
  findings: ["Known vulnerable dependencies"]
  findingNote: "Reports database matches for identified packages. A match is not a demonstration that a deployment is exploitable."
  environment: "Released CLI installation with access to scan artifacts and a compatible vulnerability database."
  setup: "Select an image, filesystem, or supported SBOM; check package inventory and database freshness."
  license: "Apache-2.0"
  costNote: "Free open-source scanner. Anchore commercial products are separate."
  website: "https://oss.anchore.com/docs/guides/vulnerability/"
  scope: "Grype package vulnerability scanning; source bug detection and runtime attack testing are outside this entry."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Installation"
      url: https://oss.anchore.com/docs/installation/grype/
    - label: "Supported scan targets"
      url: https://oss.anchore.com/docs/guides/vulnerability/scan-targets/
    - label: "Package ecosystems and advisory matching"
      url: https://oss.anchore.com/docs/guides/vulnerability/ecosystems/
    - label: "Interpreting results"
      url: https://oss.anchore.com/docs/guides/vulnerability/interpreting-results/
    - label: "License"
      url: https://raw.githubusercontent.com/anchore/grype/main/LICENSE
---

## Where it fits

Grype provides another package vulnerability workflow alongside [Trivy](../trivy/) and [OSV-Scanner](../osv-scanner/). It can use an existing software bill of materials instead of rediscovering packages from an artifact.

## Establish the inventory

Choose the documented target type and retain the image digest or SBOM used for the scan. Check that the expected packages were identified before evaluating the vulnerability count.

## Investigate the match

Use package versions, advisory details, and match information to review findings. The result guide explains why CPE-based matches need extra verification. A missing fix version and a fixed version are different outcomes; preserve that distinction in follow-up work.
