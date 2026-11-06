"""Retain exact native bytes while keeping report text ASCII."""

import base64
import json
from pathlib import Path

root = Path(__file__).resolve().parent
converted = []
for path in sorted(root.rglob("*")):
    if not path.is_file() or path.suffix not in {".txt", ".md", ".json", ".xml", ".ps1", ".py"}:
        continue
    original = path.read_bytes()
    if all(value < 128 for value in original):
        continue
    original.decode("utf-8")
    path.with_name(path.name + ".raw.b64").write_bytes(base64.b64encode(original) + b"\n")
    path.write_bytes(original.decode("utf-8").encode("ascii", "backslashreplace"))
    converted.append(str(path.relative_to(root)))
(root / "ascii-conversions.json").write_text(json.dumps(converted, indent=2) + "\n", encoding="ascii")
for path in root.rglob("*"):
    if path.is_file():
        assert all(value < 128 for value in path.read_bytes()), str(path)
print("ASCII report verification passed. Converted files: " + str(len(converted)))
