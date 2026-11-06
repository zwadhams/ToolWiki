param(
    [ValidateSet('positive-faulty', 'positive-fixed', 'negative-fixed')]
    [string]$Run
)

# Run from the newly extracted repository root. These substitutions follow
# the visible Adapt to your API block: schema, base URL, and operation path.
$out = ".preview/api-custom-$Run"
if (Test-Path $out) { throw 'Choose a new report directory.' }
New-Item -ItemType Directory -Path $out | Out-Null
$priorEncoding = $env:PYTHONIOENCODING
try {
    $env:PYTHONIOENCODING = 'utf-8'
    if ($Run -eq 'negative-fixed') {
        & .preview/api-demo-env/Scripts/schemathesis.exe --no-color run ../shipment-copy/service-schema.json `
            --url http://127.0.0.1:8785 --include-path /shipments --include-method POST `
            --phases coverage --mode negative --checks negative_data_rejection `
            --max-time 20 --workers 1 --max-failures 1 --request-timeout 3 `
            --seed 20261106 --report junit --report-junit-path "$out/junit.xml" `
            1> "$out/stdout.txt" 2> "$out/stderr.txt"
    } else {
        & .preview/api-demo-env/Scripts/schemathesis.exe --no-color run ../shipment-copy/service-schema.json `
            --url http://127.0.0.1:8785 --include-path /shipments --include-method POST `
            --phases coverage --mode positive --checks not_a_server_error `
            --max-time 20 --workers 1 --max-failures 1 --request-timeout 3 `
            --seed 20261106 --report junit --report-junit-path "$out/junit.xml" `
            1> "$out/stdout.txt" 2> "$out/stderr.txt"
    }
    $LASTEXITCODE | Set-Content "$out/exit-code.txt"
} finally {
    $env:PYTHONIOENCODING = $priorEncoding
}
Get-Content "$out/exit-code.txt"
Get-Content "$out/stdout.txt"
Get-Content "$out/stderr.txt"
