# Model checking, allocation profiling, and Java mutation testing

Documentation review performed November 12, 2026. The additions are:

- [TLC](../../src/content/docs/tools/tlc.md), with an executed
  [finite queue model](../../examples/tlc/README.md) and
  [reader guide](../../src/content/docs/guides/model-checking.md).
- [heaptrack](../../src/content/docs/tools/heaptrack.md), a documentation-reviewed
  Linux allocation-profiling workflow with an explicitly illustrative example.
- [PIT](../../src/content/docs/tools/pit.md), a documentation-reviewed Java/Maven
  mutation-testing profile with an explicitly illustrative boundary experiment.

## Sources and admission decisions

TLC's official tools overview and Toolbox model, result, and option references
support the distinctions between invariants, temporal properties, state-space
search, and random simulation. The stable release page supplies the archive
and its SHA-1 identity; the repository states the moving prerelease policy and
MIT licensing. The runnable example pins v1.7.4, reports TLC 2.19, and retains a
SHA-256 as well as the release checksum. This is a finite design-model check,
not proof of application code or every parameter assignment.

KDE's application page and repository README document the Linux recorder,
allocation stacks, temporary allocations, and later analysis. The tracking and
printing source headers and bundled-license declarations qualify the overall
application license. No heaptrack binary was installed or executed on this
Windows host. Platform arrays list Linux examples without inferring exclusions
from absent platform names. The workflow requires a native executable and
permission to run a test workload; attachment is outside the reviewed route.

PIT's Maven quickstart, basic concepts, FAQ, JUnit 5 integration, release notes,
and Apache-2.0 license support the profile. The FAQ contains historical runtime
and framework notes, so the profile makes version compatibility explicit rather
than asserting one minimum Java version for every current release. It limits
claims to Java and separates commercial extensions. PIT was not installed or
executed. It remains catalog-only because the current builder cannot establish
Maven/test-framework setup or a passing baseline test suite from its broad
access answers.

## Retained execution

[TLC run record](tlc-run/run.json), raw stdout/stderr, runtime identity, and copied
inputs are retained in `tlc-run/`. Generated TLC state files and the separately
downloaded archive are excluded from Git. The runner checked archive identity
before invoking Java. The model violation exited 12 and the corrected finite
check exited 0; the orchestration gate passed.

The shell's generic Oracle `java` launcher did not return a version promptly
and was stopped. Using the installed JDK executable directly worked. The
documented `--java` option keeps this launcher issue separate from TLC behavior.

## Validation

Focused tests verify that the actual source profiles parse, that TLC only
matches a TLA+ model rather than ordinary source code, that heaptrack requires
a Linux native-program workflow and test-instance access, and that PIT remains
catalog-only. Evidence checks compare the retained model/configuration and
runner hashes with the source fixtures and require the recorded faulty and
corrected signals. Site-wide build and browser validation are performed by the
coordinator after integrating this work.
