# Exact command record

Date: 2026-11-06. Reader task: disposable HTTP API testing. All API test
requests target 127.0.0.1. Public acquisition and package installation use
the URLs and package registry required by the visible guide.

Fresh scratch directory:
`C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/api/fresh-20261106`

Extracted repository root (all example and adaptation CLI commands run here):
`C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/api/fresh-20261106/ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9`

## Acquisition and installation

From the initially empty fresh scratch directory:

```powershell
Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip' -OutFile examples.zip
Expand-Archive -LiteralPath examples.zip -DestinationPath .
Set-Location '.\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
$apiPython = (Get-Command python).Source
& $apiPython --version
& $apiPython -m venv .preview/api-demo-env
.preview/api-demo-env/Scripts/python -m pip install -r examples/http-api/requirements-lock.txt
```

The `apiPython` result was
`C:\Users\zwadh\AppData\Local\Programs\Python\Python313\python.exe`.
The Python version was 3.13.15; PowerShell was 7.6.9.

## Public example

One terminal starts the server, the second performs requests. Ctrl+C stops
each server before starting the other mode.

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/server.py
.preview/api-demo-env/Scripts/python examples/http-api/replay.py
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --reset
# Ctrl+C in server terminal
.preview/api-demo-env/Scripts/python examples/http-api/server.py --fixed
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --expect-fixed
```

Native-output capture was added by redirecting replay stdout to the report
files. The recorded replays were repeated after reset because the first
PowerShell transcripts captured shell output but omitted native output.
This was a harness issue, not a wiki failure. Raw successful capture:

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --reset > 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\example-fixed-reset.stdout.txt'
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --expect-fixed > 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\example-fixed-replay.stdout.txt'
$LASTEXITCODE | Set-Content -Encoding ascii 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\example-fixed-replay.exit.txt'
# Stop fixed server, start faulty server, then:
.preview/api-demo-env/Scripts/python examples/http-api/replay.py > 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\example-faulty-replay.stdout.txt'
$LASTEXITCODE | Set-Content -Encoding ascii 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\example-faulty-replay.exit.txt'
.preview/api-demo-env/Scripts/python examples/http-api/replay.py --reset > 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\example-faulty-reset.stdout.txt'
```

Schemathesis wrapper commands, each with the matching server mode:

```powershell
.preview/api-demo-env/Scripts/python examples/http-api/run_schemathesis.py --output .preview/api-faulty
.preview/api-demo-env/Scripts/python examples/http-api/run_schemathesis.py --output .preview/api-fixed
```

## Independent supplied API

The three supplied files were copied without edits into:
`C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/api/fresh-20261106/shipment-copy`.
The copy's README identifies `http://127.0.0.1:8785`, schema
`service-schema.json`, POST `/reset`, and `server.py --fixed`.
The schema identifies POST `/shipments` and integer quantity 0 through 100.
Input digests verify the copied files match the supplied files.

Server commands, from the copy directory:

```powershell
& 'C:\Users\zwadh\Repos\ToolWiki\.preview\reader-retests\api\fresh-20261106\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9\.preview\api-demo-env\Scripts\python.exe' server.py
# Ctrl+C, then corrected mode:
& 'C:\Users\zwadh\Repos\ToolWiki\.preview\reader-retests\api\fresh-20261106\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9\.preview\api-demo-env\Scripts\python.exe' server.py --fixed
```

The exact adaptation block is retained in `adapt-run.ps1`. Its changes from
the visible guide are the schema path, base URL, operation path, and fresh
report directory; the negative variant uses the documented replacement.
From the extracted repository root, with the matching server mode:

```powershell
& 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\adapt-run.ps1' -Run positive-faulty
& 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\adapt-run.ps1' -Run positive-fixed
& 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\api\adapt-run.ps1' -Run negative-fixed
```

The manual deterministic shipment check uses basic PowerShell HTTP requests,
additional terminal knowledge supplied by the tester:

```powershell
$r = Invoke-WebRequest 'http://127.0.0.1:8785/shipments' -Method Post -ContentType 'application/json' -Body '{"quantity":0}' -SkipHttpErrorCheck
$r.StatusCode
$r.Content
Invoke-RestMethod 'http://127.0.0.1:8785/reset' -Method Post | ConvertTo-Json
```

No other agent's reports or previous audits were read. Historical execution
links in the visible page were not opened. No product source was consulted
to choose the route or resolve a procedure. The supplied input README,
schema, and server were read as authorized.
