"""One-off local verification of the reader-workflows API documentation."""

import contextlib
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import platform
import re
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[2]
PYTHON = ROOT / ".preview/api-demo-env/Scripts/python.exe"
CLI = PYTHON.with_name("schemathesis.exe")
PWSH = sys.argv[1]
ENV = {**os.environ, "PYTHONIOENCODING": "utf-8"}
RESULT = {"date": "2026-11-06", "kind": "New implementation verification; historical records unchanged", "runs": []}


def write_json(path, value):
    path.write_text(json.dumps(value, indent=2, ensure_ascii=True) + "\n", encoding="ascii")


def run(command, prefix, env=ENV):
    started = time.monotonic()
    result = subprocess.run([str(part) for part in command], cwd=ROOT, env=env,
                            capture_output=True, encoding="utf-8", timeout=90)
    (ROOT / f"{prefix}.stdout.txt").write_text(result.stdout, encoding="utf-8")
    (ROOT / f"{prefix}.stderr.txt").write_text(result.stderr, encoding="utf-8")
    return {"command": [str(part) for part in command], "exit_code": result.returncode,
            "elapsed_seconds": round(time.monotonic() - started, 3), "stdout": f"{prefix}.stdout.txt",
            "stderr": f"{prefix}.stderr.txt"}


def request(port, path, data=None):
    req = urllib.request.Request(f"http://127.0.0.1:{port}{path}", data=None if data is None else json.dumps(data).encode(),
                                 headers={} if data is None else {"Content-Type": "application/json"})
    try:
        response = urllib.request.urlopen(req, timeout=2)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        return {"status": response.status, "body": json.loads(response.read())}


@contextlib.contextmanager
def server(script, port, fixed, name):
    with socket.socket() as probe:
        if probe.connect_ex(("127.0.0.1", port)) == 0:
            raise RuntimeError(f"Port {port} already in use; no existing service was touched")
    command = [sys.executable, script, "--port", str(port)] + (["--fixed"] if fixed else [])
    with (ROOT / f"{name}.server.txt").open("w", encoding="utf-8") as output:
        process = subprocess.Popen(command, cwd=ROOT, env=ENV, stdout=output, stderr=subprocess.STDOUT,
                                   creationflags=subprocess.CREATE_NO_WINDOW)
        try:
            for _ in range(50):
                if process.poll() is not None:
                    raise RuntimeError(f"Server exited: {name}")
                try:
                    state = request(port, "/health")
                    if state["status"] == 200:
                        break
                except (OSError, urllib.error.URLError):
                    time.sleep(0.1)
            else:
                raise RuntimeError(f"Server not ready: {name}")
            yield {"command": command, "pid": process.pid, "health": state}
        finally:
            process.terminate()
            process.wait(timeout=10)
    for _ in range(50):
        with socket.socket() as probe:
            if probe.connect_ex(("127.0.0.1", port)) != 0:
                break
        time.sleep(0.1)
    else:
        raise RuntimeError(f"Own server port {port} remains open")


def prepare_widgets():
    source = (ROOT / "examples/http-api/server.py").read_text(encoding="utf-8")
    source = source.replace("orders", "widgets").replace("Orders", "Widgets").replace("Order", "Widget").replace("order", "widget")
    source = source.replace('with_name("openapi.json")', 'with_name("widgets.json")').replace('"/openapi.json"', '"/widgets.json"')
    source = source.replace("port=8771", "port=8781").replace("default=8771", "default=8781")
    source = source.replace('        def log_message(self, format, *args):\n            pass', '        def log_message(self, format, *args):\n            if format == \'"%s" %s %s\':\n                print(json.dumps({"method": self.command, "path": self.path, "status": int(args[1]), "request_body": getattr(self, "request_body", b"").decode("utf-8", errors="backslashreplace")}, ensure_ascii=True), flush=True)')
    source = source.replace('                data = json.loads(self.rfile.read(length))', '                self.request_body = self.rfile.read(length)\n                data = json.loads(self.request_body)')
    (ROOT / "widgets_server.py").write_text(source, encoding="ascii")
    schema = (ROOT / "examples/http-api/openapi.json").read_text(encoding="utf-8")
    schema = schema.replace("orders", "widgets").replace("Orders", "Widgets").replace("Order", "Widget").replace("order", "widget").replace("8771", "8781")
    (ROOT / "widgets.json").write_text(schema, encoding="ascii")


