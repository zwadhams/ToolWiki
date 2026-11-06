---
title: Understand static analysis methods
description: Distinguish value approximations, symbolic paths, proof obligations, and data-flow reports.
---

**Choose a method by the question and evidence you need.** The same program can produce a possible-error alarm, a modeled counterexample, a generated input, or a proof obligation. These results have different meanings.

## One bounds check, several questions

This C function is an illustration, not an executed analyzer example. Assume `values` points to `count` readable integers:

```c
int read_at(const int *values, unsigned count, int index) {
    if (index < 0) return 0;
    return values[index];
}
```

The lower-bound check leaves the upper bound unchecked. For example, `count = 4` and `index = 4` selects an element beyond the array. Add an upper-bound check:

```c
if (index < 0 || (unsigned)index >= count) return 0;
```

Pointer validity and the relationship between `count` and the actual allocation remain assumptions to establish at the call site.

## Abstract interpretation: which values are possible?

An analyzer approximates sets of program states using a tractable representation, such as value ranges. At the array access, knowing only that `index` is nonnegative does not establish that it is below `count`.

Prepare the entry point, machine model, input assumptions, and library models. Typical output includes inferred values and alarms where safety could not be established. An alarm can reflect a real error or lost precision; investigate it under the stated assumptions. Frama-C's Eva uses this approach for C runtime-error analysis. [Eva documentation](https://www.frama-c.com/fc-plugins/eva.html).

## Symbolic execution: which path conditions can be satisfied?

Symbolic inputs stand for many possible values. Following a branch adds a constraint. Here, a model can ask whether a path with `index >= 0` and `index >= count` is feasible, then supply concrete values satisfying it.

Prepare a harness, symbolic inputs, environment models, and exploration limits. KLEE works on LLVM bitcode and produces test inputs for explored paths. Replay a generated input against the intended program and harness to check what it demonstrates. Paths interrupted by resource limits remain unexamined work, not successful checks. [KLEE's function tutorial](https://klee-se.org/tutorials/testing-function/).

[angr](../../tools/angr/) uses its own binary-loading and execution models. A symbolic counterexample is evidence about a model; a replayed failure is evidence about that concrete execution.

## Deductive verification: does the code meet its contract?

Write the required property and assumptions as a contract. For `read_at`, specify the readable array region and the permitted indices. A proof system turns the code and contract into logical obligations, including the array-access bound.

Prepare contracts, loop invariants where needed, memory/arithmetic models, and supported provers. A discharged obligation establishes the modeled claim under its assumptions. An unresolved obligation may need a stronger invariant, more solver effort, or a code repair; it is not by itself a counterexample. Frama-C WP generates and proves obligations for ACSL contracts. [WP documentation](https://www.frama-c.com/fc-plugins/wp.html).

## Data flow and taint: where can an input reach?

Data-flow analysis tracks how values move through assignments and calls. Taint analysis can also track influence through transformations that change the value. For this illustration, a rule could model an untrusted index as a source and array indexing as a sink, then examine the intervening checks.

Prepare the query's sources, sinks, propagation steps, barriers, and library/framework models. A reported path explains a modeled connection; it does not establish that every runtime path or framework behavior is represented. Local analysis stays within a function, while global analysis follows modeled connections across functions. [CodeQL's data-flow explanation](https://codeql.github.com/docs/writing-codeql-queries/about-data-flow-analysis/). See [CodeQL](../../tools/codeql/) and [Psalm](../../tools/psalm/) for their specific setup and rules.

## Read the workflow label

Method names do not determine every catalog tag. Symbolic execution can explore a model of program behavior; a workflow can mix concrete execution and symbolic reasoning. Emulating a decoder is also different from running an entire application. Check each profile's inputs, execution model, and result rather than reclassifying a tool from one technique label.

Use [static analysis approaches](../static-approaches/) to choose an input route and [verification and generated tests](../verification-and-generated-tests/) to compare claims. After a run, [review its findings](../../guides/reviewing-findings/) with the model and limits retained.
