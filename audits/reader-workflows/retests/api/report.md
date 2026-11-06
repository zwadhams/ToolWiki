# Fresh reader retest: disposable HTTP API

Result: PASS for the tested reader route. No blocking or missing wiki step
was found. A fresh public download and new isolated environment reproduced
the service fault and correction. The adaptation instructions also worked
against a separate copied API with a different schema filename, route,
and port. No product files were edited; no commit or push was made.

Date: 2026-11-06. Site supplied for this test: integrated build 46be6de,
http://127.0.0.1:4362/ToolWiki/. This was a reader test, not a source review.

## Discovery route

1. Opened the home page in a fresh in-app browser tab.
2. Selected the visible `Test an API` task link. It set the HTTP search and
   Running applications filter and returned 6 of 98 tools.
3. Selected Schemathesis because its card named server errors and input
   validation, matching this task.
4. Followed its First try link to `disposable HTTP API`.
5. Followed `Get the examples` and executed the visible PowerShell ZIP
   acquisition steps in a new empty directory.
6. Returned to the already-read API procedure for replay, installation,
   Schemathesis, and Adapt to your API.

Visible pages consulted:

- http://127.0.0.1:4362/ToolWiki/
- http://127.0.0.1:4362/ToolWiki/?q=HTTP&input=Running+applications#tool-results
- http://127.0.0.1:4362/ToolWiki/tools/schemathesis/?catalog=q%3DHTTP%26input%3DRunning%2Bapplications%26category%3Dall
- http://127.0.0.1:4362/ToolWiki/guides/api-testing/?catalog=q%3DHTTP%26input%3DRunning%2Bapplications%26category%3Dall
- http://127.0.0.1:4362/ToolWiki/guides/get-examples/?catalog=q%3DHTTP%26input%3DRunning%2Bapplications%26category%3Dall

No historical audit or implementation record link was opened. No previous
audit or another agent's files were read. Product source was not consulted.

## Environment and acquisition

Public acquisition URL:
https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip

New scratch directory:
`C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/api/fresh-20261106`

The extracted snapshot contains a newly created `.preview/api-demo-env`.
The tested runtime is Python 3.13.15, PowerShell 7.6.9, Windows
10.0.26300, pip 26.2.1, and Schemathesis 4.33.1. The pinned requirements
installed successfully. `versions.txt` retains all installed package
versions; `public-input-digests.json` hashes the ZIP and relevant example
files. No prior example installation or environment was reused.

API traffic used only 127.0.0.1:8771 and 127.0.0.1:8785. External traffic
was limited to the authorized public example/package acquisition.

## Observed outcomes

| Run | Process status | Observed outcome |
| --- | --- | --- |
| Public replay, faulty | 0 | POST /orders with quantity 0 returned 500 and Zero-quantity unit-price defect. The replay regards reproduction of the expected fault as success, as the guide explains. |
| Public replay, corrected | 0 | Same input returned 201, total 0, unitPrice 10; created order was read back successfully. |
| Public Schemathesis, faulty | 1 | ST101 server error, quantity 0, HTTP 500. 3 cases generated; 1 operation tested and 2 skipped because the failure limit was reached. |
| Public Schemathesis, corrected | 0 | 3 operations tested; 6 generated cases passed in the coverage phase. |
| Shipment positive, faulty | 1 | Selected POST /shipments; ST101 for quantity 0 and HTTP 500. 3 generated cases. |
| Shipment positive, corrected | 0 | Selected POST /shipments; 4 generated cases passed. |
| Shipment negative, corrected | 0 | negative_data_rejection: 25 generated, 16 passed, 9 skipped. One operation tested. |
| Shipment explicit corrected replay | HTTP 201 | Quantity 0 returned total 0 and unitPrice 10; GET of returned identifier succeeded. |
| Shipment explicit invalid input | HTTP 400 | Quantity -1 returned quantity must be an integer from 0 through 100. |

