---
title: "VerifAI"
description: "Search simulation scenarios for behavior that violates a specification, including temporal requirements."
tool:
  modes: ["Dynamic"]
  inputTypes: ["Executable models"]
  techniques: ["Model falsification","Simulation-based testing"]
  languages: ["Python","Scenic"]
  languageNote: "Python defines the analysis interface, and Scenic can define scenario distributions. Simulator integration determines what system can be exercised; these tags do not imply source-code SAST."
  targets: ["Simulation models","AI-enabled systems","Controllers"]
  findings: ["Temporal requirement violations","Specification violations"]
  findingNote: "The monitor or objective supplied by the user defines a failure. Search can return counterexamples, but exhausting a sample budget without one is not a proof."
  environment: "Python on Linux or macOS; the installation guide recommends WSL on Windows. Simulator integrations and optional packages have additional requirements."
  setup: "Provide a sample space, simulator interface, monitor/specification, sampler, and iteration or time budget. Some examples use separate falsifier and simulator processes."
  licenseCategory: "Open source"
  license: "BSD-3-Clause for VerifAI; simulators and dependencies have separate licenses"
  cost: ["Free"]
  costNote: "Free toolkit. Simulator licenses, scenario assets, and compute can add costs; they are not paid VerifAI detection tiers."
  website: "https://verifai.readthedocs.io/en/latest/"
  verified: "2026-09-21"
  scope: "Simulation-guided falsification in the current documentation. This entry does not claim exhaustive verification of arbitrary neural networks or real-world systems."
  sources:
    - label: "Toolkit scope and license"
      url: https://verifai.readthedocs.io/en/latest/
    - label: "Installation and host guidance"
      url: https://verifai.readthedocs.io/en/latest/installation.html
    - label: "Sample spaces, monitors, and falsifier configuration"
      url: https://verifai.readthedocs.io/en/latest/basic_usage.html
    - label: "Worked simulator case studies"
      url: https://verifai.readthedocs.io/en/latest/tutorial.html
---

## What the workflow does

A sampler proposes a scenario, the simulator runs it, and a monitor evaluates the resulting behavior. Feedback can guide later scenarios toward violations. This supports questions such as whether a controller stays inside its lane under varying initial conditions.

## Worked example: lane-keeping falsification

**Documentation-based walkthrough, not run here.** Install the repository version and dependencies for the official lane-keeping example. The PyPI package does not include all example files.

In two terminals, enter `src/verifai/simulators/car_simulator` within the matching repository checkout. In the first terminal, start the falsifier:

```sh
python examples/lanekeeping_LQR/lanekeeping_falsifier.py
```

After the server reports readiness, start the simulator in the second terminal:

```sh
python examples/lanekeeping_LQR/lanekeeping_simulation.py
```

Inspect sampled scenarios, their requirement scores, and the falsified-sample table. In this quantitative example, a negative score indicates a violation. Re-run the saved scenario to check reproducibility before changing the controller.

## What to preserve with a result

Record the simulator revision, scenario ranges, requirement, sampling configuration, budget, and any random seed. A successful trace says something about that modeled execution, not every scenario or the physical system.

Compare [Breach](../breach/) and [PSY-TaLiRo](../psy-taliro/) for other falsification workflows. [RTAMT](../rtamt/) focuses on monitoring supplied signals; see [temporal monitoring and falsification](../../guides/temporal-monitoring-and-falsification/).
