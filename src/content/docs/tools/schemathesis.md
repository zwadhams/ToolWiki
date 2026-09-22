---
title: Schemathesis
description: Generate API tests from OpenAPI or GraphQL definitions and check observed responses.
tool:
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [API testing, Property-based testing, Stateful testing]
  languages: [Language independent]
  languageNote: The CLI tests an API interface independently of its implementation language. Python integrations are optional and do not limit remote API testing to Python services.
  targets: [HTTP APIs, OpenAPI, GraphQL]
  findings: [Specification violations, Server errors, Input validation]
  findingNote: Finds failures of enabled response and schema checks. An HTTP error or schema mismatch needs investigation and is not automatically a security vulnerability.
  environment: A compatible Python environment; current package metadata requires Python 3.10 or newer. Container and uv-based workflows are also documented.
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

## Example

**Illustrative workflow, not run here.** Install the CLI in a compatible environment. Start a disposable local API that serves its OpenAPI definition at the URL below, with its server URL configured for that local instance:

```sh
schemathesis run http://127.0.0.1:8000/openapi.json
```

For an authenticated service, configure test credentials before expecting meaningful endpoint coverage. Generated requests can create or change records, so use test data that can be reset.

Reproduce a reported failure using its supplied request, then decide whether the implementation, schema, or test setup is wrong. Preserve the schema revision and test configuration with the result.

## Limits

Undocumented operations, incorrect schemas, inaccessible states, and missing authorization context limit testing. A schema cannot express every business requirement; additional checks may be needed.

Compare [RESTler](../restler/) for producer-consumer request sequences and [Hypothesis](../hypothesis/) for properties over callable code.
