import socket
import threading
import unittest

from server import create_server


class ProtocolTests(unittest.TestCase):
    def start(self, fixed=False):
        server = create_server(0, fixed)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()

        def stop():
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)
            self.assertFalse(worker.is_alive())

        self.addCleanup(stop)
        self.assertEqual(server.server_address[0], "127.0.0.1")
        return server.server_address[1]

    def request(self, port, data):
        with socket.create_connection(("127.0.0.1", port), timeout=2) as connection:
            connection.sendall(data)
            connection.shutdown(socket.SHUT_WR)
            return connection.recv(2048)

    def test_fault_and_correction(self):
        faulty, fixed = self.start(), self.start(True)
        self.assertEqual(self.request(faulty, b"PING TRIGGER\r\n"), b"")
        self.assertEqual(self.request(fixed, b"PING TRIGGER\r\n"), b"PONG TRIGGER\r\n")

    def test_connections_reset_state_and_health_survives_the_fault(self):
        port = self.start()
        self.request(port, b"PING TRIGGER\r\n")
        self.assertEqual(self.request(port, b"HEALTH\r\n"), b"READY\r\n")
        self.assertEqual(self.request(port, b"PING world\r\n"), b"PONG world\r\n")
        self.assertEqual(self.request(port, b"invalid\r\n"), b"ERR\r\n")


if __name__ == "__main__":
    unittest.main()
