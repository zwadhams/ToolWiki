---
title: Understand test evidence
description: Use execution coverage, source mutation, and generated inputs to ask different questions about a test suite.
---

A passing suite can leave paths untested or rely on weak assertions. Use the
evidence below to investigate both, while keeping each result's scope clear.

| Question | Method | Example tool |
| --- | --- | --- |
| Which selected lines and branches ran? | Execution coverage | [coverage.py](../../tools/coverage-py/) |
| Would the tests notice a selected change to the program? | Source mutation testing | [StrykerJS](../../tools/strykerjs/) |
| Can more inputs violate the property I wrote? | Property-based testing | [Hypothesis](../../tools/hypothesis/) |
| Can changed input bytes trigger a failure detector? | Input mutation and fuzzing | [AFL++](../../tools/afl-plus-plus/) |

These methods do not supply a complete specification. A wrong result can pass
when no assertion checks it.

## Measure execution coverage

Use the repository's
[`examples/python-coverage`](https://github.com/zwadhams/ToolWiki/tree/main/examples/python-coverage)
fixture. It supplies `sample.py` and three unittest suites. The only external
package is coverage.py 7.10.6; the test runner is Python's standard library.
Use Python 3.13. From the fixture directory on Windows:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
mkdir reports
.\.venv\Scripts\python.exe -m coverage run --branch --source=sample --data-file=reports/partial.coverage -m unittest discover -s tests -p test_partial.py
.\.venv\Scripts\python.exe -m coverage report --data-file=reports/partial.coverage -m
```

On Linux or macOS, use `.venv/bin/python` for the interpreter path. This recipe
collects one process only. It measures `sample.py`, excluding test code and
dependencies from the source denominator. Keep each run's data file separate.

**Observed on Windows with Python 3.13.15:** the test passed, but `Missing`
contained `3->5, 9`. Line 9 was never executed. The `sign` function reached every
statement, yet never took the branch from line 3 directly to line 5. Full line
coverage of that function did not mean full branch coverage.

Repeat the commands with `test_reach.py` and `reports/reach.coverage`, then with
`test_contract.py` and `reports/contract.coverage`. Both produced full statement
and branch coverage here, but the reach-only test has no return-value assertions.
The contract suite checks the expected values. Their identical coverage does
not make them equally effective tests.

`.venv/Scripts/python.exe -m coverage json --data-file=reports/partial.coverage -o reports/partial.json`
exports the counts and missing destinations. Retain the test outcome as well as
the report. For example, `.venv/Scripts/python.exe -m coverage report --data-file=reports/partial.coverage --fail-under=80`
returned 2 here even though the test passed. The reach-only suite met that gate
without checking return values. A coverage gate does not excuse a failed test or
establish that assertions are adequate. See the
[coverage.py report reference](https://coverage.readthedocs.io/en/7.10.6/cmd.html).

## Check test sensitivity

Use
[`examples/test-quality`](https://github.com/zwadhams/ToolWiki/tree/main/examples/test-quality)
with Node.js 24 and pnpm 11.25.0. The lockfile pins StrykerJS core and its Jest
runner to 9.0.1 and Jest to 29.7.0. From that fixture directory:

```sh
pnpm install --ignore-workspace --frozen-lockfile --ignore-scripts --node-linker=hoisted
pnpm run test:weak
pnpm run mutate:weak
```

The baseline test must pass before interpreting mutation results. The
configuration mutates only `src/discount.js`, uses one worker, and keeps
`inPlace: false`, so Stryker works in a temporary copy. It writes the JSON report
to `reports/weak/mutation.json`. A setup error is not a mutation result.

The contract says a total of 100 or more qualifies for a discount. The weak suite
checks 50 and 150. In the observed run, the mutation from `>= 100` to `> 100`
survived because those inputs do not distinguish the two expressions.

The strong suite adds an assertion for exactly 100. Run it with the same source
and mutation scope:

```sh
pnpm run test:strong
pnpm run mutate:strong
```

**Observed on Windows with Node.js 24.22.1:** the weak run killed five mutants and
left the boundary mutation alive. The strong run killed all six generated
mutants. The report is `reports/strong/mutation.json`. The boundary assertion improved this suite; the result does not set a target
mutation score for other projects.

## Read mutation outcomes

Stryker's [outcomes and formulas](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)
distinguish results that must not be collapsed into a simple pass/fail count:

| Outcome | Meaning for the mutation |
| --- | --- |
| Killed | At least one test failed while it was active. |
| Survived | The tests that ran still passed. |
| No coverage | No selected test executed it. |
| Timeout | Its test run exceeded the time limit; counted as detected. |
| Runtime error | The runner could not test it normally; different from an assertion failure. |
| Compile error | The changed program could not compile. |
| Ignored | It was excluded from testing. |
| Pending | It has not been tested yet. |

Detected mutants are `killed + timeout`; undetected mutants are
`survived + no coverage`. Valid mutants are the sum of those two groups, and the
mutation score is `detected / valid * 100`. Runtime errors, compile errors,
ignored mutants, and pending mutants are outside that denominator. If no valid
mutants exist, there is no ratio to interpret.

Investigate a survivor's behavioral effect. An
[equivalent mutant](https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/)
may not change observable behavior, so forcing an arbitrary score can waste
effort. Review timeouts, errors, excluded source, and operator choices alongside
the score. The fixture sets no score-based build failure; choose a gate only
after understanding your project's results.

## Preserve what the result establishes

Use a [run record](../run-record/) for the target revision or hashes, tool and
runner versions, source scope, exclusions, configuration, completion state, and
reports. The fixture evidence records retain observed results:

- [Python coverage execution record](https://github.com/zwadhams/ToolWiki/blob/main/examples/python-coverage/evidence.md)
- [JavaScript mutation execution record](https://github.com/zwadhams/ToolWiki/blob/main/examples/test-quality/evidence.md)

Keep expected examples separate from captured output. Do not turn coverage into
a correctness claim, mutation score into a universal test-quality score, or a
finite generated-input run into a proof.
