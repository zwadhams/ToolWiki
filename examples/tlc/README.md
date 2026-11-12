# TLC queue-capacity example

This finite TLA+ example checks a queue's occupancy invariant before and after
correcting its enqueue guard. It does not model item contents, FIFO ordering,
liveness, or implementation code. See the
[worked guide](../../src/content/docs/guides/model-checking.md) for the procedure
and interpretation and [execution evidence](evidence.md) for the retained run.

## Run

From this directory, use Python 3 and a working Java runtime:

```sh
python fetch_tool.py
python run.py
```

The fetch script checks the official v1.7.4 archive against `tool-lock.json` and
stores it in `.tools/`. The runner writes evidence to a new directory under
`.runs/`. To choose Java or the evidence directory explicitly:

```sh
python run.py --java "PATH_TO_JAVA" --output-dir "NEW_EMPTY_DIRECTORY"
```

`PATH_TO_JAVA` is the full executable path, not the JDK directory. Replace
`NEW_EMPTY_DIRECTORY` with a new evidence directory. Existing nonempty output
directories are rejected. The runner itself exits zero only when both expected
outcomes are observed; the faulty TLC process is expected to exit nonzero.

## Files

| File | Purpose |
| --- | --- |
| `QueueFaulty.tla` | Allows enqueue at capacity and violates the bound. |
| `QueueCorrected.tla` | Requires spare capacity before enqueue. |
| `Queue.cfg` | Shared capacity, initial/next relations, and invariants. |
| `tool-lock.json` | Official release URL, size, and archive checksums. |
| `fetch_tool.py` | Downloads or verifies the pinned archive. |
| `run.py` | Executes both models and retains evidence. |

The two model files differ only in their module names and the enqueue guard.
The default run uses a single worker, a 256 MiB heap, fixed seed and fingerprint
selection, and a 60-second timeout per process. A timeout is not a clean result.
