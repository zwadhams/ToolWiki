---
title: py-spy
description: Sample a local CPython workload to identify where its Python execution spends time.
tool:
  cardRequirement: Requires permission to read the target process's memory.
  decision:
    useWhen: Investigate hot paths in a repeatable local Python workload.
    result: A recording groups sampled stacks into a flame graph or profile file. Wider frames represent more samples in that call path during the chosen interval.
    limit: Results depend on the workload, sampling interval, and filtering. They are not a complete trace, correctness check, or production-performance guarantee.
  aliases: [pyspy]
  searchTerms: [Python profiling, CPU sampling, flame graph, Python performance]
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [Sampling profiling]
  languages: [Python]
  languageNote: This entry's first route is py-spy 0.4.3 with CPython 3.12 on Linux x86_64. Other interpreter, host, and native-extension combinations need separate review.
  targets: [Local CPython processes]
  findings: [Runtime hot paths]
  findingNote: Samples locate time-consuming call paths for investigation. A hot path may be necessary work, and idle or GIL filtering changes the view.
  environment: Linux x86_64 with CPython 3.12 for this workflow. Reading process memory must be permitted by the host's security policy.
  setup: Install py-spy 0.4.3, prepare a repeatable local workload, and launch the interpreter under the sampler.
  licenseCategory: Open source
  license: MIT
  cost: [Free]
  costNote: Free open-source local profiler.
  website: https://github.com/benfred/py-spy
  verified: '2026-11-06'
  scope: py-spy 0.4.3 local CPython sampling. Native stacks, containers, subprocess aggregation, and production attachment are outside this entry.
  sources:
    - label: py-spy 0.4.3 release
      url: https://github.com/benfred/py-spy/releases/tag/v0.4.3
    - label: Versioned usage, interpreter support, permissions, and sampling limits
      url: https://github.com/benfred/py-spy/blob/v0.4.3/README.md
    - label: Record duration, sampling rate, and output options
      url: https://github.com/benfred/py-spy/blob/v0.4.3/src/config.rs
    - label: License
      url: https://github.com/benfred/py-spy/blob/v0.4.3/LICENSE
---

## First try

**Illustrative profiling procedure, not executed here.** Use Linux x86_64 and
CPython 3.12. Run from the repository's
[`examples/py-spy`](https://github.com/zwadhams/ToolWiki/tree/main/examples/py-spy)
directory. Its bounded workload repeatedly performs a named calculation and
uses no external service or application data.

Create an isolated environment and record a ten-second window at 100 samples
per second:

```sh
python3.12 -m venv .venv
.venv/bin/python -m pip install py-spy==0.4.3
.venv/bin/py-spy --version
.venv/bin/py-spy record --duration 10 --rate 100 --format flamegraph --output profile.svg -- .venv/bin/python workload.py --seconds 15
```

The sampler launches the child interpreter. This can avoid Linux's usual
restriction on attaching to a non-child process, but the host must still allow
process-memory reads. If recording fails with a permission or setup error,
record that failure; it is not evidence that the workload has no hot path.
Use an environment whose policy permits the operation instead of disabling
system-wide protections.

Open `profile.svg` locally. Look for `busy_work` and inspect the sample share of
its call path. Record the actual sample count, duration, workload revision,
interpreter, and command in a [run record](../../guides/run-record/). Sampling
errors or an early target exit can make the recording incomplete. Do not infer
an exact execution count or speedup from flame-graph width.

## Choose the output you need

| Command | Output | Useful question |
| --- | --- | --- |
| `record` | A saved profile over an interval | Which call paths dominated these samples? |
| `top` | A changing live function summary | Where is this workload spending time now? |
| `dump` | A current stack snapshot for each thread | Where is this process currently stopped or running? |

An attached `dump` is a different permission case from the launch-under-profiler
example. Its optional local-variable output can contain application data.
Keep it off unless you need it and can handle that data appropriately.

Change one suspected source of cost, repeat the same workload, and compare
timings as well as profiles. Sampling identifies where to investigate; it does
not by itself show that a change preserved behavior or will help another load.

## System builder scope

**Reviewed November 12, 2026.** This entry is catalog-only because the builder
does not model process-inspection permission. The
[versioned permission guidance](https://github.com/benfred/py-spy/blob/v0.4.3/README.md)
distinguishes child-process sampling, attachment, and restricted containers.
Python, Running applications, and permission to run a test instance do not
establish permission to read process memory. The general instrumentation
answer is not a substitute for that operating-system permission.
