# API description and contract example

This isolated project demonstrates two separate checks:

- Spectral CLI 6.17.1 checks one document rule: GET operations require an operation ID.
- Pact JS 17.1.4 generates a contract from the actual consumer client, then verifies a faulty and a corrected local provider.

Use Node.js 22 or newer with a native platform supported by the locked Pact Core
package. The recorded run used Node.js 24.22.1 x64 on Windows; native Windows
ARM64 Node is not supported by this Pact Core package. An x64 Node installation
can run under Windows ARM64 emulation, as in the retained run. No broker,
credentials, or external API target is used.

From this directory, install the locked dependencies and run all five cases:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm test
```

The installation flags apply to this isolated fixture. It uses prebuilt native
packages and does not need package installation scripts. The verifier sets
`PACT_DO_NOT_TRACK=1` for its subprocesses.

The overall test exits zero only when the deliberately faulty cases fail as
expected and the corrected cases pass. It checks Spectral's specific rule/path
and Pact's body-type mismatch, so a startup failure cannot count as the expected
failure.

Generated diagnostics, pact files, output, and `run.json` go in ignored
`reports/`. The verifier replaces only its named generated pact file before the
consumer case. Both local HTTP servers bind to loopback and use available ports.

To inspect individual Pact stages after installation:

```sh
npm run consumer
npm run provider:bad
npm run provider:good
```

The bad provider command deliberately exits 1. The consumer and good provider
commands exit 0. The provider state's no-op handler is sufficient only because
this fixture always supplies parcel 1; a real provider needs its own state setup.

Read the [worked guide](../../src/content/docs/guides/api-contracts.md) and the
[retained execution evidence](../../audits/api-supply-tools/README.md) for scope,
interpretation, and platform details.
