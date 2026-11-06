---
title: Test a disposable HTTP API
description: Reproduce a known API failure, correct it, and inspect generated tests against the same schema.
---

Use this small orders service to try [Schemathesis](../../tools/schemathesis/)
and [RESTler](../../tools/restler/) against a known fault. The service, schema,
and replay script are maintained in [examples/http-api](https://github.com/zwadhams/ToolWiki/tree/main/examples/http-api).
[Get the examples](../get-examples/) first. Run the commands from the extracted
repository root unless a step names another working directory.

The service binds to `127.0.0.1:8771`. It has no credentials or external services.
Requests create and delete in-memory orders; reset or restart clears them.
The HTTP fixture is separate from boofuzz's custom-protocol harness.

## Start and reproduce the fault

Use **Python 3.13** for this walkthrough. Check the interpreter in PowerShell
before creating an environment:

```powershell
$apiPython = (Get-Command python).Source
& $apiPython --version
```

Expect `Python 3.13.x`; the new execution record uses **3.13.15**. If the command
is missing or reports another version, install/select Python 3.13 and set its
full executable path, then repeat the check:

```powershell
$apiPython = 'C:/PATH/TO/Python313/python.exe'
& $apiPython --version
```

Replace `C:/PATH/TO/Python313/python.exe` with your installed interpreter. Optional:
see [Python on Windows](https://docs.python.org/3.13/using/windows.html) for setup.
Schemathesis 4.33.1 declares [Python 3.11 or newer](https://github.com/schemathesis/schemathesis/blob/v4.33.1/pyproject.toml)
as its minimum; that is separate from the versions tested here.

The service uses only the Python standard library. Create the environment once
and start the faulty service in this terminal:

```powershell
& $apiPython -m venv .preview/api-demo-env
.preview/api-demo-env/Scripts/python examples/http-api/server.py
```

Wait for `Ready on http://127.0.0.1:8771`. In a second terminal, run:

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/replay.py
```

This sends `POST /orders` with `{"quantity": 0}`. Zero is valid in the schema,
but the faulty implementation divides the order total by its quantity. The
observed response is HTTP 500. The replay command exits successfully when it
reproduces this expected fault; its exit status is not an API health verdict.

A positive quantity creates an order and returns an `id`. That value is consumed
by `GET /orders/{orderId}` and `DELETE /orders/{orderId}`. The schema declares
these producer/consumer links. Deleting an order makes later reads return 404.

Reset between independent runs:

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --reset
```

Stop the server with Ctrl+C. Restart in corrected mode and check the same input:

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/server.py --fixed
```

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --expect-fixed
```

The corrected implementation uses the known unit price. The observed response
is HTTP 201 with total zero and unit price ten; the script then reads back the
created order. Use Ctrl+C to stop it when finished. A refused connection means
the service is not ready or the port is wrong, not that a test passed.

## Run Schemathesis

The demo selects the coverage phase, positive generation, and
`not_a_server_error`. It asks whether generated schema-valid inputs trigger a
server error. This does not cover every request, business rule, or security
property.

Install the pinned dependencies into the environment you created. Start the
faulty service, then run the check in the second terminal:

```powershell
.preview/api-demo-env/Scripts/python -m pip install -r examples/http-api/requirements-lock.txt
.preview/api-demo-env/Scripts/python examples/http-api/run_schemathesis.py --output .preview/api-faulty
```

Then stop the service, start `--fixed`, and repeat the wrapper command with
`.preview/api-fixed` as the output directory. Use a fresh directory for each
run. The wrapper retains stdout, stderr,
JUnit, the exact CLI command, and process status. It sets UTF-8 only for the
child process so captured output also works on Windows. Stop the service with
Ctrl+C when finished. Linux/macOS execution was not tested; the environment's
executables live under `bin` instead of `Scripts` on those hosts.

**Historical execution, 2026-11-06:** Schemathesis 4.33.1 on Windows/Python
3.12.16 exited 1 against the faulty service and 0 against the corrected service.
The [original execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/remaining-work/executions/http-api/record.json)
retains those results and input digests.

**New execution, 2026-11-06:** A fresh Windows/Python 3.13.15 environment installed
the same lockfile and reproduced both results. The faulty run stopped at its
first server-error finding, leaving two operations untested. The corrected run
tested all three operations in the selected phase without a finding. See the
[new execution record](https://github.com/zwadhams/ToolWiki/blob/7fce8e2cf1903a98cade96865bb383036f200e13/audits/reader-workflows/implementation/api/record.json).
A later short run need not discover the fault; `replay.py` is the deterministic
check.

See the [CLI reference](https://schemathesis.readthedocs.io/en/stable/reference/cli/)
for check selection, limits, reports, and exit-code meanings. Failure to load a
schema or complete setup is different from a failing API response.

## Adapt to your API

Use the pinned CLI directly with your API's OpenAPI file and a disposable local
service. In this example, `./widgets.json` is your saved schema in the repository
root, `http://127.0.0.1:8781` is the running test API's base URL, and the exact
path/method filters select only `POST /widgets`. Replace those three values to
match your service; include any API base path in `--url`. Filters select schema
operations; capability probes and negative method cases can send other requests.

From the repository root in **PowerShell 7**, run a bounded positive check:

```powershell
$out = '.preview/api-custom-positive'
if (Test-Path $out) { throw 'Choose a new report directory.' }
New-Item -ItemType Directory -Path $out | Out-Null
$priorEncoding = $env:PYTHONIOENCODING
try {
    $env:PYTHONIOENCODING = 'utf-8'
    & .preview/api-demo-env/Scripts/schemathesis.exe --no-color run ./widgets.json `
        --url http://127.0.0.1:8781 --include-path /widgets --include-method POST `
        --phases coverage --mode positive --checks not_a_server_error `
        --max-time 20 --workers 1 --max-failures 1 --request-timeout 3 `
        --seed 20261106 --report junit --report-junit-path "$out/junit.xml" `
        1> "$out/stdout.txt" 2> "$out/stderr.txt"
    $LASTEXITCODE | Set-Content "$out/exit-code.txt"
} finally {
    $env:PYTHONIOENCODING = $priorEncoding
}
```

This gives the run a 20-second budget, one worker, a stop after one failure/error,
and a three-second request timeout; the budget is not a hard process deadline.
Inspect `stdout.txt`, `stderr.txt`,
`exit-code.txt`, and `junit.xml` for findings and skipped work. The shell restores
its previous output encoding setting afterward. Keep this command with your
[run record](../run-record/); choose a fresh `$out` for every run.

To ask whether the API rejects **schema-invalid input**, repeat the block with
`$out = '.preview/api-custom-negative'` and replace its generation/check line:

```powershell
        --phases coverage --mode negative --checks negative_data_rejection `
```

The positive server-error check does not test invalid-input rejection.
`negative_data_rejection` evaluates rejection of invalid generated inputs; it
accepts certain error statuses, including 5xx, so use `not_a_server_error` too
when checking that rejection avoids server errors. For both kinds of input in one run,
use `--mode all --checks not_a_server_error,negative_data_rejection`. See the
[check definitions](https://schemathesis.readthedocs.io/en/stable/reference/checks/).

The new execution record tests the two separate commands against a scratch
variant of the supplied fixture: `/orders` became `/widgets`, with a saved
`widgets.json` and port 8781. Positive testing found the faulty zero-quantity
500 and passed after correction; negative testing exercised invalid requests.
The record lists the actual requests, results, and limitations. The combined
`all` variant, authentication, and real services were not tested.

## Use the same service with RESTler

**Illustrative; RESTler was not executed.** This route follows
[RESTler 9.3.1](https://github.com/microsoft/restler-fuzzer/tree/v9.3.1), whose
local build instructions name Python 3.12.8 and .NET 8 on 64-bit Windows or Linux.
Build that tagged checkout with its documented prerequisites before continuing.

Start the orders service in faulty mode. In a separate empty working directory,
run the tagged quickstart with absolute paths to its script, this schema, and
your RESTler build directory. In PowerShell:

```powershell
python C:/src/restler-fuzzer/restler-quick-start.py --api_spec_path C:/src/ToolWiki/examples/http-api/openapi.json --restler_drop_dir C:/src/restler_bin --ip 127.0.0.1 --port 8771 --task test
```

Replace the three `C:/src` paths with your checkout and build locations. Test
mode compiles the schema and sends requests. It does not just inspect the file.
The schema's [OpenAPI links](https://github.com/microsoft/restler-fuzzer/blob/v9.3.1/docs/user-guide/Annotations.md)
connect the returned order ID to read and delete requests.

Inspect `restler_working_dir/Test/RestlerResults/experiment*/logs/testing_summary.json`
and the network log. Confirm that resource creation succeeds and that read and
delete requests use the returned ID. Compilation alone, failed resource
creation, or setup errors do not establish successful API testing. Preserve
the generated `Compile` directory and logs.

After that smoke test works, reset the service and use a separate result
directory for a bounded fuzz run. For example, from `restler_working_dir`:

```powershell
dotnet C:/src/restler_bin/restler/Restler.dll fuzz --grammar_file Compile/grammar.py --dictionary_file Compile/dict.json --settings Compile/engine_settings.json --target_ip 127.0.0.1 --target_port 8771 --no_ssl --time_budget 0.01
```

The requested budget is 0.01 hours. A request or cleanup can finish after the
budget expires. Keep the server running until RESTler exits; Ctrl+C stops the
server afterward. This small run is for learning, not an exhaustive search.

Review [bug buckets and replay logs](https://github.com/microsoft/restler-fuzzer/blob/v9.3.1/docs/user-guide/Fuzzing.md),
then replay any candidate failure. Repeat against `--fixed` in a fresh result
directory. A short run without findings does not prove that defects are absent. Raw
finding counts do not compare RESTler and Schemathesis coverage.

Use a [run record](../run-record/) to retain target mode, schema and code digests,
tool/dependency versions, limits, commands, setup failures, reports, and replay
results. The [finding review guide](../reviewing-findings/) explains how to decide
whether a failure belongs to the implementation, schema, or test setup.

For response-time and error thresholds under a defined local workload, use the
[k6 example](../../tools/k6/#first-try) with the corrected service. It asks a
different question from generated API input testing.
