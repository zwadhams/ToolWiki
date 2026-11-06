"""Check that failed runs cannot masquerade as clean or overwrite evidence."""

from pathlib import Path
import subprocess
import sys
from tempfile import TemporaryDirectory
import unittest
from unittest.mock import patch

import run_checks


class EvidenceTests(unittest.TestCase):
    def test_timeout_retains_partial_output(self):
        with TemporaryDirectory() as directory:
            output = Path(directory)
            timeout = subprocess.TimeoutExpired(["mypy"], 120, output=b"partial report\n", stderr=b"still checking\n")
            with patch.object(run_checks, "version", return_value="1.18.2"), patch.object(run_checks.subprocess, "run", side_effect=timeout):
                result = run_checks.run_check("mypy", ["mypy"], output, "bad/greeting.py")
            self.assertEqual(result["status"], "incomplete")
            self.assertIsNone(result["return_code"])
            self.assertEqual((output / "mypy.txt").read_text(), "partial report\n")
            self.assertEqual((output / "mypy.stderr.txt").read_text(), "still checking\n")

    def test_wrong_version_never_runs_the_check(self):
        with TemporaryDirectory() as directory:
            with patch.object(run_checks, "version", return_value="unexpected"), patch.object(run_checks.subprocess, "run") as process:
                result = run_checks.run_check("ruff", ["ruff"], Path(directory), "good/greeting.py")
            self.assertEqual(result["status"], "failed")
            self.assertIn("0.14.3", result["reason"])
            process.assert_not_called()

    def test_failure_without_findings_is_not_clean(self):
        with TemporaryDirectory() as directory:
            process = subprocess.CompletedProcess(["ruff"], 2, stdout="", stderr="invalid configuration")
            with patch.object(run_checks, "version", return_value="0.14.3"), patch.object(run_checks.subprocess, "run", return_value=process):
                result = run_checks.run_check("ruff", ["ruff"], Path(directory), "good/greeting.py")
            self.assertEqual(result["status"], "failed")
            self.assertEqual((Path(directory) / "ruff.stderr.txt").read_text(), "invalid configuration")

    def test_existing_artifacts_are_preserved(self):
        with TemporaryDirectory() as directory:
            report = Path(directory) / "ruff.json"
            report.write_text("previous report")
            result = subprocess.run([sys.executable, str(run_checks.ROOT / "run_checks.py"), "good", "--output", directory], capture_output=True, text=True)
            self.assertEqual(result.returncode, 2)
            self.assertEqual(report.read_text(), "previous report")
            self.assertFalse((Path(directory) / "run.json").exists())


if __name__ == "__main__":
    unittest.main()
