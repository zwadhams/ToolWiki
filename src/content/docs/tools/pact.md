---
title: Pact JS
description: Generate consumer contracts from JavaScript tests and verify their HTTP interactions against a provider.
executionEvidence:
  status: recorded
  scope: Pact JS 17.1.4 with Pact Core 20.2.0 ran one HTTP consumer interaction and local provider verification on Windows under Node.js 24.22.1 x64. The type-mismatched provider failed at $.status; the corrected provider passed. This used no broker, external service, authentication, or message-transport plugin.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/api-supply-tools/evidence/api-contracts/run.json
tool:
  cardRequirement: Write consumer tests and retain their pact files; provider verification needs a controlled provider instance.
  decision:
    useWhen: Check whether an API provider still satisfies interactions that a consumer actually uses.
    result: Consumer tests generate pact files; provider verification reports matching or mismatching requests, status codes, headers, and bodies.
    limit: Only the authored interactions and matching rules are checked. Passing contracts do not replace end-to-end, security, or load testing.
  analysisWorkflows: []
  aliases: [Pact, Pact JavaScript, pact-js]
  searchTerms: [consumer-driven contracts, contract testing, provider verification, API compatibility, Pact V4, consumer provider]
  modes: [Dynamic]
  inputTypes: [Callable code, Running applications]
  findings: [Specification violations]
  findingNote: The consumer test exercises client code against a mock provider. Provider verification separately checks a real test instance against generated pact files and their matching rules.
  environment: Pact JS 17.1.4 requires Node.js 22 or newer and a supported Pact Core native binary. The retained Windows example uses x64 Node.js 24.22.1; Pact Core 20.2.0 provides a Windows x64 package, not a Windows ARM64 package.
  setup: Implement consumer interactions around the actual client, generate compatible pact files, and run verification against a controlled provider with any required state handlers. Local file exchange does not require a broker.
  techniques: [Contract testing, API testing]
  languages: [JavaScript, TypeScript]
  languageNote: These tags describe the scoped Pact JS test harness. An HTTP provider can use another implementation language. Other Pact implementations have separate platform and feature matrices.
  targets: [HTTP APIs, Consumer-provider integrations]
  licenseCategory: Open source
  license: MIT for Pact JS. Native Pact Core and optional plugins have their own notices.
  cost: [Free]
  costNote: The scoped local consumer and provider tests are free and require no hosted broker. PactFlow and other hosted workflows are separate products.
  website: https://docs.pact.io/implementation_guides/javascript/readme
  verified: '2026-11-12'
  scope: Pact JS 17.1.4 HTTP consumer testing and local provider verification using generated pact files. Message transports, plugin protocols, broker deployment gates, and other language SDKs are outside the worked example.
  sources:
    - label: Pact JS overview and local setup
      url: https://docs.pact.io/implementation_guides/javascript/readme
    - label: Consumer tests and Pact V4 interaction API
      url: https://docs.pact.io/implementation_guides/javascript/docs/consumer
    - label: Provider verification, pact files, and provider states
      url: https://docs.pact.io/implementation_guides/javascript/docs/provider
    - label: Pact JS 17.1.4 package requirements
      url: https://registry.npmjs.org/@pact-foundation/pact/17.1.4
    - label: Pact Core 20.2.0 native platform packages
      url: https://registry.npmjs.org/@pact-foundation/pact-core/20.2.0
    - label: Pact JS license
      url: https://github.com/pact-foundation/pact-js/blob/master/LICENSE
---

## First try

Follow the [API description and contract example](../../guides/api-contracts/).
The consumer calls a real client function against Pact's mock provider and
generates a pact file. Verification then replays that interaction against two
local provider variants: one returns a numeric `status`, and the correction
returns a string.

The retained run records a body mismatch at `$.status` for the faulty provider
and a passing verification for the correction. It covers one HTTP interaction,
not the complete API or all consumer behavior.

## Write a useful contract

Exercise the actual client code in the consumer test. A test that only sends a
handwritten request can agree with its mock while missing a bug in the real
client. Use matching rules that express the consumer's needs without fixing
incidental values unnecessarily.

Share the generated pact file with the provider. A broker can coordinate this
in larger workflows, but the local example reads the file directly. Provider
states prepare the conditions named by each interaction; preserve the intended
state setup and dependency isolation when adapting the example.

## Interpret the result

A consumer pass means its test agreed with the mock interaction. It does not
show that the real provider implements the contract. A provider pass means the
verified instance satisfied the supplied interactions and matching rules; it
does not show that all production versions, routes, or deployment combinations
are compatible.

Version the consumer, pact file, and provider together in the run record. Keep
result publication disabled when reproducing the local fixture.

## System-builder scope

This entry is searchable and comparable but does not currently produce builder
matches. Provider verification requires consumer-generated pact artifacts, and
the builder cannot yet describe that prerequisite. An OpenAPI definition is not
a substitute for a Pact contract.

## Related checks

[Spectral](../spectral/) checks the API document itself.
[Schemathesis](../schemathesis/) generates API tests from OpenAPI or GraphQL.
Pact complements these with concrete expectations derived from a consumer.
