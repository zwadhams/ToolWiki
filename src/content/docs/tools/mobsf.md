---
title: MobSF (Android APK static analysis)
description: Inspect an Android APK for manifest, permission, certificate, and selected code-security findings.
tool:
  cardRequirement: Provide an APK and a local MobSF instance; no device is needed for this static workflow.
  decision:
    useWhen: Review a built Android package before investigating specific mobile-security findings.
    result: An Android static report organizes available certificate, permission, manifest, and code findings with severity and context.
    limit: Report sections depend on the APK and enabled analyses. Scores and labels do not establish exploitability or a secure application.
  aliases: [Mobile Security Framework]
  searchTerms: [APK, Android package, mobile security, Android manifest, app permissions]
  modes: [Static]
  inputTypes: [Binaries]
  techniques: [Binary analysis, Configuration analysis]
  languages: [Language independent]
  languageNote: This entry takes a built Android APK. It does not promise source-language coverage based on the language used to build the app.
  targets: [Android APKs, Mobile applications]
  findings: [Security misconfiguration, Unsafe API use]
  findingNote: Selected package and code checks require investigation. Parsing failures, skipped classes, suppressed rules, and configured analyses affect the report.
  environment: A Linux container on a compatible Docker host. The example uses Docker Engine 28 or later with its default bridge/NAT networking; the analyzed target is an Android APK.
  setup: Run MobSF 4.6.4 locally, record the image digest and scan settings, and upload the APK to that local instance.
  licenseCategory: Open source
  license: GPL-3.0-only for MobSF; bundled components and uploaded applications have their own licenses
  cost: [Free]
  costNote: The local open-source application is free. Container runtime, hosting, and compute costs are separate.
  website: https://github.com/MobSF/Mobile-Security-Framework-MobSF
  verified: '2026-11-06'
  scope: MobSF 4.6.4 local static Android APK inspection only. Dynamic analysis, iOS, other package formats, and hosted services are outside this entry.
  sources:
    - label: MobSF 4.6.4 scope and license declaration
      url: https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/README.md
    - label: Static Docker startup
      url: https://mobsf.github.io/docs/#/running_mobsf_docker
    - label: Versioned image publishing configuration
      url: https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/.github/workflows/docker-release.yml
    - label: MobSF 4.6.4 settings
      url: https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/mobsf/MobSF/settings.py
    - label: Android report template
      url: https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/mobsf/templates/pdf/android_report.html
    - label: Docker port publishing and loopback limits
      url: https://docs.docker.com/engine/network/port-publishing/
    - label: MobSF license
      url: https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/LICENSE
---

## Where it fits

MobSF adds package-level evidence beside source checks such as
[detekt](../detekt/). Use [Ghidra](../ghidra/) when a finding needs manual native
code investigation. This static scan does not run the Android app.

## First try

**Illustrative procedure, not executed here.** Use an APK you built and may
inspect. Record its build revision and SHA-256 digest. The example assumes a
local Linux Docker Engine 28 or later, default bridge/NAT networking, and an
available `8000` host port.

Pull the versioned image and record the resolved digest:

```sh
docker pull opensecurity/mobile-security-framework-mobsf:v4.6.4
docker image inspect --format '{{json .RepoDigests}}' opensecurity/mobile-security-framework-mobsf:v4.6.4
docker run --name mobsf-apk-review --rm -it \
  -p 127.0.0.1:8000:8000 \
  -e MOBSF_DOMAIN_MALWARE_SCAN=0 \
  opensecurity/mobile-security-framework-mobsf:v4.6.4
```

Open `http://127.0.0.1:8000`, use the documented initial login `mobsf/mobsf`, and
upload your APK to this local instance. Keep authentication enabled. This
procedure disables domain-malware enrichment and otherwise uses the release's
default static settings. Record any changes, skipped analyses, and timeouts.

The explicit loopback binding matters: visiting a loopback URL does not make an
all-interface listener private. Older Docker releases and nondefault routing
need separate network review. Local hosting also does not establish offline
operation; image setup and enabled features may use the network.

## Interpret the report

First check the package identity and whether analysis completed. Representative
sections include certificate information, requested permissions, manifest
issues, and code findings. A permission can be necessary for the app's purpose;
trace a reported issue to its manifest setting or code before assigning a fix.
Sections may be absent or incomplete for a particular APK.

Save the report, APK digest, image digest, and settings in the
[run record](../../guides/run-record/). After a justified source or build change,
build a new APK and compare the corresponding finding. Do not treat a higher
score as proof that the application is secure. Save needed reports before
stopping the temporary container with `docker stop mobsf-apk-review` from another
terminal.

## System builder scope

**Reviewed November 12, 2026.** This entry stays outside automatic matching
because the builder does not model APK artifacts. The
[release documentation](https://github.com/MobSF/Mobile-Security-Framework-MobSF/blob/v4.6.4/README.md)
distinguishes mobile package inputs. An Android target, Native executable,
JVM bytecode, or Other format does not establish that an APK is available.
Docker describes this workflow's analysis environment, not the target input.
