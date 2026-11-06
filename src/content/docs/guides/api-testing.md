---
title: Test a disposable HTTP API
description: Reproduce a known API failure, correct it, and inspect generated tests against the same schema.
---

Use this small orders service to try [Schemathesis](../../tools/schemathesis/)
and [RESTler](../../tools/restler/) against a known fault. The service, schema,
and replay script are maintained in [examples/http-api](https://github.com/zwadhams/ToolWiki/tree/main/examples/http-api).
Work from a local copy of the ToolWiki repository.

The service binds to `127.0.0.1:8771`. It has no credentials or external services.
Requests create and delete in-memory orders; reset or restart clears them.
The HTTP fixture is separate from boofuzz's custom-protocol harness.

## Start and reproduce the fault

You need Python 3.12 for the pinned Schemathesis environment below. The service
itself uses only the Python standard library. From the repository root, start
it in one terminal:

```sh
python examples/http-api/server.py
```

Wait for `Ready on http://127.0.0.1:8771`. In a second terminal, run:

```sh
python examples/http-api/replay.py
```

This sends `POST /orders` with `{"quantity": 0}`. Zero is valid in the schema,
but the faulty implementation divides the order total by its quantity. The
observed response is HTTP 500. The replay command exits successfully when it
reproduces this expected fault; its exit status is not an API health verdict.

A positive quantity creates an order and returns an `id`. That value is consumed
by `GET /orders/{orderId}` and `DELETE /orders/{orderId}`. The schema declares
these producer/consumer links. Deleting an order makes later reads return 404.

Reset between independent runs:

```sh
python examples/http-api/replay.py --reset
```

Stop the server with Ctrl+C. Restart in corrected mode and check the same input:

```sh
python examples/http-api/server.py --fixed
```

```sh
python examples/http-api/replay.py --expect-fixed
```

The corrected implementation uses the known unit price. The observed response
is HTTP 201 with total zero and unit price ten; the script then reads back the
created order. Use Ctrl+C to stop it when finished. A refused connection means
the service is not ready or the port is wrong, not that a test passed.

## Run Schemathesis

**Executed on 2026-11-06:** Schemathesis 4.33.1 on Windows/Python 3.12.16,
using the coverage phase, positive generation, and `not_a_server_error` check.
The faulty service produced a server-error finding. The corrected service
completed the selected checks without a finding. This does not cover every
possible request, business rule, or security property.

Create the pinned environment in PowerShell from the repository root:

```powershell
python -m venv .preview/api-demo-env
.preview/api-demo-env/Scripts/python -m pip install -r examples/http-api/requirements-lock.txt
.preview/api-demo-env/Scripts/python examples/http-api/run_schemathesis.py --output .preview/api-faulty
```

Start the faulty service before that command. Then stop it, start `--fixed`,
and repeat the command with `.preview/api-fixed` as the output directory. On
Linux or macOS, replace `Scripts` with `bin`; those hosts were not used for this
record. Use a fresh directory for each run. The wrapper retains stdout, stderr,
JUnit, the exact CLI command, and process status. It sets UTF-8 only for the
child process so captured output also works on Windows.

The faulty run exited 1 and stopped after its first failure, leaving other
operations untested. The corrected run exited 0 after testing all three
operations in the selected phase. The [execution record](https://github.com/zwadhams/ToolWiki/blob/main/audits/remaining-work/executions/http-api/record.json)
records those outcomes and input digests. A later short run need not discover
the fault; `replay.py` is the deterministic check.

See the [CLI reference](https://schemathesis.readthedocs.io/en/stable/reference/cli/)
for check selection, limits, reports, and exit-code meanings. Failure to load a
schema or complete setup is different from a failing API response.

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
