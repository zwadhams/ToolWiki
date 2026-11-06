---
title: Hypothesis
description: Generate Python test inputs and simplify failing examples for properties you define.
tool:
  analysisWorkflows:
    - id: tests
      label: Checks over callable code
      subject: component
      inputs:
        - Callable code
      languageScope: source
      languages:
        - Python
      findings:
        - Specification violations
      caveat: Your assertions and test behavior define failure. Hypothesis generates and shrinks examples;
        it does not provide a universal security or correctness specification for the target.
      sources:
        - https://hypothesis.readthedocs.io/en/latest/quickstart.html
        - https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html
        - https://hypothesis.readthedocs.io/en/latest/compatibility.html
        - https://github.com/HypothesisWorks/hypothesis/blob/master/LICENSE.txt
      requires:
        - harness
        - testInstance
      hostPlatforms:
        - Windows
        - Linux
        - macOS
  modes: [Dynamic]
  inputTypes: [Callable code]
  techniques: [Property-based testing]
  findings: [Specification violations]
  findingNote: Your assertions and test behavior define failure. Hypothesis generates and shrinks examples; it does not provide a universal security or correctness specification for the target.
  environment: Windows, Linux, and macOS are regularly tested, alongside documented Python runtimes. Check the current Python version requirements.
  setup: A Python test harness, input strategies, and properties or assertions are required. Use a supported Python runtime and optionally pytest or unittest; additional target dependencies may require builds.
  languages: [Python]
  languageNote: Python is the test API. A test can call other systems through an integration, but this does not imply direct static analysis of their implementation languages.
  targets: [Functions, Libraries]
  licenseCategory: Open source
  license: MPL-2.0; some third-party files retain additional license terms
  cost: [Free]
  costNote: Free open-source Python testing library. No paid service is required for input generation, shrinking, or the documented local test workflow.
  website: https://hypothesis.readthedocs.io/en/latest/
  verified: '2026-09-22'
  scope: Hypothesis for Python, based on the 6.168.0 documentation. Third-party extensions and external fuzzing backends are separate integrations.
  sources:
    - label: Hypothesis quickstart
      url: https://hypothesis.readthedocs.io/en/latest/quickstart.html
    - label: Hypothesis introduction and example shrinking
      url: https://hypothesis.readthedocs.io/en/latest/tutorial/introduction.html
    - label: Supported runtimes and platforms
      url: https://hypothesis.readthedocs.io/en/latest/compatibility.html
    - label: Hypothesis license
      url: https://github.com/HypothesisWorks/hypothesis/blob/master/LICENSE.txt
---

## What it does

You write a test that should hold for many inputs and describe those inputs using strategies. Hypothesis generates examples, runs the test, and tries to simplify a failure into a smaller example that remains useful for debugging.

For example, a serialization test might assert that decoding an encoded value recovers the original value. A generated edge case can reveal a broken assumption that a few handwritten examples miss.

## Properties and strategies

The property defines what is correct; the strategy defines which inputs are explored. A test that only checks that no exception occurs will miss incorrect results that return normally. Overly restrictive strategies can exclude important cases.

Hypothesis works with ordinary Python testing workflows and also supports stateful tests. Stateful operation sequences are different from automatically understanding a physical system's temporal-logic specification.

## Interpreting results

A failing example demonstrates that the test failed for that execution. Investigate whether the problem is in the implementation, the property, or the test setup. Repeatability matters: hidden state and flaky external behavior can interfere with replay and shrinking.

A passing run covers the examples exercised within its configured budget; it is not a proof over every possible input.

[coverage.py](../coverage-py/) can measure which Python lines and branches the
test run reaches. It does not judge whether the property is strong enough.
The [test-evidence guide](../../guides/test-evidence/) compares execution
coverage, source mutation, and generated inputs.

<span id="a-useful-first-evaluation"></span>

## First try

**Illustrative example; not executed here.** Use Python 3.13 with
[Hypothesis 6.168.0](https://pypi.org/project/hypothesis/6.168.0/) in an isolated
environment on Windows, Linux, or macOS. Follow the
[quickstart](https://hypothesis.readthedocs.io/en/latest/quickstart.html), installing
`hypothesis==6.168.0`. Save this as `test_magnitude.py`:

```python
from hypothesis import given, strategies as st


def magnitude(value: int) -> int:
    return value


@given(st.integers(min_value=-100, max_value=100))
def test_nonnegative(value: int) -> None:
    assert magnitude(value) >= 0


if __name__ == "__main__":
    test_nonnegative()
```

Run the test directly; no separate test runner is needed:

```sh
python test_magnitude.py
```

Expect an assertion failure with a negative generated input. Hypothesis attempts
to simplify the failing example; do not depend on a particular discovery order.
Replace `return value` with `return abs(value)` and rerun. The selected property
should then hold for the examples generated in this run.

This property checks only nonnegativity. A function that always returns zero
would also satisfy it, so add properties that express your actual contract, such
as agreement with a trusted reference or a round trip. Keep the failing example
as a regression test, and record the Hypothesis version, strategies, settings,
and any example database needed for replay in the [run record](../../guides/run-record/).
