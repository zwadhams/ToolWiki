# Coverage example execution record

Executed November 6, 2026, with Python 3.13.15 and coverage.py 7.10.6 on Windows.
Each unittest suite ran in one process. Measurement selected only `sample.py`
with `--branch --source=sample`; no subprocess collection was configured.

| Suite | Test outcome | Observed coverage |
| --- | --- | --- |
| `test_partial.py` | One test passed | Six of seven statements and one of two branch destinations covered; line 9 and branch 3->5 missing. |
| `test_reach.py` | One test passed | All selected statements and branches covered, with no return-value assertions. |
| `test_contract.py` | Three tests passed | All selected statements and branches covered, with explicit expected-value assertions. |

The [run record](evidence/run.json) retains commands, versions, process scope,
input hashes, and report filenames. The JSON reports preserve missing-line and
branch data. The expected distinction was observed: full execution coverage
does not establish that tests check returned values.

A separate `coverage report --fail-under=80` gate returned 2 for the partial
data and 0 for the reach-only data. Both test processes had returned 0. This
separates test outcome from the chosen coverage threshold.

This fixture establishes those measurements for the recorded source and tests.
It does not evaluate every path, input, or property of a larger Python project.
