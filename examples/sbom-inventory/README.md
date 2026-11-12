# SBOM inventory example

This fixture uses Syft 1.57.1 to compare declared npm package inventories. It
does not install its listed packages, execute application code, query a
vulnerability database, or classify either inventory as faulty.

Install the official Syft 1.57.1 binary for your host and use Node.js 22 or newer
for the verification script. From this directory:

```sh
node verify.mjs
```

If Syft is not on PATH, pass its executable path as the first argument, quoting
it if it contains spaces:

```sh
node verify.mjs "C:/tools/syft/syft.exe"
```

The runner scans `baseline/` and `changed/`, checks the expected package/version
sets, and writes SBOMs and a run record to ignored `reports/`. It disables Syft's
update check for these local scans.

The baseline contains `is-number@7.0.0` and the project itself. The changed
lockfile adds `is-odd@3.0.1`, which also introduces `is-number@6.0.0`. A second
version is a distinct inventory item, not automatically a vulnerability or an
installation error.

The explicit `--override-default-catalogers javascript-lock-cataloger` replaces
the default cataloger set for this teaching example. Preserve existing scope
and configuration when using Syft on another project.

See the [worked guide](../../src/content/docs/guides/sbom-inventory.md) and
[retained execution evidence](../../audits/api-supply-tools/README.md).
