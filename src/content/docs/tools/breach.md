---
title: Breach
description: Search simulations for violations of Signal Temporal Logic requirements and monitor recorded traces.
tool:
  modes: [Dynamic]
  inputTypes: [Executable models, Execution traces]
  techniques: [Model falsification, Temporal logic monitoring]
  languages: [MATLAB, Simulink]
  languageNote: These tags describe the modeling and harness ecosystem. Breach evaluates time-series behavior; other simulators need an interface that supplies traces.
  targets: [Simulated systems, Hybrid systems, Time-series traces]
  licenseCategory: Open source
  license: BSD-3-Clause core; bundled components have additional licenses
  cost: [Free]
  costNote: The Breach toolbox is free. Running it requires separately licensed MATLAB, plus Simulink for Simulink models. Model dependencies may require other licensed products; these costs are not included in the Free label.
  website: https://github.com/decyphir/breach
  verified: '2026-09-21'
  scope: Breach repository documentation for STL monitoring and simulation-based falsification.
  findings: ["Temporal requirement violations"]
  findingNote: "You supply STL requirements and signals. Monitoring checks supplied traces; falsification adds a search over simulator inputs."
  environment: "MATLAB on a compatible host; Simulink and compiler requirements depend on the model and Breach release."
  setup: "A simulator interface, signal definitions, temporal requirements, and input bounds are needed for falsification. Trace-only monitoring can use recorded data."
  sources:
    - label: Breach documentation and examples
      url: https://github.com/decyphir/breach/blob/master/README.md
    - label: Breach core and bundled component licenses
      url: https://github.com/decyphir/breach/blob/master/LICENSE
    - label: MathWorks pricing and licensing
      url: https://www.mathworks.com/pricing-licensing.html
---

## What it does

Breach can check recorded signals against Signal Temporal Logic (STL) requirements or repeatedly simulate a model to search for a violation. It provides Simulink integration, parameter exploration, input signal generation, and an interface for other simulators.

## When it is useful

Use it when a requirement concerns behavior over time: for example, whether a controller keeps a signal below a limit throughout a run.

## What you provide

- A simulator interface or recorded traces with named signals.
- An STL requirement and a simulation horizon.
- For falsification, allowed input or parameter ranges and a search budget.

## What to keep in mind

A monitor checks supplied traces; a falsification search generates candidates to find a violating trace. An unsuccessful search does not prove the requirement holds for all inputs. See [model and temporal falsification](../../concepts/model-falsification/).

## Getting started

Follow the official README's setup and built-in demos, then work through its falsification example. Check the licenses of bundled components as well as the core license if redistributing the toolbox.
