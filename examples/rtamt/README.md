# Check a temperature trace

Use CPython 3.12. This example was run on Windows with Python 3.12.16,
RTAMT 0.4.10, and antlr4-python3-runtime 4.7. The parser used by this RTAMT
release does not support Python 3.13 or newer.

From this directory, create an environment and run both traces in PowerShell:

```powershell
python --version
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements.txt
.venv/Scripts/python temperature.py
```

Confirm that the first command reports Python 3.12 before creating the environment.
On Linux or macOS, use `.venv/bin/python` for the final two commands. Those hosts
were not tested for this record. No activation or compiled RTAMT backend is needed.

The script checks `always[0:2](temperature <= 80)` at time zero on two traces.
The first includes 85 and returns a robustness of `-5.0`. The corrected trace
replaces 85 with 79 and returns `1.0`. These results describe those traces and
that requirement; they do not prove the system meets it on every execution.

An import or parser error means the trace was not evaluated. Negative
robustness means evaluation completed and found a violation.

The retained [execution record](../../audits/remaining-work/executions/rtamt.json)
identifies the script digest, environment, command, and observed output.
