# Independent ToolWiki Python reader audit

PASS with limits. Date: 2026-11-09. No commit, push, publication or wiki edit.

## Documentation review

Discovery used native ToolWiki MCP search_knowledge("Python lint type", limit=20), then search_knowledge("Python", filters.kind="guide", limit=20). Read full get_document responses for guides/python-checks, guides/get-examples, tools/ruff and tools/mypy (maxChars=24000). All nextOffset values were null. Full returned documents are retained in documents.json; MCP recorder retains calls.

MCP snapshot revision: 3492d6a8c829b74b47514351643ba74e59df0cdd803138435101fbe90635a22d
Document revisions:
- guides/python-checks: 38d8b61a412fe820cfca92717e5013e91d81e3674dfa92a149cef3123d610817
- guides/get-examples: 348abeca8590adc2dcc2533453c85a206d6a93d9b3b938c6601b06fbfe369b26
- tools/ruff: 28e55ed6b2be0b946eb98cd04a5136cfcac1e3ed141560f37a85a2235d6a1b2b
- tools/mypy: 9d95ee85775618479267ec6aa06fca4667de122300edcbbd8fb4b93eb9e59125

Guide URL: https://zwadhams.github.io/ToolWiki/guides/python-checks/
Example snapshot revision: 506c522ca86fd8c9d7b688f35a4d37f842d04cc9.
The exact MCP-returned ZIP URL, archive size and SHA256 are in download.json. Downloaded afresh; extracted only bad/greeting.py, good/greeting.py, requirements.txt, pyproject.toml and run_checks.py. Did not read local ToolWiki documentation, export, implementation, previous audit reports or other reader evidence. Used only the explicitly documented example runner, not repository verification scripts.

Selected Ruff for lint and mypy for type problems because the discovered guide pairs their complementary checks. The guide pins Python 3.13, Ruff 0.14.3 and mypy 1.18.2. Tool standalone examples are illustrative; the guide claims recorded Windows execution only. Requirements reviewed before execution: isolated environment, package-index access, matching target Python, configuration, dependencies and stubs. These fixtures need no third-party application dependencies or credentials.

Limitations reviewed: fixture Ruff selection is only F401; Ruff formatting is separate from linting. Fixes require review; none were automatic here. mypy depends on annotations and stubs; Any, untyped functions and ignored imports reduce coverage. Strict mode does not validate runtime input or replace tests. Clean reports do not prove general correctness. Counts from separate tools are not quality comparisons.

## Actual executions

Exact argv, cwd and exit codes: commands.json. Complete orchestration, including download, extraction, synthetic source generation and correction: audit.py. Invocation was a PowerShell here-string containing that Python script piped to python -. Every subprocess has separate NAME.stdout.txt and NAME.stderr.txt, with non-ASCII escaped. Fixture runner also retains its own separate analyzer reports, stderr, completion status, commands, input SHA256 and exits in fixture-bad/run.json and fixture-good/run.json.

Selected interpreter: C:\Users\zwadh\AppData\Local\Programs\Python\Python313\python.exe.
Observed Python 3.13.15, MSC v.1944 64 bit (AMD64); platform.machine ARM64; Windows-11-10.0.26300-SP0; pointer width 64. This is AMD64 Python on ARM64 Windows, not a native ARM64 binary test. pip selected win_amd64 wheels. Venv creation and installation exited 0.
Versions: Ruff 0.14.3; mypy 1.18.2 (compiled yes); pip 26.2.1; mypy_extensions 1.1.0; pathspec 0.12.1; typing_extensions 4.15.0. Version inspection and complete pip output retained.

| Run | Ruff | mypy | Gate |
| --- | --- | --- | --- |
| Fixture bad | exit 1, F401 math at 1:8 | exit 1, arg-type at greeting.py:8 | runner 1 |
| Fixture good | exit 0, [] | exit 0, success, 1 source file | runner 0 |
| Synthetic bad | exit 1, F401 os at 1:8 | exit 1, arg-type at pricing.py:6, 2 source files | both completed with findings |
| Synthetic good | exit 0, [] | exit 0, success, 2 source files | both completed clean |

Read Ruff and mypy reports independently. Fixture bad import math is unused; greeting("three") violates integer count. Good removes math and calls greeting(3). Runner reports completed-findings for each faulty check and completed-no-findings for each corrected check. Analyzer stderr was empty.

## Separate synthetic project

Project parcel-project/src/parcel_cost/pricing.py, empty __init__.py. Own root pyproject.toml uses target py313, Ruff E4/E7/E9/F, strict mypy for Python 3.13 with error codes and pretty=false. No explicit suppressions or exclusions; defaults otherwise. Reused the isolated checker interpreter by absolute path as the guide permits. No application dependencies/stubs needed; os is standard library.

Faulty source defines shipment_cost(units: int, rate: float) -> float returning units * rate, imports unused os, and assigns quote: float = shipment_cost("4", 2.5). Ruff flags os; mypy flags string units. Corrected source removes os and passes integer 4. Both reruns pass. Exact before/after package and configuration are retained in synthetic-bad/ and synthetic-good/. No application code was executed. Runtime validation, monetary rounding and application behavior remain untested.

## Usability issues and outside knowledge

1. Guide checks Python version but not binary architecture on ARM64. Recovered by inspecting interpreter build, host and wheel tags; native ARM64 remains unverified.
2. Download guide supplies a whole repository ZIP for five needed files. Extracted only selected inputs and avoided unrelated material.
3. MCP returns duplicate text and structuredContent. Printing four full documents exceeded display budget. Full structured content was retained; get-examples was displayed separately afterward; no pagination was omitted.
4. My first capture harness embedded JSON null as a Python literal: exit 1, Traceback at <stdin> line 9, NameError: name 'null' is not defined. No download or checks had run. Recovered with json.loads and a new timestamped directory; earlier empty directories left untouched. This was my error, not ToolWiki.
5. Initial command Get-Location; Get-Date -Format o; Get-Command python,py,uv -ErrorAction SilentlyContinue | Select-Object Name,Source returned exit 1 because uv was absent. Python and py resolved. uv was not required.
6. Report save exceeded Windows command length: CreateProcess rejected with "The filename or extension is too long. (os error 206)". Chunking initially hit SyntaxError due to triple quotes in the retained script. Recovered with ordinary quoted string chunks and rewrote the new partial audit.py. No prior reports overwritten. One intermediate in-memory save also raised ReferenceError: report is not defined; no files changed.
7. Sandbox required escalation for writes/network. Authorized actions succeeded; no automatic-review policy rejection or genuine workflow blocker occurred.

Outside knowledge used: Python standard-library subprocess/urllib/zipfile/hashlib/pathlib/JSON and annotations; PowerShell here-string and command discovery; interpreter-build versus host architecture. Used for capture and synthetic inputs. Check selection and workflow came from MCP. No outside documentation browsed.

## Evidence and limits

hashes.json hashes selected retained inputs and logs from execution; fixture run.json hashes inputs per run. final-hashes.json covers final evidence except itself. Source state is exact retained files, not a Git commit. ASCII validation covers non-cache retained text; non-ASCII is backslash escaped. Binary checker caches are auxiliary. PASS means the two known fault classes were detected and corrected reruns completed clean under these versions/configurations/scopes, not general defect coverage.
