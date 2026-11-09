"""Disposable loopback API with a reproducible zero-quantity defect."""

import argparse
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from pathlib import Path
from urllib.parse import urlsplit


def create_server(port=8793, fixed=False):
    orders = {}
    next_id = 1

    class Handler(BaseHTTPRequestHandler):
        def setup(self):
            super().setup()
            self.connection.settimeout(5)

        def log_message(self, format, *args):
            pass

        def send_json(self, status, data=None):
            body = b"" if data is None else json.dumps(data).encode("utf-8")
            self.send_response(status)
            if data is not None:
                self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def do_GET(self):
            route = urlsplit(self.path).path
            if route == "/health":
                return self.send_json(200, {"status": "ready", "mode": "fixed" if fixed else "faulty"})
            if route == "/parcel-contract.json":
                schema = json.loads(Path(__file__).with_name("parcel-contract.json").read_text())
                schema["servers"] = [{"url": f"http://127.0.0.1:{self.server.server_port}"}]
                return self.send_json(200, schema)
            if route.startswith("/parcels/"):
                order = orders.get(route.removeprefix("/parcels/"))
                return self.send_json(200, order) if order else self.send_json(404, {"error": "Order not found"})
            return self.send_json(404, {"error": "Route not found"})

        def do_POST(self):
            nonlocal next_id
            route = urlsplit(self.path).path
            if route == "/reset":
                orders.clear()
                next_id = 1
                return self.send_json(200, {"reset": True})
            if route != "/parcels":
                return self.send_json(404, {"error": "Route not found"})
            try:
                length = int(self.headers.get("Content-Length", "0"))
            except ValueError:
                return self.send_json(400, {"error": "Invalid content length"})
            if not 0 < length <= 4096:
                return self.send_json(400, {"error": "Provide one small JSON order"})
            try:
                data = json.loads(self.rfile.read(length))
            except (ValueError, UnicodeDecodeError):
                return self.send_json(400, {"error": "Invalid JSON"})
            if (not isinstance(data, dict) or set(data) != {"quantity"}
                    or type(data["quantity"]) is not int or not 0 <= data["quantity"] <= 100):
                return self.send_json(400, {"error": "quantity must be an integer from 0 through 100"})
            quantity = data["quantity"]
            total = quantity * 10
            try:
                unit_price = 10 if fixed else total // quantity
            except ZeroDivisionError:
                return self.send_json(500, {"error": "Zero-quantity unit-price defect"})
            if len(orders) >= 10000:
                return self.send_json(429, {"error": "Fixture full; reset before another run"})
            identifier = str(next_id)
            next_id += 1
            order = {"id": identifier, "quantity": quantity, "total": total, "unitPrice": unit_price}
            orders[identifier] = order
            return self.send_json(201, order)

        def do_DELETE(self):
            route = urlsplit(self.path).path
            if not route.startswith("/parcels/"):
                return self.send_json(404, {"error": "Route not found"})
            identifier = route.removeprefix("/parcels/")
            if orders.pop(identifier, None) is None:
                return self.send_json(404, {"error": "Order not found"})
            return self.send_json(204)

    return HTTPServer(("127.0.0.1", port), Handler)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8793)
    parser.add_argument("--fixed", action="store_true")
    args = parser.parse_args()
    with create_server(args.port, args.fixed) as server:
        print(f"Ready on http://127.0.0.1:{server.server_port}; mode={'fixed' if args.fixed else 'faulty'}. Ctrl+C stops the server.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
