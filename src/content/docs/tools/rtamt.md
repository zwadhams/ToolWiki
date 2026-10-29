---
title: "RTAMT"
description: "Evaluate signal traces against temporal requirements using online or offline monitors."
tool:
  decision:
    useWhen: Use RTAMT to check recorded or streaming signals against a requirement about values over time.
    result: A robustness value for the requirement on the supplied trace. Its sign and margin help locate and interpret a violation.
    limit: It evaluates observations you provide. It does not generate test scenarios, and a passing trace does not prove that every execution satisfies the requirement.
  analysisWorkflows:
    - id: trace
      label: Monitor temporal requirements over traces
      subject: component
      inputs:
        - Execution traces
      languageScope: independent
      languages: []
      findings:
        - Temporal requirement violations
      caveat: Evaluates the supplied trace against the specified formula. It does not generate scenarios
        or search for counterexamples by itself, and a satisfying trace is not a model-checking proof.
      sources:
        - https://github.com/nickovic/rtamt
        - https://github.com/nickovic/rtamt/tree/master/examples
        - https://github.com/nickovic/rtamt/blob/master/LICENSE
      requires:
        - harness
  modes: ["Dynamic"]
  inputTypes: ["Execution traces"]
  techniques: ["Temporal logic monitoring","Runtime verification"]
  languages: ["Language independent"]
  languageNote: "Inputs are named signals and temporal specifications. Python is the monitor API; the observed system can be implemented in another language."
  targets: ["Time-series signals","Runtime traces","Simulation traces"]
  findings: ["Temporal requirement violations"]
  findingNote: "Evaluates the supplied trace against the specified formula. It does not generate scenarios or search for counterexamples by itself, and a satisfying trace is not a model-checking proof."
  environment: "A compatible Python environment for the selected RTAMT and parser versions. Pure-Python monitors avoid the optional compiled backend, which adds CMake, compiler, and Boost.Python requirements."
  setup: "A compatible Python environment, named signals with timestamps, and a requirement written in Signal Temporal Logic (STL). Choose the timing semantics that match your data."
  licenseCategory: "Open source"
  license: "BSD-3-Clause"
  cost: ["Free"]
  costNote: "Free monitoring library, including the documented Python APIs. Simulator and trace-collection costs are separate."
  website: "https://github.com/nickovic/rtamt"
  verified: "2026-09-21"
  scope: "Offline and online STL monitoring. Online future-time operators are bounded; timing, parser, and backend compatibility depend on the chosen release."
  sources:
    - label: "Monitoring semantics, installation, and APIs"
      url: https://github.com/nickovic/rtamt
    - label: "Project examples"
      url: https://github.com/nickovic/rtamt/tree/master/examples
    - label: "License"
      url: https://github.com/nickovic/rtamt/blob/master/LICENSE
---

## Where it fits

Use RTAMT when you already have signals to evaluate, or can stream observations from a running system. Pairing a monitor with a simulator and a search algorithm can support falsification; the monitor alone does not perform that search.

<span id="worked-example-a-temperature-requirement"></span>

## First try

**Previously reported; not reproduced in this review.** The earlier environment was Windows, Python 3.12.14, RTAMT 0.4.10, using the pure-Python backend. The saved parser dependency failed to import on Python 3.13.15 during this review; use a compatible Python/parser combination.

Follow the [installation instructions](https://github.com/nickovic/rtamt#installation) for a compatible environment. Save this as `temperature.py`, then run `python temperature.py`. The requirement says that temperature must stay at or below 80 for the next two time units:

```python
import rtamt

spec = rtamt.StlDenseTimeSpecification()
spec.declare_var("temperature", "float")
spec.spec = "always[0:2](temperature <= 80)"
spec.parse()

trace = [[0, 70], [1, 75], [2, 85], [3, 85]]
robustness = spec.evaluate(["temperature", trace])
print(robustness[0])
```

The earlier account reported `[0, -5.0]`: at time zero, the two-unit interval includes a temperature of 85, five above the limit. Replacing both 85 values with 79 was reported to produce `[0, 1.0]`, a positive margin for this trace.

<details>
<summary>Earlier example evidence</summary>

The local check was reported on 2026-09-21. The 2026-09-22 audit did not rerun it or locate a saved execution record. On 2026-10-29, the saved RTAMT 0.4.10 and antlr4-python3-runtime 4.7 packages failed before evaluation on Windows/Python 3.13.15 because the parser imported `typing.io`. The listed trace outputs remain the earlier reported results; the current check did not reproduce them.

</details>

## Interpret timing carefully

Choose signal semantics, units, sampling, and the available observation horizon deliberately. An online monitor may need later observations to decide a requirement about the future.

The sign and magnitude of robustness describe the formula's evaluation on this trace. Boundary cases at zero need the exact predicate semantics. A missing violation in the observed data does not rule out one in another execution.

See [temporal monitoring and falsification](../../guides/temporal-monitoring-and-falsification/) for the complete workflow.
