# Retained execution evidence metadata

Reviewed November 12, 2026. Thirteen existing tool profiles had retained
execution evidence but no structured `executionEvidence` field. The profiles
now identify the tested version, host, narrow input or rule scope, observed
outcome, and untested boundaries. No analyzer was rerun for this reconciliation.

The [review ledger](review.json) inventories the 98 profiles at commit
`f5c052097b45e969ea4db1cc2cefa53151844c31`, before this change's new profiles.
It retains SHA-256 digests for 42 evidence files. Seventeen match their repository
blobs byte-for-byte; 25 already have CRLF checkout line endings while their
repository blobs use LF. Both exact representations are recorded and accepted
by the provenance test. No substantive difference or evidence rewrite occurred.
The remaining 85 profiles
received no execution label from this review: no qualifying retained run was
identified in the inspected evidence, which is not a claim that those tools
have never been run. Documentation review, illustrative commands, dependency
installation, and execution of a different product were not treated as runs
of the named tool.

## Recorded scope

| Profile | Retained evidence and limit |
| --- | --- |
| AddressSanitizer | [Native Windows x64 CI](../agent-knowledge/ci/42653327079/run.json) detected the C heap overflow and passed its correction using MSVC. The label explicitly does not claim a Clang run. |
| boofuzz | [Faulty](../remaining-work/executions/boofuzz/faulty.json) and [fixed](../remaining-work/executions/boofuzz/fixed.json) runs checked two selected response values, without a crash or memory monitor. |
| coverage.py | [Three suites](../../examples/python-coverage/evidence/run.json) distinguished partial branch coverage, full reach without assertions, and full reach with assertions. Coverage gates are separate from test exit codes. |
| k6 | [Local workload](../remaining-work/executions/k6/record.json) distinguished completion, threshold failure, and setup failure. It was not a production benchmark. |
| mypy | [Faulty](../agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json) and [corrected](../agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json) static checks exercised one annotated fixture. |
| PSScriptAnalyzer | [Selected-rule run](../remaining-work/expansion-runs/powershell.json) checked only `PSAvoidUsingWriteHost` without executing the scripts. |
| Pylint | [Fresh-reader report](../reader-workflows/retests/python/report.md), [script](../reader-workflows/retests/python/pylint-inline.ps1), and [transcript](../reader-workflows/retests/python/pylint-inline.txt) record the isolated `unused-import` check. The transcript retains exit codes but omits native diagnostic output, so the scope explicitly attributes the finding to the reader report. |
| RTAMT | [Saved run](../remaining-work/executions/rtamt.json) records the pure-Python offline monitor's -5.0 and 1.0 robustness values. The historical earlier run without provenance was not used. |
| Ruff | [Faulty](../agent-knowledge/readers/python/reader-20261109-091356/fixture-bad/run.json) and [corrected](../agent-knowledge/readers/python/reader-20261109-091356/fixture-good/run.json) checks enabled only F401 and did not apply fixes. |
| Schemathesis | [Bounded local OpenAPI run](../remaining-work/executions/http-api/record.json) used positive coverage generation and the server-error check. It supplies no RESTler execution evidence. |
| Semgrep CE | [OSS-engine run](../remaining-work/expansion-runs/semgrep.json) checked one local rule and retained an uncovered case. The Windows run does not validate the Linux builder route or Semgrep Code. |
| StrykerJS | [Mutation runs](../../examples/test-quality/evidence/run.json) retained one survivor for weak assertions and none after adding a boundary assertion. Both processes exited zero because of the example's threshold. |
| TypeScript | [Compile-time checks](../remaining-work/expansion-runs/typescript.json) reported TS2345 for the faulty project and passed the correction without executing target code. |

## Files and verification

[Metadata](metadata.json) records the reviewed wording and exact source paths.
[Deferred metadata](deferred-metadata.json) contains the coverage.py and
StrykerJS additions transferred to the concurrent workflow-profile review;
execution evidence and builder eligibility remain separate decisions.

`tests/evidence-metadata.test.mjs` checks profile and agent-export preservation,
source membership and retained file hashes, omission of unsupported evidence,
and outcome distinctions that zero process exit codes alone cannot establish.
The existing knowledge-export test now expects Ruff's recorded status while
retaining Coverity Scan's `not-recorded` status. Historical audit files were
read but not rewritten.

Final verification: `node --test tests/evidence-metadata.test.mjs
tests/knowledge.test.mjs` passed all 11 tests. The Markdown validator and scoped
Git whitespace check passed. The ledger records the final evidence-metadata
digests, including the separately completed coverage.py and StrykerJS edits.
