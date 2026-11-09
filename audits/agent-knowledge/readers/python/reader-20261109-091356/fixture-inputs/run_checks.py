"""Run the two pinned checks and retain separate evidence for each one."""

import argparse
from datetime import datetime, timezone
import hashlib
from importlib.metadata import PackageNotFoundError, version
import json
from pathlib import Path
import platform
import subprocess
import sys


ROOT = Path(__file__).resolve().parent
PINS = {"ruff": "0.14.3", "mypy": "1.18.2"}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run_check(name, command, output, target):
    report = {"tool": name, "command": command, "target": target}
    suffix = "json" if name == "ruff" else "txt"
    try:
        installed = version(name)
    except PackageNotFoundError:
        installed = None
    report["version"] = installed
    if installed != PINS[name]:
        report.update(status="failed", reason=f"Install {name}=={PINS[name]} before running.", return_code=None)
        return report
    try:
        result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, encoding="utf-8", timeout=120)
    except subprocess.TimeoutExpired as error:
        def as_text(value):
            return value.decode("utf-8", errors="replace") if isinstance(value, bytes) else value or ""

        (output / f"{name}.{suffix}").write_text(as_text(error.stdout), encoding="utf-8")
        (output / f"{name}.stderr.txt").write_text(as_text(error.stderr), encoding="utf-8")
        report.update(status="incomplete", reason=str(error), return_code=None,
                      artifacts=[f"{name}.{suffix}", f"{name}.stderr.txt"])
        return report
    except OSError as error:
        report.update(status="incomplete", reason=str(error), return_code=None)
        return report
    (output / f"{name}.{suffix}").write_text(result.stdout, encoding="utf-8")
    (output / f"{name}.stderr.txt").write_text(result.stderr, encoding="utf-8")
    report.update(return_code=result.returncode, artifacts=[f"{name}.{suffix}", f"{name}.stderr.txt"])
    if name == "ruff":
        try:
            diagnostics = json.loads(result.stdout)
            valid = isinstance(diagnostics, list)
        except json.JSONDecodeError:
            diagnostics, valid = [], False
        if valid and result.returncode == 0 and not diagnostics:
            status = "completed-no-findings"
        elif valid and result.returncode == 1 and diagnostics:
            status = "completed-findings"
        else:
            status = "failed"
    elif result.returncode == 0 and "Success: no issues found" in result.stdout:
        status = "completed-no-findings"
    elif result.returncode == 1 and ": error:" in result.stdout and "Found " in result.stdout:
        status = "completed-findings"
    else:
        status = "failed"
    report["status"] = status
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("variant", choices=["bad", "good"])
    parser.add_argument("--output", type=Path, required=True, help="Directory for this run's reports")
    args = parser.parse_args()
    output = args.output.resolve()
    if output.exists() and any(output.iterdir()):
        parser.error("Use a new or empty output directory so earlier reports are preserved.")
    output.mkdir(parents=True, exist_ok=True)
    target = f"{args.variant}/greeting.py"
    commands = {
        "ruff": [sys.executable, "-m", "ruff", "check", "--no-fix", "--no-cache", "--config", "pyproject.toml", "--output-format", "json", target],
        "mypy": [sys.executable, "-m", "mypy", "--no-incremental", "--cache-dir", str(output / "mypy-cache"), "--config-file", "pyproject.toml", target],
    }
    results = [run_check(name, command, output, target) for name, command in commands.items()]
    record = {
        "evidence": "executed",
        "date_utc": datetime.now(timezone.utc).isoformat(),
        "host": platform.platform(),
        "python": platform.python_version(),
        "variant": args.variant,
        "scope": "One fixture file; Ruff F401 and mypy strict type checking. Target not executed.",
        "inputs_sha256": {name: digest(ROOT / name) for name in [target, "pyproject.toml", "requirements.txt", "run_checks.py"]},
        "results": results,
    }
    (output / "run.json").write_text(json.dumps(record, indent=2, ensure_ascii=True) + "\n", encoding="ascii")
    for result in results:
        print(f"{result['tool']}: {result['status']}")
    if any(result["status"] not in {"completed-no-findings", "completed-findings"} for result in results):
        return 2
    return 1 if any(result["status"] == "completed-findings" for result in results) else 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except OSError as error:
        print(f"Could not preserve run artifacts: {error}", file=sys.stderr)
        raise SystemExit(2)
