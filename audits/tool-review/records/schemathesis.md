# Schemathesis: evidence record

Access/review date: 2026-09-22. Existing scope: Current version 4 API testing. Running applications is the analyzed target; an OpenAPI or GraphQL definition is a required test-generation input, not application source code.

File: `src/content/docs/tools/schemathesis.md`. Baseline SHA-256: `364add0b7735e9331ca12c5d3fb723328089214528d6070880b97bef9068b73a`. Reviewed SHA-256: `364add0b7735e9331ca12c5d3fb723328089214528d6070880b97bef9068b73a`. Original text is preserved in baseline.json.

Status: Assessed against primary documentation; see qualifications below.

## E1: evidence assessment

The project supports OpenAPI/GraphQL schema-derived property tests, shrinking and stateful testing. Package metadata requires Python 3.10+. The CLI tutorial supports run URL syntax and replay of failing requests. The local URL is a placeholder test input, not an external citation. Authentication, schema validity and resettable data remain prerequisites; failures are not automatically vulnerabilities.

Source sections: README: API formats and testing; CLI tutorial: schema input, auth and reproduction; pyproject.toml: Python and MIT license

- [S1](https://github.com/schemathesis/schemathesis)
- [S2](https://schemathesis.readthedocs.io/en/stable/tutorials/cli/)
- [S3](https://github.com/schemathesis/schemathesis/blob/master/pyproject.toml)

Correction: No content correction recorded.

## Claims and dispositions

Counts: {"supported":27,"supported with qualification":9,"contradicted":0,"unresolved":0}. Compound paragraphs retain their qualifications; list-valued fields are assessed member by member. Quoted relative links point to the corresponding repository Markdown pages.

| Location | Claim as reviewed | Verdict | Evidence / limitation |
| --- | --- | --- | --- |
| title | Schemathesis | supported | See evidence assessment E1. |
| description | Generate API tests from OpenAPI or GraphQL definitions and check observed responses. | supported | See evidence assessment E1. |
| tool.modes[0] | Dynamic | supported | See evidence assessment E1. |
| tool.inputTypes[0] | Running applications | supported | See evidence assessment E1. |
| tool.techniques[0] | API testing | supported | See evidence assessment E1. |
| tool.techniques[1] | Property-based testing | supported | See evidence assessment E1. |
| tool.techniques[2] | Stateful testing | supported | See evidence assessment E1. |
| tool.languages[0] | Language independent | supported | See evidence assessment E1. |
| tool.languageNote | The CLI tests an API interface independently of its implementation language. Python integrations are optional and do not limit remote API testing to Python services. | supported | See evidence assessment E1. |
| tool.targets[0] | HTTP APIs | supported | See evidence assessment E1. |
| tool.targets[1] | OpenAPI | supported | See evidence assessment E1. |
| tool.targets[2] | GraphQL | supported | See evidence assessment E1. |
| tool.findings[0] | Specification violations | supported | See evidence assessment E1. |
| tool.findings[1] | Server errors | supported | See evidence assessment E1. |
| tool.findings[2] | Input validation | supported | See evidence assessment E1. |
| tool.findingNote | Finds failures of enabled response and schema checks. An HTTP error or schema mismatch needs investigation and is not automatically a security vulnerability. | supported | See evidence assessment E1. |
| tool.environment | A compatible Python environment; current package metadata requires Python 3.10 or newer. Container and uv-based workflows are also documented. | supported | See evidence assessment E1. |
| tool.setup | Provide an API definition and reachable test service. Configure server location, authentication, state, and selected checks for the intended operations. | supported | See evidence assessment E1. |
| tool.licenseCategory | Open source | supported | See evidence assessment E1. |
| tool.license | MIT | supported | See evidence assessment E1. |
| tool.cost[0] | Free | supported | See evidence assessment E1. |
| tool.costNote | Free open-source CLI and Python library. This entry covers local test execution and does not require a hosted service subscription. | supported | See evidence assessment E1. |
| tool.website | https://schemathesis.readthedocs.io/ | supported | See evidence assessment E1. |
| tool.verified | 2026-09-22 | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.scope | Current version 4 API testing. Running applications is the analyzed target; an OpenAPI or GraphQL definition is a required test-generation input, not application source code. | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[0] | API scope, features, and license: https://github.com/schemathesis/schemathesis | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[1] | CLI workflow and failure reproduction: https://schemathesis.readthedocs.io/en/stable/tutorials/cli/ | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| tool.sources[2] | Package runtime requirements: https://github.com/schemathesis/schemathesis/blob/master/pyproject.toml | supported with qualification | Repository metadata/provenance, not an external product claim. The previous verification date is not independent evidence. |
| What it does, line 33 | Schemathesis derives test cases from an API definition and checks the responses from the running service. It can vary inputs, reduce failing examples, and exercise related operations through stateful testing. | supported | See evidence assessment E1. |
| What it does, line 35 | Useful findings include responses that contradict the declared schema and server errors caused by generated inputs. These checks complement a security scanner such as [ZAP](../../../src/content/docs/tools/zap.md); they do not imply identical security-rule coverage. | supported | See evidence assessment E1. |
| Example, line 39 | **Illustrative workflow, not run here.** Install the CLI in a compatible environment. Start a disposable local API that serves its OpenAPI definition at the URL below, with its server URL configured for that local instance: | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 41 | ```sh<br>schemathesis run http://127.0.0.1:8000/openapi.json<br>``` | supported with qualification | Documentation/static reasoning only; this example has not been executed. See E1. |
| Example, line 45 | For an authenticated service, configure test credentials before expecting meaningful endpoint coverage. Generated requests can create or change records, so use test data that can be reset. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Example, line 47 | Reproduce a reported failure using its supplied request, then decide whether the implementation, schema, or test setup is wrong. Preserve the schema revision and test configuration with the result. | supported with qualification | Author recommendation or conditional inference, not a measured effectiveness claim. Factual premises reviewed against E1. |
| Limits, line 51 | Undocumented operations, incorrect schemas, inaccessible states, and missing authorization context limit testing. A schema cannot express every business requirement; additional checks may be needed. | supported | See evidence assessment E1. |
| Limits, line 53 | Compare [RESTler](../../../src/content/docs/tools/restler.md) for producer-consumer request sequences and [Hypothesis](../../../src/content/docs/tools/hypothesis.md) for properties over callable code. | supported | See evidence assessment E1. |
