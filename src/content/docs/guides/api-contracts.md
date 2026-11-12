---
title: Check API descriptions and consumer contracts
description: Reproduce a document-lint failure and a consumer-provider contract mismatch, then interpret their corrections separately.
executionEvidence:
  status: recorded
  scope: November 12, 2026 run of Spectral CLI 6.17.1 and Pact JS 17.1.4 with Pact Core 20.2.0 on Windows using Node.js 24.22.1 x64. One custom lint rule and one local HTTP interaction were checked, including faulty and corrected variants. No external target, broker, or result publication was used.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/api-supply-tools/evidence/api-contracts/run.json
---

An API description, a consumer expectation, and a running provider can disagree.
This guide checks two of those boundaries with an isolated parcel API example.

| Question | Check | Deliberate fault |
| --- | --- | --- |
| Does the document follow a selected convention? | [Spectral](../../tools/spectral/) | The GET operation has no `operationId`. |
| Does the provider satisfy the consumer's interaction? | [Pact JS](../../tools/pact/) | The provider returns numeric `status: 7` where the consumer needs a string. |

## Prepare the example

Use the repository's
[`examples/api-contracts`](https://github.com/zwadhams/ToolWiki/tree/main/examples/api-contracts)
directory. It pins Spectral CLI 6.17.1 and Pact JS 17.1.4 with a package lock.
Use Node.js 22 or newer on a platform supported by Pact Core's native packages.
The retained run used **Node.js 24.22.1 x64 on Windows ARM64 through emulation**;
the locked Pact Core package does not supply a Windows ARM64 native binary.

From the example directory, install only its dependencies:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

The fixture uses prebuilt native packages, so it needs no installation scripts.
Its runner disables Pact install tracking for subprocesses. It creates a Pact
mock provider and a small test provider on loopback with available ports, then
closes them. It does not require a broker, credentials, or an external endpoint.

## Read the document-lint result

The `.spectral.yaml` ruleset contains one rule, `operation-id-required`, that
checks GET operations. `openapi.bad.json` omits the field;
`openapi.good.json` adds `operationId: "getParcel"`.

The retained run produced:

| Case | Exit code | Observation |
| --- | --- | --- |
| Faulty document | 1 | One `operation-id-required` diagnostic at `paths./parcels/1.get`. |
| Corrected document | 0 | An empty diagnostic array. |

The runner writes `reports/spectral-bad.json` and `reports/spectral-good.json`
using Spectral's output-file option. Console output can contain an additional
informational message, so do not parse the entire console stream as JSON.

This ruleset is deliberately small. A passing result does not establish full
OpenAPI validity, successful client generation, or agreement with a real server.
When adapting the example, preserve the project's existing ruleset and failure
threshold unless a specific change is intended.

## Read the contract result

`consumer.mjs` describes a GET request for parcel 1 and calls `parcelStatus()`
from `client.mjs` against Pact's mock provider. The returned object must have an
integer ID and a string status, and the consumer asserts its uppercase result.
A successful consumer run generates `reports/pacts/ParcelClient-ParcelAPI.json`.

`provider-check.mjs` reads that generated file and verifies a local provider.
The faulty variant returns a number for `status`; the correction returns the
string `queued`. The static fixture already supplies parcel 1, so its provider
state handler performs no setup. Replace that handler with appropriate state
preparation when adapting the test to a real provider.

The retained run produced:

| Case | Exit code | Observation |
| --- | --- | --- |
| Consumer test | 0 | The actual client agreed with the mock interaction and generated a pact file. |
| Faulty provider | 1 | A body-type mismatch at `$.status`: integer `7` did not match a string. |
| Corrected provider | 0 | The provider satisfied the one supplied interaction. |

The verifier checks that exact mismatch, not just any nonzero exit. A missing
native binary, provider startup error, or malformed contract must not be counted
as evidence that the intended defect was detected.

## Keep the evidence and choose the next check

The overall `npm test` exits zero only when all five expected outcomes occur.
It writes commands, tool/runtime versions, source hashes, output, and scope to
`reports/`. The [retained run](https://github.com/zwadhams/ToolWiki/tree/main/audits/api-supply-tools/evidence/api-contracts)
records the executed fixture, not a benchmark or cross-platform certification.

A consumer pass alone says nothing about the real provider. A provider pass
only covers the supplied interactions and matching rules. Keep consumer,
contract, and provider versions together when investigating a regression.

Use [Schemathesis and the disposable API guide](../api-testing/) to generate
additional requests from an API definition. Use [finding review](../reviewing-findings/)
to distinguish an expected policy failure from a broken check. An API document
and a generated Pact contract have different roles; one does not replace the other.
