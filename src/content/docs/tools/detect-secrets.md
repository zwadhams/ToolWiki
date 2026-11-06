---
title: "detect-secrets"
description: "Find potential embedded secrets and review new findings against a repository baseline."
tool:
  analysisWorkflows:
    - id: source
      label: Find secret-like strings in files
      subject: component
      inputs:
        - Source code
      languageScope: independent
      languages: []
      findings:
        - Exposed secrets
      caveat: Potential secrets need review. Enabled plugins, filters, exclusions, and baseline decisions
        affect results.
      sources:
        - https://raw.githubusercontent.com/Yelp/detect-secrets/master/README.md
        - https://raw.githubusercontent.com/Yelp/detect-secrets/master/docs/audit.md
        - https://raw.githubusercontent.com/Yelp/detect-secrets/master/LICENSE
    - id: configuration
      label: Find secret-like strings in files
      subject: component
      inputs:
        - Configuration files
      languageScope: independent
      languages: []
      findings:
        - Exposed secrets
      caveat: Potential secrets need review. Enabled plugins, filters, exclusions, and baseline decisions
        affect results.
      sources:
        - https://raw.githubusercontent.com/Yelp/detect-secrets/master/README.md
        - https://raw.githubusercontent.com/Yelp/detect-secrets/master/docs/audit.md
        - https://raw.githubusercontent.com/Yelp/detect-secrets/master/LICENSE
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
    - label: Keyword detector implementation
      url: https://github.com/Yelp/detect-secrets/blob/master/detect_secrets/plugins/keyword.py
---

## Where it fits

detect-secrets adds a dedicated credential check to a repository. Its baseline lets a team review existing findings while checking subsequent changes.

For a review of past commits, use a history-scanning workflow such as
[Gitleaks](../gitleaks/). See [current files and Git history](../../guides/secret-scanning/)
to choose the scope and distinguish a review baseline from remediation.

## Review before baselining

Follow the scan and audit guides. Classify candidate findings rather than accepting a generated baseline without inspection. Keep the chosen plugins and exclusions in review with the baseline.

## First try

**Illustrative example; not executed here.** Use Python 3.12 and
[detect-secrets 1.5.0](https://pypi.org/project/detect-secrets/1.5.0/) in an isolated
environment. Install `detect-secrets==1.5.0` using the
[official setup guide](https://github.com/Yelp/detect-secrets), then record
`detect-secrets --version`. In an empty example directory, create a
`fixture` subdirectory and save `fixture/settings.py` with this dummy value:

```python
password = "violet-orchard-lantern-4829"
```

This string has no account or service behind it. Scan the file even though it is
not tracked by Git, then inspect the baseline interactively:

```sh
detect-secrets scan --all-files fixture > baseline.json
detect-secrets audit baseline.json
```

With the keyword detector enabled, expect a candidate on the assignment. The
baseline records its location, detector, and a hash; it is not proof that the
string is a valid credential. The audit step records a review decision. It does
not remove the value, revoke a credential, or make an unreviewed baseline safe.

Remove the dummy assignment and rescan to a different output file:

```sh
detect-secrets scan --all-files fixture > corrected-baseline.json
```

The candidate should be absent. If it was absent in the first scan, inspect the
enabled plugins, filters, and file scope before claiming the check is active.
For your project, retain and review the selected configuration, then follow the
[baseline audit procedure](https://github.com/Yelp/detect-secrets/blob/master/docs/audit.md).
Use synthetic strings for training; never add a real credential to test a rule.

## Handle confirmed findings

Use the affected service's process to revoke or rotate an exposed credential. Removing text from the current file alone does not undo exposure. A clean report only describes the configured scan; arbitrary secrets or excluded files can remain undetected.
