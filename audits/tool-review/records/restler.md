# RESTler: evidence record

Access/review date: 2026-09-22. Existing scope: RESTler's OpenAPI-based REST workflow, including test, fuzz-lean, and fuzz modes. This is not a GraphQL tester or a static analyzer of the API implementation.

File: `src/content/docs/tools/restler.md`. Baseline SHA-256: `5bac5bf5706bfa2e706409b7ca98784a71a6ac94183916e56c5cdaab2b87d191`. Reviewed SHA-256: `5bac5bf5706bfa2e706409b7ca98784a71a6ac94183916e56c5cdaab2b87d191`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The repository supports stateful REST sequences based on inferred producer/consumer dependencies, 64-bit Windows/Linux and experimental macOS. Quickstart combines Compile and Test, can create prerequisite resources and writes restler_working_dir/testing summaries. It is not a compile-only action. Auth/dependency failures are coverage gaps, and failures require replay. Python/.NET prerequisites and MIT licensing are documented.

Source sections: README: architecture, platforms, build prerequisites and modes; QuickStart: compile/test command and result analysis; MIT LICENSE

- [S1](https://github.com/microsoft/restler-fuzzer)
- [S2](https://github.com/microsoft/restler-fuzzer/blob/main/docs/user-guide/QuickStart.md)
- [S3](https://github.com/microsoft/restler-fuzzer/blob/main/LICENSE)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":24,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | RESTler | supported | See evidence assessment E1. |
| description | Generate sequences of REST API requests using dependencies inferred from an OpenAPI specification. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Running applications | supported | See evidence assessment E1. |
| tool.techniques[0] | API testing | supported | See evidence assessment E1. |
| tool.techniques[1] | Stateful fuzzing | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | Tests REST interfaces without requiring application source. Python and .NET are tool-runtime requirements, not supported target-language restrictions. | supported | See evidence assessment E1. |
| tool.targets[0] | HTTP APIs | supported | See evidence assessment E1. |
| tool.targets[1] | OpenAPI | supported | See evidence assessment E1. |
| tool.findings[0] | Server errors | supported | See evidence assessment E1. |
| tool.findings[1] | Specification violations | supported | See evidence assessment E1. |
| tool.findingNote | Reports server failures and violations detected by enabled checkers. Authentication, resource dependencies, and checker configuration affect coverage and interpretation. | supported | See evidence assessment E1. |
| tool.environment | Documented 64-bit Windows and Linux setups; macOS support is experimental. Build instructions require Python and .NET, or use the documented container workflow. | supported | See evidence assessment E1. |
| tool.setup | Compile an OpenAPI definition into a test grammar, configure the target and authentication, and verify requests in test mode before fuzzing. Supply a resettable service and test data. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source compiler and fuzzing engine. Hosting the target and running sustained test campaigns can have separate costs. | supported | See evidence assessment E1. |
| tool.website | https://github.com/microsoft/restler-fuzzer | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | RESTler's OpenAPI-based REST workflow, including test, fuzz-lean, and fuzz modes. This is not a GraphQL tester or a static analyzer of the API implementation. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | Architecture, modes, platforms, and build requirements: https://github.com/microsoft/restler-fuzzer | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | Quickstart and execution reports: https://github.com/microsoft/restler-fuzzer/blob/main/docs/user-guide/QuickStart.md | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | License: https://github.com/microsoft/restler-fuzzer/blob/main/LICENSE | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | RESTler uses relationships between API operations to generate request sequences. For example, a resource identifier returned by a creation request can become an input to a later request. This helps reach behavior that isolated requests would miss. | supported | See evidence assessment E1. |
| What it does, line 35 | Its compiler prepares the grammar; the testing and fuzzing stages send requests to the running service. Compiling an API definition alone is not a dynamic test result. | supported | See evidence assessment E1. |
| Example, line 39 | **Illustrative workflow, not run here.** Build RESTler according to its repository instructions. From the repository root, with a disposable test API already running and a specification configured for that target: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 41 | ```sh<br>python restler-quick-start.py --api_spec_path path/to/openapi.json --restler_drop_dir path/to/restler_bin<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 45 | Replace both paths with your files. This quickstart compiles the specification and runs requests; it is not a compile-only preview. Configure authentication and a resettable resource namespace for the test service first. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 47 | Inspect `restler_working_dir` and the testing summary. Requests blocked by missing prerequisites or failed authentication are coverage gaps. Review replayable failures before expanding to a longer fuzzing campaign. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 51 | Inferred dependencies and example values may need corrections or annotations. A server error can have several causes, and multiple failing sequences can expose the same defect. | supported | See evidence assessment E1. |
| Limits, line 53 | Compare [Schemathesis](../../../src/content/docs/tools/schemathesis.md) for API-schema-driven property checks and [boofuzz](../../../src/content/docs/tools/boofuzz.md) for a custom protocol harness. | supported | See evidence assessment E1. |
