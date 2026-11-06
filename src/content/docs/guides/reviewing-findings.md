---
title: Review analysis findings
description: Check analysis completion, investigate a report, and verify the fix or record an exception.
---

**Confirm that the intended analysis completed before interpreting findings.** A report is evidence to investigate; an empty report can also result from missing input, skipped checks, or a failed run.

Use the [run record](../run-record/) to retain the target revision, tool version, configuration, commands, scope, and report locations. Keep the tool's result separate from your decision about it.

## Check the run

Read the completion summary and logs alongside the process status. Confirm that the intended files, rules, dependencies, or tests were included. Use these shared run states:

| State | Meaning | Next action |
| --- | --- | --- |
| `completed-no-findings` | The intended scope completed without reported findings. | Retain the scope and evidence; this does not establish absence of all defects. |
| `completed-findings` | The intended scope completed and reported findings. | Investigate each relevant finding. |
| `failed` | Setup, configuration, execution, or report processing failed. | Repair the failure and rerun. |
| `skipped` | The check was deliberately not run. | Record why and whether it is required. |
| `cancelled` | The run was stopped before completion. | Retain partial evidence and rerun if required. |
| `incomplete` | Some intended analysis was omitted or its completion is unknown. | Identify the missing scope before accepting the result. |

A process exit code is one signal. Read the selected tool's contract and any partial-analysis warnings. [Repeatable CI checks](../ci-checks/) applies these states to a concrete Python workflow.

## Investigate and decide

1. **Identify the report.** Record the rule or advisory ID, file and location or package/version, target revision, and link to the original artifact. Use stable tool identifiers where available; line numbers alone can move.
2. **Check the explanation.** Read the rule or advisory, surrounding code, input assumptions, and relevant configuration. For a dependency match, confirm the package identity, ecosystem, installed version, and affected range.
3. **Gather evidence.** Reproduce the behavior when appropriate, or inspect the path, type constraint, configuration, or advisory conditions. Keep an unconfirmed candidate distinct from an issue supported by this investigation.
4. **Record a disposition.** Choose a fix, a supported false-positive decision, a documented exception, or further investigation. Include evidence, an owner, and the next action. Give exceptions a review date and the conditions that would invalidate them.
5. **Rerun comparably.** Keep the tool, rules, input scope, and database snapshot stable when checking a repair. Record intentional changes. Confirm both that the finding changed as expected and that the analysis still completed.

Suppressing a report or accepting a baseline changes future reporting; it does not repair the code. Apply the narrowest supported control and retain the reason. See [Ruff's suppression controls](https://docs.astral.sh/ruff/linter/#error-suppression) and [PHPStan's baseline](https://phpstan.org/user-guide/baseline) for two different mechanisms.

## Example: a source warning

This is an illustrative review of `F401`, Ruff's unused-import rule. Follow the [Ruff and mypy recipe](../python-checks/) for a concrete faulty/corrected project and its execution record.

An import has no uses in the selected module. Confirm whether it is accidental, a public re-export, or needed for a side effect. Remove an accidental import and rerun the same rules. For an intended re-export, make that intent explicit using the tool's documented convention. Record the evidence for that interpretation. [Ruff F401 reference](https://docs.astral.sh/ruff/rules/unused-import/).

## Example: an advisory match

Suppose a completed dependency scan reports an advisory against a package in a lockfile. This example is illustrative and does not name an actual vulnerable package.

First check the package name, ecosystem, resolved version, dependency path, and advisory range. Then investigate the advisory's conditions and how the application uses the package. A matching version establishes the scanner's match; it does not demonstrate exploitation of this application. [OSV-Scanner's package-extraction and matching model](https://google.github.io/osv-scanner/usage/).

If an applicable fix exists, update the dependency, regenerate the lockfile through the package manager, run the application's tests, and rescan. Retain the before/after versions and database date. If a match is inapplicable or temporarily accepted, preserve the supporting evidence and revisit it when the package, application, or advisory changes.

## Keep the review with the evidence

Add the finding identity, investigation, disposition, and comparable rerun to the [run record](../run-record/). Link repeated reports to the same review instead of creating a fresh decision for every run. The [SAST adoption research](../../research/sast-adoption/) explains why this ongoing review effort matters.
