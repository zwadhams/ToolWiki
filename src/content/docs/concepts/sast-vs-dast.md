---
title: SAST vs. DAST
description: Understand what static and dynamic application security testing can tell you.
---

**SAST looks for security problems in code. DAST tests the exposed behavior of a running application.** They answer different questions and can be useful together.

SAST means **static application security testing**. DAST means **dynamic application security testing**. This wiki uses DAST primarily for web and API security testing, a common use of the term.

## A practical comparison

| | SAST | DAST |
| --- | --- | --- |
| Input | Source or a supported compiled representation. | A running application and reachable interfaces. |
| View | Code structure and modeled behavior. | Requests, responses, and observable behavior. |
| Language support | Usually specific to languages and frameworks. | Often independent of the server's implementation language. |
| Example question | Could untrusted data reach an unsafe operation? | Does this reachable endpoint respond unsafely to a test input? |
| Example tools | [CodeQL](../../tools/codeql/), [Bandit](../../tools/bandit/) | [ZAP](../../tools/zap/), [Burp Suite Professional](../../tools/burp-suite-professional/) |

## How to interpret findings

Treat a finding as evidence to investigate. Static analysis can flag a path that is not feasible in your application. Dynamic testing can miss a vulnerability when it never reaches the relevant endpoint or state.

An empty report means that the configured test did not report a problem. It does not prove that the application is secure.

## Choosing a useful combination

For a web application, consider code checks during development and runtime checks against a representative test deployment. Keep authentication, authorization, and business workflows in the test design; automated scanning does not replace them.

For a native library, static bug finding plus a fuzzer and a memory checker may be more useful than a web scanner. The target matters more than the acronym.

## Sources

- [OWASP source code analysis tools](https://owasp.org/www-community/Source_Code_Analysis_Tools)
- [OWASP DAST overview](https://devguide.owasp.org/en/06-verification/02-tools/01-dast/)
- [ZAP scanning and authentication guide](https://www.zaproxy.org/docs/api/)

Continue with [ways to do DAST](../dast-approaches/).
