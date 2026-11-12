# Existing profile workflow review

Reviewed November 12, 2026. This review covers the twelve existing tool profiles
that had no system-builder workflow at the start of this pass. New tool entries
such as PIT are outside this audit. Existing execution records and older audit
files were not changed.

## Admission rules

Match only the input, language, finding, host, and access scope supported by the
reviewed route. Tool installation, runtime compatibility, project configuration,
and commercial entitlements remain explicit preparation steps; a candidate is
not a completed readiness check. Do not use a broad language list to imply
that every analyzer route has been reviewed. Do not substitute generic inputs
or access answers for a different artifact or operating-system permission.

## Decisions

| Profile | Decision | Reviewed scope or unresolved condition |
| --- | --- | --- |
| coverage.py | Add workflow | One Python process, source and callable code, permission to run the workload. Windows scope follows the retained fixture. A specific test runner is not required by coverage.py. |
| PVS-Studio | Add workflow | JavaScript/TypeScript `pvs-js` V7001 equivalent-operands diagnostic only. Source is the target input; install the required analyzer/runtime and activate a suitable license. |
| SonarQube Community Build | Add workflow | Python source through SonarScanner CLI, with configured server/project access. Logic and coding-rule findings only; other language artifacts and commercial analysis depth are not inherited. |
| SonarQube Server | Add workflow | The corresponding Python route uses Server's own documentation and paid-license scope. |
| Coverity Scan | Keep catalog-only | Registration, open-source eligibility, and captured-project submission permission are not represented in the builder. |
| Coverity commercial | Keep catalog-only | Public capture documentation was reviewed, but no complete release-specific host/compiler route was established. A source/rebuild answer cannot validate compiler capture compatibility. |
| Gitleaks | Keep catalog-only | The profile scans Git patches, but history and selected refs are not modeled. Directory scanning is a different route. |
| MobSF | Keep catalog-only | The profile requires an Android APK. Native executable, JVM bytecode, Other, or an Android target does not establish that artifact. |
| py-spy | Keep catalog-only | Permission to read process memory is not represented by running a workload or general instrumentation permission. |
| Semgrep Code | Keep catalog-only | The platform route needs repository/account setup and selected Pro analysis configuration, which broad source answers do not establish. |
| S-TaLiRo | Keep catalog-only | Historical papers support the concept, but the project URL still redirects to Google sign-in and a current installable distribution was not verified. |
| StrykerJS | Keep catalog-only | The reviewed route requires a compatible Jest integration and passing baseline suite. Source and harness access do not establish those conditions. |

## Primary-source evidence

- coverage.py: [7.10.6 command reference](https://coverage.readthedocs.io/en/7.10.6/cmd.html)
  permits a program or module entry point; the [branch reference](https://coverage.readthedocs.io/en/7.10.6/branch.html)
  describes missing branch destinations. These support the one-process route;
  no new tool execution was performed.
- PVS-Studio: [JS/TS CLI](https://pvs-studio.com/en/docs/manual/7195/),
  [runtime requirements](https://pvs-studio.com/en/docs/manual/0018/), and
  [V7001](https://pvs-studio.com/en/docs/warnings/v7001/) support the selected
  input, host families, license setup, rule selection, and finding interpretation.
  Parse/timeout/license failures remain distinct from completed findings.
- Sonar: each edition's own [Community Python](https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/languages/python)
  and [Server Python](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/languages/python)
  pages establish source analysis and Python-version configuration. The
  [Community CLI](https://docs.sonarsource.com/sonarqube-community-build/analyzing-source-code/scanners/sonarscanner)
  and [Server CLI](https://docs.sonarsource.com/sonarqube-server/analyzing-source-code/scanners/sonarscanner)
  references establish scanner hosts, project configuration, and authenticated
  server access. No server was provisioned or scan submitted.
- Coverity: [Scan FAQ](https://scan.coverity.com/faq) establishes registration and
  service eligibility. Commercial [compiler configuration](https://docs.blackduck.com/r/coverity/2026.9/coverity-documentation/language-specific-configurations.html?contentId=oNdbP4nNLQpIGfs_jGJD2w)
  and [capture models](https://docs.blackduck.com/r/coverity/2026.9/coverity-documentation/capture-models-you-can-use.html?contentId=Gkp4bda4SB19vYlv~sWnqQ)
  explain why broad language/source tags cannot establish a configured capture.
- Gitleaks: the [8.30.1 README](https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md)
  distinguishes Git-patch scans from directory scans.
- MobSF: the [4.6.4 README](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/README.md)
  names APK and other package formats separately. This entry remains APK-only.
- py-spy: the [0.4.3 README](https://github.com/benfred/py-spy/blob/v0.4.3/README.md)
  explains process-memory permissions and the difference between child-process
  launch, attachment, and restricted containers.
- Semgrep Code: [prerequisites](https://docs.semgrep.dev/prerequisites) and
  [platform quickstart](https://docs.semgrep.dev/getting-started/quickstart)
  establish the account/repository route. The existing local CE rule is separate.
- S-TaLiRo: the [2014 tool paper](https://www.bhoxha.com/papers/HSCC2014ToolDemo.pdf)
  documents historical MATLAB/Simulink falsification. The
  [project URL](https://sites.google.com/a/asu.edu/s-taliro/s-taliro) redirected
  to Google authentication on this review date. This is an availability limit,
  not a claim that the historical tool never worked.
- StrykerJS: the [Jest integration reference](https://stryker-mutator.io/docs/stryker-js/jest-runner/)
  documents runner and dependency configuration. Existing local fixture evidence
  remains evidence for that fixture, not every JavaScript project.

## Validation and limits

`tests/workflow-coverage.test.mjs` parses the authored profiles and exercises
source/callable-input boundaries, workload access, unrelated languages,
edition-specific cost filtering, and the eight exclusions against generous
but insufficient component answers. It checks authored content through the real
matching engine, without changing that engine or its vocabulary.

No new analyzer run was performed in this review. coverage.py and StrykerJS
retain their prior fixture evidence; the other reviewed routes are
documentation-reviewed. The coordinator performs site-wide validation after
integration. `review.json` records the exact reviewed file hashes.
