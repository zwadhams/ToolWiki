# Check a PING response contract

This boofuzz fixture supplies a target, two selected mutations, a response
check, and a readiness callback. It demonstrates a custom protocol, not HTTP
or a general fuzzing campaign.

From this directory, use Python 3.12 and install the pinned environment:

```powershell
python -m venv .venv
.venv/Scripts/python -m pip install -r requirements-lock.txt
```

On Linux or macOS, use `.venv/bin/python`. The retained run used Windows and
Python 3.12.16. Run the server in one terminal:

```powershell
.venv/Scripts/python server.py
```

Wait for `Ready on 127.0.0.1:8021`, then run the check in another terminal:

```powershell
.venv/Scripts/python check.py --output reports/faulty
```

The server normally replies to `PING value` with `PONG value`, using CRLF line
endings. Its deliberate fault closes the connection without replying to the
valid `PING TRIGGER` request. The callback records that response violation;
it does not claim a process crash or memory error. A health probe confirms that
the server can accept a new connection. Each connection is a fresh request, so
there is no stored state to reset.

Stop the server with Ctrl+C and restart it with `--fixed`. Run the same check
with a fresh output directory:

```powershell
.venv/Scripts/python server.py --fixed
```

```powershell
.venv/Scripts/python check.py --output reports/fixed
```

The harness sends exactly two selected values: `TRIGGER` and `world`. It checks
the ordinary `hello` response before starting. The observed faulty run recorded
one failed response and exited 1; the corrected run recorded two passing
responses and exited 0. A missing baseline, failed readiness check, or incomplete
case list exits 2. These exit rules belong to this harness.

Each output directory contains `run.json` with requests/replies in hex, input
hashes, versions, and status, plus boofuzz's SQLite database. Keep console logs
with them. The harness disables boofuzz's web UI and does not change the target
address from loopback. Use Ctrl+C to stop the target when done.

The [retained observations](../../audits/remaining-work/executions/boofuzz)
include both results and console output. They establish the chosen response
checks, not broad protocol coverage. For a real stateful target, supply its own
reset procedure, monitor, message sequence, and failure interpretation.

From the fixture directory, run `.venv/Scripts/python -m unittest discover -v`
to check the target behavior and the harness's readiness-failure handling.
