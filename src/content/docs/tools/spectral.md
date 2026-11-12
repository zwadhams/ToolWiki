---
title: Spectral
description: Lint API descriptions and other JSON or YAML documents against an explicit ruleset.
executionEvidence:
  status: recorded
  scope: Spectral CLI 6.17.1 on Windows with Node.js 24.22.1 x64 checked one custom operation-ID rule. The faulty OpenAPI fixture exited 1 with the expected diagnostic; the corrected fixture exited 0 with no diagnostics. This did not exercise the full OpenAPI or AsyncAPI rulesets.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/api-supply-tools/evidence/api-contracts/run.json
tool:
  cardRequirement: Supply a JSON or YAML document and the intended ruleset.
  decision:
    useWhen: Check API descriptions for policy violations before generating clients or testing a service.
    result: Diagnostics identify a rule, severity, document path, and source location.
    limit: A passing lint run only satisfies the enabled rules. It does not establish that a deployed service follows its API description.
  analysisWorkflows:
    - id: document-lint
      label: API document rules
      subject: component
      inputs: [Configuration files]
      languageScope: configuration
      languages: [OpenAPI, AsyncAPI, JSON, YAML]
      findings: [Specification violations, Coding conventions]
      hostPlatforms: [Windows, Linux, macOS]
      requires: []
      caveat: The selected ruleset defines the checks. OpenAPI and AsyncAPI support is document linting, not execution or validation of an application implementation. Resolve referenced documents and review any custom functions before running them.
      sources:
        - https://github.com/stoplightio/spectral
        - https://github.com/stoplightio/spectral/blob/develop/docs/getting-started/3-rulesets.md
        - https://registry.npmjs.org/@stoplight/spectral-cli/6.17.1
  aliases: [Spectral CLI, Stoplight Spectral]
  searchTerms: [API linting, OpenAPI lint, AsyncAPI lint, operationId, API style guide, JSON rules, YAML rules]
  modes: [Static]
  inputTypes: [Configuration files]
  findings: [Specification violations, Coding conventions]
  findingNote: Findings are violations of the supplied document rules. Custom rules can express organizational conventions; an empty result is not a security or interoperability guarantee.
  environment: The pinned Spectral CLI 6.17.1 package requires Node.js 22 or Node.js 24 and newer. The retained example ran on Windows with Node.js 24.22.1 x64.
  setup: Install the CLI, select the intended ruleset, and provide the documents and references it needs. Keep an existing project's ruleset and failure threshold unless deliberately evaluating an override.
  techniques: [Linting, Schema validation]
  languages: [OpenAPI, AsyncAPI, JSON, YAML]
  languageNote: These tags describe API-description and configuration formats. They do not claim source-level checking of the languages used to implement an API.
  targets: [API descriptions, HTTP APIs, Event-driven API descriptions]
  licenseCategory: Open source
  license: Apache-2.0 for Spectral; separately supplied rulesets and functions can have their own terms.
  cost: [Free]
  costNote: The open-source CLI runs locally. Commercial API-design services are outside this entry.
  website: https://github.com/stoplightio/spectral
  verified: '2026-11-12'
  scope: Spectral CLI document linting, with bundled OpenAPI/AsyncAPI rules and user-defined rulesets. The worked example pins CLI 6.17.1 and exercises one isolated custom rule.
  sources:
    - label: Project scope, supported document formats, and CLI examples
      url: https://github.com/stoplightio/spectral
    - label: Ruleset structure and rule selection
      url: https://github.com/stoplightio/spectral/blob/develop/docs/getting-started/3-rulesets.md
    - label: CLI 6.17.1 package and runtime requirements
      url: https://registry.npmjs.org/@stoplight/spectral-cli/6.17.1
    - label: Spectral license
      url: https://github.com/stoplightio/spectral/blob/develop/LICENSE
---

## First try

Use the [API description and contract example](../../guides/api-contracts/).
Its ruleset requires an `operationId` on each GET operation. Spectral reports the
missing field in `openapi.bad.json`; adding it in `openapi.good.json` removes
that diagnostic. The guide includes pinned dependencies, commands, and recorded
output.

This example deliberately checks one rule. It does not enable the complete
bundled OpenAPI ruleset or establish that every schema constraint is valid.

## Use it on your project

Find the project's existing Spectral ruleset and CI invocation before adding
flags. Keep its reference-resolution behavior, rule severities, and failure
threshold. An explicit `--ruleset` selects a different configuration, and
`--fail-severity` changes which diagnostics cause a nonzero exit status.

When adding a new rule, retain a document that should fail and one that should
pass. Inspect the diagnostic's document path and location to confirm it checks
the intended operation rather than an unrelated part of the file.

## Interpret the result

A diagnostic identifies a document condition to review. Rules can cover design
conventions as well as schema constraints, so a lint failure is not automatically
a defect in the running service. Conversely, a well-formed description can still
describe behavior the service does not implement.

Keep the ruleset with the report. Use a JSON output file for automation rather
than assuming all console output is JSON; the retained CLI emits an informational
message on a clean run.

## Related checks

[Pact JS](../pact/) verifies specific consumer-provider interactions.
[Schemathesis](../schemathesis/) generates tests from an API definition against
a running service. [ZAP](../zap/) investigates web-security behavior. These
answer different questions from linting the API description.
