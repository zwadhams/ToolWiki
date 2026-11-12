# TLC execution evidence

Executed November 12, 2026 on Windows 11 with x64 Oracle Java 25.0.4.1 and
Python 3.13.15. The official `v1.7.4` archive reports TLC 2.19, revision `5a47802`.

## Inputs and commands

The retained [run record](../../audits/formal-tools/tlc-run/run.json) contains
the complete argument arrays, working directories, runtime identity, input
SHA-256 values, process exit codes, and parsed state counts. Copies of the
actual models and configuration are retained with that run.

From the repository root, the orchestration command was:

```powershell
python examples/tlc/run.py --java "C:/Program Files/Java/jdk-25.0.4.1/bin/java.exe" --output-dir audits/formal-tools/tlc-run
```

The verified archive came from the official
[v1.7.4 release](https://github.com/tlaplus/tlaplus/releases/tag/v1.7.4):

- File size: 2,274,532 bytes.
- SHA-256: `936a262061c914694dfd669a543be24573c45d5aa0ff20a8b96b23d01e050e88`.
- Published release SHA-1: `bee4a54f3ee3d4afc347c3240ec2d9e93b075104`.

The binary is downloaded separately rather than committed. Its identity is
pinned in [tool-lock.json](tool-lock.json).

## Observed results

| Model | Outcome | Exit | Generated / distinct / remaining states |
| --- | --- | --- | --- |
| Faulty | `WithinCapacity` violated; trace `0 -> 1 -> 2 -> 3` | 12 | 5 / 4 / 0 |
| Corrected | Model checking completed with no error found | 0 | 5 / 3 / 0 |

Raw [faulty stdout](../../audits/formal-tools/tlc-run/QueueFaulty.stdout.txt) and
[corrected stdout](../../audits/formal-tools/tlc-run/QueueCorrected.stdout.txt)
retain the messages and trace. Both stderr files are empty. The
[Java version output](../../audits/formal-tools/tlc-run/java-version.stderr.txt)
records the runtime. TLC printed advice about a throughput-oriented garbage
collector; neither run failed because of it.

## Interpretation and limits

The faulty run demonstrates that the model can enqueue beyond a capacity of 2.
The corrected run explores the reachable occupancy states 0, 1, and 2 for that
configuration and finds no violation of `TypeOK` or `WithinCapacity`. The faulty
run stops at its first reported violation; its counts do not establish complete
exploration. The corrected completion includes TLC's state-fingerprint collision
estimate.

No liveness property, message ordering, concurrency implementation, or production
code is checked. No general proof for all capacities follows from this run.
Other hosts and Java versions were not executed. The downloaded archive was
checked against the release checksum and the recorded SHA-256; these identify
the bytes used, not an independent authenticity guarantee.
