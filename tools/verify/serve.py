import http.server, os, sys, functools
root, fix, port = sys.argv[1], sys.argv[2], int(sys.argv[3])
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = path.split('?',1)[0].split('#',1)[0]
        rel = p.lstrip('/') or 'index.html'
        a = os.path.join(root, rel)
        if os.path.exists(a): return a
        b = os.path.join(fix, rel)
        return b if os.path.exists(b) else a
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(('127.0.0.1', port), H).serve_forever()
