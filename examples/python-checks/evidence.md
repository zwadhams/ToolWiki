# Python recipe execution record

Executed November 6, 2026, on Windows with Python 3.13.15, Ruff 0.14.3, and
mypy 1.18.2. The packages were installed from the pinned requirements into a new
local virtual environment. The target program was analyzed, not executed.

The plan was to check one file with Ruff F401 and mypy strict mode, using the
same configuration for the faulty and corrected variants. The expected signals
were an unused import and an incompatible argument, followed by clean checks
after removing the import and changing the argument to an integer.

| Command | Ruff result | mypy result | Runner status |
| --- | --- | --- | --- |
| `python run_checks.py bad --output reports/final-bad` | One F401 at line 1 | One arg-type at line 8 | 1 |
| `python run_checks.py good --output reports/final-good` | No findings | No issues in one source file | 0 |

The [faulty run record](evidence/bad/run.json) and
[corrected run record](evidence/good/run.json) contain exact commands, versions,
input SHA-256 digests, and per-tool return codes. The sibling files contain the
separate reports and stderr. Absolute local paths are shortened for portability;
diagnostic content is unchanged. These input digests identify the tested files
even though the repository changes were uncommitted.

Four runner tests passed with `python -m unittest -v test_runner.py`: timeout
output is retained, mismatched versions do not launch a check, tool failure is
not classified as clean, and existing artifacts are not overwritten. The timeout
and version cases use controlled test doubles; they are not observed analyzer
failures.

This record establishes the two selected signals on this fixture and environment.
It is not a benchmark or a compatibility claim for every host and Python project.
