import json
from pathlib import Path
import threading
import unittest

from replay import request
from server import create_server


class FixtureTests(unittest.TestCase):
    def start(self, fixed):
        server = create_server(port=0, fixed=fixed)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()

        def stop():
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)
            self.assertFalse(worker.is_alive())

        self.addCleanup(stop)
        self.assertEqual(server.server_address[0], "127.0.0.1")
        return server.server_port

    def test_known_failure_and_corrected_trace(self):
        faulty, fixed = self.start(False), self.start(True)
        self.assertEqual(request(faulty, "POST", "/orders", {"quantity": 0})[0], 500)
        status, order = request(fixed, "POST", "/orders", {"quantity": 0})
        self.assertEqual(status, 201)
        self.assertEqual(order["total"], 0)
        self.assertEqual(order["unitPrice"], 10)
        self.assertEqual(request(fixed, "GET", f"/orders/{order['id']}"), (200, order))

    def test_creation_consumption_deletion_and_reset(self):
        port = self.start(False)
        status, order = request(port, "POST", "/orders", {"quantity": 2})
        self.assertEqual((status, order["total"]), (201, 20))
        self.assertEqual(request(port, "GET", f"/orders/{order['id']}"), (200, order))
        self.assertEqual(request(port, "DELETE", f"/orders/{order['id']}"), (204, None))
        self.assertEqual(request(port, "GET", f"/orders/{order['id']}")[0], 404)
        request(port, "POST", "/orders", {"quantity": 3})
        self.assertEqual(request(port, "POST", "/reset"), (200, {"reset": True}))
        self.assertEqual(request(port, "GET", "/orders/2")[0], 404)
        self.assertEqual(request(port, "POST", "/orders", {"quantity": 1})[1]["id"], "1")

    def test_invalid_values_are_input_errors_in_both_modes(self):
        for fixed in [False, True]:
            port = self.start(fixed)
            for value in [{}, [], {"quantity": True}, {"quantity": -1}, {"quantity": 101}, {"quantity": "1"}, {"quantity": 1, "extra": 1}]:
                with self.subTest(fixed=fixed, value=value):
                    self.assertEqual(request(port, "POST", "/orders", value)[0], 400)

    def test_live_schema_preserves_resource_links_and_selected_port(self):
        port = self.start(True)
        status, schema = request(port, "GET", "/openapi.json")
        self.assertEqual(status, 200)
        self.assertEqual(schema["servers"], [{"url": f"http://127.0.0.1:{port}"}])
        operations = {operation["operationId"] for item in schema["paths"].values() for method, operation in item.items() if method in ["post", "get", "delete"]}
        for link in schema["paths"]["/orders"]["post"]["responses"]["201"]["links"].values():
            self.assertIn(link["operationId"], operations)
        schema["servers"] = [{"url": "http://127.0.0.1:8771"}]
        self.assertEqual(schema, json.loads(Path(__file__).with_name("openapi.json").read_text()))


if __name__ == "__main__":
    unittest.main()
