$ErrorActionPreference = 'Continue'
Start-Transcript -Path "$PSScriptRoot/pylint-inline.txt"
Set-Location 'C:/Users/zwadh/Repos/ToolWiki/.preview/reader-retests/python/public-download/ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
Set-Location examples/python-checks
$Python = 'python'
& $Python --version
& $Python -m venv .venv
.\.venv\Scripts\python.exe -m pip install pylint==4.1.3
.\.venv\Scripts\python.exe -m pylint --version
.\.venv\Scripts\python.exe -m pylint --rcfile=pyproject.toml --disable=all `
  --enable=unused-import --score=n --persistent=n bad/greeting.py
"bad exit: $LASTEXITCODE"
.\.venv\Scripts\python.exe -m pylint --rcfile=pyproject.toml --disable=all `
  --enable=unused-import --score=n --persistent=n good/greeting.py
"good exit: $LASTEXITCODE"
Stop-Transcript
