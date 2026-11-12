import pathlib,json,sys,io,contextlib,hashlib
from urllib.parse import urljoin,urlsplit,urlunsplit
from fetch import fetch,ROOT,BASE
manifest=json.loads((ROOT/'manifest.json').read_bytes())
history=json.loads((ROOT/'history-index.json').read_bytes())
index=json.loads((ROOT/'index.json').read_bytes())
selected={'tools/ruff','tools/pylint','tools/mypy','tools/pyright','tools/playwright','tools/axe-core','guides/python-checks','guides/browser-testing','guides/data-access','guides/data-reference','guides/get-examples','comparisons/ruff-and-mypy'}
cache={'index.json':(ROOT/'index.json').read_bytes(),'catalog.json':(ROOT/'catalog.json').read_bytes()}
verification={'manifest_revision':manifest['revision'],'origin_mapping':{'canonical_site':history['site'],'tested_site':BASE,'rule':'Replace origin only for canonical ToolWiki URLs; keep canonical URLs in citations.'},'snapshots':[],'manifest_files':[],'records':[]}
snapshots={}
for entry in history['entries']:
    canonical=urljoin(history['site'],entry['path'])
    parts=urlsplit(canonical);url=urlunsplit(('http','127.0.0.1:4324',parts.path,parts.query,parts.fragment))
    with contextlib.redirect_stdout(io.StringIO()):b,r=fetch(url)
    o=json.loads(b);snapshots[entry['revision']]=o
    check={'url':url,'canonical_url':canonical,'revision':entry['revision'],'status':r['status'],'bytes':r['bytes'],'sha256':r['sha256'],'expected_bytes':entry['bytes'],'expected_sha256':entry['sha256'],'bytes_match':r['bytes']==entry['bytes'],'sha256_match':r['sha256']==entry['sha256'],'revision_match':o['revision']==entry['revision'],'documentCount':len(o['documents']),'count_match':len(o['documents'])==entry['documentCount']}
    verification['snapshots'].append(check);print('SNAPSHOT',json.dumps(check))
    if entry['revision']==manifest['revision']:
        cache[manifest['snapshot']['path']]=b
        verification['manifest_snapshot_matches_history']=all(entry[k]==manifest['snapshot'][k] for k in ['bytes','sha256'])
current=snapshots[manifest['revision']];docs={d['id']:d for d in current['documents']}
for item in manifest['files']:
    path=item['path'];name=None
    if path.startswith('documents/'):
        ident=path[len('documents/'):].rsplit('.',1)[0]
        if ident in selected:name=ident.replace('/','--')+'.'+path.rsplit('.',1)[1]
    if path in cache:
        b=cache[path];status=200
    else:
        with contextlib.redirect_stdout(io.StringIO()):b,r=fetch(urljoin(BASE+'knowledge/v1/',path),name)
        status=r['status']
    check={'path':path,'status':status,'expected_bytes':item['bytes'],'expected_sha256':item['sha256'],'actual_bytes':len(b) if b is not None else None,'actual_sha256':hashlib.sha256(b).hexdigest() if b is not None else None}
    check['bytes_match']=check['actual_bytes']==item['bytes'];check['sha256_match']=check['actual_sha256']==item['sha256']
    if path.startswith('documents/') and path.endswith('.json') and b is not None:
        d=json.loads(b);check['matches_snapshot']=d==docs[d['id']]
        if d['id'] in selected:
            verification['records'].append({'id':d['id'],'url':d['url'],'revision':d['revision'],'artifact':name,'matches_snapshot':check['matches_snapshot'],'sha256_match':check['sha256_match'],'bytes_match':check['bytes_match']})
    verification['manifest_files'].append(check)
    if not check['bytes_match'] or not check['sha256_match'] or check.get('matches_snapshot') is False:print('FAILURE',json.dumps(check))
verification['history_deltas']=[]
for entry in history['entries']:
    if entry.get('previousRevision') is None:continue
    newer={d['id']:d for d in snapshots[entry['revision']]['documents']};older={d['id']:d for d in snapshots[entry['previousRevision']]['documents']}
    actual={'added':sorted(set(newer)-set(older)),'changed':sorted(i for i in set(newer)&set(older) if newer[i]['revision']!=older[i]['revision']),'removed':sorted(set(older)-set(newer))}
    delta={'revision':entry['revision'],'previousRevision':entry['previousRevision'],'sets':{k:{'count':len(ids),'matches_feed':ids==sorted(d['id'] for d in entry['changes'][k]),'ids':ids} for k,ids in actual.items()}}
    delta['changed_revision_values_match']=all(d['revision']==newer[d['id']]['revision'] and d['previousRevision']==older[d['id']]['revision'] for d in entry['changes']['changed'])
    delta['added_revision_values_match']=all(d['revision']==newer[d['id']]['revision'] for d in entry['changes']['added'])
    verification['history_deltas'].append(delta)
verification['discovery_revisions_match']=index['revision']==manifest['revision']==json.loads(cache['catalog.json'])['revision']==history['currentRevision']
(ROOT/'verification.json').write_text(json.dumps(verification,indent=2,ensure_ascii=True)+'\n',encoding='ascii')
(ROOT/'snapshot-document-revisions.json').write_text(json.dumps({rev:{d['id']:d['revision'] for d in obj['documents']} for rev,obj in snapshots.items()},indent=2,ensure_ascii=True)+'\n',encoding='ascii')
print('SUMMARY',json.dumps({'manifest_revision':manifest['revision'],'manifest_files':len(verification['manifest_files']),'manifest_files_pass':all(c['status']==200 and c['bytes_match'] and c['sha256_match'] for c in verification['manifest_files']),'all_document_objects_match_snapshot':all(c.get('matches_snapshot',True) for c in verification['manifest_files']),'selected_records_retained':len(verification['records']),'delta_counts':[{k:s['count'] for k,s in d['sets'].items()} for d in verification['history_deltas']]}))
