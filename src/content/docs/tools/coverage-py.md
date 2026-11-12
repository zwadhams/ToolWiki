---
title: coverage.py
description: Measure which Python statements and branches a test run executes.
tool:
  analysisWorkflows:
    - id: python-process-coverage
      label: Python statement and branch coverage
      subject: component
      inputs: [Source code, Callable code]
      languageScope: source
      languages: [Python]
      findings: [Execution coverage gaps]
      requires: [testInstance]
      hostPlatforms: [Windows]
      caveat: coverage.py 7.10.6 measuring one Python process with source available. Supply a runnable program or test command and select the source scope; no particular test framework is required. Subprocesses, concurrency integrations, assertion quality, and native-extension coverage are outside this route.
      sources:
        - https://coverage.readthedocs.io/en/7.10.6/cmd.html
        - https://coverage.readthedocs.io/en/7.10.6/branch.html
  decision:
    useWhen: Find Python code and branch destinations that a selected test run did not execute.
    result: Text, HTML, or JSON reports identify measured statements, missing lines, and missing branches within the configured source scope.
    limit: Executing code does not establish that tests check its result. Process scope, exclusions, and incomplete runs affect the measurement.
  aliases: [Python coverage, coveragepy]
  searchTerms: [line coverage, branch coverage, statement coverage, test coverage, unexecuted code]
  modes: [Dynamic]
  inputTypes: [Source code, Callable code]
  techniques: [Execution coverage measurement]
  languages: [Python]
  languageNote: Measures Python execution. Native extensions and external services are not covered by the Python source report.
  targets: [Python test suites, Python programs]
  findings: [Execution coverage gaps]
  findingNote: Missing lines and branches identify statements and branch destinations not executed in the selected source. A coverage percentage is not a measure of assertion quality or correctness.
  environment: A Python runtime supported by the selected coverage.py release. The first example uses coverage.py 7.10.6 and Python 3.13 on Windows.
  setup: Provide a working test command, select the source to measure, collect branch data, and retain the data file before generating reports.
  licenseCategory: Open source
  license: Apache-2.0 except where noted otherwise in the project notice
  cost: [Free]
  costNote: Free local measurement and reporting; test infrastructure can have separate costs.
  website: https://coverage.readthedocs.io/
  verified: '2026-11-06'
  scope: coverage.py 7.10.6 with standard-library unittest in one Python process. Subprocess, concurrency, and combined-run collection are outside this first workflow.
  sources:
    - label: Selected release and Python requirements
      url: https://pypi.org/project/coverage/7.10.6/
    - label: Running tests and producing reports
      url: https://coverage.readthedocs.io/en/7.10.6/cmd.html
    - label: Branch measurement
      url: https://coverage.readthedocs.io/en/latest/branch.html
    - label: Reviewed release branch measurement
      url: https://coverage.readthedocs.io/en/7.10.6/branch.html
    - label: Source selection and unexecuted files
      url: https://coverage.readthedocs.io/en/latest/source.html
    - label: Process collection requirements
      url: https://coverage.readthedocs.io/en/latest/subprocess.html
    - label: License notice
      url: https://raw.githubusercontent.com/nedbat/coveragepy/master/NOTICE.txt
---

## First try

Use the [coverage fixture](../../guides/test-evidence/#measure-execution-coverage)
to run three small unittest suites against the same Python module. It includes
exact setup and commands, declared source scope, and retained reports.

**Executed with coverage.py 7.10.6 on Windows and Python 3.13.15.** The partial
suite passed its test but left line 9 and the branch from line 3 to line 5
unexecuted. A second suite reached every line and branch without asserting any
return value. The third added assertions. These results separate execution
coverage from the strength of the checks.

## Read the report

`Missing` can name a line or a branch destination such as `3->5`. A function may
have every statement executed while still missing the false path of an `if`.
With branch measurement enabled, the combined percentage includes statements
and branch destinations; read their separate counts as well.

Keep test success, coverage collection, and a configured coverage threshold
separate. A test can pass below the threshold, or fail after executing most of
the source. Confirm that the test process completed and its data was written.
This example measures one process only.

## Use it with other testing methods

[Hypothesis](../hypothesis/) can generate inputs for properties you define.
Coverage can show which code those tests reached; it does not supply the
properties. [StrykerJS](../strykerjs/) answers a different question for JavaScript:
whether existing tests notice selected changes to the source.

## System builder scope

**Workflow reviewed November 12, 2026.** The builder can suggest one-process
measurement when you have Python source, callable code, and permission to run
the workload. A runnable Python script or module is sufficient; the existing
fixture uses unittest, but coverage.py does not require that runner.

Choose the source directory, branch setting, and existing configuration before
running. The Windows host scope follows the retained fixture; other hosts need
a compatibility check. Subprocess and concurrency collection remain outside
this route. Coverage does not establish that assertions check the behavior.
