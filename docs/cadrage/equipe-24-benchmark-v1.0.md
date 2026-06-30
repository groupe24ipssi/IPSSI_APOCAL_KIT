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

⚠️ **Limite assumée** : faute de temps disponible sur la fenêtre Sprint 3, l'équipe n'a pas pu exécuter son propre script `benchmark.sh` en conditions réelles (5 runs × 3 modèles × machine dédiée). Les chiffres de latence ci-dessous reprennent les valeurs officielles communiquées avec le scénario de la perturbation J2 ; les données de qualité et d'empreinte mémoire/disque sont issues de sources publiques externes, consultées le 30/06/2026, et non d'une mesure locale sur notre stack.

Protocole théorique de référence (à rejouer dès que possible, cf. section 5) :
- 5 runs par modèle, même cours de référence (algorithmie), même machine
- Mesure de la latence médiane (p50) et du 95ᵉ percentile (p95)
- Notation qualité subjective par ≥ 3 testeurs, sur une échelle /5
- Relevé de l'empreinte RAM/disque via `ollama ps` et `du -sh ~/.ollama/models/`

## 3. Résultats

| Modèle | Latence p50 | Latence p95 | Qualité subjective (/5) | RAM estimée (Q4_K_M) | Taille disque estimée |
|---|---|---|---|---|---|
| Llama 3.1 8B (actuel) | 42 s | 51 s | [à noter par 3 testeurs] | ~5 Go | ~4,7 Go |
| Llama 3.2 3B | 12 s | 18 s | [à noter par 3 testeurs] | ~2 Go | ~2 Go |
| Phi-3 mini (3,8B) | 14 s | 22 s | [à noter par 3 testeurs] | ~2,5 Go | ~2,2 Go |

**Sources des colonnes RAM/disque/qualité indicative** (estimations publiques, quantization Q4_K_M par défaut sous Ollama) :
- Local AI Master, *Ollama System Requirements 2026* — tailles et VRAM par modèle : https://localaimaster.com/blog/ollama-system-requirements
- Local AI Master, *Ollama VRAM Requirements 2026* — table de référence par modèle : https://localaimaster.com/blog/ollama-model-ram-vram-table
- ModelPiper, *Run Multiple Ollama Models* — empreinte mémoire Llama 3.2 3B (~2 Go) et Phi-4-mini/Phi-3 (~2,5 Go) sur Apple Silicon : https://modelpiper.com/blog/ollama-multi-model-mac
- DEV Community, *Running LLMs Locally: A Rigorous Benchmark of Phi-3, Mistral, and Llama 3.2 on Ollama* — tendance de fiabilité/qualité (Phi-3-mini plus rapide mais moins fiable sur le format de sortie que Llama 3.2) : https://dev.to/gurjeet333/running-llms-locally-a-rigorous-benchmark-of-phi-3-mistral-and-llama-32-on-ollama-2289

## 4. Verdict

**Llama 3.2 3B** ressort comme le meilleur compromis :
- Seul modèle avec une marge confortable sous le seuil exigé de 15 s (12 s p50, contre 14 s pour Phi-3 mini, plus proche de la limite)
- Empreinte mémoire la plus faible des trois (~2 Go), cohérent avec la contrainte de stack locale Ollama
- D'après la tendance observée dans le benchmark externe cité, Llama 3.2 affiche une meilleure fiabilité de format de sortie que Phi-3 mini, ce qui réduit le risque sur la validation post-LLM (JSON du quiz)

→ Cohérent avec la décision retenue dans l'ADR-0003 (section 4).

## 5. Action de suivi

Rejouer un benchmark local réel (`benchmark.sh`, 5 runs × 3 modèles, même cours de référence, même machine) avant la fin du MVP, pour confirmer ou ajuster les valeurs de qualité et de mémoire actuellement basées sur des sources externes. Cf. KPI de suivi dans l'ADR-0003, section 6.