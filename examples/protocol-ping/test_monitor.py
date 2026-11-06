import gc
import json
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch

import check
from server import create_server


class ReadinessTests(unittest.TestCase):
    def test_readiness_timeout_cannot_be_reported_as_a_completed_run(self):
        server = create_server(0, False)
        worker = threading.Thread(target=server.serve_forever, daemon=True)
        worker.start()
        original = check.roundtrip

        def readiness_failure(port, data):
            if data == b"HEALTH\r\n":
                raise TimeoutError("Controlled readiness timeout")
            return original(port, data)

        try:
            with tempfile.TemporaryDirectory(prefix="toolwiki-protocol-") as directory:
                output = Path(directory)
                self.assertEqual(output.resolve().parent, Path(tempfile.gettempdir()).resolve())
                with patch.object(check, "roundtrip", side_effect=readiness_failure):
                    status = check.run(server.server_address[1], output)
                # The CLI exits after one run. In-process tests must release the
                # session/logger reference cycle before removing its SQLite file.
                gc.collect()
                record = json.loads((output / "run.json").read_text())
                self.assertEqual(status, 2)
                self.assertEqual(record["status"], "failed")
                self.assertIn("BoofuzzRestartFailedError", record["reason"])
        finally:
            server.shutdown()
            server.server_close()
            worker.join(timeout=5)


if __name__ == "__main__":
    unittest.main()
