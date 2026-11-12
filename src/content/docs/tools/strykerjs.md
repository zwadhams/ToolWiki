---
title: StrykerJS
description: Change selected JavaScript source expressions temporarily and check whether an existing test suite notices.
tool:
  decision:
    useWhen: Investigate whether a working JavaScript test suite detects small changes to selected source behavior.
    result: A mutation report names each changed expression and its outcome, such as Killed, Survived, No coverage, or Timeout, with test attribution when available.
    limit: Mutations sample possible code changes. Equivalent mutants, exclusions, errors, and timeouts affect interpretation; a high score does not prove test completeness.
  aliases: [Stryker JS, JavaScript mutation testing]
  searchTerms: [source mutation, mutation testing, test sensitivity, surviving mutants, Jest]
  modes: [Dynamic]
  inputTypes: [Source code, Callable code]
  techniques: [Mutation testing]
  languages: [JavaScript]
  languageNote: This profile covers JavaScript with the official Jest runner. TypeScript checking and other runner integrations need separate setup and review.
  targets: [JavaScript test suites, Jest projects]
  findings: [Surviving code mutations]
  findingNote: A survivor shows that selected tests did not reject that changed program. Investigate whether it changes meaningful behavior before adding a test or exclusion.
  environment: Node.js 20 or newer for StrykerJS 9.0.1. The example uses Node.js 24, Jest 29.7.0, and the matching StrykerJS core and Jest runner 9.0.1 packages.
  setup: Start with passing tests, select a small source subset, configure the Jest runner, and keep temporary-copy execution enabled.
  licenseCategory: Open source
  license: Apache-2.0
  cost: [Free]
  costNote: Free local mutation testing. The optional hosted dashboard and CI infrastructure are separate choices.
  website: https://stryker-mutator.io/docs/stryker-js/introduction/
  verified: '2026-11-06'
  scope: StrykerJS 9.0.1 and its official Jest runner, using JavaScript and Jest 29.7.0. Other test runners, TypeScript checking, dashboard publication, and in-place mutation are outside this first workflow.
  sources:
    - label: Setup and first run
      url: https://stryker-mutator.io/docs/stryker-js/getting-started/
    - label: Jest runner configuration
      url: https://stryker-mutator.io/docs/stryker-js/jest-runner/
    - label: Core release and Node requirement
      url: https://github.com/stryker-mutator/stryker-js/blob/v9.0.1/packages/core/package.json
    - label: Jest runner release dependencies
      url: https://github.com/stryker-mutator/stryker-js/blob/v9.0.1/packages/jest-runner/package.json
    - label: Mutation scope, temporary copies, and reports
      url: https://stryker-mutator.io/docs/stryker-js/configuration/
    - label: Mutant states and score formulas
      url: https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/
    - label: Equivalent mutants
      url: https://stryker-mutator.io/docs/mutation-testing-elements/equivalent-mutants/
    - label: Release license
      url: https://github.com/stryker-mutator/stryker-js/blob/v9.0.1/LICENSE
---

## First try

Use the [JavaScript boundary-test fixture](../../guides/test-evidence/#check-test-sensitivity).
It starts with passing tests and mutates one small function in a temporary copy.
The source under test stays unchanged; only the test assertions differ between
the two runs.

**Executed with StrykerJS 9.0.1, Jest 29.7.0, and Node.js 24.22.1 on Windows.**
Changing `total >= 100` to `total > 100` survived tests of 50 and 150. Adding an
assertion that 100 qualifies killed that mutation. The example's six generated
mutants were then killed. That result applies to this function, mutation set,
and test suite.

## Interpret a survivor

Read the changed expression and the tests that ran. Find an input where the
mutant changes required behavior, then add an assertion for that behavior. If
there is no observable difference, the mutation may be equivalent. Document
that reasoning before excluding it; do not chase 100% by adding meaningless
checks.

Read the [state and score guide](../../guides/test-evidence/#read-mutation-outcomes)
before treating a score as evidence. A test failure that kills a mutant differs
from a test-runner error. A timeout counts as detected in Stryker's score, but
its cause still needs review.

Source mutation changes the program. [Input mutation in fuzzing](../../concepts/verification-and-generated-tests/)
changes values supplied to it. The two techniques are complementary, not interchangeable.

## System builder scope

**Reviewed November 12, 2026.** This profile remains catalog-only. The
[Jest integration](https://stryker-mutator.io/docs/stryker-js/jest-runner/)
requires the matching runner and compatible Jest setup; this route also starts
with a passing baseline suite. The builder cannot record those conditions.
Source, callable code, or permission to write a harness does not establish an
existing working Jest suite. The retained boundary fixture demonstrates its
own setup, not readiness of an arbitrary JavaScript project.
