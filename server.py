from http.server import BaseHTTPRequestHandler, HTTPServer
import os

HOST = "0.0.0.0"
PORT = 8000

class JSONHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/data":
            try:
                with open("data.json", "rb") as f:
                    data = f.read()

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Content-Length", str(len(data)))
                self.end_headers()
                self.wfile.write(data)

            except FileNotFoundError:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(b"data.json not found")

        else:
            self.send_response(404)
            self.end_headers()

server = HTTPServer((HOST, PORT), JSONHandler)

print(f"Serving on http://localhost:{PORT}/data")
server.serve_forever()