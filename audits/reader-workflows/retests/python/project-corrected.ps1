$ErrorActionPreference = 'Stop'
Start-Transcript -Path "$PSScriptRoot/project-corrected.txt"
Set-Location 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/combined-download/ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9/examples/python-checks'
$CheckPython = (Resolve-Path .\.venv\Scripts\python.exe).Path
Set-Location 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/Invoice sample'
$Target = '.\src'
$Reports = "$PSScriptRoot/project-reports/corrected-run"
New-Item -ItemType Directory -Path $Reports -ErrorAction Stop | Out-Null
& $CheckPython -m ruff check --no-fix --no-cache --config pyproject.toml `
  --output-format json $Target > "$Reports\ruff.json" 2> "$Reports\ruff.stderr.txt"
$RuffExit = $LASTEXITCODE
$RuffExit | Set-Content "$Reports\ruff.exit.txt"
& $CheckPython -m mypy --no-incremental --cache-dir "$Reports\mypy-cache" `
  --config-file pyproject.toml $Target > "$Reports\mypy.txt" 2> "$Reports\mypy.stderr.txt"
$MypyExit = $LASTEXITCODE
$MypyExit | Set-Content "$Reports\mypy.exit.txt"
Get-Content -LiteralPath "$Reports/ruff.json","$Reports/mypy.txt","$Reports/ruff.stderr.txt","$Reports/mypy.stderr.txt","$Reports/ruff.exit.txt","$Reports/mypy.exit.txt"
New-Item -ItemType Directory -Path "$PSScriptRoot/inputs-after" -ErrorAction Stop | Out-Null
Copy-Item -LiteralPath src/invoice.py,README.txt,pyproject.toml -Destination "$PSScriptRoot/inputs-after"
Get-FileHash -LiteralPath src/invoice.py,README.txt,pyproject.toml -Algorithm SHA256 | ConvertTo-Json | Set-Content -LiteralPath "$PSScriptRoot/input-hashes-after.json"
Get-ChildItem -Recurse -File -LiteralPath 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/inputs/python/Invoice sample' | Get-FileHash -Algorithm SHA256 | ConvertTo-Json | Set-Content -LiteralPath "$PSScriptRoot/supplied-input-hashes-after.json"
Get-Content -LiteralPath src/invoice.py
Stop-Transcript
