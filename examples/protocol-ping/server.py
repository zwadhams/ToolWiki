"""A stateless loopback protocol target; each connection handles one line."""

import argparse
import socketserver


def create_server(port=8021, fixed=False):
    class Handler(socketserver.StreamRequestHandler):
        def handle(self):
            self.connection.settimeout(2)
            line = self.rfile.readline(1025)
            if line == b"HEALTH\r\n":
                self.wfile.write(b"READY\r\n")
            elif line.startswith(b"PING ") and line.endswith(b"\r\n") and len(line) <= 1024:
                value = line[5:-2]
                if not fixed and value == b"TRIGGER":
                    return  # Intentional protocol defect: valid request gets no reply.
                self.wfile.write(b"PONG " + value + b"\r\n")
            else:
                self.wfile.write(b"ERR\r\n")

    return socketserver.TCPServer(("127.0.0.1", port), Handler)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--port", type=int, default=8021)
    parser.add_argument("--fixed", action="store_true")
    args = parser.parse_args()
    with create_server(args.port, args.fixed) as server:
        print(f"Ready on 127.0.0.1:{server.server_address[1]}; mode={'fixed' if args.fixed else 'faulty'}. Ctrl+C stops it.", flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