prepare_widgets()
RESULT["environment"] = {"os": platform.platform(), "working_directory": str(ROOT), "python": run([PYTHON, "--version"], "python-version"),
                         "schemathesis": run([CLI, "--version"], "schemathesis-version"),
                         "dependencies": run([PYTHON, "-m", "pip", "freeze"], "dependencies"),
                         "pip_check": run([PYTHON, "-m", "pip", "check"], "pip-check"),
                         "powershell": run([PWSH, "-NoProfile", "-Command", "$PSVersionTable.PSVersion.ToString()"], "powershell-version")}
RESULT["cli_help"] = run([CLI, "run", "--help"], "cli-help")
guide = (REPO / "src/content/docs/guides/api-testing.md").read_text(encoding="utf-8")
block = next(block for block in re.findall(r"```powershell\n(.*?)\n```", guide, flags=re.S) if "$priorEncoding" in block)

for fixed in [False, True]:
    mode = "fixed" if fixed else "faulty"
    name = f"final-demo-{mode}"
    with server("examples/http-api/server.py", 8771, fixed, name) as service:
        replay = run([PYTHON, "examples/http-api/replay.py"] + (["--expect-fixed"] if fixed else []), f"{name}-replay")
        reset = run([PYTHON, "examples/http-api/replay.py", "--reset"], f"{name}-reset")
        wrapper = run([PYTHON, "examples/http-api/run_schemathesis.py", "--output", f".preview/{name}"], name)
        RESULT["runs"].append({"name": name, "service": service, "replay": replay, "reset": reset, "wrapper": wrapper,
                               "tool_record": json.loads((ROOT / f".preview/{name}/run.json").read_text())})
    for generation in ["positive", "negative"]:
        name = f"final-widgets-{mode}-{generation}"
        output = f".preview/{name}"
        command = block.replace(".preview/api-custom-positive", output)
        if generation == "negative":
            command = command.replace("--mode positive --checks not_a_server_error", "--mode negative --checks negative_data_rejection")
        command = "$beforeEncoding = $env:PYTHONIOENCODING\n" + command + '\n@{ before = $beforeEncoding; after = $env:PYTHONIOENCODING } | ConvertTo-Json | Set-Content "$out/encoding-state.json"\n'
        command_path = ROOT / f"{name}.ps1"
        command_path.write_text(command, encoding="ascii")
        env = dict(os.environ)
        if generation == "positive":
            env.pop("PYTHONIOENCODING", None)
        else:
            env["PYTHONIOENCODING"] = "ascii"
        with server("widgets_server.py", 8781, fixed, name) as service:
            execution = run([PWSH, "-NoProfile", "-File", command_path], name, env=env)
            exit_code = int((ROOT / output / "exit-code.txt").read_text(encoding="utf-8-sig").strip())
            encoding = json.loads((ROOT / output / "encoding-state.json").read_text(encoding="utf-8-sig"))
            assert encoding["before"] == encoding["after"], encoding
            RESULT["runs"].append({"name": name, "service": service, "generation": generation, "execution": execution,
                                   "cli_exit_code": exit_code, "encoding_state": encoding, "reports": output})
    name = f"final-widgets-{mode}-manual"
    with server("widgets_server.py", 8781, fixed, name) as service:
        requests = [{"request": data, "response": request(8781, "/widgets", data)}
                    for data in [{"quantity": 0}, {"quantity": -1}, {"quantity": 101}, {"quantity": "1"}, {}]]
        requests.append({"request": "GET /orders", "response": request(8781, "/orders")})
        RESULT["runs"].append({"name": name, "service": service, "requests": requests})

RESULT["cleanup"] = "Each owned server terminated in finally; ports 8771 and 8781 checked closed after each run."
write_json(ROOT / "raw-record.json", RESULT)
print(json.dumps({"runs": len(RESULT["runs"]), "cleanup": RESULT["cleanup"]}))
