"""Run the pinned local API check and preserve output with scoped UTF-8 encoding."""

import argparse
from importlib.metadata import version
import json
import os
from pathlib import Path
import subprocess
import sys


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8771)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    output = args.output.resolve()
    if output.exists() and any(output.iterdir()):
        parser.error("Choose a new output directory so earlier reports are preserved.")
    output.mkdir(parents=True, exist_ok=True)
    entrypoint = Path(sys.executable).with_name("schemathesis.exe" if os.name == "nt" else "schemathesis")
    command = [str(entrypoint), "--no-color", "run", f"http://127.0.0.1:{args.port}/openapi.json",
               "--phases", "coverage", "--mode", "positive", "--checks", "not_a_server_error",
               "--max-failures", "1", "--max-time", "20", "--seed", "20261106", "--workers", "1",
               "--report", "junit", "--report-junit-path", str(output / "junit.xml")]
    record = {"command": command, "environment_overrides": {"PYTHONIOENCODING": "utf-8"},
              "exit_code": None, "scope": "Coverage phase, positive generation, server-error check. Read reports for skipped work."}
    try:
        record["version"] = version("schemathesis")
        if record["version"] != "4.33.1":
            raise RuntimeError("Install the pinned Schemathesis 4.33.1 environment.")
        result = subprocess.run(command, env={**os.environ, **record["environment_overrides"]},
                                capture_output=True, encoding="utf-8", timeout=40)
        record["exit_code"] = result.returncode
        (output / "stdout.txt").write_text(result.stdout, encoding="utf-8")
        (output / "stderr.txt").write_text(result.stderr, encoding="utf-8")
    except subprocess.TimeoutExpired as error:
        record["error"] = "Incomplete: the wrapper time limit expired."
        for name, value in [("stdout", error.stdout), ("stderr", error.stderr)]:
            text = value.decode("utf-8", errors="replace") if isinstance(value, bytes) else value or ""
            (output / f"{name}.txt").write_text(text, encoding="utf-8")
    except Exception as error:
        record["error"] = f"Setup or execution failed: {type(error).__name__}: {error}"
    (output / "run.json").write_text(json.dumps(record, indent=2, ensure_ascii=True) + "\n", encoding="ascii")
    print(f"Reports: {output}. Process status: {record['exit_code']}. Inspect the reports for findings and incomplete work.")
    raise SystemExit(record["exit_code"] if record["exit_code"] is not None else 2)
