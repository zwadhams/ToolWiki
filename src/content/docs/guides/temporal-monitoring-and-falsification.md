---
title: "Temporal monitoring and falsification"
description: "Separate trace evaluation, simulation search, and formal proof when checking time-dependent requirements."
---

A temporal requirement describes behavior over time. The distinction to make first is whether you already have a trace to evaluate or need to generate executions that might violate the requirement.

## Separate the jobs

| Job | What you provide | Result | Examples |
| --- | --- | --- | --- |
| Monitoring | Signals or execution traces, a formula, and timing semantics. | Satisfaction or robustness values for the observed behavior. | [RTAMT](../../tools/rtamt/) |
| Falsification | An executable model, allowed input/scenario space, a requirement, and a search budget. | A violating scenario and trace if the search finds one. | [Breach](../../tools/breach/), [PSY-TaLiRo](../../tools/psy-taliro/), [VerifAI](../../tools/verifai/) |
| Formal verification | A mathematical/program model, properties, and supported proof assumptions. | A proof, counterexample, or unresolved result within the method's scope. | See [verification and generated tests](../../concepts/verification-and-generated-tests/). |

An offline monitor still evaluates observed execution data. Reading a trace file after a run does not make it static source-code analysis.

## One requirement, two workflows

Suppose a requirement says that temperature must remain at or below 80 during the first two seconds.

With a recorded trace, RTAMT can evaluate the formula under the chosen signal semantics. Its tool page shows a small trace containing a violation.

With a simulator, a falsification workflow varies allowed parameters, produces traces, and evaluates each one. A monitor can provide a score for the search. That combination needs all three parts: a model, a monitor, and an input-selection strategy.

See the [RTAMT monitor interfaces](https://github.com/nickovic/rtamt) and [VerifAI's sampler and monitor setup](https://verifai.readthedocs.io/en/latest/basic_usage.html).

## Preserve the meaning of time

Record signal names, units, timestamp conventions, and whether the model assumes discrete samples or a dense-time signal. A future-time condition may need later observations before an online monitor can decide it. Missing data and the end of a trace need an explicit interpretation.

For quantitative monitors, negative robustness commonly identifies a violation and positive values indicate a margin of satisfaction. Zero and strict inequalities require the monitor's exact semantics. Scores from differently scaled signals or formulas are not automatically comparable.

## Interpret the search outcome

A counterexample is useful evidence to replay against the same simulator and configuration. No counterexample within a budget means only that this search did not find one.

Keep scenario bounds, random seeds where applicable, simulator settings, formulas, and search budgets with the results. A simulator's behavior is also an assumption about the real system.

[Compare three falsification tools](../../compare/?tools=tools%2Fbreach%2Ctools%2Fpsy-taliro%2Ctools%2Fverifai), or [compare a search toolkit with a trace monitor](../../compare/?tools=tools%2Fverifai%2Ctools%2Frtamt).
