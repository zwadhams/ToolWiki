# Disposable HTTP API

The [API testing guide](../../src/content/docs/guides/api-testing.md) contains
the setup, replay, Schemathesis, and RESTler procedures.

- `server.py` uses Python's standard library and binds only to loopback.
- `openapi.json` describes create, read, and delete operations and their resource links.
- `replay.py` sends the known zero-quantity request or resets the in-memory store.
- `run_schemathesis.py` runs the selected checks and retains UTF-8 console output,
  JUnit, and the command without changing the parent shell's encoding.
- `requirements-lock.txt` pins the Schemathesis environment used for the recorded run.
- `test_server.py` checks the fault, correction, resource lifecycle, reset, input
  rejection, and live schema.

From the repository root, run the fixture tests:

```sh
python -m unittest discover -s examples/http-api -v
```

The [execution record](../../audits/remaining-work/executions/http-api/record.json)
retains file digests, environment, exact commands, observed replay responses,
Schemathesis console output, and JUnit reports. The RESTler instructions were
checked against version 9.3.1 documentation; RESTler was not executed.
