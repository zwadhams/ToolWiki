import sys, urllib.request, urllib.error, hashlib, json, pathlib, datetime
from html.parser import HTMLParser
from urllib.parse import urljoin
ROOT=pathlib.Path(__file__).resolve().parent
class Reader(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.parts=[]; self.hidden=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'): self.hidden+=1
        if tag in ('a','link') and 'href' in a: self.links.append({'tag':tag, **a})
        if tag in ('h1','h2','h3','p','li','tr','section','div'): self.parts.append('\n')
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.hidden=max(0,self.hidden-1)
    def handle_data(self,data):
        if not self.hidden and data.strip(): self.parts.append(data.strip()+' ')
def fetch(url,name):
    rec={'url':url,'fetched_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    try:
        try: r=urllib.request.urlopen(url,timeout=30)
        except urllib.error.HTTPError as e: r=e
        with r:
            b=r.read(); rec.update(status=r.status,bytes=len(b),sha256=hashlib.sha256(b).hexdigest(),content_type=r.headers.get('Content-Type'),final_url=r.url)
        if name!='-':
            (ROOT/name).write_bytes(b); rec['artifact']=name
        print(json.dumps(rec))
        if name!='-' and ('html' in rec.get('content_type','') or name.endswith('.html')):
            p=Reader();p.feed(b.decode('utf-8')); print('TEXT:');print(''.join(p.parts));print('LINKS:');print(json.dumps([{**x,'absolute':urljoin(url,x['href'])} for x in p.links],indent=2,ensure_ascii=True))
        elif name!='-': print(b.decode('utf-8'))
    except Exception as e:
        rec.update(status=None,bytes=0,sha256=None,error=str(e)); print(json.dumps(rec))
    with (ROOT/'trace.jsonl').open('a',encoding='ascii') as f:f.write(json.dumps(rec,ensure_ascii=True)+'\n')
    return rec
if __name__=='__main__': fetch(sys.argv[1],sys.argv[2])
