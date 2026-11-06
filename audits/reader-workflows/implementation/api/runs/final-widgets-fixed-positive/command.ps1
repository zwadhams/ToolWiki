$beforeEncoding = $env:PYTHONIOENCODING
$out = '.preview/final-widgets-fixed-positive'
if (Test-Path $out) { throw 'Choose a new report directory.' }
New-Item -ItemType Directory -Path $out | Out-Null
$priorEncoding = $env:PYTHONIOENCODING
try {
    $env:PYTHONIOENCODING = 'utf-8'
    & .preview/api-demo-env/Scripts/schemathesis.exe --no-color run ./widgets.json `
        --url http://127.0.0.1:8781 --include-path /widgets --include-method POST `
        --phases coverage --mode positive --checks not_a_server_error `
        --max-time 20 --workers 1 --max-failures 1 --request-timeout 3 `
        --seed 20261106 --report junit --report-junit-path "$out/junit.xml" `
        1> "$out/stdout.txt" 2> "$out/stderr.txt"
    $LASTEXITCODE | Set-Content "$out/exit-code.txt"
} finally {
    $env:PYTHONIOENCODING = $priorEncoding
}
@{ before = $beforeEncoding; after = $env:PYTHONIOENCODING } | ConvertTo-Json | Set-Content "$out/encoding-state.json"