For the independent API, the supplied README, schema, and server were read
as authorized. They were copied without edits to `shipment-copy` under
the fresh scratch directory. `input-digests.json` records matching original
and copy hashes. The copied schema is `service-schema.json`, the route is
`/shipments`, and the base URL is `http://127.0.0.1:8785`. This was not the
public example endpoint. Faulty and corrected modes used the copy's
documented `server.py` and `server.py --fixed` commands.

The guide's adaptation block was used with those three substitutions.
The bounded positive check selected coverage, positive generation,
not_a_server_error, 20 seconds, one worker, one failure, three-second
request timeout, seed 20261106, and JUnit. The negative run used the
documented replacement `--mode negative --checks negative_data_rejection`.
Each run used a new output directory, and state was reset before the
independent negative run.

The displayed negative result reports nine skipped generated cases.
Neither stdout nor JUnit explains those nine individual skips. JUnit's
single successful testcase summarizes the selected operation rather than
the number of generated inputs. This is a tool-report limitation, not an
observed procedure failure. The result establishes only the selected
check's bounded run. As the guide warns, negative_data_rejection can
accept some 5xx responses; it does not independently establish absence of
server errors. The manually recorded -1 request returned 400.

Stateful and fuzzing phases were disabled in these selected commands.
The replay explicitly confirmed create/read behavior, but this retest does
not establish exhaustive request coverage, security coverage, or the full
producer/consumer workflow. RESTler was not selected or tested.

## Documentation versus harness issues

No documentation correction is required by this retest. The visible
instructions supplied the interpreter check, public acquisition, working
directory, venv creation, pinned installation, service startup, reset,
expected replay statuses, encoding handling, bounded adaptation command,
invalid-input variant, output inspection, and shutdown procedure.

The following were tester/harness matters:

- PowerShell transcripts omitted native Python/pip stdout. Replays were
  reset and repeated with direct output redirection; these captures retain
  actual results. Installation's terminal tail and installed versions are
  retained, while the early download progress was not retained in files.
- The terminal reports status -1073741510 when Ctrl+C ends its foreground
  server session. This is a console shutdown status, not an API finding.
- The tester initially guessed `command.json` for wrapper metadata. It
  does not exist; directory inspection located the supplied `run.json`.
  The guide only said the exact command was retained, so this was not a
  wiki naming defect.
- The first cleanup pipeline produced no file for an empty result. A
  second query retained an explicit empty array in remaining-listeners.json.
- The browser worked without a visibility option. No browser rejection or
  recovery was needed.

Additional knowledge used: basic PowerShell copying, stdout redirection,
transcripts, SHA-256 hashing, process-session Ctrl+C, listener inspection,
and Invoke-WebRequest/Invoke-RestMethod for deterministic shipment replay.
No undocumented tool option or external technical workaround was needed
to make either documented Schemathesis route work.

## Evidence and cleanup

- `commands.md`: working directories and command sequence.
- `adapt-run.ps1`: exact adapted positive and negative command blocks.
- `api-faulty` and `api-fixed`: public wrapper reports, including run.json,
  command arguments, process status, stdout, stderr, and JUnit.
- `api-custom-positive-faulty`, `api-custom-positive-fixed`, and
  `api-custom-negative-fixed`: adapted CLI reports and exit status.
- `example-*-replay.stdout.txt`: direct captured public replay output.
- `shipment-*-replay.txt`: manual shipment request and response evidence.
- `input-digests.json`, `public-input-digests.json`, and `inputs`: retained
  input identities and the independent API copy.
- `versions.txt`, `python-version.txt`, `schemathesis-version.txt`, and
  `pip-version.txt`: actual tool versions.
- `cleanup.txt` and `remaining-listeners.json`: both API servers stopped;
  neither port 8771 nor 8785 was listening at cleanup.

To keep retained text ASCII, non-ASCII tool output is escaped in readable
report copies. For every converted file, the adjacent `.raw.b64` file
preserves the exact original bytes as base64. `package-evidence.py`
documents this reversible encoding step. Scratch retains the unmodified
native tool outputs and isolated installation. Venvs, caches, downloaded
repository trees, and installed packages are not copied into audits.
