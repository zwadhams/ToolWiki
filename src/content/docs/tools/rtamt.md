---
title: "RTAMT"
description: "Evaluate signal traces against temporal requirements using online or offline monitors."
tool:
  modes: ["Dynamic"]
  inputTypes: ["Execution traces"]
  techniques: ["Temporal logic monitoring","Runtime verification"]
  languages: ["Language independent"]
  languageNote: "Inputs are named signals and temporal specifications. Python is the monitor API; the observed system can be implemented in another language."
  targets: ["Time-series signals","Runtime traces","Simulation traces"]
  findings: ["Temporal requirement violations"]
  findingNote: "Evaluates the supplied trace against the specified formula. It does not generate scenarios or search for counterexamples by itself, and a satisfying trace is not a model-checking proof."
  environment: "A compatible Python environment for the selected RTAMT and parser versions. Pure-Python monitors avoid the optional compiled backend, which adds CMake, compiler, and Boost.Python requirements."
  setup: "Define typed signal names, an STL specification, timestamps or sampling assumptions, and the observed values. Match dense-time or discrete-time semantics to the data."
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

## Worked example: a temperature requirement

**Checked locally on 2026-09-21:** Windows, Python 3.12.14, RTAMT 0.4.10, using the pure-Python backend. In that environment:

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

The example printed `[0, -5.0]`. At time zero, the requested two-unit interval includes a temperature of 85, producing negative robustness. Replacing both 85 values with 79 produced `[0, 1.0]`, a positive margin for this trace. These two checks validate the example, not the monitor's behavior on every formula or signal.

## Interpret timing carefully

Choose signal semantics, units, sampling, and the available observation horizon deliberately. An online monitor may need later observations to decide a requirement about the future.

The sign and magnitude of robustness describe the formula's evaluation on this trace. Boundary cases at zero need the exact predicate semantics. A missing violation in the observed data does not rule out one in another execution.

See [temporal monitoring and falsification](../../guides/temporal-monitoring-and-falsification/) for the complete workflow.
