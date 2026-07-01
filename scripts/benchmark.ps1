# ============================================================================
# benchmark.ps1 — Benchmark latence des modeles LLM (Windows / PowerShell)
# ----------------------------------------------------------------------------
# Equivalent Windows de scripts/benchmark.sh. Rejoue le protocole de l'ADR-0003
# et docs/cadrage/equipe-24-benchmark-v1.0.md :
#   5 runs x 3 modeles x meme cours de reference x meme machine.
# Tape directement l'API Ollama (/api/generate) avec le MEME prompt que
# backend/llm/services/quiz_prompt.py (SYSTEM_PROMPT + build_user_prompt),
# pour mesurer la latence reelle du modele sans overhead Django/DB.
#
# Prerequis : docker compose up -d (conteneur ollama demarre).
#
# Usage (dans un terminal PowerShell) :
#   powershell -ExecutionPolicy Bypass -File scripts\benchmark.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\benchmark.ps1 -Runs 3
#
# Sortie : scripts\benchmark-resultats.csv + tableau recap sur stdout.
# ============================================================================
param(
    [int]$Runs = 5,
    [string]$Container = "apocalipssi-2026-ollama",
    [string]$OllamaUrl = "http://localhost:11434"
)

$ErrorActionPreference = "Stop"

$root = Join-Path $PSScriptRoot ".."
$courseFile = Join-Path $PSScriptRoot "benchmark-reference-course.md"
$outCsv = Join-Path $PSScriptRoot "benchmark-resultats.csv"
$title = "Algorithmique - Cours de reference"
$models = @("llama3.1:8b", "llama3.2:3b", "phi3:mini")

$running = docker ps --format '{{.Names}}' | Select-String -Pattern "^$Container$"
if (-not $running) {
    Write-Host "Conteneur Ollama '$Container' non demarre." -ForegroundColor Red
    Write-Host "  Lancez d'abord : docker compose up -d"
    exit 1
}

if (-not (Test-Path $courseFile)) {
    Write-Host "Cours de reference introuvable : $courseFile" -ForegroundColor Red
    exit 1
}

Write-Host "Benchmark LLM - $Runs runs x $($models.Count) modeles" -ForegroundColor Cyan
Write-Host "  Cours de reference : $courseFile"
Write-Host ""

"modele,run,latence_s" | Set-Content -Path $outCsv -Encoding utf8

$course = Get-Content -Path $courseFile -Raw

$systemPrompt = @"
Tu es un assistant pedagogique francophone specialise en
generation de QCM. A partir du cours fourni, tu generes exactement 10 questions
a choix multiples pour aider un etudiant a reviser.

Regles ABSOLUES :
- Exactement 10 questions.
- Chaque question a EXACTEMENT 4 options.
- Une seule bonne reponse par question, indiquee par "correct_index" (0 a 3).
- Pas de markdown, pas de balises HTML, pas d'explications hors JSON.
- Sortie = JSON STRICT et UNIQUEMENT JSON.

Format de sortie :
{
  "questions": [
    {"prompt": "...", "options": ["...","...","...","..."], "correct_index": 0},
    ... (10 entrees)
  ]
}
"@

$promptText = "$systemPrompt`n`nTITRE DU COURS : $title`n`nCOURS :`n$course`n`nGENERE LE JSON MAINTENANT :"

function Get-Percentile {
    param([double[]]$Values, [double]$Pct)
    $sorted = $Values | Sort-Object
    $n = $sorted.Count
    $idx = $Pct * $n
    if ($idx -eq [math]::Floor($idx) -and $idx -gt 0) {
        $lo = $sorted[[int]$idx - 1]
        $hiIndex = [int]$idx
        $hi = if ($hiIndex -lt $n) { $sorted[$hiIndex] } else { $lo }
        return [math]::Round((($lo + $hi) / 2), 1)
    } else {
        $i = [int][math]::Ceiling($idx) - 1
        if ($i -ge $n) { $i = $n - 1 }
        if ($i -lt 0) { $i = 0 }
        return [math]::Round($sorted[$i], 1)
    }
}

$results = @()

foreach ($model in $models) {
    Write-Host "Verification / telechargement du modele $model..." -ForegroundColor Yellow
    docker exec $Container ollama pull $model

    Write-Host "Benchmark $model ($Runs runs)..." -ForegroundColor Yellow
    $latencies = @()

    for ($run = 1; $run -le $Runs; $run++) {
        $body = @{
            model   = $model
            prompt  = $promptText
            stream  = $false
            options = @{ temperature = 0.4 }
            format  = "json"
        } | ConvertTo-Json -Depth 5 -Compress

        $sw = [System.Diagnostics.Stopwatch]::StartNew()
        Invoke-RestMethod -Uri "$OllamaUrl/api/generate" -Method Post `
            -ContentType "application/json" -Body $body | Out-Null
        $sw.Stop()
        $latency = [math]::Round($sw.Elapsed.TotalSeconds, 2)

        Write-Host "   run $run/$Runs : ${latency}s"
        "$model,$run,$latency" | Add-Content -Path $outCsv -Encoding utf8
        $latencies += $latency
    }

    $p50 = Get-Percentile -Values $latencies -Pct 0.50
    $p95 = Get-Percentile -Values $latencies -Pct 0.95

    $ramLine = (docker exec $Container ollama ps) -split "`n" | Select-String -Pattern ([regex]::Escape($model))
    $ram = if ($ramLine) { (($ramLine -split '\s+') | Select-Object -Skip 2 -First 2) -join " " } else { "n/a" }
    $disk = (docker exec $Container du -sh /root/.ollama/models) -split '\s+' | Select-Object -First 1

    Write-Host ("   -> p50={0}s  p95={1}s" -f $p50, $p95)
    Write-Host ""

    $results += [pscustomobject]@{
        Modele = $model
        P50    = "${p50}s"
        P95    = "${p95}s"
        RAM    = $ram
        Disque = $disk
    }
}

Write-Host "Resultats ($Runs runs/modele, cours de reference : algorithmie) :" -ForegroundColor Cyan
Write-Host ""
$results | Format-Table -AutoSize

Write-Host ""
Write-Host "Resultats bruts enregistres dans $outCsv" -ForegroundColor Green
