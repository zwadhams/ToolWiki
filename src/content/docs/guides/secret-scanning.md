---
title: Scan current files and Git history
description: Choose the right secret-scanning scope and separate findings, baselines, and credential remediation.
---

Choose the material you need to inspect before choosing a scanner. A value can
be absent from today's files and still exist in an earlier commit.

| Task | Starting point | What the result leaves open |
| --- | --- | --- |
| Review current files and prevent new candidate secrets | [detect-secrets](../../tools/detect-secrets/) baseline and audit | Earlier commits are outside this reviewed workflow. A baseline is an inventory, not a fix. |
| Investigate recorded changes | [Gitleaks](../../tools/gitleaks/) with an explicit local Git range | Missing refs, shallow history, rules, and exclusions limit what can be found. |

The Gitleaks profile includes a synthetic two-commit example: the current file
has been corrected, but the original value remains in history. Use dummy values
for experiments rather than copying live credentials into a test repository.

## Define the scan

Record the tool version, configuration, target revision, file selection or Git
refs, and exclusions. For history scans, record what was fetched and whether the
clone is shallow. A successful default clone is not evidence that every remote
branch, tag, or deleted commit is present.

Use a fresh report path for each run. Limit report access and enable the
scanner's documented redaction where available. A redacted value does not remove
other context, such as filenames or commit messages.

## Review a match

1. Check that the scan completed over the intended material.
2. Inspect the rule and location. Decide whether the value is a credential,
   a synthetic example, or a false positive without testing it against a live
   service merely to see whether it works.
3. For a real exposed credential, have its owner revoke or rotate it and update
   the application configuration. Removing a string or accepting a baseline
   does not revoke access.
4. Decide separately whether repository history needs cleanup. Coordinate any
   rewrite with repository owners and collaborators; clones and other copies
   can retain the old data.
5. Rerun the intended scope and retain the disposition with the
   [run record](../run-record/).

Follow [GitHub's exposure and cleanup guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
for hosted repositories. A clean rerun means the selected scanner reported no
remaining matches under that configuration; it is not proof that a credential
was never copied or used.

## Sources

- [detect-secrets baseline and prevention design](https://github.com/Yelp/detect-secrets/blob/v1.5.0/README.md)
- [Gitleaks 8.30.1 history, configuration, and baseline behavior](https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md)
