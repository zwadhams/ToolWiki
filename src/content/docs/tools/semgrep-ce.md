---
title: Semgrep CE
description: Match code patterns and apply local data flow checks using customizable analysis rules.
executionEvidence:
  status: recorded
  scope: "Semgrep CE 1.184.0 on Windows with Python 3.13.15 ran the OSS engine and one local Python rule with normal local permissions. The faulty file produced one finding and exit 1; the corrected and deliberately uncovered files produced zero findings and exit 0, with no scan errors. Target code was not executed. The uncovered case demonstrates the rule's limit; this Windows run does not validate the Linux builder workflow or Semgrep Code."
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/remaining-work/expansion-runs/semgrep.json
tool:
  cardRequirement: Source files and licensed rules for the chosen CE language.
  analysisWorkflows:
    - id: python-shell-call
      label: Python shell-call pattern review
      subject: component
      inputs: [Source code]
      languageScope: source
      languages: [Python]
      findings: [Unsafe API use]
      hostPlatforms: [Linux]
      caveat: Semgrep CE 1.184.0 with the MIT-licensed ToolWiki shell=True rule. Checks selected subprocess.run and Popen call shapes in Python source, with constant propagation disabled. It does not establish untrusted data flow, exploitability, or Pro/cross-file coverage.
      sources:
        - https://docs.semgrep.dev/semgrep-ce-languages
        - https://docs.semgrep.dev/writing-rules/rule-syntax
        - https://docs.semgrep.dev/writing-rules/pattern-syntax
        - https://docs.python.org/3.12/library/subprocess.html#security-considerations
        - https://docs.semgrep.dev/prerequisites
  aliases: [Semgrep Community Edition]
  modes: [Static]
  inputTypes: [Source code]
  techniques: [SAST, Pattern matching, Data flow analysis]
  languages: [C, C++, 'C#', Go, Java, JavaScript, Kotlin, Python, Ruby, Rust, TypeScript, PHP]
  languageNote: Selected community-supported language examples, not an exhaustive list. CE support is best effort, and its documented data flow analysis is limited to a single function. Check the CE column for syntax-version limits rather than applying the Code product's support to CE.
  targets: [Source code]
  licenseCategory: Open source
  cost: [Free]
  costNote: The standalone Community Edition engine is free. Semgrep Code is a separate platform offering with a limited free plan and paid plans.
  editionGroup: semgrep
  license: LGPL-2.1 engine; rules may have different licenses.
  website: https://github.com/semgrep/semgrep
  verified: '2026-09-22'
  scope: Community Edition engine. Do not assume Semgrep Code platform capabilities are included.
  findings: ["Injection risks","Unsafe API use","Coding conventions"]
  findingNote: "Selected local rules and supported local taint checks. Cross-file platform features and separate Supply Chain detection are outside CE scope."
  environment: "The selected 1.184.0 release supports Linux and Apple silicon macOS; native Windows is documented as beta. Intel macOS requires the older 1.182.x line. Use the release's supported Python runtime."
  setup: "Source and selected rules; no application build or runtime harness for the normal CE workflow. Rule licensing and language maturity vary."
  sources:
    - label: Host prerequisites
      url: https://docs.semgrep.dev/prerequisites
    - label: Semgrep Free Edition and paid plans
      url: https://semgrep.dev/pricing/
    - label: Semgrep usage and billing
      url: https://docs.semgrep.dev/usage-and-billing/overview
    - label: Semgrep CE project and license
      url: https://github.com/semgrep/semgrep
    - label: Semgrep CE design and scope
      url: https://semgrep.dev/docs/contributing/semgrep-philosophy
    - label: CE language support and analysis limits
      url: https://docs.semgrep.dev/semgrep-ce-languages
    - label: Rule configuration and matching options
      url: https://docs.semgrep.dev/writing-rules/rule-syntax
    - label: Function-call pattern syntax
      url: https://docs.semgrep.dev/writing-rules/pattern-syntax
    - label: Python shell invocation considerations
      url: https://docs.python.org/3.12/library/subprocess.html#security-considerations
    - label: Selected engine release
      url: https://github.com/semgrep/semgrep/releases/tag/v1.184.0
    - label: CLI engine, metrics, and result controls
      url: https://docs.semgrep.dev/cli-reference
