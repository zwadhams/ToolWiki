import pathlib, urllib.request, urllib.error, hashlib, json, datetime
from html.parser import HTMLParser
from urllib.parse import urljoin
ROOT=pathlib.Path(__file__).resolve().parent
BASE='http://127.0.0.1:4324/ToolWiki/'
class Reader(HTMLParser):
    def __init__(self): super().__init__(); self.links=[]; self.parts=[]; self.hidden=0; self.main=False; self.main_parts=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='main': self.main=True
        if tag in ('script','style'): self.hidden+=1
        if tag in ('a','link') and 'href' in a: self.links.append({'tag':tag, **a})
        if tag in ('h1','h2','h3','p','li','tr','section','div'):
            self.parts.append('\n')
            if self.main:self.main_parts.append('\n')
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.hidden=max(0,self.hidden-1)
        if tag=='main':self.main=False
    def handle_data(self,data):
        if not self.hidden and data.strip():
            self.parts.append(data.strip()+' ')
            if self.main:self.main_parts.append(data.strip()+' ')
def fetch(url,name=None):
    if not url.startswith('http'):url=urljoin(BASE,url)
    rec={'url':url,'fetched_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    try:
        try:r=urllib.request.urlopen(url,timeout=30)
        except urllib.error.HTTPError as e:r=e
        with r:
            b=r.read();rec.update(status=r.status,bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),content_type=r.headers.get('Content-Type'),final_url=r.url)
        if name:
            (ROOT/name).write_bytes(b);rec['artifact']=name
    except Exception as e:
        rec.update(status=None,bytes=0,sha256=None,error=str(e));b=None
    with (ROOT/'trace.jsonl').open('a',encoding='ascii') as f:f.write(json.dumps(rec,ensure_ascii=True)+'\n')
    print(json.dumps(rec,ensure_ascii=True))
    return b,rec
