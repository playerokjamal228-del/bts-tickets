
# Simulate a Telegram Webhook call with MULTILINE payment details
$MessageText = "/iban Serhii Hnatchuk`nDE40 5003 1900 0016 4479 86`nBBVADEFFXXX"

$Body = @{
    message = @{
        text = $MessageText
        chat = @{ id = 123456789 }
        from = @{ id = 123456789 }
    }
} | ConvertTo-Json -Depth 3

Write-Host "Simulating Advanced Telegram Webhook..."
try {
    $Response = Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/telegram-webhook" -ContentType "application/json" -Body $Body
    Write-Host "Success! Response:" -ForegroundColor Green
    Write-Host ($Response | ConvertTo-Json)
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure the server is running on http://localhost:3000"
}
