import pathlib,sys,subprocess,os,json,hashlib,platform,struct,time,urllib.request,urllib.error,shutil
S=pathlib.Path(__file__).resolve().parent
E=pathlib.Path(r'C:\Users\zwadh\Repos\ToolWiki\audits\agent-knowledge\readers\api')/S.name
E.mkdir(exist_ok=True)
def save(p,t):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(str(t).encode('ascii','backslashreplace').decode('ascii'),encoding='ascii')
def run(name,cmd,timeout=120):
 d=E/name;d.mkdir();save(d/'command.json',json.dumps({'argv':list(map(str,cmd)),'cwd':str(S),'environment_overrides':{'PYTHONIOENCODING':'utf-8'}},indent=2))
 try:
  r=subprocess.run(list(map(str,cmd)),cwd=S,env={**os.environ,'PYTHONIOENCODING':'utf-8'},capture_output=True,timeout=timeout)
  save(d/'stdout.txt',r.stdout.decode('utf-8','backslashreplace'));save(d/'stderr.txt',r.stderr.decode('utf-8','backslashreplace'));save(d/'exit-code.txt',r.returncode)
  print(name,r.returncode,flush=True);return r.returncode
 except subprocess.TimeoutExpired as ex:
  save(d/'stdout.txt',(ex.stdout or b'').decode('utf-8','backslashreplace'));save(d/'stderr.txt',(ex.stderr or b'').decode('utf-8','backslashreplace'));save(d/'exit-code.txt','TIMEOUT');raise
save(E/'host.json',json.dumps({'sys_version':sys.version,'executable':sys.executable,'platform_machine':platform.machine(),'pointer_bits':struct.calcsize('P')*8,'processor_identifier':os.environ.get('PROCESSOR_IDENTIFIER'),'powershell':'7.6.9','host_os_architecture':'Arm64','interpreter_build':'AMD64'},indent=2))
F=S/'examples/http-api'
shutil.copytree(F,E/'inputs/original')
run('venv',[sys.executable,'-m','venv',S/'env'])
P=S/'env/Scripts/python.exe';T=S/'env/Scripts/schemathesis.exe'
if run('install',[P,'-m','pip','install','-r',F/'requirements-lock.txt'],300):raise SystemExit('install failed')
run('versions',[P,'-m','pip','freeze']);run('tool-version',[T,'--version'])
A=S/'adapted';A.mkdir()
for n in ['server.py','openapi.json']:
 t=(F/n).read_text().replace('/orders','/parcels').replace('8771','8793').replace('openapi.json','parcel-contract.json')
 save(A/('parcel-contract.json' if n=='openapi.json' else n),t)
shutil.copytree(A,E/'inputs/adapted')
def request(port,method,path,body=None):
 data=None if body is None else json.dumps(body).encode('ascii')
 req=urllib.request.Request(f'http://127.0.0.1:{port}{path}',data=data,method=method,headers={'Content-Type':'application/json'})
 try:r=urllib.request.urlopen(req,timeout=3)
 except urllib.error.HTTPError as ex:r=ex
 with r:return {'method':method,'path':path,'input':body,'status':r.status,'body':r.read().decode('utf-8','backslashreplace')}
def cli(name,mode):
 d=E/name
 return run(name,[T,'--no-color','run',A/'parcel-contract.json','--url','http://127.0.0.1:8793','--include-path','/parcels','--include-method','POST','--phases','coverage','--mode',mode,'--checks','not_a_server_error' if mode=='positive' else 'negative_data_rejection,not_a_server_error','--max-time','20','--workers','1','--max-failures','1','--request-timeout','3','--seed','20261106','--report','junit','--report-junit-path',d/'junit.xml'],60)
for adapted in [False,True]:
 for fixed in [False,True]:
  label=('adapted' if adapted else 'original')+('-fixed' if fixed else '-faulty');port=8793 if adapted else 8771
  cmd=[str(P),str((A if adapted else F)/'server.py')]+(['--fixed'] if fixed else [])
  if adapted:cmd+=['--port',str(port)]
  d=E/(label+'-server');d.mkdir();save(d/'command.json',json.dumps(cmd))
  out=open(S/(label+'.out'),'wb');err=open(S/(label+'.err'),'wb');proc=subprocess.Popen(cmd,cwd=S,stdout=out,stderr=err)
  try:
   for i in range(50):
    try:
     health=request(port,'GET','/health');break
    except OSError:time.sleep(.1)
   else:raise RuntimeError('readiness failed')
   save(d/'health.json',json.dumps(health,indent=2))
   if not adapted:
    run(label+'-replay',[P,F/'replay.py']+(['--expect-fixed'] if fixed else []))
    run(label+'-reset',[P,F/'replay.py','--reset'])
    run(label+'-generated',[P,F/'run_schemathesis.py','--output',E/(label+'-wrapper')],60)
   else:
    rows=[]
    for body in [{'quantity':0},{'quantity':2},{'quantity':-1},{'quantity':101},{'quantity':True},{'quantity':'2'},{},{'quantity':1,'extra':1}]:rows.append(request(port,'POST','/parcels',body))
    save(E/(label+'-requests.json'),json.dumps(rows,indent=2));request(port,'POST','/reset')
    cli(label+'-positive','positive');request(port,'POST','/reset');cli(label+'-negative','negative')
  finally:
   proc.terminate();proc.wait(timeout=10);out.close();err.close()
   save(d/'exit-code.txt',proc.returncode);save(d/'pid.txt',proc.pid);save(d/'stdout.txt',(S/(label+'.out')).read_bytes().decode('utf-8','backslashreplace'));save(d/'stderr.txt',(S/(label+'.err')).read_bytes().decode('utf-8','backslashreplace'))
   try:request(port,'GET','/health');closed=False
   except OSError:closed=True
   save(d/'cleanup.json',json.dumps({'own_process_exited':proc.poll() is not None,'port_refuses_connection':closed,'stop_method':'Popen.terminate on Windows'},indent=2))
# Escape wrapper and JUnit output to ASCII, preserving every non-ASCII code point as a literal escape.
for q in E.rglob('*'):
 if q.is_file():
  b=q.read_bytes()
  if any(x>127 for x in b):save(q,b.decode('utf-8','backslashreplace'))
shutil.copy2(__file__,E/'execute.py')
hashes={str(q.relative_to(E)):hashlib.sha256(q.read_bytes()).hexdigest() for q in E.rglob('*') if q.is_file()}
hashes['downloaded-examples.zip']=hashlib.sha256((S/'examples.zip').read_bytes()).hexdigest()
save(E/'sha256.json',json.dumps(hashes,indent=2))
