---
title: Check a queue model with TLC
description: Find a queue-capacity invariant violation, inspect its state trace, and repeat the same check after correcting the transition guard.
executionEvidence:
  status: recorded
  scope: TLC 2.19 from v1.7.4, Oracle Java 25.0.4.1 and Python 3.13.15 on Windows 11; capacity-2 queue occupancy and two invariants. No liveness properties or application implementation were checked.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/examples/tlc/evidence.md
---

[TLC](../../tools/tlc/) explores reachable states of a TLA+ model. This example
models only a queue's occupancy. The intended property is that occupancy never
exceeds capacity. It contains no message contents, FIFO ordering, threads,
network failures, or implementation code.

The faulty and corrected modules use the same configuration and properties.
Changing only the enqueue guard makes the difference visible in a short trace.

## Prepare the example

Use [Get the examples](../get-examples/) to obtain the repository, then open
`examples/tlc`. You need Python 3 to run the small download/recording scripts and
a working Java runtime for TLC. The retained run used Python 3.13.15 and an x64
Oracle JDK 25.0.4.1 on Windows 11. Other host/JVM combinations were not executed
for this example.

Download and verify the official archive pinned by `tool-lock.json`:

```sh
python fetch_tool.py
```

The script fetches `tla2tools.jar` from the official `v1.7.4` release and verifies
its byte count, the release's published SHA-1 checksum, and the recorded SHA-256.
It stores the archive in `.tools/`; it does not install Java or change your PATH.
The versioned archive reports **TLC2 Version 2.19**, so distinguish the archive's
release tag from TLC's own version string.

## Understand the property

Both modules start with `queued = 0`. An enqueue adds one and a dequeue subtracts
one when the queue is nonempty. `Queue.cfg` sets `Capacity = 2`, selects `Init`
and `Next`, and checks `TypeOK` and `WithinCapacity`.

The invariant is the same in both modules:

```text
WithinCapacity == queued <= Capacity
```

The faulty enqueue guard permits another item when occupancy already equals
capacity:

```text
Enqueue == /\ queued <= Capacity
           /\ queued' = queued + 1
```

`/\` means conjunction. The primed variable `queued'` denotes the next state's
value. In `QueueCorrected.tla`, the guard uses `<` instead of `<=`.

## Run both models

If `java` resolves to a working Java executable, run:

```sh
python run.py
```

If your launcher is missing or does not start the intended runtime, pass the
executable's full path. The recorded Windows run used:

```powershell
python run.py --java "C:/Program Files/Java/jdk-25.0.4.1/bin/java.exe"
```

Replace that path with your installed Java executable when it differs. The
runner verifies the pinned archive, copies the two model inputs into separate
run directories, and invokes the CLI with one worker, a 256 MiB Java heap,
fingerprint polynomial 0, and seed 1. It uses the default breadth-first
model-checking mode, not random simulation. It writes stdout, stderr, commands,
exit codes, runtime versions, and input hashes beneath `.runs/`.

The runner succeeds only when the faulty model reports the expected invariant
violation with a nonzero process exit and the corrected model reports completion
without an error and exits zero. It refuses to overwrite a nonempty explicit
`--output-dir`.

## Interpret the retained result

The [execution record](https://github.com/zwadhams/ToolWiki/blob/main/examples/tlc/evidence.md)
links the complete output and exact commands from November 12, 2026.

| Model | Observed result | Process exit | Distinct states reported |
| --- | --- | --- | --- |
| `QueueFaulty` | `WithinCapacity` violated | 12 | 4 |
| `QueueCorrected` | Model checking completed with no error | 0 | 3 |

The faulty trace shows `queued` taking values 0, 1, 2, and 3. The transition out
of the full queue is the counterexample. That run stops at the reported
violation; its state count is not evidence that all later behavior was checked.

The corrected run reports five generated states, three distinct states, and
zero states remaining on the queue. It finishes the configured finite search
and finds no violation of the selected invariants. TLC uses state fingerprints;
its completion output also reports a collision-probability estimate.

## Keep the claim within the model

This result applies to capacity 2 and the stated transitions. It is not a proof
for every capacity, an unbounded queue, or a production queue implementation.
No liveness property was selected: a safety invariant does not establish that
an item is eventually removed. Larger models can fail to finish because of
state-space growth or resource limits; those are incomplete checks.

To adapt the example, first decide what states, transitions, failures, and
properties matter for your system. Record any fairness assumptions or
state-space constraints. Check that the model can reach intended states and
transitions instead of obtaining a vacuous success by excluding them. Retain
each model/configuration pair with its [run record](../run-record/).

For verifying contracts against implementation code, compare
[Dafny](../../tools/dafny/) and [CBMC](../../tools/cbmc/). A design model and an
implementation need a separate argument or check connecting their behavior.
