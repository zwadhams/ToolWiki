---
title: RESTler
description: Generate sequences of REST API requests using dependencies inferred from an OpenAPI specification.
tool:
  modes: [Dynamic]
  inputTypes: [Running applications]
  techniques: [API testing, Stateful fuzzing]
  languages: [Language independent]
  languageNote: Tests REST interfaces without requiring application source. Python and .NET are tool-runtime requirements, not supported target-language restrictions.
  targets: [HTTP APIs, OpenAPI]
  findings: [Server errors, Specification violations]
  findingNote: Reports server failures and violations detected by enabled checkers. Authentication, resource dependencies, and checker configuration affect coverage and interpretation.
  environment: Documented 64-bit Windows and Linux setups; macOS support is experimental. Build instructions require Python and .NET, or use the documented container workflow.
  setup: Compile an OpenAPI definition into a test grammar, configure the target and authentication, and verify requests in test mode before fuzzing. Supply a resettable service and test data.
  licenseCategory: Open source
  license: MIT
  cost: [Free]
  costNote: Free open-source compiler and fuzzing engine. Hosting the target and running sustained test campaigns can have separate costs.
  website: https://github.com/microsoft/restler-fuzzer
  verified: '2026-09-22'
  scope: RESTler's OpenAPI-based REST workflow, including test, fuzz-lean, and fuzz modes. This is not a GraphQL tester or a static analyzer of the API implementation.
  sources:
    - label: Architecture, modes, platforms, and build requirements
      url: https://github.com/microsoft/restler-fuzzer
    - label: Quickstart and execution reports
      url: https://github.com/microsoft/restler-fuzzer/blob/main/docs/user-guide/QuickStart.md
    - label: License
      url: https://github.com/microsoft/restler-fuzzer/blob/main/LICENSE
---

## What it does

RESTler uses relationships between API operations to generate request sequences. For example, a resource identifier returned by a creation request can become an input to a later request. This helps reach behavior that isolated requests would miss.

Its compiler prepares the grammar; the testing and fuzzing stages send requests to the running service. Compiling an API definition alone is not a dynamic test result.

## Example

**Illustrative workflow, not run here.** Build RESTler according to its repository instructions. From the repository root, with a disposable test API already running and a specification configured for that target:

```sh
python restler-quick-start.py --api_spec_path path/to/openapi.json --restler_drop_dir path/to/restler_bin
```

Replace both paths with your files. This quickstart compiles the specification and runs requests; it is not a compile-only preview. Configure authentication and a resettable resource namespace for the test service first.

Inspect `restler_working_dir` and the testing summary. Requests blocked by missing prerequisites or failed authentication are coverage gaps. Review replayable failures before expanding to a longer fuzzing campaign.

## Limits

Inferred dependencies and example values may need corrections or annotations. A server error can have several causes, and multiple failing sequences can expose the same defect.

Compare [Schemathesis](../schemathesis/) for API-schema-driven property checks and [boofuzz](../boofuzz/) for a custom protocol harness.
