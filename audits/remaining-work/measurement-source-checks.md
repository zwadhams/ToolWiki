# Measurement workflow source checks

Reviewed and exercised November 6, 2026, for ADJ-01, ADJ-02, and ADJ-04.
New profiles are scoped to specific local workflows. Documentation evidence,
actual fixture execution, and inferences about the limits of results are kept
separate below.

## Coverage.py

- [Release 7.10.6](https://pypi.org/project/coverage/7.10.6/) supports the selected
  Python 3.13 runtime.
- [The release CLI reference](https://coverage.readthedocs.io/en/7.10.6/cmd.html)
  supports running unittest through coverage, separate data files, branch
  measurement, and text/JSON reporting.
- [Source selection](https://coverage.readthedocs.io/en/latest/source.html)
  defines the measured denominator; [branch measurement](https://coverage.readthedocs.io/en/latest/branch.html)
  distinguishes statement visits from possible next-line destinations.
- [Process guidance](https://coverage.readthedocs.io/en/latest/subprocess.html)
  requires deliberate setup for subprocess collection. This fixture uses one
  process per run and makes no process-tree coverage claim.
- [The project notice](https://raw.githubusercontent.com/nedbat/coveragepy/master/NOTICE.txt)
  states Apache-2.0 except where otherwise noted.

Observed evidence is in
[the Python coverage execution record](../../examples/python-coverage/evidence.md).
The partial test passed while missing line 9 and branch 3->5. The reach-only and
contract suites both reached full measured coverage, despite different assertions.
The conclusion about assertion strength follows directly from their test code;
coverage itself does not rate those assertions. Admission remains catalog-only.

## StrykerJS

- [Core 9.0.1 metadata](https://github.com/stryker-mutator/stryker-js/blob/v9.0.1/packages/core/package.json)
  requires Node.js 20 or newer. The fixture used Node.js 24.22.1.
- [Jest runner 9.0.1 metadata](https://github.com/stryker-mutator/stryker-js/blob/v9.0.1/packages/jest-runner/package.json)
  pairs it with the 9.0 core series and develops against Jest 29.7.0; that exact
  combination passed this fixture. The [runner guide](https://stryker-mutator.io/docs/stryker-js/jest-runner/)
  describes custom Jest configuration.
- [Configuration guidance](https://stryker-mutator.io/docs/stryker-js/configuration/)
  supports narrow mutation scope, temporary-copy execution, one worker, and
  retained JSON reports.
- [States and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)
  distinguish Killed, Survived, No coverage, Timeout, Runtime error, Compile
  error, Ignored, and Pending. Detected is killed plus timeout; undetected is
  survived plus no coverage; valid is their sum. Score is detected/valid.
  Errors, ignored mutants, and pending mutants are outside that denominator.
- [Equivalent-mutant guidance](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/)
  explains why a survivor need not expose a missing meaningful assertion.
- [The selected release license](https://github.com/stryker-mutator/stryker-js/blob/v9.0.1/LICENSE)
  is Apache-2.0.

Observed evidence is in
[the JavaScript mutation execution record](../../examples/test-quality/evidence.md).
One boundary mutation survived the weak suite and was killed by the added
boundary assertion. The final run killed all six generated mutants. This is a
small JavaScript/Jest example, not support evidence for other runners or a claim
of complete test quality. Admission remains catalog-only.

## Grafana k6 OSS

- [The 1.0.0 release](https://github.com/grafana/k6/releases/tag/v1.0.0) supplied
  the Windows amd64 archive. Its SHA-256 matched the release checksum file:
  `0bfbab5c6c263b3d2663fe05383707448385649610f2c9487b817343a890c70d`.
- [Installation](https://grafana.com/docs/k6/latest/set-up/install-k6/) and
  [local execution](https://grafana.com/docs/k6/latest/get-started/running-k6/)
  establish the CLI and host preparation. Cloud execution is a separate mode.
- [Checks](https://grafana.com/docs/k6/latest/using-k6/checks/) record Boolean
  outcomes without failing the whole test by themselves.
  [Thresholds](https://grafana.com/docs/k6/latest/using-k6/thresholds/) define
  metric gates and failed status.
- [Workload models](https://grafana.com/docs/k6/latest/using-k6/scenarios/concepts/open-vs-closed/)
  distinguish fixed virtual users from arrival-rate models. The fixture uses
  two virtual users for ten seconds with a half-second pause.
- [Options](https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/)
  document usage-report control. The fixture runs used `--no-usage-report`.
- [The release license](https://github.com/grafana/k6/blob/v1.0.0/LICENSE.md)
  is AGPL-3.0. Cloud terms are outside this profile.

The [k6 execution record](executions/k6/record.json) and sibling summaries/logs
retain the commands, environment, target ports, and source hashes. Each case
used a disposable loopback server, closed after the run:

| Case | Observed result |
| --- | --- |
| Default criteria | 40 load iterations, response checks and thresholds met, exit 0. |
| Deliberate latency failure | Response checks passed but p95 < 0 failed, exit 99. |
| Wrong fixture mode | Setup failed before load, exit 107. No successful measurement claimed from empty metrics. |

The admitted builder workflow needs an HTTP API, a test instance, and a supplied
script; all are existing schema fields. Its performance finding remains visible
without adding a goal to version 1 system files. It has no target-language
restriction. The inference that these measurements do not establish production
capacity follows from the deliberately small workload and local shared host.

## Validation boundaries

These checks verify the fixtures and the described result semantics. They do not
benchmark the tools or establish production capacity, universal test quality,
native-code coverage, or broader integration support. The coordinator owns final
catalog reconciliation, generated links, matching regressions, independent
review, and full verification after integration.
