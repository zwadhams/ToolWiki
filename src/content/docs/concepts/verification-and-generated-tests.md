---
title: Verification and generated tests
description: Compare fuzzing, property-based testing, temporal falsification, bounded checking, and deductive verification.
---

**Start with the claim you want to check and the evidence you need.** Generating many executions can find counterexamples. Formal verification can establish properties under stated assumptions, when its proof obligations are discharged. These workflows require different inputs and interpret success differently.

## Compare the approaches

| Approach | What guides the work? | What you get | Tools |
| --- | --- | --- | --- |
| Coverage-guided fuzzing | Execution feedback helps choose and mutate inputs. | Inputs that trigger crashes, timeouts, or other configured failure signals. | [AFL++](../../tools/afl-plus-plus/), [libFuzzer](../../tools/libfuzzer/) |
| Property-based testing | You define input strategies and properties. | Failing examples, often simplified to make debugging easier. | [Hypothesis](../../tools/hypothesis/) |
| Temporal falsification | A requirement evaluates signals over time, often producing a search score. | A simulation input and trace that violate the requirement, if found. | [Breach](../../tools/breach/), [PSY-TaLiRo](../../tools/psy-taliro/) |
| Bounded model checking | A solver checks modeled executions within exploration bounds. | Property results and possible counterexamples; completeness needs separate attention. | [CBMC](../../tools/cbmc/) |
| Static formal verification | Program models, specifications, annotations, and proof procedures. | Proved properties, possible-error alarms, or unresolved proof obligations, depending on the analysis. | [Frama-C](../../tools/frama-c/), [Dafny](../../tools/dafny/) |

These categories can overlap. A fuzzing harness can check a property, and property-based testing can use feedback-guided generation. The important distinctions are the input model, failure detector, and meaning of the result.

## One example, several checks

Imagine a message parser that should accept valid messages and reject invalid ones without corrupting memory.

- A fuzzer can mutate message bytes. A sanitizer helps turn a memory error into an observable failure.
- A property-based test can generate valid message objects and check that encoding followed by decoding recovers the original object.
- A verifier can check a stated buffer-safety or output property under the assumptions in its harness or contracts.

If the parser controls a simulated device, a temporal requirement might additionally say that every accepted command receives a response within two seconds. The falsification search varies simulated inputs to seek a violating trace.

These are illustrative checks, not claims that every listed tool accepts the same target or implements all four workflows.

## You need a way to recognize failure

Generated inputs are only part of a test. A **failure detector**, sometimes called an oracle, decides whether the result is wrong. It might be a crash, an assertion, a comparison with a reference implementation, or a temporal-logic monitor.

An incorrect result that returns normally can go unnoticed by a crash-only harness. This is why the wiki distinguishes a tool's finding categories from its **Finding scope** note. See the [Hypothesis quickstart](https://hypothesis.readthedocs.io/en/latest/quickstart.html) and [AFL++ workflow](https://github.com/AFLplusplus/AFLplusplus) for concrete testing interfaces.

## Interpret the result precisely

**No failing test found** means the explored cases did not trigger the configured detector. It does not prove all possible executions are correct.

For bounded checking, inspect whether bounds exclude further behavior. CBMC's [unwinding guidance](https://model-checking.github.io/cbmc-training/faq/loop-unwinding.html) explains how unwinding assertions help assess that question.

For deductive verification, an unresolved obligation may mean an incorrect implementation, insufficient annotations, or solver limits. A proved property still depends on the specification and modeled environment. [Dafny's tutorial](https://dafny.org/latest/OnlineTutorial/guide) and [Frama-C WP](https://www.frama-c.com/fc-plugins/wp.html) explain that specification work.

Use the [comparison view](../../compare/?tools=tools%2Fcbmc%2Ctools%2Fafl-plus-plus%2Ctools%2Fhypothesis) to inspect the setup and scope of three approaches side by side.
