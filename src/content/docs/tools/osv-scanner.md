---
title: "OSV-Scanner"
description: "Match project dependencies and supported container artifacts against known vulnerability records."
tool:
  modes: ["Static"]
  inputTypes: ["Dependency metadata","Container images"]
  techniques: ["Software composition analysis","Known vulnerability detection"]
  languages: ["C","C++","Dart","Elixir","Go","Haskell","Java","JavaScript",".NET","PHP","Python","R","Ruby","Rust"]
  languageNote: "Tags describe supported dependency ecosystems, not source-level security analysis. Container artifact and manifest support differ; a source-directory scan mainly identifies dependencies."
  targets: ["Dependency manifests","Container images","Software packages"]
  findings: ["Known vulnerable dependencies"]
  findingNote: "Matches identified package versions or commits to advisories. This does not by itself establish that a vulnerable function is reachable or exploitable in the application."
  environment: "Official CLI binaries for Linux, macOS, and Windows. Container workflows and optional integrations have additional prerequisites."
  setup: "Provide supported manifests, lockfiles, or a container image. Online advisory lookup is the default; offline matching needs prepared local data. A test harness is unnecessary."
  licenseCategory: "Open source"
  license: "Apache-2.0"
  cost: ["Free"]
  costNote: "Free open-source scanner. Registry access, CI execution, and optional surrounding services can have separate costs."
  website: "https://google.github.io/osv-scanner/"
  verified: "2026-09-22"
  scope: "Current v2 scan source and scan image workflows. The input tags cover dependency inventories and images; this entry does not claim general source-defect detection."
  sources:
    - label: "Purpose and advisory matching"
      url: https://google.github.io/osv-scanner/
    - label: "Supported artifacts, ecosystems, and manifests"
      url: https://google.github.io/osv-scanner/supported-languages-and-lockfiles/
    - label: "Current command syntax and output formats"
      url: https://google.github.io/osv-scanner/usage/
    - label: "Supported host installations"
      url: https://google.github.io/osv-scanner/installation/
    - label: "License"
      url: https://github.com/google/osv-scanner/blob/main/LICENSE
---

## What it examines

OSV-Scanner identifies dependencies and looks them up in vulnerability data. Its source scanning command refers to scanning a project directory; it does not imply the same code-behavior analysis as [CodeQL](../codeql/).

Image scanning extracts supported installed artifacts. It is static inspection of the image, not a test of a running container.

## Worked example: inspect a dependency inventory

**Illustrative workflow, not run here.** With OSV-Scanner v2 installed, enter a project with a supported lockfile, such as `pnpm-lock.yaml` or `Cargo.lock`:

```sh
osv-scanner scan source --format json --output-file osv-results.json -r .
```

Review the identified package, version, ecosystem, and advisory identifiers. A result means the identified version matches the advisory conditions; investigate whether the affected behavior is used. The exact findings change with the lockfile and advisory database.

For an image workflow, replace `IMAGE_REFERENCE` with a specific image you intend to inspect:

```sh
osv-scanner scan image IMAGE_REFERENCE
```

Prefer recording its immutable digest with the result.

## Limits and comparisons

A resolved lockfile is generally more precise about selected versions than an unpinned manifest. Missing inventories or unsupported extractors can leave dependencies invisible. Updating advisory data can change results without changing your software.

Compare [CVE Binary Tool](../cve-bin-tool/) when your starting point is embedded component identification. Keep component detection accuracy separate from advisory matching, and distinguish a scan error from a clean report.
