#!/usr/bin/env bash
# ============================================================================
# benchmark.sh — Benchmark latence des modèles LLM (perturbation J2)
# ----------------------------------------------------------------------------
# Rejoue le protocole défini dans l'ADR-0003 et
# docs/cadrage/equipe-24-benchmark-v1.0.md :
#   5 runs × 3 modèles × même cours de référence × même machine.
# Tape directement l'API Ollama (/api/generate) avec le MÊME prompt que
# backend/llm/services/quiz_prompt.py (SYSTEM_PROMPT + build_user_prompt),
# pour mesurer la latence réelle du modèle sans overhead Django/DB.
#
# Prérequis : docker compose up -d (conteneur ollama démarré).
# Sortie : scripts/benchmark-resultats.csv + tableau récap sur stdout.
# ============================================================================

set -euo pipefail

CONTAINER="${OLLAMA_CONTAINER:-apocalipssi-2026-ollama}"
OLLAMA_URL="${OLLAMA_URL:-http://localhost:11434}"
RUNS="${RUNS:-5}"
MODELS=("llama3.1:8b" "llama3.2:3b" "phi3:mini")
COURSE_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/benchmark-reference-course.md"
TITLE="Algorithmique - Cours de référence"
OUT_CSV="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/benchmark-resultats.csv"

if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
    echo "❌ Conteneur Ollama '${CONTAINER}' non démarré."
    echo "   Lancez d'abord : docker compose up -d"
    exit 1
fi

if [ ! -f "${COURSE_FILE}" ]; then
    echo "❌ Cours de référence introuvable : ${COURSE_FILE}"
    exit 1
fi

echo "📋 Benchmark LLM — ${RUNS} runs × ${#MODELS[@]} modèles"
echo "   Cours de référence : ${COURSE_FILE}"
echo ""

echo "modele,run,latence_s" > "${OUT_CSV}"

# Construit le prompt complet (system + user), identique à
# quiz_prompt.build_full_prompt(), pour un modèle donné (indépendant du
# modèle mais recalculé par simplicité de script).
build_prompt() {
    local course
    course="$(cat "${COURSE_FILE}")"
    cat <<PROMPT
Tu es un assistant pédagogique francophone spécialisé en
génération de QCM. À partir du cours fourni, tu génères exactement 10 questions
à choix multiples pour aider un étudiant à réviser.

Règles ABSOLUES :
- Exactement 10 questions.
- Chaque question a EXACTEMENT 4 options.
- Une seule bonne réponse par question, indiquée par "correct_index" (0 à 3).
- Pas de markdown, pas de balises HTML, pas d'explications hors JSON.
- Sortie = JSON STRICT et UNIQUEMENT JSON.

Format de sortie :
{
  "questions": [
    {"prompt": "...", "options": ["...","...","...","..."], "correct_index": 0},
    ... (10 entrées)
  ]
}

TITRE DU COURS : ${TITLE}

COURS :
${course}

GÉNÈRE LE JSON MAINTENANT :
PROMPT
}

PROMPT_TEXT="$(build_prompt)"

# p50/p95 pour une liste de latences (une par ligne, sur stdin).
percentile() {
    local pct="$1"
    sort -n | awk -v p="${pct}" '
        { a[NR] = $1 }
        END {
            idx = p * NR
            if (idx == int(idx) && idx > 0) {
                # interpolation entre deux valeurs
                lo = a[idx]; hi = a[idx + 1]; if (hi == "") hi = lo
                printf "%.1f", (lo + hi) / 2
            } else {
                idx = int(idx) + 1
                if (idx > NR) idx = NR
                printf "%.1f", a[idx]
            }
        }'
}

P50=()
P95=()
RAM=()
DISK=()

for model in "${MODELS[@]}"; do
    echo "⬇️  Vérification / téléchargement du modèle ${model}..."
    docker exec "${CONTAINER}" ollama pull "${model}"

    echo "⏱️  Benchmark ${model} (${RUNS} runs)..."
    latencies=()
    for run in $(seq 1 "${RUNS}"); do
        payload="$(python3 -c '
import json, sys
model, prompt = sys.argv[1], sys.argv[2]
print(json.dumps({
    "model": model,
    "prompt": prompt,
    "stream": False,
    "options": {"temperature": 0.4},
    "format": "json",
}))
' "${model}" "${PROMPT_TEXT}")"

        latency="$(curl -s -o /dev/null -w '%{time_total}' \
            -X POST "${OLLAMA_URL}/api/generate" \
            -H 'Content-Type: application/json' \
            -d "${payload}")"

        echo "   run ${run}/${RUNS} : ${latency}s"
        echo "${model},${run},${latency}" >> "${OUT_CSV}"
        latencies+=("${latency}")
    done

    p50="$(printf '%s\n' "${latencies[@]}" | percentile 0.50)"
    p95="$(printf '%s\n' "${latencies[@]}" | percentile 0.95)"
    P50+=("${p50}")
    P95+=("${p95}")

    ram_line="$(docker exec "${CONTAINER}" ollama ps | grep "${model}" || true)"
    RAM+=("$(echo "${ram_line}" | awk '{print $3, $4}')")
    DISK+=("$(docker exec "${CONTAINER}" du -sh "/root/.ollama/models" | awk '{print $1}')")

    echo "   → p50=${p50}s  p95=${p95}s"
    echo ""
done

echo "📊 Résultats (${RUNS} runs/modèle, cours de référence : algorithmie) :"
echo ""
printf '| %-20s | %10s | %10s | %12s | %14s |\n' "Modèle" "p50" "p95" "RAM (ollama ps)" "Disque (total)"
printf '|%s|%s|%s|%s|%s|\n' "----------------------" "------------" "------------" "--------------" "----------------"
for i in "${!MODELS[@]}"; do
    printf '| %-20s | %9ss | %9ss | %12s | %14s |\n' \
        "${MODELS[$i]}" "${P50[$i]}" "${P95[$i]}" "${RAM[$i]}" "${DISK[$i]}"
done

echo ""
echo "✅ Résultats bruts enregistrés dans ${OUT_CSV}"
