
# Simulate a Telegram Webhook call to localhost
$Body = @{
    message = @{
        text = "/iban DE99 8888 7777 6666 5555 44"
        chat = @{ id = 123456789 }
        from = @{ id = 123456789 }
    }
} | ConvertTo-Json -Depth 3

Write-Host "Simulating Telegram Webhook..."
try {
    $Response = Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/telegram-webhook" -ContentType "application/json" -Body $Body
    Write-Host "Success! Response:" -ForegroundColor Green
    Write-Host ($Response | ConvertTo-Json)
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure the server is running on http://localhost:3000"
}
