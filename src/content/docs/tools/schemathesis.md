---
title: Schemathesis
description: Generate API tests from OpenAPI or GraphQL definitions and check observed responses.
executionEvidence:
  status: recorded
  scope: "Schemathesis 4.33.1 on Windows used Python 3.12.16 to check a local OpenAPI fixture served by Python 3.13.15. The coverage phase used positive generation, not_a_server_error, one worker, seed 20261106, and a 20-second limit. The faulty run exited 1 on an HTTP 500 and the correction exited 0. This does not cover all generation phases, negative cases, security checks, GraphQL, or RESTler."
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/remaining-work/executions/http-api/record.json
tool:
  analysisWorkflows:
    - id: openapi
      label: Generated tests from OpenAPI
      subject: connection
      inputs:
        - Running applications
      languageScope: independent
      languages: []
      findings:
        - Specification violations
        - Server errors
        - Input validation
      caveat: Finds failures of enabled response and schema checks. An HTTP error or schema mismatch needs
        investigation and is not automatically a security vulnerability.
      sources:
        - https://github.com/schemathesis/schemathesis
        - https://schemathesis.readthedocs.io/en/stable/tutorials/cli/
        - https://github.com/schemathesis/schemathesis/blob/master/pyproject.toml
      requires:
        - testInstance
      interfaces:
        - HTTP API
      definitions:
        - OpenAPI
    - id: graphql
      label: Generated tests from a GraphQL schema
      subject: connection
      inputs:
        - Running applications
      languageScope: independent
      languages: []
      findings:
        - Specification violations
        - Server errors
        - Input validation
      caveat: Finds failures of enabled response and schema checks. An HTTP error or schema mismatch needs
        investigation and is not automatically a security vulnerability.
      sources:
        - https://github.com/schemathesis/schemathesis
        - https://schemathesis.readthedocs.io/en/stable/tutorials/cli/
        - https://github.com/schemathesis/schemathesis/blob/master/pyproject.toml
      requires:
        - testInstance
      interfaces:
        - GraphQL
      definitions:
        - GraphQL schema
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [API testing, Property-based testing, Stateful testing]
  languages: [Language independent]
  languageNote: The CLI tests an API interface independently of its implementation language. Python integrations are optional and do not limit remote API testing to Python services.
  targets: [HTTP APIs, OpenAPI, GraphQL]
  findings: [Specification violations, Server errors, Input validation]
  findingNote: Finds failures of enabled response and schema checks. An HTTP error or schema mismatch needs investigation and is not automatically a security vulnerability.
  environment: A compatible Python environment; the pinned 4.33.1 example requires Python 3.11 or newer. Container and uv-based workflows are also documented.
  setup: Provide an API definition and reachable test service. Configure server location, authentication, state, and selected checks for the intended operations.
  licenseCategory: Open source
  license: MIT
  cost: [Free]
  costNote: Free open-source CLI and Python library. This entry covers local test execution and does not require a hosted service subscription.
  website: https://schemathesis.readthedocs.io/
  verified: '2026-09-22'
  scope: Current version 4 API testing. Running applications is the analyzed target; an OpenAPI or GraphQL definition is a required test-generation input, not application source code.
  sources:
    - label: API scope, features, and license
      url: https://github.com/schemathesis/schemathesis
    - label: CLI workflow and failure reproduction
      url: https://schemathesis.readthedocs.io/en/stable/tutorials/cli/
    - label: Package runtime requirements
      url: https://github.com/schemathesis/schemathesis/blob/master/pyproject.toml
---

## What it does

Schemathesis derives test cases from an API definition and checks the responses from the running service. It can vary inputs, reduce failing examples, and exercise related operations through stateful testing.

Useful findings include responses that contradict the declared schema and server errors caused by generated inputs. These checks complement a security scanner such as [ZAP](../zap/); they do not imply identical security-rule coverage.

## First try

Use the [disposable HTTP API](../../guides/api-testing/) for a supplied service,
OpenAPI schema, reset procedure, and known failing/corrected request. It includes
create/read/delete resource dependencies and separate instructions for this tool.

The guide uses a checked Python 3.13 environment and retains separate historical
Python 3.12.16 and new Python 3.13.15 execution records for Schemathesis 4.33.1.
Its [adaptation section](../../guides/api-testing/#adapt-to-your-api) shows a bounded
CLI command for your schema, test URL, and selected operation, plus an explicit
invalid-input variant.

## Limits

Undocumented operations, incorrect schemas, inaccessible states, and missing authorization context limit testing. A schema cannot express every business requirement; additional checks may be needed.

Compare [RESTler](../restler/) for producer-consumer request sequences and [Hypothesis](../hypothesis/) for properties over callable code.
