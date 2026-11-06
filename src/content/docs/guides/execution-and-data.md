---
title: Check execution and data boundaries
description: Compare local execution, network requests, telemetry, and platform reporting for five scanner workflows.
---

**Choose a workflow before deciding whether a tool fits a restricted environment.** Local analysis can still fetch rules, query a service, or submit results. License and price do not establish where data goes.

This review covers official documentation available on November 6, 2026. It is not a network-traffic test. OSV guidance is for V2; the cited Grype configuration reference is generated for 0.119.0. Semgrep and Trivy links track their current documentation. Check your installed release before applying the options below.

## Semgrep CE with local rules

[Semgrep CE](../../tools/semgrep-ce/) runs rules on local files. A standalone `semgrep scan` does not require a Semgrep account. Rule files can be local, URLs, or Registry entries; remote rules must be retrieved. Version checking is a separate network operation, controlled by `--disable-version-check`. [CLI reference](https://docs.semgrep.dev/cli-reference).

The default metrics policy enables metrics for Registry rules or logged-in use. Local rules alone do not enable them. `--metrics off` controls metrics, not rule retrieval, version checks, or explicit platform reporting. Record the rule source and revision along with the CLI version. [Metrics policy](https://docs.semgrep.dev/metrics).

For disconnected use, prepare the engine and compatible local rules first, choose local output files, and review the installed CLI's network-related options. This page does not validate a complete offline setup.

## Semgrep Code with platform reporting

For [Semgrep Code](../../tools/semgrep-code/) in your CI, scanning runs on the configured runner. The connected workflow requires a platform account and token, obtains its configuration, and sends findings to the AppSec Platform. Account and repository permissions are part of that setup. [CI deployment guide](https://docs.semgrep.dev/deployment/add-semgrep-to-ci).

Metrics and findings are different transmissions: the metrics policy describes aggregate usage data, while logged-in `semgrep ci` also sends finding and repository information for the dashboard. Turning metrics off does not disconnect that workflow. [Metrics policy](https://docs.semgrep.dev/metrics).

Managed Scans run on Semgrep's infrastructure: the service clones the selected repository, scans it, then removes the clone. [Managed Scans lifecycle](https://docs.semgrep.dev/deployment/managed-scanning/overview#life-cycle-of-a-managed-scan).

Pro-engine installation, platform policies, and entitlement need review for the chosen release. A connected workflow is not established as offline-capable by saving a rule file. AI features and other Semgrep products are outside this comparison.

## OSV-Scanner dependency matching

[OSV-Scanner](../../tools/osv-scanner/) extracts package information locally, then normally queries OSV.dev for vulnerability matching. The CLI workflow does not require a hosted dashboard account. Online matching sends the package-query information to the service; selected dependency-resolution features can make further requests. A local output file is separate from any report publishing you configure. [V2 usage](https://google.github.io/osv-scanner/usage/).

Full `--offline` mode uses previously downloaded ecosystem databases. The docs distinguish it from `--offline-vulnerabilities`, which only changes vulnerability matching and allows other features to use the network. Adding `--download-offline-databases` deliberately enables database retrieval. Prepare the required ecosystems and record their dates; missing databases are an error, and old data cannot include newer advisories. [Offline modes](https://google.github.io/osv-scanner/usage/offline-mode/).

This review does not establish a separate telemetry contract for every OSV subcommand. Guided remediation and package-manager execution are outside the dependency-scan procedure reviewed here.

## Trivy standalone scanning

For the standalone [Trivy](../../tools/trivy/) CLI, the scanner runs on your host. Network needs depend on the selected scanner: vulnerability and Java databases, check bundles, image registries, optional VEX sources, and Java package lookups are distinct resources. The public scanner procedure does not require an Aqua platform account; private registries can require credentials. [Connectivity guide](https://trivy.dev/docs/latest/advanced/air-gap/).

Current documentation describes usage telemetry and the `--disable-telemetry` option. That option does not disable database downloads, package lookups, or update checks. Sending reports to a platform is an additional integration, not implied by choosing local report output. [Telemetry documentation](https://trivy.dev/docs/latest/advanced/telemetry/).

For restricted networks, prepare the chosen scanner's databases and checks. `--offline-scan` prevents Maven Central lookups; it does not prepare databases or control their updates. Record database and check-bundle versions separately from the executable. [Network controls](https://trivy.dev/docs/latest/advanced/air-gap/#offline-mode) and [database configuration](https://trivy.dev/docs/latest/configuration/db/).

This scope excludes Trivy client/server mode, cloud integrations, and third-party wrappers. Their data boundaries need separate review.

## Grype with an image or SBOM

[Grype](../../tools/grype/) matches packages against a locally cached vulnerability database. It normally checks online for a newer database on startup. The published database is available without an Anchore account; registry access depends on where the target image is stored. [Database guide](https://oss.anchore.com/docs/guides/vulnerability/database/).

The 0.119.0 configuration reference separates application-update checking, database updates, and optional external package lookups. `external-sources.enable` is false by default; enabling it can add requests such as Maven artifact identification. No dashboard upload is part of the selected local-output procedure. The cited reference does not establish a telemetry guarantee for every wrapper or integration. [Configuration reference](https://oss.anchore.com/docs/reference/grype/configuration/).

Prepare a compatible database for disconnected use and retain its build date. Database age validation can reject stale data; changing that policy changes freshness acceptance, not the underlying advisory data. Follow the [database management commands](https://oss.anchore.com/docs/reference/grype/cli/#grype-db-import) for the installed release. Image retrieval and configured remote lookups still need their own plan.

## Record the chosen boundary

In the [run record](../run-record/), keep the installed version, host, target revision or digest, rule/database source and snapshot, enabled network features, account/service requirements, and report destination. Prepare dependencies and artifacts before a restricted-network trial, then inspect logs and actual connection behavior in that environment.

A scan that cannot retrieve required data is failed or incomplete, not a clean result. Use [finding review](../reviewing-findings/) and [CI result handling](../ci-checks/) to preserve that distinction.
