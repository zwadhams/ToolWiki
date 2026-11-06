$ErrorActionPreference = 'Stop'
Start-Transcript -Path "$PSScriptRoot/project-first.txt"
$CheckerExample = 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/combined-download/ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9/examples/python-checks'
$ProjectCopy = 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/Invoice sample'
$ProjectInput = 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/inputs/python/Invoice sample'
if (Test-Path -LiteralPath $ProjectCopy) { throw 'Copy destination must be new' }
Copy-Item -LiteralPath $ProjectInput -Destination $ProjectCopy -Recurse
New-Item -ItemType Directory -Path "$PSScriptRoot/inputs-before" -ErrorAction Stop | Out-Null
Copy-Item -LiteralPath "$ProjectInput/README.txt","$ProjectInput/src/invoice.py" -Destination "$PSScriptRoot/inputs-before"
Get-ChildItem -Recurse -File -LiteralPath $ProjectInput | Get-FileHash -Algorithm SHA256 | ConvertTo-Json | Set-Content -LiteralPath "$PSScriptRoot/input-hashes-before.json"
Set-Location $CheckerExample
$CheckPython = (Resolve-Path .\.venv\Scripts\python.exe).Path
Set-Location $ProjectCopy
@'
[tool.ruff]
target-version = "py313"

[tool.ruff.lint]
select = ["E4", "E7", "E9", "F"]

[tool.mypy]
python_version = "3.13"
strict = true
show_error_codes = true
pretty = false
'@ | Set-Content -LiteralPath pyproject.toml -Encoding ascii
Copy-Item -LiteralPath pyproject.toml -Destination "$PSScriptRoot/project-pyproject.toml"
$Target = '.\src'
$Reports = "$PSScriptRoot/project-reports/first-run"
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
& $CheckPython -m ruff --version
& $CheckPython -m mypy --version
& $CheckPython --version
$PSVersionTable | Out-String
Stop-Transcript
