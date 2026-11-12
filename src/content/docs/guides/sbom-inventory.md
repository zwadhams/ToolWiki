---
title: Record and compare an SBOM inventory
description: Use Syft to inventory declared npm dependencies and inspect what changes when a dependency introduces another package version.
executionEvidence:
  status: recorded
  scope: November 12, 2026 run of Syft 1.57.1 on Windows ARM64 against two local npm lockfile directories, restricted to javascript-lock-cataloger. The baseline contained two package records including the root project; the changed fixture contained four. No vulnerability matching or application execution was performed.
  sources:
    - https://github.com/zwadhams/ToolWiki/blob/main/audits/api-supply-tools/evidence/sbom-inventory/run.json
---

A software bill of materials (SBOM) records identified software components.
This example uses [Syft](../../tools/syft/) to inventory two npm lockfiles and
explain a direct and transitive dependency change.

## Prepare the inputs

Use the repository's
[`examples/sbom-inventory`](https://github.com/zwadhams/ToolWiki/tree/main/examples/sbom-inventory)
directory. Install the official **Syft 1.57.1** binary for your host using the
[installation guide](https://oss.anchore.com/docs/installation/syft/).
The retained run used its Windows ARM64 build. Use Node.js 22 or newer for the
small verification runner; it has no npm dependencies to install.

The `baseline/` and `changed/` directories contain package manifests and
lockfiles, with no installed packages. You do not need to run `npm install` in
either input directory to reproduce the scan.

## Run the inventory check

From the example directory, run:

```sh
node verify.mjs
```

If Syft is not on PATH, pass its executable path:

```sh
node verify.mjs "C:/tools/syft/syft.exe"
```

Replace that path with the binary you installed. The runner disables the update
check for these local scans, records the Syft version, scans both directories,
and checks their package/version sets. It writes the SBOMs and `run.json` into
`reports/`.

The underlying command for the baseline is:

```sh
syft scan dir:baseline --override-default-catalogers javascript-lock-cataloger -o syft-json=reports/baseline.syft.json
```

The output directory is created by the runner. The cataloger override is
intentional for this fixture: it replaces defaults so only npm lockfile
discovery is evaluated. It should not replace an existing project's cataloger
configuration without a reason.

## Interpret the change

The recorded inventories were:

| Package | Baseline | Changed |
| --- | --- | --- |
| Root fixture project | 1.0.0 | 1.0.0 |
| `is-number` | 7.0.0 | 6.0.0 and 7.0.0 |
| `is-odd` | Absent | 3.0.1 |

Adding `is-odd` introduces its dependency on a second version of `is-number`.
The root project is also an inventory record. Inspect `name`, `version`,
`locations`, and `foundBy` in the JSON before summarizing counts.

Neither inventory is labeled defective. A new package or version is a change
to review, not automatically a vulnerability. The scan reads declared dependency
metadata; it does not prove that those packages are installed in a deployment,
imported by the application, or reachable at runtime.

## Preserve scope when using an SBOM

Record the source artifact identity, Syft version, selected catalogers, and
output format with the file. The
[cataloger guide](https://oss.anchore.com/docs/guides/sbom/catalogers/) explains
why image and directory defaults differ. For deployment inventory, inspect the
actual image or installed filesystem with the appropriate scope.

Use [Grype](../../tools/grype/) for a separate vulnerability-matching step, or
compare the relevant [Trivy](../../tools/trivy/) workflow. This example did not
run either scanner or access a vulnerability database. SBOM generation,
vulnerability matching, and exploitability assessment are separate questions.

The [retained run](https://github.com/zwadhams/ToolWiki/tree/main/audits/api-supply-tools/evidence/sbom-inventory)
contains input hashes, commands, exit codes, the observed package sets, and
the original SBOM output for this fixture.
