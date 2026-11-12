"""Download the pinned official TLC archive after checking its identity."""
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent
lock = json.loads((ROOT / "tool-lock.json").read_text(encoding="utf-8"))
destination = ROOT / ".tools" / lock["filename"]

if destination.exists():
    data = destination.read_bytes()
else:
    with urlopen(lock["url"], timeout=60) as response:
        data = response.read(lock["bytes"] + 1)

if len(data) != lock["bytes"] or hashlib.sha256(data).hexdigest() != lock["sha256"]:
    raise SystemExit("TLC archive does not match tool-lock.json. No file was written.")
if hashlib.sha1(data).hexdigest() != lock["releaseSha1"]:
    raise SystemExit("TLC archive does not match the published release checksum.")
destination.parent.mkdir(exist_ok=True)
destination.write_bytes(data)
print(f"Verified {lock['filename']}: SHA-256 {lock['sha256']}")
