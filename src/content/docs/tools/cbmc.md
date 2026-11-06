---
title: CBMC
description: Check C and C++ assertions and memory safety by translating bounded program executions into solver queries.
tool:
  analysisWorkflows:
    - id: source
      label: Source analysis
      subject: component
      inputs:
        - Source code
      languageScope: source
      languages:
        - C
        - C++
      findings:
        - Memory safety
        - Specification violations
      caveat: Built-in safety checks and user assertions are evaluated within the modeled environment and
        exploration bounds. A successful bounded check is not automatically an unbounded proof.
      sources:
        - https://www.cprover.org/cbmc/
        - https://model-checking.github.io/cbmc-training/faq/loop-unwinding.html
        - https://github.com/diffblue/cbmc/blob/develop/LICENSE
      requires:
        - harness
      hostPlatforms:
        - Windows
        - Linux
        - macOS
  modes: [Static]
  inputTypes: [Source code]
  techniques: [Bounded model checking, Formal verification]
  findings: [Memory safety, Specification violations]
  findingNote: Built-in safety checks and user assertions are evaluated within the modeled environment and exploration bounds. A successful bounded check is not automatically an unbounded proof.
  environment: Windows, Linux, and macOS; compiler and release-package prerequisites differ by host.
  setup: Supply source, an entry point or verification harness, assumptions, and assertions. Configure loop unwinding and model external functions; compiling and running the target as an ordinary application is not required.
  languages: [C, C++]
  languageNote: This entry covers CBMC for C/C++. JBMC for Java and Kani for Rust are separate tools, not additional CBMC language tags.
  targets: [Source code]
  licenseCategory: Open source
  license: BSD-4-Clause; bundled and optional solvers have separate licenses
  cost: [Free]
  costNote: Free open-source verifier. Optional external solvers and compute have their own requirements; no paid CBMC edition is needed for the workflow described here.
  website: https://www.cprover.org/cbmc/
  verified: '2026-09-22'
  scope: CBMC 6.x C/C++ bounded checking; guarantees depend on the harness, program model, checked properties, and completeness of exploration.
  sources:
    - label: CBMC capabilities and supported hosts
      url: https://www.cprover.org/cbmc/
    - label: Loop unwinding and unwinding assertions
      url: https://model-checking.github.io/cbmc-training/faq/loop-unwinding.html
    - label: CBMC license
      url: https://github.com/diffblue/cbmc/blob/develop/LICENSE
    - label: Installation and host setup
      url: https://model-checking.github.io/cbmc-training/installation.html
    - label: Verification harnesses and assumptions
      url: https://model-checking.github.io/cbmc-training/cbmc/overview/proof-harnesses.html
    - label: Property checking
      url: https://model-checking.github.io/cbmc-training/cbmc/overview/checking-properties.html
---

## What it does

CBMC converts a representation of possible C/C++ executions into constraints for a solver. It checks selected safety properties and assertions and can return a counterexample showing inputs and steps that violate a property.

This can reveal defects beyond the concrete inputs in an ordinary test suite. Useful targets include small routines with strict memory-safety requirements or explicit input/output contracts.

## Bounds and proof claims

Loops are unwound to explore iterations. If a chosen bound cuts off possible behavior, checking within that bound does not establish correctness beyond it. Unwinding assertions help determine whether further iterations remain possible.

The harness also matters. Assumptions restrict inputs, and models of external functions determine which effects the verifier considers. An overly restrictive assumption can exclude the very behavior you intended to check.

<span id="a-useful-first-evaluation"></span>

## First try

**Illustrative example; not executed here.** Install a CBMC 6.x build for your
host using the [official setup guide](https://model-checking.github.io/cbmc-training/installation.html).
Save this as `bounded.c`:

```c
#include <assert.h>

int nondet_int(void);

int clamp(int value) {
    return value;
}

void harness(void) {
    int value = nondet_int();
    __CPROVER_assume(value >= 0 && value <= 10);
    assert(clamp(value) <= 9);
}
```

Use `harness` as the entry point and request a counterexample:

```sh
cbmc bounded.c --function harness --trace
```

CBMC treats the undefined `nondet_int` return as nondeterministic. The assumption
restricts it to 0 through 10. Expect the assertion to fail with `value = 10`.
Change the function to `return value > 9 ? 9 : value;` and rerun. That assertion
should pass under the stated assumption.

This fixture has no loops, recursion, or external side effects, so it needs no
loop bound. When adapting it to looping code, supply suitable unwinding bounds
and inspect unwinding assertions as well as the property. Do not suppress an
incomplete unwind and call the result an unbounded proof. Keep the harness,
assumptions, checked properties, and bounds with the [run record](../../guides/run-record/).

The [harness guide](https://model-checking.github.io/cbmc-training/cbmc/overview/proof-harnesses.html)
and [property-checking guide](https://model-checking.github.io/cbmc-training/cbmc/overview/checking-properties.html)
explain how these choices define the verification task.

See [verification and generated tests](../../concepts/verification-and-generated-tests/) for the difference between bounded checking, fuzzing, and falsification.
