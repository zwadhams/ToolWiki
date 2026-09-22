---
title: Ways to do DAST
description: Separate scanning behavior, authentication, and application interfaces from related dynamic techniques.
---

DAST does not have one universal list of mutually exclusive types. It is more useful to describe a test along several dimensions. A single scan can be active, authenticated, and API-focused at the same time.

## Passive and active checks

**Passive checks** inspect existing requests and responses without altering them for the check. For example, a checker might identify a missing security header in an observed response.

**Active checks** send specially constructed requests and examine the result. They can investigate behaviors that passive observation cannot establish. Active testing can alter data or trigger expensive operations; choose an authorized test environment and scope accordingly.

ZAP provides both kinds of checks. Discovery is a separate step: a crawler finds places to test, while the scanner performs the checks. See [ZAP's scanning guide](https://www.zaproxy.org/docs/api/).

## Authenticated and unauthenticated tests

**Unauthenticated tests** exercise what a visitor can reach without logging in. **Authenticated tests** operate with a configured account or session to reach additional functionality.

A successful login does not guarantee the session stays valid throughout a scan. Different roles may expose different behavior. See [ZAP authentication methods](https://www.zaproxy.org/docs/getting-further/authentication/authentication-methods/).

## Browser and API entry points

For a website, discovery may follow links, submit forms, or use a browser to reach JavaScript-driven interfaces. For an API, a definition or recorded requests can provide entry points that have no clickable page.

These are ways to expose functionality to the test, not distinct security guarantees. See [Burp Scanner's crawl and audit model](https://portswigger.net/burp/documentation/scanner).

## API and protocol testing

[Schemathesis](../../tools/schemathesis/) generates tests from OpenAPI or GraphQL definitions and checks responses. [RESTler](../../tools/restler/) uses an OpenAPI specification to construct REST request sequences, including relationships such as creating a resource before reading it. Both require a running target and appropriate authentication; parsing a specification alone is not a dynamic test.

For a custom network or device protocol, [boofuzz](../../tools/boofuzz/) lets you describe message fields and request order. It requires a suitable failure monitor and reset strategy. A generated input, an HTTP error, and a confirmed vulnerability are different results.

These workflows can find correctness and robustness problems as well as security-relevant failures. Compare the enabled checks and exercised operations rather than assuming every API tester supplies the same DAST rules.

## Related dynamic techniques

| Technique | What changes | Relationship to DAST |
| --- | --- | --- |
| Coverage-guided fuzzing | Generates inputs and uses execution feedback to guide further tests. | Can test native or JVM functions and libraries, beyond web scanning. See [libFuzzer](../../tools/libfuzzer/) and [Jazzer](../../tools/jazzer/). |
| Runtime memory checking | Observes memory operations during an execution. | Can detect memory defects; it is not an HTTP scanner. See [Memcheck](../../tools/valgrind-memcheck/) and [Dr. Memory](../../tools/dr-memory/). |
| Runtime race detection | Observes conflicting accesses and synchronization between threads. | Checks a different class of runtime defects from memory bounds or web requests. See [ThreadSanitizer](../../tools/thread-sanitizer/). |
| Temporal monitoring | Evaluates supplied signals against a temporal specification. | A monitor does not generate a falsification search by itself. See [RTAMT](../../tools/rtamt/). |
| Model and temporal falsification | Searches simulation inputs for a trace that violates a behavioral requirement. | Fits under dynamic analysis and can test controllers or hybrid systems without a security focus. See [the falsification guide](../model-falsification/). |
| Property-based testing | Generates inputs to test properties or assertions you define. | Can test functions or stateful behavior without targeting web security. See [Hypothesis](../../tools/hypothesis/). |
| Interactive application security testing (IAST) | Uses instrumentation inside the running application while tests exercise it. | Adds an internal view rather than relying only on external responses. |

For IAST terminology, see the [OWASP IAST verification guidance](https://github.com/OWASP/www-project-devsecops-verification-standard/blob/main/document/TEST-003-Interactive-Application-Security-Testing-IAST.md).

[Verification and generated tests](../verification-and-generated-tests/) compares fuzzing, property-based testing, temporal falsification, and formal verification.

## Describe the test precisely

"An authenticated active scan of the HTTP API" explains more than "we ran DAST." Record the application version, roles, reachable endpoints, test configuration, and environment with the results.
