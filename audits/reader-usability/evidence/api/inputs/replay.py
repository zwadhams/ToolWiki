"""Replay the known failure, or confirm the corrected behavior, on loopback."""

import argparse
import json
from urllib.error import HTTPError
from urllib.request import Request, urlopen


def request(port, method, route, body=None):
    data = None if body is None else json.dumps(body).encode("utf-8")
    operation = Request(f"http://127.0.0.1:{port}{route}", data=data, method=method,
                        headers={"Content-Type": "application/json"})
    try:
        response = urlopen(operation, timeout=5)
    except HTTPError as error:
        response = error
    with response:
        raw = response.read()
        return response.status, json.loads(raw) if raw else None


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8771)
    parser.add_argument("--expect-fixed", action="store_true")
    parser.add_argument("--reset", action="store_true")
    args = parser.parse_args()
    if args.reset:
        status, body = request(args.port, "POST", "/reset")
        print(json.dumps({"status": status, "body": body}))
        raise SystemExit(0 if status == 200 else 1)
    health, details = request(args.port, "GET", "/health")
    assert health == 200, (health, details)
    status, body = request(args.port, "POST", "/orders", {"quantity": 0})
    print(json.dumps({"request": {"method": "POST", "path": "/orders", "body": {"quantity": 0}},
                      "status": status, "response": body, "mode": details["mode"]}, indent=2))
    assert status == (201 if args.expect_fixed else 500), (status, body)
    if args.expect_fixed:
        assert body["total"] == 0 and body["unitPrice"] == 10
        fetched, order = request(args.port, "GET", f"/orders/{body['id']}")
        assert fetched == 200 and order == body
        print("Created order was read back successfully.")
