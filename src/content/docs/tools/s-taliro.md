---
title: S-TaLiRo
description: Search MATLAB and Simulink model executions for counterexamples to temporal requirements.
tool:
  modes: [Dynamic]
  inputTypes: [Executable models, Execution traces]
  techniques: [Model falsification, Temporal logic monitoring]
  languages: [MATLAB, Simulink]
  languageNote: These tags describe model execution and the testing environment. Temporal requirements are evaluated over simulation traces, rather than source code syntax.
  targets: [Simulated systems, Hybrid systems]
  licenseCategory: Open source
  license: GPL-3.0, as reported in ARCH-COMP 2019
  cost: [Free]
  costNote: The cited tool report describes a free GPL-3.0 toolbox. MATLAB and any required Simulink or additional toolbox licenses are separate. Current distribution availability and release terms have not been reverified.
  website: https://sites.google.com/a/asu.edu/s-taliro/s-taliro
  verified: '2026-09-21'
  scope: Historical MATLAB S-TaLiRo described in the 2014 tool paper and ARCH-COMP 2019 report; current installation availability is unverified.
  findings: ["Temporal requirement violations"]
  findingNote: "Historical MATLAB falsification and monitoring workflows. Requirements and search bounds are user supplied; current release availability remains unverified."
  environment: "Historical MATLAB/Simulink workflow; current host and release compatibility have not been reverified."
  setup: "A simulation model, temporal requirements, search bounds, and appropriate MATLAB toolboxes. Match the distribution and dependencies used by the experiment."
  sources:
    - label: S-TaLiRo tool demonstration paper (2014)
      url: https://www.bhoxha.com/papers/HSCC2014ToolDemo.pdf
    - label: ARCH-COMP 2019 falsification report, including tool licensing
      url: https://www.sosy-lab.org/research/pub/2019-ARCH.Category_Report_Falsification.pdf
    - label: MathWorks pricing and licensing
      url: https://www.mathworks.com/pricing-licensing.html
---

## What it does

S-TaLiRo searches for simulation inputs or initial conditions that violate a temporal requirement. A robustness score guides optimization toward a counterexample. Published workflows use MATLAB and Simulink models of cyber-physical and hybrid systems.

The tool papers discuss Metric Temporal Logic (MTL); the ARCH-COMP report also describes STL requirements. Check the syntax and monitoring semantics of the specific release you obtain.

## When it is useful

This entry provides context for reading falsification research or reproducing experiments that use MATLAB S-TaLiRo. [PSY-TaLiRo](../psy-taliro/) is a separate Python implementation of the broader approach.

## Availability and setup

The historical project link redirected to a Google sign-in page during this review. A current downloadable release and its installation instructions could not be verified. The Free and GPL-3.0 labels reflect the cited report, not a newly inspected distribution.

Before reproducing an experiment, match its toolbox version, model, MATLAB dependencies, and search configuration.

## Interpreting results

A violating trace is evidence against the requirement for that model and configuration. Finding no violation within a finite budget does not establish universal correctness. See [model and temporal falsification](../../concepts/model-falsification/).
