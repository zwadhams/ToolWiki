---
title: Model and temporal falsification
description: Find simulation inputs that violate a requirement about how a system behaves over time.
---

**Model falsification searches for a counterexample: an allowed input or initial condition that makes an executable model violate a requirement.** Temporal falsification uses requirements about behavior over time, often expressed in Signal Temporal Logic (STL) or Metric Temporal Logic (MTL).

These are dynamic analysis techniques because the search runs simulations and evaluates their traces. They commonly test controllers and cyber-physical systems. See the [ARCH-COMP falsification report](https://www.sosy-lab.org/research/pub/2019-ARCH.Category_Report_Falsification.pdf) for examples.

[Browse the model falsification tools](../../dynamic/?technique=Model%20falsification).

## A concrete example

Suppose a simulated motor must keep its speed below 3,000 rpm for a 20-second test. You allow the search to vary the load and command signals within stated bounds.

If one allowed input produces 3,050 rpm at second 12, that trace is a counterexample. The useful result includes the input that caused it, so you can replay and investigate the failure.

Temporal requirements can also describe a deadline or a sequence:

| Requirement pattern | Example |
| --- | --- |
| Always | Speed stays below the limit throughout the test. |
| Eventually within a time bound | The actuator reaches its target within two seconds. |
| Response | Every request during the test receives a response within one second. |

These are illustrative requirements, not executable formulas. A response near the end of a test needs enough additional observation time to assess its deadline.

## Monitoring versus falsification

A **monitor** evaluates a requirement on a trace you already have. A **falsification tool** searches for inputs that generate a violating trace, using a monitor inside the search.

The usual workflow is:

1. Expose a simulator's inputs and output signals.
2. Define the requirement, allowed inputs, and test horizon.
3. Simulate a candidate input and evaluate the resulting trace.
4. Use the result to choose further candidates until a violation is found or the budget ends.

Many searches minimize a **robustness score**, which describes how a trace relates to a requirement. Under the standard signed semantics used by Breach, a positive score means satisfaction, a negative score means violation, and zero needs care at the boundary. A score is not a probability of failure. See [Breach's monitoring and falsification documentation](https://github.com/decyphir/breach/blob/master/README.md).

## Tools in this wiki

| Tool | Environment | Cost notes |
| --- | --- | --- |
| [Breach](../../tools/breach/) | MATLAB; Simulink or a simulator interface; STL | Free toolbox; MATLAB and model dependencies are separate. |
| [S-TaLiRo](../../tools/s-taliro/) | MATLAB and Simulink; temporal-logic falsification | Historical free GPL-3.0 toolbox; current distribution unverified. MATLAB costs are separate. |
| [PSY-TaLiRo](../../tools/psy-taliro/) | Python harness; temporal monitoring through a selected backend | Free toolbox; external simulator costs depend on the integration. |

The language filter describes the harness or modeling ecosystem here. A Python harness can call a simulator implemented in another language if you provide a suitable interface. [PSY-TaLiRo's documentation](https://psy-taliro.readthedocs.io/latest/) illustrates the model, requirement, and search components.

## What a result establishes

**No counterexample found is not a proof that the requirement always holds.** It means this search did not find one within its bounds and budget. Results depend on the model, input representation, simulation accuracy, time horizon, and monitor semantics.

A counterexample also needs interpretation: replay it, check that the input is allowed, and confirm that the model and requirement reflect the intended system. A simulated failure is not automatically a demonstrated failure of the deployed system.

## How this relates to DAST and model checking

Web DAST usually tests a running application's security behavior through its interfaces. Model falsification tests explicit behavioral requirements and may have no security focus. Both fit under [dynamic analysis](../static-vs-dynamic/).

Model checking aims to establish whether a model satisfies a property under its stated assumptions and may also return counterexamples. The simulation searches covered here are aimed at finding violations; a successful search can refute a property, while an unsuccessful search alone cannot prove it.

[Verification and generated tests](../verification-and-generated-tests/) compares these results with bounded model checking, deductive verification, fuzzing, and property-based testing.
