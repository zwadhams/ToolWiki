# Source and matching expansion review

Reviewed November 6, 2026. This record covers COV-01, COV-02, and the two
rule-scoped additions for MAT-03. It does not replace older audit records or
re-verify the existing profiles' aggregate claims.

## TypeScript compiler

- Selected release: TypeScript 6.0.3; local verification used Node.js 24.22.1 on Windows.
- Scope: `tsc --project` with `strict`, `noEmit`, explicit module settings, and one
  included source file. The builder workflow is TypeScript-only. JavaScript
  `allowJs`/`checkJs` is documented separately and not automatically matched.
- Evidence: [6.0.3 package/runtime/license](https://raw.githubusercontent.com/microsoft/TypeScript/v6.0.3/package.json),
  [project invocation](https://www.typescriptlang.org/docs/handbook/compiler-options),
  [noEmit](https://www.typescriptlang.org/tsconfig/noEmit.html),
  [checkJs](https://www.typescriptlang.org/tsconfig/checkJs.html), and
  [compiler/linter distinction](https://typescript-eslint.io/troubleshooting/faqs/eslint/).
- Execution: faulty input returned `TS2345` and status 2; correction returned
  status 0 without diagnostics. No target execution or emitted files.
  [Run record](expansion-runs/typescript.json), [diagnostic](expansion-runs/typescript-bad.txt).

## PSScriptAnalyzer

- Selected release: 1.25.0; local verification used PowerShell 7.6.9 on Windows.
  The release's [loader](https://raw.githubusercontent.com/PowerShell/PSScriptAnalyzer/1.25.0/Engine/PSScriptAnalyzer.psm1)
  requires PowerShell Core 7.4.6 or later. Host runtime and target script runtime
  are separate qualifications.
- Scope: `Invoke-ScriptAnalyzer -Path` selecting `PSAvoidUsingWriteHost`, without
  `-Fix`. The builder exposes Coding conventions for this named rule only.
- Evidence: [module overview](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/overview?view=ps-modules),
  [cmdlet contract](https://learn.microsoft.com/en-us/powershell/module/psscriptanalyzer/invoke-scriptanalyzer?view=ps-modules),
  [rule meaning](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules/avoidusingwritehost?view=ps-modules),
  [release](https://github.com/PowerShell/PSScriptAnalyzer/releases/tag/1.25.0),
  and [MIT license](https://raw.githubusercontent.com/PowerShell/PSScriptAnalyzer/1.25.0/LICENSE).
- Execution: one warning at line 2 for the faulty fixture, none for the correction.
  The scripts were not run. The module was downloaded from PowerShell Gallery
  into the ignored project test directory, not installed globally.
  [Run record and package/input hashes](expansion-runs/powershell.json).

## CodeQL Python SQL injection

- Selected CLI: [2.27.4 bundle](https://github.com/github/codeql-action/releases/tag/codeql-bundle-v2.27.4).
  Selected pack: `codeql/python-queries@1.9.0`. Selected query:
  `Security/CWE-089/SqlInjection.ql`, ID `py/sql-injection`.
- Immutable query/library revision: `1be292a1e54696ca543b4ad0f9b4537b9687caa7`,
  resolved from the `codeql-cli/v2.27.4` tag. Inspected the
  [pack manifest](https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/qlpack.yml),
  [query](https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/Security/CWE-089/SqlInjection.ql),
  [Django example](https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/python/ql/src/Security/CWE-089/examples/sql_injection.py),
  and [MIT library license](https://raw.githubusercontent.com/github/codeql/1be292a1e54696ca543b4ad0f9b4537b9687caa7/LICENSE).
- Scope: Python 3.12 source; Ubuntu 22.04 x86-64 with Python available for
  extraction; modeled Django request data and SQL cursor calls. Framework/version
  model coverage remains a project-level check. The upstream legacy-routing
  example illustrates the query and is not presented as a current Django setup.
- Evidence: [host/extractor requirements](https://codeql.github.com/docs/codeql-overview/system-requirements/),
  [database creation](https://docs.github.com/en/code-security/tutorials/customize-code-scanning/prepare-code-for-analysis),
  [exact query selection](https://docs.github.com/en/code-security/reference/code-scanning/codeql/codeql-cli-manual/database-analyze),
  and [query help](https://codeql.github.com/codeql-query-help/python/py-sql-injection/).
- Eligibility: [CLI availability](https://docs.github.com/en/code-security/concepts/code-scanning/codeql/codeql-cli)
  and [CLI terms](https://github.com/github/codeql-cli-binaries/blob/main/LICENSE.md)
  remain separate from the query-library license. Cost and proprietary-CLI
  metadata are preserved.
- No CLI download, extraction, or query execution was performed. The builder
  addition is documentation-reviewed metadata, limited to Injection risks.

## Semgrep CE local Python rule

- Engine: [Semgrep 1.184.0](https://github.com/semgrep/semgrep/releases/tag/v1.184.0).
  The reviewed matching host is Linux with Python 3.12.
- Rule: `toolwiki.python.subprocess-shell-true` in
  [rule.yml](../../examples/semgrep-ce-check/rule.yml). SHA-256:
  `19c9ac0d0d70e3b751930e178254e672e8c003d35a64aa394d264fa742c3338f`.
  The original rule and accompanying fixtures use the adjacent
  [MIT license](../../examples/semgrep-ce-check/LICENSE), independent of Registry
  rules and the engine's LGPL-2.1 license.
- Scope: literal `shell=True` call patterns for `subprocess.run` and `Popen`,
  with constant propagation disabled. Reports Unsafe API use for investigation;
  no taint, exploitability, cross-function, cross-file, or Pro claim is admitted.
- Evidence: [CE-specific language limits](https://docs.semgrep.dev/semgrep-ce-languages),
  [rule structure/options](https://docs.semgrep.dev/writing-rules/rule-syntax),
  [call patterns](https://docs.semgrep.dev/writing-rules/pattern-syntax),
  [host prerequisites](https://docs.semgrep.dev/prerequisites),
  [CLI controls](https://docs.semgrep.dev/cli-reference), and
  [Python subprocess semantics](https://docs.python.org/3.12/library/subprocess.html#security-considerations).
- Runtime status and fixture hashes are retained in the
  [fixture evidence record](../../examples/semgrep-ce-check/evidence.md).
  Semgrep's OSS engine passed the faulty/corrected/uncovered fixture checks on
  Windows with Python 3.13.15 and normal permissions. Restricted-shell startup
  failures are retained; they were not interpreted as completed scans. The
  documented Linux workflow was not executed.

## Matching and authoring checks

`tests/expansion-workflows.test.mjs` reads the production profile schema and
checks catalog discovery, candidate/details/blocked/no-match outcomes, narrowly
scoped findings, JavaScript qualification, and cost/license/edition separation.
It also runs the TypeScript faulty/corrected pair with the repository's pinned
compiler and verifies no files are emitted. Together with the authoring tests,
19 tests passed at this lane's integration point.

CodeQL and Semgrep CE now have a first reviewed builder workflow. Other
languages and query/rule sets remain omitted; the builder's live scope list
derives from the current metadata. Historical deferred counts are preserved as
records of their review dates. Other deferred products were not changed here.
