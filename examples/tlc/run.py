"""Run both finite models and retain commands, process results, and input hashes."""
import argparse
import hashlib
import json
import platform
import re
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
INPUTS = ["QueueFaulty.tla", "QueueCorrected.tla", "Queue.cfg", "tool-lock.json", "run.py"]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--java", default="java", help="Java executable or absolute path to it")
parser.add_argument("--output-dir", type=Path, help="New, empty directory for evidence")
args = parser.parse_args()
started = datetime.now(timezone.utc)
output = (args.output_dir or ROOT / ".runs" / started.strftime("%Y%m%dT%H%M%SZ")).resolve()
if output.exists() and any(output.iterdir()):
    raise SystemExit("Output directory is not empty. Choose a new directory to preserve earlier runs.")
output.mkdir(parents=True, exist_ok=True)
lock = json.loads((ROOT / "tool-lock.json").read_text(encoding="utf-8"))
jar = ROOT / ".tools" / lock["filename"]
if not jar.is_file() or hashlib.sha256(jar.read_bytes()).hexdigest() != lock["sha256"]:
    raise SystemExit("Run python fetch_tool.py first; the pinned TLC archive is required.")

def execute(command, cwd, label):
    result = subprocess.run(command, cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=60)
    (output / f"{label}.stdout.txt").write_text(result.stdout, encoding="utf-8")
    (output / f"{label}.stderr.txt").write_text(result.stderr, encoding="utf-8")
    return result

record = {
    "startedAt": started.isoformat(),
    "host": platform.platform(),
    "machine": platform.machine(),
    "python": platform.python_version(),
    "tool": lock,
    "inputSha256": {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest() for name in INPUTS},
    "scope": "Capacity 2 occupancy model; TypeOK and WithinCapacity invariants; default breadth-first search, one worker. No liveness property or implementation code is checked.",
    "runs": [],
}
version = execute([args.java, "-version"], ROOT, "java-version")
if version.returncode:
    raise SystemExit("Java version check failed; inspect the retained output or pass --java with a working executable.")
record["javaVersion"] = (version.stdout + version.stderr).strip()
for module, expected in [("QueueFaulty", "completed-findings"), ("QueueCorrected", "completed-no-findings")]:
    work = output / module
    work.mkdir()
    for name in [module + ".tla", "Queue.cfg"]:
        shutil.copyfile(ROOT / name, work / name)
    command = [args.java, "-Xmx256m", "-cp", str(jar), "tlc2.TLC", "-workers", "1", "-seed", "1", "-fp", "0", "-config", "Queue.cfg", module]
    result = execute(command, work, module)
    text = result.stdout + result.stderr
    violated = "Invariant WithinCapacity is violated" in text
    complete = "Model checking completed. No error has been found." in text
    status = "completed-findings" if violated else "completed-no-findings" if complete and result.returncode == 0 else "incomplete"
    counts = re.search(r"(\d+) states generated, (\d+) distinct states found, (\d+) states left on queue", text)
    record["runs"].append({
        "module": module, "command": command, "workingDirectory": str(work),
        "expectedStatus": expected, "status": status, "exitCode": result.returncode,
        "stateCounts": dict(zip(["generated", "distinct", "remaining"], map(int, counts.groups()))) if counts else None,
        "gatePassed": status == expected and (result.returncode != 0 if violated else result.returncode == 0),
        "stdout": module + ".stdout.txt", "stderr": module + ".stderr.txt",
    })
record["finishedAt"] = datetime.now(timezone.utc).isoformat()
record["gatePassed"] = all(run["gatePassed"] for run in record["runs"])
(output / "run.json").write_text(json.dumps(record, indent=2) + "\n", encoding="utf-8")
for run in record["runs"]:
    print(f"{run['module']}: {run['status']}, exit {run['exitCode']}, states {run['stateCounts']}")
print(f"Evidence: {output}")
raise SystemExit(0 if record["gatePassed"] else 1)
