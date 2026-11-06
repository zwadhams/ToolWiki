"""Serve the built wiki on isolated loopback ports for reader walkthroughs."""

import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Event, Thread


class WikiHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/ToolWiki/"):
            self.path = self.path[len("/ToolWiki"):]
        return super().do_GET()

    def do_HEAD(self):
        if self.path.startswith("/ToolWiki/"):
            self.path = self.path[len("/ToolWiki"):]
        return super().do_HEAD()

    def log_message(self, format, *args):
        pass


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, action="append", required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2] / "dist"
    if not (root / "index.html").is_file():
        parser.error("Run pnpm build before starting the reader preview.")
    servers = []
    try:
        for port in args.port:
            server = ThreadingHTTPServer(("127.0.0.1", port), partial(WikiHandler, directory=str(root)))
            servers.append(server)
            Thread(target=server.serve_forever, daemon=True).start()
            print(f"Ready: http://127.0.0.1:{port}/ToolWiki/", flush=True)
        Event().wait()
    except KeyboardInterrupt:
        pass
    finally:
        for server in servers:
            server.shutdown()
            server.server_close()
