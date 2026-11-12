# HTTP-only reader evidence

The [final report](final/report.md) tests the committed release using only the
site's entry URL and discovered HTTP links. It records complete document
revisions, requirements, evidence limits, snapshot integrity, static comparison
access, change semantics, and example-download consistency. The [summary](final/summary.json)
records all 345 requests returning 200 and all 332 manifest files passing exact
byte-count and SHA-256 checks. The parent-directory report captures an earlier
integration revision and remains historical evidence for that revision.

## Exact HTML storage

Generated HTML contains Unicode UI glyphs. To keep delivered text ASCII without
changing response bytes, each captured `.html` response is stored as `.html.b64`.
[The storage index](html-storage.json) maps original response filenames used in
the reports and traces to encoded files, byte counts, and SHA-256 checksums.
Other exact response records remain in their original JSON or Markdown format.
The original local `.html` capture files are ignored by Git.

To recover a response from the repository root:

```python
import base64
from pathlib import Path

encoded = Path("audits/direct-access/final/comparison.html.b64")
Path("comparison.html").write_bytes(base64.b64decode(encoded.read_text("ascii")))
```

Compare the decoded bytes with the corresponding entry in `html-storage.json`
or the request trace. Text extracts are reading aids and are not byte-identical
substitutes for the HTML response. The collector scripts use HTTP only; they do
not inspect repository implementation files or call the local MCP server.
