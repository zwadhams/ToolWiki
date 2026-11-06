# Semgrep CE rule evidence

Reviewed November 6, 2026. The rule and fixtures are original ToolWiki material
under the adjacent MIT license. The selected engine is Semgrep CE 1.184.0.

The rule detects two call patterns with literal `shell=True`. Constant
propagation is disabled. The rule does not trace untrusted input or prove
exploitability. `not-covered.py` deliberately shows a variable flag and a
wrapper outside the rule's selected patterns.

| Input | SHA-256 |
| --- | --- |
| `rule.yml` | `19c9ac0d0d70e3b751930e178254e672e8c003d35a64aa394d264fa742c3338f` |
| `bad.py` | `445bc06c788c46a5ad5272588bf08aa96a14d8dd7d09dc33bc277977894c0d45` |
| `good.py` | `4337a54450b3a9c3202c0af2e0f0a4f54a5879b2b24cae594082881a9b9d477b` |
| `not-covered.py` | `965f433ce0f30a1c6d6f32977ad9ce54a1c53ae803ddab023652cc28c377060e` |

## Planned check

Run `semgrep scan --oss-only --config rule.yml --no-rewrite-rule-ids --metrics off --disable-version-check --error --json` with each input separately. Expect one finding for `bad.py`, none for `good.py`, and none for `not-covered.py`. An incomplete or failed scan is not an empty result.

## Observed execution

Semgrep CE 1.184.0 was run on Windows with Python 3.13.15 in an isolated virtual
environment. Normal-permission CLI runs used the OSS engine, returned no scan
errors, and reported each intended input as scanned:

| Input | Findings | Process status |
| --- | --- | --- |
| `bad.py` | 1 | 1 |
| `good.py` | 0 | 0 |
| `not-covered.py` | 0 | 0 |

The target Python functions were not executed. The Linux matching workflow is
documentation-reviewed; this run verifies the fixture on the Windows beta host.
The [run record](../../audits/remaining-work/expansion-runs/semgrep.json) retains
commands, input hashes, and report paths. The
[dependency list](../../audits/remaining-work/expansion-runs/semgrep-packages.txt)
records the isolated environment.

Earlier setup attempts are retained separately: `python -m semgrep` was rejected
by the CLI, the default user-state directory was outside the restricted write
scope, and the restricted shell could not start the engine's Windows socketpair.
Using the documented executable, project-local log/settings/cache paths, and
normal permissions produced the results above. These failures were not counted
as empty scans. Stderr console glyphs are escaped as ASCII in retained logs.
