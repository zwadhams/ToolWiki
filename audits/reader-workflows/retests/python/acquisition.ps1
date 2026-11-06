# Commands executed for the initial public acquisition, retained verbatim.
New-Item -ItemType Directory -Path 'C:\Users\zwadh\Repos\ToolWiki\.preview\reader-retests\python\public-download' -ErrorAction Stop
New-Item -ItemType Directory -Path 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\python' -Force
Start-Transcript -Path 'C:\Users\zwadh\Repos\ToolWiki\audits\reader-workflows\retests\python\acquisition.txt'
Set-Location 'C:\Users\zwadh\Repos\ToolWiki\.preview\reader-retests\python\public-download'
Invoke-WebRequest 'https://github.com/zwadhams/ToolWiki/archive/506c522ca86fd8c9d7b688f35a4d37f842d04cc9.zip' -OutFile examples.zip
Expand-Archive -LiteralPath examples.zip -DestinationPath .
Set-Location '.\ToolWiki-506c522ca86fd8c9d7b688f35a4d37f842d04cc9'
Set-Location examples/python-checks
$Python = 'python'
& $Python --version
Get-FileHash -LiteralPath '..\..\..\examples.zip' -Algorithm SHA256
Get-ChildItem -Recurse -File | Get-FileHash -Algorithm SHA256
Stop-Transcript
