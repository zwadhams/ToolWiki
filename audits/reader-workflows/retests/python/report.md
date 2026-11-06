# Python fresh-reader retest

Result: PASS for public example acquisition, the Pylint inline first run, the Ruff/mypy demonstration, and adaptation to the supplied separate project. No documentation blocker or missing step was encountered on this tested Windows route.

Execution date: 2026-11-06. Operator: independent reader agent retest_reader_python. The coordinator identified the visible site as integrated build 46be6de. I did not inspect product source, implementation discussions, or other audits. The downloaded example source and supplied invoice input were read as workflow inputs. Existing example evidence was not used to decide the results.

## Exact navigation

All discovery used a new in-app browser tab and visible links or controls.

1. Opened `http://127.0.0.1:4361/ToolWiki/`.
2. Clicked **Check source code**, reaching `http://127.0.0.1:4361/ToolWiki/?input=Source+code#tool-results`.
3. Selected **Python** in **Language / ecosystem**, reaching `http://127.0.0.1:4361/ToolWiki/?input=Source+code&language=Python#tool-results` (13 entries).
4. Chose **Pylint**, whose card described programming mistakes and conventions, at `http://127.0.0.1:4361/ToolWiki/tools/pylint/?catalog=input%3DSource%2Bcode%26language%3DPython%26category%3Dall`.
5. Read **Start with a small package**, its inline Windows commands, expected W0611 and exit codes, and its link to complementary lint/type checking. Clicked **Get the examples**, reaching `http://127.0.0.1:4361/ToolWiki/guides/get-examples/?catalog=input%3DSource%2Bcode%26language%3DPython%26category%3Dall`.
6. Used the displayed PowerShell ZIP acquisition commands. Clicked the table's **Python linting and types** link, reaching `http://127.0.0.1:4361/ToolWiki/guides/python-checks/?catalog=input%3DSource%2Bcode%26language%3DPython%26category%3Dall`.
7. Read the setup, faulty/corrected examples, and **Use it on your project** section. Followed its **run record** link to `http://127.0.0.1:4361/ToolWiki/guides/run-record/` and read status definitions and required fields.

The browser automation attempted to address the sidebar's Workflows disclosure as a Playwright button after filtering. That locator found no match. A fresh UI state showed the Python filter had succeeded; choosing the visible Pylint link worked. This is an automation locator mismatch, not evidence of a broken wiki control. No page or command workaround was needed.

## Acquisition and environment

The initially empty destination was `C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/public-download`. The displayed URL was `https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip`. Download and extraction succeeded directly, without using the local source checkout as an example provider.

ZIP SHA256: `1EA0D5A28C0BCA15B8C5F1481451FB91B3970F1D9CB1D1475BADD242E1F6713E`.

Two new virtual environments were created during this retest. Pylint used the first extracted example directory. The combined workflow used a second fresh extraction of the same downloaded ZIP under `C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/combined-download`. Both environments are `.venv` under `ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9/examples/python-checks`. No preinstalled example environment was reused, and no global packages or settings were changed. The invoice adaptation used the newly created combined checker environment through the guide's absolute `$CheckPython` path.

- Windows 11, build 10.0.26300; PowerShell 7.6.9.
- Python 3.13.15, 64 bit, matching the documented prerequisite.
- Pylint 4.1.3; astroid 4.3.4. Full resolved packages: `pylint-freeze.txt`.
- Ruff 0.14.3; mypy 1.18.2. Full pinned environment: `combined-freeze.txt`.
- No application dependencies, credentials, or analyzer plugins were needed.

`acquisition.ps1`, `pylint-inline.ps1`, `combined-demo.ps1`, `project-first.ps1`, and `project-corrected.ps1` retain the commands and working directories. Their matching transcripts retain outputs. Downloaded example input/configuration hashes also appear in the new demonstration `run.json` files.

## Observed results

