---
title: PSY-TaLiRo
description: Use a Python harness to search for system behaviors that violate temporal requirements.
tool:
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

## Getting started

Start with the documentation's Quickstart and Examples, then replace the example model with your simulator interface. Read [model and temporal falsification](../../concepts/model-falsification/) for the underlying workflow.
