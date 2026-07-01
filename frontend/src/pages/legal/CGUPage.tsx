/** Conditions Générales d'Utilisation (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  { title: 'Objet',
    content: `Les présentes Conditions Générales d'Utilisation (ci-après les « CGU ») ont pour objet de définir les modalités d'accès et d'utilisation de la plateforme EduTutor IA.

EduTutor IA est une application destinée aux établissements d'enseignement, aux enseignants et aux étudiants. Elle met à disposition des outils d'intelligence artificielle permettant notamment de générer des quiz, d'accompagner les révisions, de suivre la progression pédagogique, de déposer des supports de cours et d'analyser les résultats des apprenants.

Toute utilisation du service implique l'acceptation pleine et entière des présentes CGU.` },
  {
    title: 'Acceptation des conditions',
    content: `L'accès aux fonctionnalités d'EduTutor IA est réservé aux utilisateurs disposant d'un compte.

Lors de la création d'un compte ou lors de la première utilisation du service, l'utilisateur reconnaît avoir pris connaissance des présentes CGU et les accepter sans réserve.

Si l'utilisateur n'accepte pas les présentes conditions, il ne doit pas utiliser la plateforme.`,
  },
  { title: 'Accès au service',
    content: `EduTutor IA est accessible via un navigateur internet compatible, sous réserve de la disponibilité du service et d'une connexion Internet.

L'éditeur s'efforce d'assurer une disponibilité continue de la plateforme. Toutefois, des interruptions temporaires peuvent intervenir notamment pour des opérations de maintenance, des mises à jour, des raisons de sécurité ou en cas de force majeure.

L'éditeur ne garantit pas un fonctionnement ininterrompu ou exempt d'erreurs.` },
  {
    title: 'Compte utilisateur',
    content: `L'utilisation d'EduTutor IA nécessite la création d'un compte personnel.

L'utilisateur s'engage à :

- fournir des informations exactes, complètes et à jour ;
- maintenir la confidentialité de son mot de passe et de ses identifiants ;
- ne pas partager son compte avec des tiers ;
- informer l'éditeur dans les meilleurs délais en cas d'utilisation frauduleuse ou non autorisée de son compte.

Chaque utilisateur demeure seul responsable des actions réalisées depuis son compte.`,
  },
  {
    title: 'Comportements interdits',
    content: `L'utilisateur s'engage à utiliser EduTutor IA conformément aux lois et réglementations en vigueur.

Sont notamment interdits :

- toute tentative d'accès non autorisé aux systèmes ou aux données ;
- toute utilisation visant à perturber, compromettre ou contourner la sécurité de la plateforme ;
- le dépôt ou la diffusion de contenus illicites, diffamatoires, haineux, discriminatoires ou portant atteinte aux droits de tiers ;
- l'utilisation de la plateforme à des fins frauduleuses ou commerciales non autorisées ;
- toute tentative d'extraction automatisée des données ou de rétro-ingénierie des fonctionnalités proposées.

En cas de non-respect des présentes CGU, l'éditeur pourra suspendre ou supprimer le compte de l'utilisateur sans préjudice de toute action judiciaire.`,
  },
  {
    title: 'Contenu généré par IA',
    content: `EduTutor IA utilise des modèles d'intelligence artificielle afin d'assister les enseignants et les étudiants dans leurs activités pédagogiques.

Les contenus générés (quiz, questions, résumés, fiches de révision, propositions pédagogiques ou autres) sont produits automatiquement à partir des informations fournies par l'utilisateur.

Ces contenus sont susceptibles de comporter des erreurs, des imprécisions, des omissions ou des réponses inadaptées au contexte pédagogique.

L'utilisateur demeure seul responsable :

- de la vérification des contenus générés avant leur utilisation ou leur diffusion ;
- de l'utilisation qu'il fait des réponses produites par l'intelligence artificielle ;
- de la conformité des documents qu'il importe sur la plateforme.

Les résultats fournis par EduTutor IA constituent une aide pédagogique et ne remplacent ni le jugement professionnel d'un enseignant ni les apprentissages réalisés par l'étudiant.`,
  },
  { title: 'Responsabilité',
    content: `L'éditeur met en œuvre tous les moyens raisonnables afin d'assurer le bon fonctionnement, la sécurité et la fiabilité d'EduTutor IA.

Toutefois, sa responsabilité ne saurait être engagée notamment en cas :

- d'interruption temporaire du service ;
- de perte de connexion Internet de l'utilisateur ;
- d'erreurs ou d'imprécisions dans les contenus générés par l'intelligence artificielle ;
- d'une mauvaise utilisation de la plateforme par l'utilisateur ;
- d'un dommage résultant d'un cas de force majeure ou d'un événement extérieur échappant au contrôle de l'éditeur.

L'utilisateur est seul responsable des décisions prises sur la base des contenus générés par la plateforme.` },
  {
    title: 'Propriété intellectuelle',
    content: `L'ensemble des éléments composant EduTutor IA (logiciels, architecture, interface, base de données, textes, graphismes, logos, marques et éléments visuels) est protégé par les dispositions du Code de la propriété intellectuelle.

Toute reproduction, représentation, modification, diffusion ou exploitation non autorisée est interdite.

Les contenus importés sur la plateforme par les utilisateurs (cours, exercices, supports pédagogiques ou autres documents) demeurent leur propriété ou celle de leurs ayants droit.

En déposant ces contenus sur EduTutor IA, l'utilisateur accorde uniquement les droits nécessaires à leur traitement technique, à leur stockage sécurisé et à leur utilisation dans le cadre des fonctionnalités proposées par le service.

Aucune donnée pédagogique n'est utilisée pour entraîner des modèles d'intelligence artificielle tiers. Les traitements sont réalisés sur une infrastructure exploitant Ollama local afin de garantir la confidentialité des données.`,
  },
  { title: 'Modification des CGU',
    content: `Les présentes CGU peuvent être modifiées afin de tenir compte des évolutions du service, des exigences légales ou réglementaires, ou des évolutions techniques.

La version applicable est celle publiée sur la plateforme à la date de consultation.

En cas de modification substantielle, les utilisateurs seront informés par tout moyen approprié avant l'entrée en vigueur des nouvelles conditions.

La poursuite de l'utilisation d'EduTutor IA après leur entrée en vigueur vaut acceptation des nouvelles CGU.` },
  { title: 'Droit applicable et litiges',
    content: `Les présentes CGU sont régies par le droit français.

En cas de différend relatif à leur interprétation, leur exécution ou leur validité, les parties rechercheront en priorité une solution amiable.

À défaut d'accord amiable, le litige relèvera de la compétence des juridictions françaises territorialement compétentes, sauf disposition légale impérative contraire.` },
];

export default function CGUPage() {
  return (
    <LegalScaffold
      title="Conditions Générales d'Utilisation"
      intro="Les règles d'utilisation du service EduTutor IA, acceptées par chaque utilisateur."
      sections={SECTIONS}
    />
  );
}