| Run | Tool | Actual signal | Exit | Classification |
| --- | --- | --- | --- | --- |
| Inline bad greeting | Pylint | W0611 unused math at line 1 | 4 | completed-findings |
| Inline good greeting | Pylint | No diagnostic | 0 | completed-no-findings |
| Demo bad greeting | Ruff | F401 unused math at line 1 | 1 | completed-findings |
| Demo bad greeting | mypy | arg-type at line 8, str passed where int expected | 1 | completed-findings |
| Demo good greeting | Ruff | Empty JSON array | 0 | completed-no-findings |
| Demo good greeting | mypy | Success, 1 source file checked | 0 | completed-no-findings |
| Invoice first run | Ruff | F401 unused pathlib.Path at line 1 | 1 | completed-findings |
| Invoice first run | mypy | assignment at line 6, int expression assigned to str variable | 1 | completed-findings |
| Invoice corrected run | Ruff | Empty JSON array | 0 | completed-no-findings |
| Invoice corrected run | mypy | Success, 1 source file checked | 0 | completed-no-findings |

Both demonstration runner gate codes matched the guide: bad 1 and good 0. The raw checker reports are in `demo-reports/bad` and `demo-reports/good`; `run.json` records exact commands, versions, hashes, host and completion status. The supplied good greeting removes the unused import and changes `greeting("three")` to `greeting(3)`.

## Separate-project adaptation

The source input was `C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/inputs/python/Invoice sample`. Its README says the project supports Python 3.13, returns an integer amount in dollars, and has no external dependencies. I copied it to `C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/Invoice sample` before any changes.

Following **Use it on your project**, I created the absent `pyproject.toml` with the displayed settings: Ruff target `py313`, rules E4/E7/E9/F, and strict mypy targeting 3.13 with error codes. The target was `.\src`, which contains one Python source file. The report paths were replaced with new directories under this retest's audit directory. The interpreter was retained as an absolute path before changing directories. A project path containing a space worked without an extra workaround.

Initial invoice SHA256: `87449E3AA6EB59A0EF192296E8D54462F18B2F82405E99B9717C9254DD7C6723`.

After reading both initial reports, I removed the unused `from pathlib import Path` line and its separating blank line, and changed `amount: str` to `amount: int`, consistent with the supplied README and the function's declared result. I then ran the same checks with `project-reports/corrected-run` as a new report directory. Both tools completed cleanly; all stderr files were empty. The chosen gate passed only after both completed with no findings.

Corrected invoice SHA256: `3F703C4BB251FF7AF8497CA4DAE92E0F899284B929F7967F961D505C198F133A`.

Configuration SHA256: `917EABE90041909232DE42956D573FE07878B46F79DD5D0744A2AAE1F2DEC139`.

`inputs-before`, `inputs-after`, `project-pyproject.toml`, and the hash JSON files retain the inputs and correction. Comparing the supplied input's before/after hash records found no difference. The source input and product source were not modified.

## Documentation assessment and limits

The visible instructions were sufficient for a reader with basic programming and terminal knowledge to choose a relevant workflow, obtain examples, install isolated tools, distinguish findings from failed execution, retain reports, correct defects, and adapt the checks to a small separate project. The Pylint procedure also passed exactly as written. No outside analyzer knowledge, alternate download, undocumented flags, or manual runner edits were required.

Supplemental audit work was limited to copying input files, saving transcripts, recording package versions and SHA256 hashes, and retaining the exact scripts. The second archive extraction was used to give the combined workflow its own fresh environment. Output locations were changed to the assigned audit directory for retention. One PowerShell display ellipsis in the transcript was replaced with three ASCII dots to satisfy the task's ASCII requirement; analyzer outputs were otherwise retained as produced.

These are completed static checks on the demonstrated and supplied files, not a correctness or security proof. No functional application tests were supplied or executed, and no imported-dependency/stub installation branch was needed for this dependency-free input. Other Python versions, hosts, larger packages, framework plugins and missing-dependency cases were not tested.
