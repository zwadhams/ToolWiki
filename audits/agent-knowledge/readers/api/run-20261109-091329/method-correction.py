import pathlib,json,subprocess,sys,os,time,urllib.request,urllib.error,hashlib
S=pathlib.Path(__file__).resolve().parent
E=pathlib.Path(r'C:\Users\zwadh\Repos\ToolWiki\audits\agent-knowledge\readers\api')/S.name
P=S/'env/Scripts/python.exe';T=S/'env/Scripts/schemathesis.exe';A=S/'adapted'
def save(p,t):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(str(t).encode('ascii','backslashreplace').decode('ascii'),encoding='ascii')
t=(A/'server.py').read_text();needle='        def do_GET(self):';t=t.replace(needle,'        def __getattr__(self, name):\n            if name.startswith("do_"):\n                return lambda: self.send_json(405, {"error": "Method not allowed"})\n            raise AttributeError(name)\n\n'+needle)
save(A/'server-method-fixed.py',t);save(E/'inputs/adapted/server-method-fixed.py',t)
cmd=[str(P),str(A/'server-method-fixed.py'),'--fixed','--port','8793'];d=E/'adapted-method-fixed-server';d.mkdir();save(d/'command.json',json.dumps(cmd))
out=open(S/'method.out','wb');err=open(S/'method.err','wb');p=subprocess.Popen(cmd,stdout=out,stderr=err,cwd=S)
try:
 for i in range(50):
  try:urllib.request.urlopen('http://127.0.0.1:8793/health',timeout=2).close();break
  except OSError:time.sleep(.1)
 for mode in ['positive','negative']:
  q=E/('adapted-method-fixed-'+mode);q.mkdir()
  c=[str(T),'--no-color','run',str(A/'parcel-contract.json'),'--url','http://127.0.0.1:8793','--include-path','/parcels','--include-method','POST','--phases','coverage','--mode',mode,'--checks','not_a_server_error' if mode=='positive' else 'negative_data_rejection,not_a_server_error','--max-time','20','--workers','1','--max-failures','1','--request-timeout','3','--seed','20261106','--report','junit','--report-junit-path',str(q/'junit.xml')]
  save(q/'command.json',json.dumps({'argv':c,'cwd':str(S),'environment_overrides':{'PYTHONIOENCODING':'utf-8'}},indent=2));r=subprocess.run(c,capture_output=True,timeout=60,env={**os.environ,'PYTHONIOENCODING':'utf-8'},cwd=S);save(q/'stdout.txt',r.stdout.decode('utf-8','backslashreplace'));save(q/'stderr.txt',r.stderr.decode('utf-8','backslashreplace'));save(q/'exit-code.txt',r.returncode);print(mode,r.returncode,flush=True)
finally:
 p.terminate();p.wait(timeout=10);out.close();err.close();save(d/'exit-code.txt',p.returncode);save(d/'stdout.txt',(S/'method.out').read_bytes().decode('utf-8','backslashreplace'));save(d/'stderr.txt',(S/'method.err').read_bytes().decode('utf-8','backslashreplace'))
 try:urllib.request.urlopen('http://127.0.0.1:8793/health',timeout=2);closed=False
 except OSError:closed=True
 save(d/'cleanup.json',json.dumps({'pid':p.pid,'own_process_exited':p.poll() is not None,'port_refuses_connection':closed,'stop_method':'Popen.terminate on Windows'}))
for q in E.rglob('*'):
 if q.is_file() and any(b>127 for b in q.read_bytes()):save(q,q.read_bytes().decode('utf-8','backslashreplace'))
save(E/'method-correction.py',pathlib.Path(__file__).read_text())
