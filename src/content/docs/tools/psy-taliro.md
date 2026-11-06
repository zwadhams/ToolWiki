---
title: PSY-TaLiRo
description: Use a Python harness to search for system behaviors that violate temporal requirements.
tool:
  decision:
    useWhen: Search a callable model for inputs that violate a requirement evaluated by your chosen monitor.
    result: Run objects retain evaluated inputs and costs. Model-based evaluations can also retain the trace, letting you replay the lowest-cost scenario and inspect its score.
    limit: Cost meaning depends on the evaluator. A finite search with no violation is not a proof; preserve the seed, bounds, model, and monitor settings.
  analysisWorkflows:
    - id: model
      label: Simulation-based falsification
      subject: component
      inputs:
        - Executable models
      languageScope: model
      languages:
        - Python
      findings:
        - Temporal requirement violations
      caveat: You define temporal requirements and expose signals through a model/monitor interface. A
        finite search cannot prove universal satisfaction.
      sources:
        - https://psy-taliro.readthedocs.io/latest/
        - https://github.com/cpslab-asu/psy-taliro
        - https://github.com/cpslab-asu/psy-taliro/blob/main/LICENSE
        - https://arxiv.org/abs/2106.02200
      requires:
        - harness
        - testInstance
  modes: [Dynamic]
  inputTypes: [Executable models, Execution traces]
  techniques: [Model falsification, Temporal logic monitoring]
  languages: [Python]
  languageNote: Python is the test harness ecosystem, not a restriction on the target's implementation language. The model interface must run the target or simulator and return a timed trace.
  targets: [Simulated systems, Hybrid systems]
  licenseCategory: Open source
  license: BSD-3-Clause
  cost: [Free]
  costNote: Free Python toolbox. MATLAB is not required for a Python-only workflow. An external simulator, optional integration, or compute service can have its own costs and license requirements.
  website: https://psy-taliro.readthedocs.io/latest/
  verified: '2026-09-22'
  scope: PSY-TaLiRo 3.1.0 documentation; supported temporal syntax depends on the chosen monitor.
  findings: ["Temporal requirement violations"]
  findingNote: "You define temporal requirements and expose signals through a model/monitor interface. A finite search cannot prove universal satisfaction."
  environment: "A supported Python environment; monitor backends and external simulators can restrict operating systems."
  setup: "A callable model or simulator, monitoring backend, temporal formula, input ranges, and search budget. A MATLAB bridge is optional."
  sources:
    - label: PSY-TaLiRo documentation
      url: https://psy-taliro.readthedocs.io/latest/
    - label: Project repository and model interfaces
      url: https://github.com/cpslab-asu/psy-taliro
    - label: PSY-TaLiRo license
      url: https://github.com/cpslab-asu/psy-taliro/blob/main/LICENSE
    - label: Original tool paper
      url: https://arxiv.org/abs/2106.02200
    - label: Release-specific ODE example
      url: https://github.com/cpslab-asu/psy-taliro/blob/v3.1.0/examples/nonlinear.py
    - label: Release requirements
      url: https://github.com/cpslab-asu/psy-taliro/blob/v3.1.0/pyproject.toml
    - label: Run objects and evaluation history
      url: https://psy-taliro.readthedocs.io/latest/quickstart.html
---

## What it does

PSY-TaLiRo connects a model, a requirement evaluator, and an optimizer. The model turns inputs into a timed trace; the evaluator scores that trace; the search tries further inputs to find a requirement violation.

It follows the S-TaLiRo approach in a separate Python toolbox. Its interfaces support different simulation and monitoring backends.

## When it is useful

Consider it for a Python-based experiment or a simulator you can call from Python. A model wrapper exposes the signals needed to assess the requirement.

## Temporal requirements

The documentation demonstrates STL monitoring with RTAMT. Formula syntax, time semantics, and supported operators depend on the selected monitor. Choose that backend before translating a requirement into a formula.

## What to keep in mind

Search quality depends on the input bounds, simulation, score, and budget. Preserve the input, trace, random seed, and configuration when a test fails. A completed search without a violation is not a proof of correctness.

<span id="getting-started"></span>

## First try

**Documentation-led procedure; not executed here.** Use Python 3.12 in an isolated environment with `psy-taliro==3.1.0`; the [release metadata](https://github.com/cpslab-asu/psy-taliro/blob/v3.1.0/pyproject.toml) specifies Python and dependency requirements. Follow the [installation guide](https://psy-taliro.readthedocs.io/latest/installation.html).

1. Save the complete [3.1.0 nonlinear ODE example](https://github.com/cpslab-asu/psy-taliro/blob/v3.1.0/examples/nonlinear.py) as `nonlinear.py`. It supplies the model, RTAMT formula, input bounds, optimizer, and budget.
2. For an analysis-only first run, remove the Plotly import and the plotting code after `min_eval = ...`. Add `print(min_eval.cost, min_eval.inputs.static)` there instead. Set `seed=0` in `TestOptions` and record it.
3. Run `python nonlinear.py`. A completed run returns evaluations; inspect the lowest cost, its sampled initial conditions, and `min_eval.extra.trace`. A dependency or monitor failure is not a completed search.
4. Interpret the cost under this RTAMT formula: a negative robustness value is evidence of a violation in the evaluated trace. Preserve and replay that input before changing the model. A nonnegative minimum from a finite search does not establish universal satisfaction.

Use the [run record](../../guides/run-record/) to retain the model, formula, seed, budget, sampled input, and trace. When adapting the example, first verify the signals, units, and time semantics against your requirement. Change the model or an incorrect assumption, then compare the same scenario and repeat the search. Read [model and temporal falsification](../../concepts/model-falsification/) for the distinction between replay and search.
