---
title: "Hadolint"
description: "Check Dockerfiles and their embedded shell commands for common mistakes."
tool:
  aliases: ["Dockerfile linter"]
  searchTerms: ["Dockerfile linting","container build","Docker best practices"]
  modes: ["Static"]
  inputTypes: ["Configuration files"]
  techniques: ["Linting"]
  languages: ["Docker"]
  languageNote: "Dockerfile instructions and supported shell fragments within RUN instructions. This entry does not cover general application source."
  targets: ["Dockerfiles","Container builds"]
  findings: ["Coding conventions","Logic errors"]
  findingNote: "Uses Dockerfile rules and ShellCheck integration. Findings depend on the selected rules and shell assumptions."
  environment: "Released binaries for Linux, macOS, and Windows, or the documented container workflow."
  setup: "Provide a Dockerfile and optional rule configuration; confirm the shell used by RUN instructions."
  license: "GPL-3.0; see the repository notices for component terms."
  costNote: "Free open-source linter."
  website: "https://github.com/hadolint/hadolint"
  scope: "Dockerfile linting and embedded shell checks; container package vulnerability scanning is a separate task."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Usage and configuration"
      url: https://github.com/hadolint/hadolint
    - label: "Example rule: explicit image tags"
      url: https://github.com/hadolint/hadolint/wiki/DL3006
    - label: "License"
      url: https://raw.githubusercontent.com/hadolint/hadolint/master/LICENSE
---

## Where it fits

Hadolint checks container build instructions before an image is built. Its shell checks connect it with [ShellCheck](../shellcheck/); use [Trivy](../trivy/) or [Grype](../grype/) for a separate review of known package vulnerabilities.

## Start with one Dockerfile

Use the documented binary or container installation, select the file, and read each rule's explanation. For example, the explicit-tag rule identifies base-image references whose version choice is implicit.

## Keep exceptions narrow

Record why a rule does not apply before suppressing it. A clean lint report does not establish that the image builds successfully, that its packages are current, or that its runtime configuration is secure.