---

## What it does

Semgrep CE matches source-code structures using rules that resemble the code being checked. Rules can express security checks or project-specific conventions, including supported local taint-analysis checks.

## When it is useful

Use it when you want to turn a recognizable coding mistake into a repeatable check. A small custom rule can be easier to maintain than a manual search performed during every review.

## What to keep in mind

CE and [Semgrep Code](../semgrep-code/) have different analysis capabilities. CE's documented data flow analysis is limited to a single function. Cross-file analysis and Pro rules are platform capabilities available even on its limited free plan; they are not features of standalone CE. Rule quality and language support influence what a scan finds.

## Getting started

Start with a small, relevant rule set, inspect the findings, and tune the rules against representative examples. Check rule licenses separately from the engine license.

### One Python call-pattern rule

**Documentation-reviewed on November 6, 2026.** The builder's first CE workflow uses Semgrep 1.184.0, Python 3.12, and a Linux host. It selects the original MIT-licensed rule in [`examples/semgrep-ce-check`](https://github.com/zwadhams/ToolWiki/tree/main/examples/semgrep-ce-check), not a Registry or Pro rule set. The directory contains the rule, license, faulty/corrected inputs, and an example the rule intentionally does not cover.

**Fixture executed on Windows with Python 3.13.15.** The OSS engine found the faulty call and reported no findings for the correction or deliberately uncovered case, with no scan errors. The [execution record](https://github.com/zwadhams/ToolWiki/blob/main/examples/semgrep-ce-check/evidence.md) retains versions, input hashes, and the restricted-shell startup failure. The Linux route has not been executed here.

The rule ID is `toolwiki.python.subprocess-shell-true`. It matches `subprocess.run` and `subprocess.Popen` calls with literal `shell=True`; constant propagation is disabled. The rule reports a call to review, not a demonstrated injection path. It does not trace untrusted input or calls through wrappers.

Install `semgrep==1.184.0` in an isolated Python environment using the [host prerequisites](https://docs.semgrep.dev/prerequisites), then run from the fixture directory:

```sh
semgrep scan --oss-only --config rule.yml --no-rewrite-rule-ids --metrics off --disable-version-check --error --json bad.py
semgrep scan --oss-only --config rule.yml --no-rewrite-rule-ids --metrics off --disable-version-check --error --json good.py
```

The intended first result identifies the literal shell-enabled call in `bad.py`. The correction passes an argument list to the Python executable with `shell=False`; the input text is a process argument. It should no longer match this rule. Neither command runs the target functions. Read any scan errors and skipped-file summary before interpreting the result.

`--error` makes a completed finding produce status `1`. A parse or configuration error is a different outcome. Keep the JSON report, CLI version, and exact rule with the [run record](../../guides/run-record/). The fixture's evidence record identifies the reviewed rule digest and any actual execution separately.

Other rules, Python call shapes, languages, and framework models remain outside this matching workflow. [Execution and data boundaries](../../guides/execution-and-data/#semgrep-ce-with-local-rules) explains local rules, metrics, and platform reporting.

## Related research

**Related product family:** The [OCPP study](https://www.cs.montana.edu/izurieta/pubs/CSR_2026_Wadhams.pdf) used Semgrep alongside SonarQube and language-specific analyzers. It does not supply enough edition detail to attribute its results specifically to today's CE engine or Semgrep Code.

Read [comparing SAST tools](../../research/comparing-tools/) for lessons about rule scope, execution failures, and zero-finding runs. Use the current CE scope above when selecting a configuration.
