# Specialist expansion evidence

Reviewed November 6, 2026, for COV-03, COV-04, COV-05, and ADJ-03.
This is a documentation review. Gitleaks, MobSF, Verilator, and py-spy were not
installed or executed, and no APK or real credential was uploaded or scanned.
Examples label the expected behavior separately from observed execution.

## Gitleaks history scanning

Selected Gitleaks 8.30.1, the release returned by the official latest-release
link during this review. The current branch adds a maintenance notice absent
from that older release README: future releases are security patches only.
The profile preserves that lifecycle qualification.

| Source | Evidence used |
| --- | --- |
| [8.30.1 release](https://github.com/gitleaks/gitleaks/releases/tag/v8.30.1) | Selected version and official binary distribution. |
| [Versioned README](https://github.com/gitleaks/gitleaks/blob/v8.30.1/README.md) | Custom rules, reports, redaction flag, configurable finding exit code, and baseline behavior. |
| [Git implementation](https://github.com/gitleaks/gitleaks/blob/v8.30.1/sources/git.go) | Nonempty log options are passed to Git's patch-producing log command; the example explicitly chooses HEAD. |
| [Current README](https://github.com/gitleaks/gitleaks/blob/master/README.md) | Security-patches-only maintenance notice and direction of feature development. |
| [CLI license](https://github.com/gitleaks/gitleaks/blob/v8.30.1/LICENSE) | MIT, scoped to the CLI. |
| [GitHub exposure guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) | Rotation/revocation and history cleanup are separate, and rewrites require coordination. |
| [detect-secrets 1.5.0 design](https://github.com/Yelp/detect-secrets/blob/v1.5.0/README.md) | Baseline/prevention workflow distinguishes current material from history investigation. |

The new example creates a synthetic repository with two local commits and one
custom marker rule. It makes no claim about remote refs, default rule coverage,
credential validity, or full remediation. Betterleaks is not admitted. Automatic
matching remains absent because available source does not establish Git history.

## MobSF static APK inspection

Selected MobSF 4.6.4, released October 31, 2026. Its release workflow constructs
the image tag `opensecurity/mobile-security-framework-mobsf:v4.6.4` for Linux
AMD64 and ARM64. A direct read of the public Docker Hub tag API confirmed an
active tag and both Linux architectures on the review date. Its manifest digest
was `sha256:cf1465a3cc0c95488b9a6cdb1c7799d4b576d391ee28232c221f6a196bf2f74c`.
The profile requires recording the digest returned by a pull; the image was not
pulled or started in this review.

| Source | Evidence used |
| --- | --- |
| [4.6.4 release](https://github.com/MobSF/Mobile-Security-Framework-MobSF/releases/tag/v4.6.4) | Selected release and static-analysis changes. |
| [Versioned README](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/README.md) | APK static analysis, separate dynamic modes, initial login, and GPL-3.0-only declaration. |
| [Release image workflow](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/.github/workflows/docker-release.yml) | Version tag construction and container architecture targets. |
| [Docker Hub tag metadata](https://hub.docker.com/v2/repositories/opensecurity/mobile-security-framework-mobsf/tags/v4.6.4) | Active tag, manifest digest, and Linux AMD64/ARM64 images. |
| [Docker instructions](https://mobsf.github.io/docs/#/running_mobsf_docker) | Local static service route; dynamic setup is separate. |
| [Versioned settings](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/mobsf/MobSF/settings.py) | Domain-malware setting, other static settings, class exclusions, and stored uploads/reports. |
| [Android report template](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/mobsf/templates/pdf/android_report.html) | Conditional certificate, permissions, manifest, code, and severity sections. This is template evidence, not a captured APK report. |
| [Docker publishing rules](https://docs.docker.com/engine/network/port-publishing/) | Explicit loopback publication, the pre-28.0.0 caveat, and routing qualifications. |
| [License](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/LICENSE) | GPL version 3 text; the README supplies the only-version qualification. |

The procedure is APK-only with a local authenticated UI, explicit loopback port,
default bridge/NAT assumption, and domain enrichment disabled. It makes no
offline or product-wide network guarantee. APK support remains catalog-only;
Native executable and Other do not stand in for APK artifact modeling.

## Verilator lint

Selected tag v5.054 and its matching manual sources. The current revision history
lists 5.054 on November 1, 2026. GitHub's releases collection is empty, so the
version comes from the project's tags and manual rather than a GitHub release.

| Source | Evidence used |
| --- | --- |
| [Versioned README](https://github.com/verilator/verilator/blob/v5.054/README.rst) | HDL input, distinct generated simulation models, and LGPL-3.0-only OR Artistic-2.0. |
| [Versioned installation guide](https://github.com/verilator/verilator/blob/v5.054/docs/guide/install.rst) | Linux/Ubuntu installation and release-tag selection. |
| [Versioned command reference](https://github.com/verilator/verilator/blob/v5.054/docs/guide/exe_verilator.rst) | Lint-only mode, language standard, top module, and warning selection. |
| [Versioned warnings](https://github.com/verilator/verilator/blob/v5.054/docs/guide/warnings.rst) | Diagnostic fields, WIDTHTRUNC, explicit narrowing, and unsupported-construct errors. |
| [Revision history](https://verilator.org/guide/latest/changes.html) | Release date and version corroboration. |

The faulty/corrected pair differs only in an explicit four-bit selection. The
profile does not present expected diagnostics as observed output. Its builder
workflow requires HDL source and qualifies the host and full design context;
it does not inherit simulation, coverage, generated-output language, or proof
capabilities.

## py-spy sampling

Selected py-spy 0.4.3 with a Linux x86_64 / CPython 3.12 example. This is a scoped
choice within the documented support, not an executed compatibility result.

| Source | Evidence used |
| --- | --- |
| [0.4.3 release](https://github.com/benfred/py-spy/releases/tag/v0.4.3) | Version identity and distribution. |
| [Versioned README](https://github.com/benfred/py-spy/blob/v0.4.3/README.md) | Interpreter support, recording/live/snapshot distinction, child-process permission case, and sampling/filter caveats. |
| [Versioned CLI configuration](https://github.com/benfred/py-spy/blob/v0.4.3/src/config.rs) | Ten-second recording, rate 100, flame-graph output, and launch arguments. |
| [License](https://github.com/benfred/py-spy/blob/v0.4.3/LICENSE) | MIT. |

The fixture has bounded local CPU work and no external service. The procedure
does not weaken host security settings or claim zero overhead. Attach, native,
container, subprocess, and production use remain outside the initial scope.
Automatic matching is absent because process-inspection permission is not in
the saved-system model.

## Validation scope

Metadata validation and discovery/matching checks use the production schemas
and catalog functions. The Python fixture completed a 0.05-second smoke run on
Windows with CPython 3.13.15 and reported checksum `959757`. That is a fixture
smoke check, not a py-spy recording or verification of the documented Linux
environment. Full rendered-site and independent acceptance checks remain with
the coordinator.
