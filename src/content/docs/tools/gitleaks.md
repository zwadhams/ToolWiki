---
title: Gitleaks (Git history)
description: Find candidate secrets in the patches of a local Git repository.
tool:
  cardRequirement: Requires the Git history and refs you intend to inspect.
  decision:
    useWhen: Investigate whether secrets appeared in a repository's recorded changes, including values removed from current files.
    result: Findings identify a rule, file, line, and commit. Review the matched value and its context before deciding whether it was a real credential.
    limit: Only available history and enabled rules are checked. A clean scan does not establish that no secret was exposed.
  aliases: [Gitleaks CLI]
  searchTerms: [Git history secrets, commit secrets, repository credentials]
  modes: [Static]
  inputTypes: [Source code, Configuration files]
  techniques: [Secret scanning]
  languages: [Language independent]
  languageNote: Scans text in Git patches; these tags do not imply parsing or type checking of each source language.
  targets: [Git repositories, Git history]
  findings: [Exposed secrets]
  findingNote: Pattern matches are candidate secrets, not credential-validity checks. Rules, ignored findings, baselines, and available refs constrain the result.
  environment: Local CLI with Git. Select the release binary for the analysis host; the example uses a Linux shell.
  setup: Install Gitleaks 8.30.1, provide a local repository, and select the commit range and rule configuration.
  licenseCategory: Open source
  license: MIT for the Gitleaks CLI
  cost: [Free]
  costNote: The local CLI is free. The separate GitHub Action and successor tooling have their own scope and terms.
  website: https://github.com/gitleaks/gitleaks
  verified: '2026-11-06'
  scope: Gitleaks 8.30.1 local Git-history scanning. The project currently limits future releases to security patches; feature work has moved to Betterleaks.
  sources:
    - label: Gitleaks 8.30.1 release and binaries
      url: https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1
    - label: Versioned commands, configuration, reports, and redaction
      url: https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md
    - label: Git patch and log-option handling
      url: https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/git.go
    - label: Current maintenance notice
      url: https://github.com/gitleaks/gitleaks/blob/master/README.md
    - label: CLI license
      url: https://github.com/gitleaks/gitleaks/blob/v8.30.1/LICENSE
---

## Where it fits

Use Gitleaks for a history investigation. Use [detect-secrets](../detect-secrets/)
for its reviewed current-file baseline and prevention workflow. The
[secret-scanning guide](../../guides/secret-scanning/) explains how their scopes
and follow-up actions differ.

Gitleaks is in maintenance mode: its current project notice promises security
patches, not new features. This entry documents version 8.30.1; it does not
substitute Betterleaks commands or capabilities.

## First try

**Illustrative procedure, not executed here.** Install the official 8.30.1 binary
for your host and check `gitleaks version`. Use Git 2.28 or later and a Linux
shell in a new scratch directory. This example creates a repository with no
remote and a dummy token that cannot authenticate anywhere.

Create a rule outside the repository. It detects only the synthetic marker:

```toml
# Save as demo-rule.toml.
title = "Synthetic history check"
[[rules]]
id = "demo-only-token"
description = "Synthetic fixture marker"
regex = '''DEMO_ONLY_[A-Z0-9]+'''
```

Record the marker, then replace it in a second commit:

```sh
git init -b main secret-history-demo
printf '%s\n' 'demo_token = "DEMO_ONLY_0123456789"' > secret-history-demo/settings.txt
git -C secret-history-demo add settings.txt
git -C secret-history-demo -c user.name=Demo -c user.email=demo@example.invalid commit -m "Add dummy marker"
printf '%s\n' 'demo_token = "REMOVED"' > secret-history-demo/settings.txt
git -C secret-history-demo add settings.txt
git -C secret-history-demo -c user.name=Demo -c user.email=demo@example.invalid commit -m "Remove dummy marker"
git -C secret-history-demo rev-parse HEAD
gitleaks git secret-history-demo --log-opts="HEAD" --config demo-rule.toml --redact=100 --report-format json --report-path history.json --exit-code 10
```

The scan covers commits reachable from this repository's `HEAD`. It uses the
single custom rule, no baseline, and no intentional exclusions. Run it from a
scratch directory without a `.gitleaksignore` file. The expected report contains
`demo-only-token` for `settings.txt` in the first commit; configured status `10`
indicates findings. A command error or incomplete scan is not a clean result.

Removing the value from the current file does not remove its earlier patch.
Keep `history.json`, the rule, the recorded `HEAD`, and the command in a
[run record](../../guides/run-record/). Redaction reduces value exposure; still
inspect reports before sharing because paths, identities, and commit context
can be sensitive.

## Use a real repository

Choose the refs and range deliberately. A shallow clone or a clone missing
remote refs cannot supply history it does not contain. Record fetch depth,
selected refs, rules, allowlists, baseline, and limits with the result. A
baseline hides matching earlier findings; it does not remediate them.

This entry is catalog-only. Source files alone do not establish that the
builder has the repository history needed for this workflow.
