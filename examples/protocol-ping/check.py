"""Run two selected protocol mutations and retain the observed replies."""

import argparse
from datetime import datetime, timezone
import hashlib
from importlib.metadata import version
import json
from pathlib import Path
import platform
import socket

from boofuzz import Group, Request, Session, Static, Target, TCPSocketConnection
from boofuzz.exception import BoofuzzRestartFailedError


def roundtrip(port, data):
    with socket.create_connection(("127.0.0.1", port), timeout=2) as connection:
        connection.sendall(data)
        connection.shutdown(socket.SHUT_WR)
        return connection.recv(2048)


def run(port, output):
    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        raise ValueError("Choose a new output directory to preserve earlier evidence.")
    root = Path(__file__).resolve().parent
    observations = []
    record = {"date": datetime.now(timezone.utc).isoformat(), "tool": "boofuzz", "version": version("boofuzz"),
              "python": platform.python_version(), "host": platform.platform(), "port": port,
              "scope": "Two selected PING values; response contract only, no process-crash or memory monitor.",
              "inputs_sha256": {name: hashlib.sha256((root / name).read_bytes()).hexdigest() for name in ["server.py", "check.py"]},
              "status": "failed", "observations": observations}

    def inspect_reply(target, fuzz_data_logger, session, **kwargs):
        expected = b"PONG " + session.last_send[5:]
        passed = session.last_recv == expected
        observations.append({"request_hex": session.last_send.hex(), "reply_hex": session.last_recv.hex(),
                             "expected_hex": expected.hex(), "passed": passed})
        if passed:
            fuzz_data_logger.log_pass("Expected PONG reply received.")
        else:
            fuzz_data_logger.log_fail("Valid PING request did not receive its PONG reply.")

    def reset_connection(target, fuzz_data_logger, session, **kwargs):
        # No server state survives a request. Check readiness before the next connection.
        try:
            ready = roundtrip(port, b"HEALTH\r\n")
        except OSError as error:
            raise BoofuzzRestartFailedError("The target readiness probe failed.") from error
        if ready != b"READY\r\n":
            raise BoofuzzRestartFailedError("The stateless target is not ready.")
        fuzz_data_logger.log_info("Target ready; the next connection starts a fresh request.")

    try:
        if record["version"] != "0.4.2":
            raise ValueError("Use the pinned boofuzz 0.4.2 environment.")
        if roundtrip(port, b"PING hello\r\n") != b"PONG hello\r\n":
            raise RuntimeError("Baseline response failed before fuzzing.")
        session = Session(target=Target(connection=TCPSocketConnection("127.0.0.1", port, send_timeout=2, recv_timeout=2)),
                          index_end=2, web_port=None, keep_web_open=False, receive_data_after_fuzz=True,
                          post_test_case_callbacks=[inspect_reply], restart_callbacks=[reset_connection],
                          restart_sleep_time=0, restart_threshold=1, restart_timeout=3,
                          db_filename=str(output / "boofuzz.db"))
        session.connect(Request("ping", children=(Static("command", b"PING "),
                        Group("value", values=[b"TRIGGER", b"world"], default_value=b"hello"), Static("end", b"\r\n"))))
        session.fuzz()
        record["status"] = "incomplete" if len(observations) != 2 else "completed-findings" if any(not item["passed"] for item in observations) else "completed-no-findings"
    except Exception as error:
        record["reason"] = f"{type(error).__name__}: {error}"
    finally:
        (output / "run.json").write_text(json.dumps(record, indent=2, ensure_ascii=True) + "\n", encoding="ascii")
    print(record["status"])
    return 0 if record["status"] == "completed-no-findings" else 1 if record["status"] == "completed-findings" else 2


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8021)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    raise SystemExit(run(args.port, args.output.resolve()))
