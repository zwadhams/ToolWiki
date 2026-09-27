---
title: "detect-secrets"
description: "Find potential embedded secrets and review new findings against a repository baseline."
tool:
  aliases: ["Yelp detect-secrets"]
  searchTerms: ["secret scanning","hardcoded credentials","API keys","secret detection","pre commit"]
  modes: ["Static"]
  inputTypes: ["Source code","Configuration files"]
  techniques: ["Secret scanning"]
  languages: ["Language independent"]
  languageNote: "Text and token patterns across supported files; it does not parse every programming language semantically."
  targets: ["Repositories","Pre-commit checks"]
  findings: ["Exposed secrets"]
  findingNote: "Potential secrets need review. Enabled plugins, filters, exclusions, and baseline decisions affect results."
  environment: "Compatible Python installation; optional Git and pre-commit integration."
  setup: "Install the package, scan selected files, audit a baseline, and configure the hook or CI workflow."
  license: "Apache-2.0"
  costNote: "Free open-source scanner and audit workflow."
  website: "https://github.com/Yelp/detect-secrets"
  scope: "Repository file scanning and baseline-based prevention. This is not a claim of complete Git-history coverage."
  licenseCategory: "Open source"
  cost: ["Free"]
  verified: "2026-09-26"
  sources:
    - label: "Setup, plugins, and baseline workflow"
      url: https://raw.githubusercontent.com/Yelp/detect-secrets/master/README.md
    - label: "Auditing findings"
      url: https://raw.githubusercontent.com/Yelp/detect-secrets/master/docs/audit.md
    - label: "License"
      url: https://raw.githubusercontent.com/Yelp/detect-secrets/master/LICENSE
---

## Where it fits

detect-secrets adds a dedicated credential check to a repository. Its baseline lets a team review existing findings while checking subsequent changes.

## Review before baselining

Follow the scan and audit guides. Classify candidate findings rather than accepting a generated baseline without inspection. Keep the chosen plugins and exclusions in review with the baseline.

## Handle confirmed findings

Use the affected service's process to revoke or rotate an exposed credential. Removing text from the current file alone does not undo exposure. A clean report only describes the configured scan; arbitrary secrets or excluded files can remain undetected.
