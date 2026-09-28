# Analysis suite workflow review

Reviewed 2026-09-27. All 89 existing profiles were read for inputs, language scope, findings, setup, environment, and entry limitations. The workflows encode a conservative subset of those documentation-reviewed claims. This is not a new hands-on evaluation or a blanket re-verification of every source; existing tool verification dates are unchanged.

The connection scope for Schemathesis and RESTler, boofuzz transports, and Clang ThreadSanitizer/MemorySanitizer platform prerequisites were additionally checked against primary documentation. Workflow source URLs refer to each profile's evidence. Unsupported application protocols are not inferred from a TCP/UDP connection.

Host support arrays contain documented examples, not exhaustive exclusions. An unlisted host needs confirmation; explicit excluded target platforms identify documented incompatibilities. Instrumented workflows require source, rebuild/instrumentation access, and execution. Source-free binary alternatives are not inferred.

Additional primary checks: [boofuzz connections](https://boofuzz.readthedocs.io/en/stable/user/connections.html), [Schemathesis specifications](https://schemathesis.readthedocs.io/en/stable/), [RESTler](https://github.com/microsoft/restler-fuzzer), [ThreadSanitizer platforms](https://clang.llvm.org/docs/ThreadSanitizer.html), and [MemorySanitizer](https://clang.llvm.org/docs/MemorySanitizer.html).

Some workflows are intentionally narrower than a tool's catalog entry: AFL++ includes its instrumented C/C++ route; cargo-audit includes lockfiles; capa includes static executable analysis; PSY-TaLiRo includes model falsification. Specialized binary modes, trace formats, and other integrations remain in the notes. Multi-language products with aggregate capabilities are deferred pending per-language review.

93 workflows across 80 profiles; 9 profiles deferred. Missing profiles stay in the normal catalog and cannot generate builder claims.

| Tool | Review decision |
| --- | --- |
| [actionlint](../../src/content/docs/tools/actionlint.md) | 1 workflow(s): Configuration checks. |
| [address-sanitizer](../../src/content/docs/tools/address-sanitizer.md) | 1 workflow(s): Build and exercise instrumented code. |
| [afl-plus-plus](../../src/content/docs/tools/afl-plus-plus.md) | 1 workflow(s): Fuzz an instrumented source build. |
| [angr](../../src/content/docs/tools/angr.md) | 1 workflow(s): Inspect a supplied binary. |
| [atheris](../../src/content/docs/tools/atheris.md) | 1 workflow(s): Checks over callable code. |
| [bandit](../../src/content/docs/tools/bandit.md) | 1 workflow(s): Source analysis. |
| [binwalk](../../src/content/docs/tools/binwalk.md) | 1 workflow(s): Inspect a supplied binary. |
| [boofuzz](../../src/content/docs/tools/boofuzz.md) | 1 workflow(s): Exercise a custom protocol description. |
| [brakeman](../../src/content/docs/tools/brakeman.md) | 1 workflow(s): Source analysis. |
| [breach](../../src/content/docs/tools/breach.md) | 2 workflow(s): Simulation-based falsification; Monitor recorded traces in Breach. |
| [burp-suite-community](../../src/content/docs/tools/burp-suite-community.md) | 1 workflow(s): Manual HTTP security testing. |
| [burp-suite-professional](../../src/content/docs/tools/burp-suite-professional.md) | 1 workflow(s): HTTP security testing. |
| [capa](../../src/content/docs/tools/capa.md) | 1 workflow(s): Identify capabilities in executable files. |
| [cargo-audit](../../src/content/docs/tools/cargo-audit.md) | 1 workflow(s): Audit Cargo dependency metadata. |
| [cbmc](../../src/content/docs/tools/cbmc.md) | 1 workflow(s): Source analysis. |
| [checkov](../../src/content/docs/tools/checkov.md) | 1 workflow(s): Configuration checks. |
| [checkstyle](../../src/content/docs/tools/checkstyle.md) | 1 workflow(s): Source analysis. |
| [clang-static-analyzer](../../src/content/docs/tools/clang-static-analyzer.md) | 1 workflow(s): Source analysis. |
| [clang-tidy](../../src/content/docs/tools/clang-tidy.md) | 1 workflow(s): Source analysis. |
| [clippy](../../src/content/docs/tools/clippy.md) | 1 workflow(s): Source analysis. |
| [codeql](../../src/content/docs/tools/codeql.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [coverity-scan](../../src/content/docs/tools/coverity-scan.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [coverity](../../src/content/docs/tools/coverity.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [cpachecker](../../src/content/docs/tools/cpachecker.md) | 1 workflow(s): Source analysis. |
| [cppcheck](../../src/content/docs/tools/cppcheck.md) | 1 workflow(s): Source analysis. |
| [cve-bin-tool](../../src/content/docs/tools/cve-bin-tool.md) | 2 workflow(s): Dependency vulnerability matching; Detect known packages in binary artifacts. |
| [cwe-checker](../../src/content/docs/tools/cwe-checker.md) | 1 workflow(s): Inspect a supplied binary. |
| [dafny](../../src/content/docs/tools/dafny.md) | 1 workflow(s): Source analysis. |
| [dependency-check](../../src/content/docs/tools/dependency-check.md) | 3 workflow(s): Dependency artifact vulnerability matching; Java archive vulnerability matching; .NET assembly vulnerability matching. |
| [detect-secrets](../../src/content/docs/tools/detect-secrets.md) | 2 workflow(s): Find secret-like strings in files; Find secret-like strings in files. |
| [detekt](../../src/content/docs/tools/detekt.md) | 1 workflow(s): Source analysis. |
| [dotnet-analyzers](../../src/content/docs/tools/dotnet-analyzers.md) | 1 workflow(s): Source analysis. |
| [dr-memory](../../src/content/docs/tools/dr-memory.md) | 1 workflow(s): Exercise a native executable. |
| [esbmc](../../src/content/docs/tools/esbmc.md) | 1 workflow(s): Source analysis. |
| [eslint](../../src/content/docs/tools/eslint.md) | 1 workflow(s): Source analysis. |
| [fast-check](../../src/content/docs/tools/fast-check.md) | 1 workflow(s): Checks over callable code. |
| [floss](../../src/content/docs/tools/floss.md) | 1 workflow(s): Inspect a supplied binary. |
| [frama-c](../../src/content/docs/tools/frama-c.md) | 2 workflow(s): Eva runtime safety analysis; WP specification verification. |
| [ghidra](../../src/content/docs/tools/ghidra.md) | 1 workflow(s): Inspect a supplied binary. |
| [go-race-detector](../../src/content/docs/tools/go-race-detector.md) | 1 workflow(s): Build and exercise instrumented code. |
| [go-vet](../../src/content/docs/tools/go-vet.md) | 1 workflow(s): Source analysis. |
| [gosec](../../src/content/docs/tools/gosec.md) | 1 workflow(s): Source analysis. |
| [govulncheck](../../src/content/docs/tools/govulncheck.md) | 2 workflow(s): Go dependency reachability from source; Go binary vulnerability checks. |
| [grype](../../src/content/docs/tools/grype.md) | 2 workflow(s): Dependency vulnerability matching; Container package vulnerability matching. |
| [hadolint](../../src/content/docs/tools/hadolint.md) | 1 workflow(s): Configuration checks. |
| [hypothesis](../../src/content/docs/tools/hypothesis.md) | 1 workflow(s): Checks over callable code. |
| [infer](../../src/content/docs/tools/infer.md) | 1 workflow(s): Source analysis. |
| [jazzer](../../src/content/docs/tools/jazzer.md) | 1 workflow(s): Fuzz a compiled JVM target with a harness. |
| [jbmc](../../src/content/docs/tools/jbmc.md) | 1 workflow(s): Bounded verification of JVM classes. |
| [kani](../../src/content/docs/tools/kani.md) | 1 workflow(s): Source analysis. |
| [klee](../../src/content/docs/tools/klee.md) | 1 workflow(s): Symbolically explore prepared LLVM bitcode. |
| [libfuzzer](../../src/content/docs/tools/libfuzzer.md) | 1 workflow(s): Build and exercise instrumented code. |
| [memory-sanitizer](../../src/content/docs/tools/memory-sanitizer.md) | 1 workflow(s): Build and exercise instrumented code. |
| [miri](../../src/content/docs/tools/miri.md) | 1 workflow(s): Checks over callable code. |
| [mypy](../../src/content/docs/tools/mypy.md) | 1 workflow(s): Source analysis. |
| [osv-scanner](../../src/content/docs/tools/osv-scanner.md) | 2 workflow(s): Dependency vulnerability matching; Container package vulnerability matching. |
| [phpstan](../../src/content/docs/tools/phpstan.md) | 1 workflow(s): Source analysis. |
| [pmd](../../src/content/docs/tools/pmd.md) | 1 workflow(s): Source analysis. |
| [polyspace-code-prover](../../src/content/docs/tools/polyspace-code-prover.md) | 1 workflow(s): Source analysis. |
| [psalm](../../src/content/docs/tools/psalm.md) | 1 workflow(s): Source analysis. |
| [psy-taliro](../../src/content/docs/tools/psy-taliro.md) | 1 workflow(s): Simulation-based falsification. |
| [pvs-studio](../../src/content/docs/tools/pvs-studio.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [pylint](../../src/content/docs/tools/pylint.md) | 1 workflow(s): Source analysis. |
| [pyright](../../src/content/docs/tools/pyright.md) | 1 workflow(s): Source analysis. |
| [restler](../../src/content/docs/tools/restler.md) | 1 workflow(s): Stateful tests from OpenAPI. |
| [rtamt](../../src/content/docs/tools/rtamt.md) | 1 workflow(s): Monitor temporal requirements over traces. |
| [rubocop](../../src/content/docs/tools/rubocop.md) | 1 workflow(s): Source analysis. |
| [ruff](../../src/content/docs/tools/ruff.md) | 1 workflow(s): Source analysis. |
| [s-taliro](../../src/content/docs/tools/s-taliro.md) | Deferred: the existing entry explicitly says current installation and platform compatibility are unverified. |
| [schemathesis](../../src/content/docs/tools/schemathesis.md) | 2 workflow(s): Generated tests from OpenAPI; Generated tests from a GraphQL schema. |
| [semgrep-ce](../../src/content/docs/tools/semgrep-ce.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [semgrep-code](../../src/content/docs/tools/semgrep-code.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [shellcheck](../../src/content/docs/tools/shellcheck.md) | 1 workflow(s): Source analysis. |
| [sonarqube-community](../../src/content/docs/tools/sonarqube-community.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [sonarqube](../../src/content/docs/tools/sonarqube.md) | Deferred: aggregate findings span language-specific analyzers or rule sets. A per-language capability review is needed before automated matching. |
| [spotbugs](../../src/content/docs/tools/spotbugs.md) | 2 workflow(s): Core JVM bug-pattern checks; JVM checks with Find Security Bugs. |
| [sqlfluff](../../src/content/docs/tools/sqlfluff.md) | 1 workflow(s): Source analysis. |
| [staticcheck](../../src/content/docs/tools/staticcheck.md) | 1 workflow(s): Source analysis. |
| [stylelint](../../src/content/docs/tools/stylelint.md) | 1 workflow(s): Source analysis. |
| [swiftlint](../../src/content/docs/tools/swiftlint.md) | 1 workflow(s): Source analysis. |
| [thread-sanitizer](../../src/content/docs/tools/thread-sanitizer.md) | 1 workflow(s): Build and exercise instrumented code. |
| [trivy](../../src/content/docs/tools/trivy.md) | 3 workflow(s): Dependency vulnerability matching; Container package vulnerability matching; Infrastructure configuration checks. |
| [undefined-behavior-sanitizer](../../src/content/docs/tools/undefined-behavior-sanitizer.md) | 1 workflow(s): Build and exercise instrumented code. |
| [valgrind-helgrind](../../src/content/docs/tools/valgrind-helgrind.md) | 1 workflow(s): Exercise a native executable. |
| [valgrind-memcheck](../../src/content/docs/tools/valgrind-memcheck.md) | 1 workflow(s): Exercise a native executable. |
| [verifai](../../src/content/docs/tools/verifai.md) | 1 workflow(s): Simulation-based falsification. |
| [wartremover](../../src/content/docs/tools/wartremover.md) | 1 workflow(s): Source analysis. |
| [yara-x](../../src/content/docs/tools/yara-x.md) | 1 workflow(s): Inspect a supplied binary. |
| [zap](../../src/content/docs/tools/zap.md) | 1 workflow(s): HTTP security testing. |
