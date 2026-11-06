# API guide implementation evidence

New verification on 2026-11-06, separate from the historical execution and reader
audit. This is an agent-run command check, not a human usability study.

The guide now links repository acquisition, checks/selects Python 3.13 before
creating its environment, separates the package minimum from tested runtimes,
and shows a direct CLI command for a supplied schema and disposable API.
The original fixture, wrapper, schema, lockfile, and historical evidence were
not changed.

## Environment and scope

- Windows, PowerShell 7.6.9, CPython 3.13.15, Schemathesis 4.33.1.
- A new `.preview/reader-implementation/api/.preview/api-demo-env` installed all
  pins from `examples/http-api/requirements-lock.txt`. `pip check` passed.
- Existing checkout files were copied into a fresh scratch root, preserving
  `examples/http-api` paths. Repository download/extraction was not tested in
  this lane.
- Demo runs use the unchanged wrapper: coverage phase, positive generation,
  `not_a_server_error`, 20-second budget, one worker, first failure limit, and
  seed 20261106.
- Adaptation runs use the guide's PowerShell block, changing only `$out` to a
  fresh report directory and applying the documented negative variant. Each
  selects `POST /widgets` from a three-operation schema, uses a local schema
  file and loopback URL, and adds a three-second request timeout.

## Results

| Run | CLI exit | Operations tested | Cases reported | Result |
| --- | --- | --- | --- | --- |
| Original fixture, faulty | 1 | 1 of 3 selected | 3 generated; 1 found a failure | ST101 for valid quantity 0; 2 operations skipped after the failure limit |
| Original fixture, fixed | 0 | 3 of 3 selected | 6 generated, 6 passed | Selected positive server-error checks completed |
| Widgets, faulty, positive | 1 | 1 of 1 selected | 3 generated; 1 found a failure | ST101 for valid quantity 0 |
| Widgets, fixed, positive | 0 | 1 of 1 selected | 4 generated, 4 passed | Selected positive server-error check completed |
| Widgets, faulty, negative | 0 | 1 of 1 selected | 25 generated, 16 passed, 9 skipped | Selected invalid-input rejection check completed |
| Widgets, fixed, negative | 0 | 1 of 1 selected | 25 generated, 16 passed, 9 skipped | Selected invalid-input rejection check completed |

Both deterministic demo replays exited 0 with their expected faulty/fixed
responses. Manual widgets requests confirmed quantity 0 returns 500 in faulty
mode and 201 in fixed mode; -1, 101, a string quantity, and a missing quantity
return 400 in both modes. The original `/orders` path returns 404 on widgets.

Negative runs also sent method mutations and capability probes. The request
logs include 501 responses for unsupported methods and successful requests
with a valid body. A selected-operation count is not an HTTP request count.
The tool reported nine skipped cases; this record does not infer a reason for
each skipped case from the server trace. `negative_data_rejection` alone is
not a server-error check: its expected error statuses include 5xx. No ST101
claim is made for the negative runs.

## Evidence and reproducibility

`record.json` retains commands, versions, exit codes, manual responses, scope,
and limitations. `runs/` retains stdout, stderr, JUnit, command scripts, server
traces, and encoding restoration observations. `manifest.json` records original
and retained SHA-256 digests. `inputs/` contains the scratch widgets service and
schema, source-file digests, and the one-off verification driver.

The scratch service changes orders names to widgets, uses port 8781 and
`widgets.json`, and adds request logging without changing validation or fault
behavior. The verification driver starts only these local fixtures, waits for
readiness, and terminates its own processes in `finally`. Service processes use
the base Python 3.13.15 executable; CLI and replay commands use the new venv.
The driver is audit evidence, not a reusable API wrapper or an installation
instruction.

The PowerShell blocks restore both an initially absent `PYTHONIOENCODING` and a
preexisting `ascii` value. Capture uses scoped UTF-8. Retained text replaces
non-ASCII glyphs with literal backslash escapes and removes ANSI control codes;
raw temporary output remains in the scratch directory. Original and retained
digests distinguish this presentation transform from the tool's output.

Two preliminary harness issues are recorded in `preliminary-observations.json`:
verification was first started before installation completed, and a later
immediate cleanup assertion fired after the scans. Fresh final output
directories were used after correcting the harness. Final servers were stopped
and both ports checked closed.

## Limits and sources

The new run tests only Windows/Python 3.13.15 and the supplied lockfile. The
historical record remains the evidence for the Python 3.12.16 scanner run.
The declared Python 3.11+ package minimum is not a claim that every supported
runtime was tested. RESTler, Linux/macOS, authentication, real/external APIs,
the combined `--mode all` variant, and exhaustive API/security coverage were
not tested. Browser/site validation belongs to the coordinating implementation
review, not this command-execution record.

CLI syntax was checked against the installed 4.33.1 `run --help` and executed.
Dependency semantics were checked against these primary sources:

- [Pinned runtime declaration](https://github.com/schemathesis/schemathesis/blob/v4.33.1/pyproject.toml)
- [Official CLI reference](https://schemathesis.readthedocs.io/en/stable/reference/cli/)
- [Official check definitions](https://schemathesis.readthedocs.io/en/stable/reference/checks/)
- [Python 3.13 on Windows](https://docs.python.org/3.13/using/windows.html)
