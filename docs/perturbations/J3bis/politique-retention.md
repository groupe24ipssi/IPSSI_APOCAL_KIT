# Politique de rétention des données — EduTutor IA

*Document rédigé dans le cadre pédagogique APOCAL'IPSSI 2026 — Équipe 24*

---

## 1. Durées de conservation par catégorie de données

| Catégorie de données | Durée de conservation | Justification |
|---|---|---|
| **Compte utilisateur** (email, nom, prénom) | 2 ans après la dernière connexion | Suppression automatique des comptes inactifs |
| **Cours uploadés** (textes source, PDF extraits) | 1 an après la création du quiz associé | Les contenus pédagogiques ne sont conservés que pour permettre la consultation de l'historique |
| **Quizzes générés** (questions, options, réponses correctes) | 1 an après la création | Lié au cycle de vie du cours associé |
| **Réponses et scores** (tentatives, selected_index, score /10) | 1 an après la soumission | Même durée que le quiz parent |
| **Signalements** (reports) | 6 mois après résolution | Conservés le temps du traitement puis purgés |
| **Logs d'audit** (DataRequest, exports) | 6 mois après la demande | Conformité RGPD Art. 5(1)(e) — durée minimale pour traçabilité |

Les durées ci-dessus s'entendent à compter de l'événement déclencheur. À l'expiration, les données sont supprimées de manière irréversible (suppression en base + purge des sauvegardes sous 30 jours).

---

## 2. Base légale du traitement (Art. 6 RGPD)

| Catégorie | Base légale | Article 6 |
|---|---|---|
| **Compte utilisateur** | Exécution du contrat (CGU acceptées à l'inscription) | Art. 6(1)(b) |
| **Cours uploadés** | Exécution du contrat (fonctionnalité essentielle du service) | Art. 6(1)(b) |
| **Quizzes et réponses** | Exécution du contrat (le service consiste à générer et corriger des quiz) | Art. 6(1)(b) |
| **Signalements** | Intérêt légitime (sécurité et modération de la plateforme) | Art. 6(1)(f) |
| **Logs d'audit (DataRequest)** | Obligation légale (traçabilité des demandes d'exercice des droits RGPD) | Art. 6(1)(c) |

Le consentement (Art. 6(1)(a)) n'est pas utilisé comme base légale principale car le traitement est nécessaire à l'exécution du service. Le consentement est recueilli uniquement pour les cookies non essentiels (cf. Politique de cookies).

---

## 3. Procédures de suppression

### 3.1 Suppression automatique (cron)

Un job planifié (`manage.py purge_expired_data`) s'exécute quotidiennement et :

- Supprime les comptes dont la dernière connexion remonte à plus de 2 ans (cascade : quizzes, réponses, cours associés)
- Supprime les quizzes (et leurs questions/réponses) créés il y a plus d'1 an
- Supprime les DataRequest de plus de 6 mois

Chaque exécution produit un log indiquant le nombre d'enregistrements supprimés.

### 3.2 Suppression manuelle — Droit à l'effacement (Art. 17 RGPD)

Tout utilisateur peut exercer son droit à l'effacement :

1. **En autonomie** : via le bouton « Supprimer mon compte » sur la page Profil (suppression immédiate et irréversible de toutes les données associées)
2. **Par demande écrite** : en contactant le DPO à l'adresse dpo@edututor-ia.fr. La demande est traitée sous 30 jours calendaires (Art. 12(3) RGPD).

En cas de demande d'effacement, l'intégralité des données personnelles est supprimée, à l'exception des logs d'audit (DataRequest) qui sont anonymisés (remplacement de l'identifiant utilisateur par un hash) et conservés 6 mois pour obligation légale de traçabilité.

### 3.3 Contact DPO

- **Délégué à la Protection des Données** : Marie Dupont (fictif)
- **Email** : dpo@edututor-ia.fr
- **Délai de réponse** : 48 heures ouvrées (accusé de réception), 30 jours (traitement complet)
