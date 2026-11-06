---
title: Record an analysis run
description: Keep the plan, actual execution, and supporting artifacts together without confusing expected and observed results.
---

Use this record when you need to reproduce a check or explain a result. Copy it
into your project and fill in the fields that apply. Keep sensitive inputs and
reports in storage appropriate for the project.

## Before the run

Record the expected signal before running. It describes how to confirm the
check is active, not evidence that it ran.

```text
Run name:
Purpose or property:
Tool and exact version:
Plugins, rules, monitor, or database version:
Target revision or input digest:
Host, runtime, and relevant dependencies:
Inputs, configuration, and working directory:
Command or UI actions:
Scope and exclusions:
Expected signal:
Artifact destination:
Chosen pass/fail gate:
```

Add tool-specific fields when they affect the result: a random seed and budget
for generated tests, bounds and assumptions for a verifier, or image and
advisory-database identities for a package scan. Omit fields that do not apply.

## After the run

Record what happened, including failure to finish. Retain raw reports alongside
the interpretation so another reader can check it.

```text
Execution date and operator:
Actual command or UI actions, including deviations:
Status:
Process exit code or UI completion state:
Analyzed scope and skipped work:
Observed diagnostics, counterexample, score, or measurements:
Reports, logs, inputs, and configuration artifacts:
Interpretation and unresolved questions:
Gate outcome and reason:
Correction or next investigation:
Comparable rerun record:
```

Choose one status per tool:

| Status | Meaning |
| --- | --- |
| `completed-no-findings` | The intended check completed without reported findings. |
| `completed-findings` | The intended check completed and reported findings. |
| `failed` | Setup, configuration, or execution failed. |
| `skipped` | The check was deliberately not attempted. |
| `cancelled` | The operator or runner stopped the check. |
| `incomplete` | Only part of the intended check finished, or completion cannot be established. |

A process exit code is tool-specific. A completed run with findings can be a
successful experiment and still fail your chosen CI gate. A blank report after
a crash is not a clean result. An illustrative example has no execution status
until it is run; label it **illustrative** and leave observed fields empty.

For a worked use of this format, see [Python linting and types](../python-checks/).
Use the [tool decision record](../choosing-and-recording-tools/) before execution
when you are still choosing a workflow.
