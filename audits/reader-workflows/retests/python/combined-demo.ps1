$ErrorActionPreference = 'Stop'
Start-Transcript -Path "$PSScriptRoot/combined-demo.txt"
$ReportsRoot = $PSScriptRoot
$ScratchRoot = 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python'
New-Item -ItemType Directory -Path "$ScratchRoot/combined-download" -ErrorAction Stop | Out-Null
Set-Location "$ScratchRoot/combined-download"
Expand-Archive -LiteralPath "$ScratchRoot/public-download/examples.zip" -DestinationPath .
Set-Location './ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
Set-Location examples/python-checks
$Python = 'python'
& $Python --version
& $Python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe run_checks.py bad --output reports/bad
"bad runner exit: $LASTEXITCODE"
Get-Content -LiteralPath reports/bad/ruff.json
Get-Content -LiteralPath reports/bad/mypy.txt
Get-Content -LiteralPath reports/bad/ruff.stderr.txt
Get-Content -LiteralPath reports/bad/mypy.stderr.txt
.\.venv\Scripts\python.exe run_checks.py good --output reports/good
"good runner exit: $LASTEXITCODE"
Get-Content -LiteralPath reports/good/ruff.json
Get-Content -LiteralPath reports/good/mypy.txt
Get-Content -LiteralPath reports/good/ruff.stderr.txt
Get-Content -LiteralPath reports/good/mypy.stderr.txt
Copy-Item -LiteralPath reports -Destination "$ReportsRoot/demo-reports" -Recurse
.\.venv\Scripts\python.exe -m pip freeze | Set-Content -LiteralPath "$ReportsRoot/combined-freeze.txt"
Get-Content -LiteralPath bad/greeting.py,good/greeting.py,pyproject.toml,requirements.txt
Stop-Transcript
