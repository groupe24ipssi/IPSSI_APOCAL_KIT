# Benchmark — Migration du modèle LLM (Perturbation J2)

**Équipe n°** : 24
**Membres** : [Prénoms NOMS, à compléter]
**Sprint concerné** : Sprint 3
**Version** : v1.0
**Date de remise** : [JJ/MM/AAAA HHhMM]
**Statut** : En revue PO
**Document lié** : equipe-24-adr-v1.0.docx (ADR-0003)

---

## 1. Objectif

Comparer 3 modèles LLM candidats pour la génération de quiz (latence, qualité perçue, empreinte mémoire) afin d'éclairer la décision documentée dans l'ADR-0003, suite au retour beta-test du 30/06/2026 (45 s d'attente jugées inacceptables par le sponsor).

## 2. Protocole

Benchmark local réel exécuté le 01/07/2026 via `scripts/benchmark.sh` (résultats bruts : `scripts/benchmark-resultats.csv`).

- **Machine** : MacBook (Darwin 25.5.0, Apple Silicon, Docker/OrbStack, CPU-only — pas de GPU dédié)
- **Protocole** : 5 runs par modèle, même cours de référence (algorithmie, `scripts/benchmark-reference-course.md`), même machine
- **Cible** : API Ollama directe (`POST /api/generate`), même prompt que `backend/llm/services/quiz_prompt.py` (SYSTEM_PROMPT + build_user_prompt), `temperature: 0.4`, `format: "json"`
- Mesure de la latence médiane (p50) et du 95ᵉ percentile (p95)
- Notation qualité subjective par ≥ 3 testeurs, sur une échelle /5
- Relevé de l'empreinte RAM via `ollama ps` et taille disque via `du -sh /root/.ollama/models` (cumulative dans le conteneur)

## 3. Résultats

| Modèle | Latence p50 | Latence p95 | Qualité subjective (/5) | RAM (ollama ps) | Disque (cumul conteneur) |
|---|---|---|---|---|---|
| Llama 3.1 8B (actuel) | 40,0 s | 66,2 s | [à noter par 3 testeurs] | 5,6 Go | 4,6 Go |
| Llama 3.2 3B | 18,1 s | 32,1 s | [à noter par 3 testeurs] | 2,9 Go | 6,5 Go* |
| Phi-3 mini (3,8B) | 29,4 s | 34,3 s | [à noter par 3 testeurs] | 3,9 Go | 8,5 Go* |

\* La colonne disque est cumulative (`du -sh /root/.ollama/models` croît à chaque modèle téléchargé dans le conteneur). Tailles individuelles estimées : Llama 3.1 8B ~4,6 Go, Llama 3.2 3B ~2 Go, Phi-3 mini ~2 Go.

**Note** : les latences mesurées localement (CPU-only, Apple Silicon sous Docker/OrbStack) sont supérieures aux valeurs officielles du scénario de la perturbation J2. L'écart s'explique par l'absence de GPU dédié et la couche de virtualisation Docker. Le classement relatif des modèles est cohérent avec les sources externes initialement citées.

## 4. Verdict

**Llama 3.2 3B** reste le meilleur compromis malgré un p50 mesuré (18,1 s) supérieur au seuil cible de 15 s :
- **Plus rapide des trois** : 18,1 s p50 vs 29,4 s (Phi-3 mini) et 40,0 s (Llama 3.1 8B) — gain de ~55 % par rapport au modèle actuel
- **Empreinte RAM la plus faible** : 2,9 Go vs 3,9 Go (Phi-3) et 5,6 Go (Llama 3.1)
- **Meilleure fiabilité de format JSON** que Phi-3 mini (cf. benchmark externe DEV Community cité dans la v1.0 initiale), ce qui réduit le risque sur la validation post-LLM
- **Écart vs seuil 15 s** : le benchmark tourne sur CPU-only (Apple Silicon sous Docker/OrbStack, sans GPU). Sur la machine cible de production (VPS OVH avec éventuel GPU, ou machine avec accélération Metal), la latence devrait se rapprocher ou passer sous le seuil. L'amélioration relative (÷2,2 vs Llama 3.1 8B) confirme la pertinence du choix.

→ Cohérent avec la décision retenue dans l'ADR-0003 (section 4). Le seuil absolu de 15 s (CA-J2-6) devra être re-validé sur la machine de déploiement cible.

## 5. Action de suivi

~~Rejouer un benchmark local réel~~ → **Fait** le 01/07/2026 via `scripts/benchmark.sh` (résultats bruts : `scripts/benchmark-resultats.csv`). Les valeurs de latence et mémoire en section 3 sont désormais des mesures locales réelles.

**Reste à faire** :
- Notation qualité subjective par ≥ 3 testeurs (section 3, colonne « Qualité subjective »)
- Re-valider le seuil CA-J2-6 (≤ 15 s) sur la machine de déploiement cible (VPS OVH / GPU)

Cf. KPI de suivi dans l'ADR-0003, section 6.