---
title: PIT (Java mutation testing)
description: Mutate compiled Java code and rerun selected tests to find behavior changes the tests fail to detect.
tool:
  cardRequirement: Supply compiled Java classes, a passing test suite, and a compatible test-framework integration.
  decision:
    useWhen: Investigate whether an existing Java test suite detects small changes to behavior in selected classes.
    result: A mutation report identifies killed, surviving, uncovered, and unsuccessful mutant runs with source locations.
    limit: "Surviving mutants need interpretation: a change may be equivalent or outside the intended contract. Test coverage, mutation operators, exclusions, and execution errors affect the result."
  aliases: [Pitest, PIT, pitest-maven]
  searchTerms: [Java mutation testing, bytecode mutation, surviving mutants, test sensitivity, JUnit, Maven]
  modes: [Dynamic]
  inputTypes: [Binaries, Callable code]
  techniques: [Mutation testing]
  languages: [Java]
  languageNote: This entry covers Java bytecode with a Maven-managed test suite. Other JVM languages and additional integrations, including commercial extensions, require their own compatibility review.
  targets: [JVM bytecode, Java test suites, Maven projects]
  findings: [Surviving code mutations]
  findingNote: A survivor means the selected covering tests did not detect a particular mutation. No coverage, equivalent changes, timeouts, and run errors must be interpreted separately.
  environment: A compatible JDK, compiled classes with line/source debug information, Maven for the documented route, and supported tests. JUnit 5 needs its PIT plugin; plugin and JDK compatibility depend on the chosen versions.
  setup: Start from passing tests, pin the PIT Maven plugin, review target classes/tests and exclusions, and run mutationCoverage. Preserve existing project configuration when adapting the command.
  licenseCategory: Open source
  license: Apache-2.0 for PIT; optional plugins, commercial Arcmutate extensions, and the Java runtime have separate terms.
  cost: [Free]
  costNote: The open-source PIT workflow runs locally without a paid tier. Commercial Arcmutate products are separate and are not included in this profile's capabilities.
  website: https://pitest.org/
  verified: '2026-11-12'
  scope: Open-source PIT and its Maven mutationCoverage workflow, with an illustrative JUnit-style boundary-test experiment. Documentation currently describes release 1.30.2; the example and framework combinations were not executed in this review.
  sources:
    - label: Maven installation, targets, and mutationCoverage
      url: https://pitest.org/quickstart/maven/
    - label: Bytecode requirements, equivalent mutations, and result states
      url: https://pitest.org/quickstart/basic_concepts/
    - label: Test setup and compatibility troubleshooting
      url: https://pitest.org/faq/
    - label: Current release notes
      url: https://github.com/hcoles/pitest/blob/master/README.md
    - label: JUnit 5 integration requirements
      url: https://github.com/hcoles/pitest-junit5-plugin
    - label: Open-source versus commercial extensions
      url: https://pitest.org/
    - label: PIT license
      url: https://github.com/hcoles/pitest/blob/master/LICENSE.txt
---

## First try

**Illustrative experiment; not executed in this review.** Start with a disposable
Maven Java project whose tests already pass. A small method can return whether
a purchase qualifies for a discount:

```java
public static boolean qualifies(int total) {
    return total >= 100;
}
```

Use tests that assert false for 50 and true for 150, initially omitting 100.
For a new experiment, follow the [Maven quickstart](https://pitest.org/quickstart/maven/),
pin `org.pitest:pitest-maven` to the version you review, and select the experiment's
classes, tests, and `CONDITIONALS_BOUNDARY` mutator in the plugin configuration.
Ensure the chosen PIT release supports the project's JDK and test framework.
For an existing project, inspect its configuration first and retain its targets,
exclusions, plugin version, and test integration unless a change is deliberate.

From the Maven module containing the code and tests, run the configured plugin:

```sh
mvn test-compile org.pitest:pitest-maven:mutationCoverage
```

Inspect the HTML report under `target/pit-reports` and locate the mutation that
changes `>=` to `>`. It is expected to survive those two tests. Add an assertion
that 100 qualifies and rerun with the same mutation settings. That boundary
mutation is then expected to be killed. These are expected outcomes, not a
recorded score or proof that every project will produce the same mutants.

## Interpret the outcomes

`Killed` means a test detected the changed behavior. `Survived` means covering
tests did not reject the mutation; `No coverage` means no selected test exercised
the mutated line. A mutation can preserve observable behavior, so investigate
its meaning before changing tests or exclusions. Timeouts, memory errors, and
run errors need their own diagnosis.

PIT mutates bytecode rather than editing Java source files. Tests still execute
the application code and any test side effects, so choose a disposable test
environment. Source filenames and line numbers help map the bytecode result
back to a readable report.

The [test evidence guide](../../guides/test-evidence/) separates execution
coverage, mutation testing, and generated inputs. [StrykerJS](../strykerjs/)
provides a related workflow for JavaScript.

This profile remains catalog-only. The system builder does not currently
confirm a Maven setup, compatible test-framework plugin, or a passing baseline
test suite; broad Java and test-access answers are insufficient to establish
those prerequisites.
