---
title: Run repeatable CI checks
description: Reuse a local analysis recipe in CI while retaining findings, failure logs, and an explicit gate.
---

**Make the local check reproducible before making it a required CI job.** This guide uses the [Ruff and mypy recipe](../python-checks/), its pinned environment, and the shared [run record](../run-record/). CI-provider setup remains illustrative until tested in your own pipeline.

## Prepare the job

1. Check out the intended revision. Record the commit and any local changes; choose a fresh report directory for this run.
2. Create the recipe's Python environment and install its pinned requirements. Retain installation logs if setup fails.
3. Use the checked-in `pyproject.toml` and explicit input path. The recipe invokes Ruff without automatic fixes and keeps mypy's report separate. Record the tool versions and configuration hashes.
4. Decide the gate before running. The policy below requires both checks to complete without findings; it does not silently accept new suppressions or baselines.

From the recipe directory, run the corrected fixture using its existing runner:

```powershell
.venv/Scripts/python run_checks.py good --output reports/ci
```

Use `.venv/bin/python` on Linux or macOS. This selects the recipe environment
without relying on shell activation.

This is a smoke check of the recipe, not a check of your whole application. When adapting it, select your own source scope and configuration explicitly and retain a known faulty/corrected pair that shows the intended checks are active.

The runner returns `0` when both checks complete cleanly, `1` for completed checks with findings, and `2` for failed or incomplete analysis. It runs both tools and preserves their separate reports in the output directory.

## Interpret the result before applying the gate

Use the states in [Review analysis findings](../reviewing-findings/#check-the-run). A required check passes only when its intended scope is `completed-no-findings` and its evidence is present.

| Result | Gate action in this example |
| --- | --- |
| Both checks completed without findings | Pass. Retain both reports and the run record. |
| At least one check completed with findings | Fail the gate and link to the report for review. |
| Setup, execution, or report validation failed | Fail the gate as an analysis failure; retain logs. |
| Required check skipped, cancelled, or incomplete | Do not report a pass. Preserve the reason and rerun or resolve the missing scope. |

For non-fixing `ruff check`, status `0` indicates no violations, `1` indicates violations, and `2` indicates abnormal termination. Fix and exit-control flags change this interpretation; the recipe uses `--no-fix` and does not use `--exit-zero`. [Ruff's return-code contract](https://docs.astral.sh/ruff/linter/#exit-codes).

The pinned mypy runner also separates diagnostic results from blocking errors. Its 1.18.2 implementation uses status `1` for ordinary diagnostic errors and `2` for blocking failures, with `0` for no errors. Read the report and completion summary as well as the code; a syntax error can prevent later checks. [mypy 1.18.2 command implementation](https://github.com/python/mypy/blob/v1.18.2/mypy/main.py).

These codes are tool-specific. Do not map every nonzero status from another analyzer to "findings," or treat a missing report as an empty one.

## Retain evidence even when a check fails

Configure your CI provider to preserve the report directory after failed analysis as well as successful analysis. Keep stdout/stderr, the runner's record, tool versions, target/configuration hashes, and the provider's job status. Retain the setup log when the runner never starts. A cancelled job may leave partial artifacts; label them as partial.

Keep the analyzer's status when invoking an artifact-upload step. A successful upload must not replace a failed check's result, and a failed upload means the expected evidence is missing. Choose artifact retention and access according to the report's contents; diagnostic paths and code excerpts can reveal project information.

## Adopt a policy deliberately

This recipe blocks on every diagnostic. For an existing project, review the rule set and scope, then decide whether existing findings need a tracked remediation period. Do not regenerate baselines to force a pass.

Review an exception with its rule, location, evidence, owner, and expiry or review condition. Keep a suppression or baseline change distinct from a repair, and compare runs after intended version or rule changes. [Review analysis findings](../reviewing-findings/#investigate-and-decide) provides the shared procedure.

The [CI/CD research note](../../research/sast-workflow/) describes a separate SonarQube/GitLab integration study. This guide supplies result-handling steps for the Python recipe; it does not implement that study's connector.
