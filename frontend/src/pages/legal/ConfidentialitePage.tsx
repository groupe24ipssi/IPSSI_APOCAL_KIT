/** Politique de confidentialité (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Responsable du traitement',
    content: `
Le responsable du traitement est EduTutor IA, startup française spécialisée dans les outils d'intelligence artificielle pour l'éducation.

Le responsable du traitement détermine les finalités et les moyens des traitements de données personnelles réalisés dans le cadre de l'utilisation de l'application.

Pour toute question relative au traitement de vos données personnelles, vous pouvez nous contacter aux coordonnées indiquées dans la section « Contact & réclamation ».
    `,
  },
  {
    title: 'Données personnelles collectées',
    content: `
Selon votre utilisation de l'application, nous pouvons collecter les données suivantes :

- identité (nom, prénom) ;
- adresse e-mail ;
- informations liées au compte utilisateur ;
- documents, supports pédagogiques ou fichiers que vous importez afin de générer des contenus ;
- historique des quiz, exercices et contenus générés ;
- préférences d'utilisation et paramètres du compte ;
- données techniques nécessaires au fonctionnement du service (journaux techniques, adresse IP, type de navigateur, etc.).

Nous ne collectons que les données strictement nécessaires au fonctionnement du service.
    `,
  },
  {
    title: 'Finalités du traitement',
    content: `
Les données personnelles sont traitées afin de :

- créer et gérer votre compte utilisateur ;
- générer des quiz, fiches, résumés et autres contenus pédagogiques ;
- personnaliser votre expérience d'utilisation ;
- assurer le fonctionnement, la maintenance et la sécurité de la plateforme ;
- répondre à vos demandes de support ;
- respecter nos obligations légales et réglementaires.
    `,
  },
  {
    title: 'Base légale',
    content: `
Conformément à l'article 6 du RGPD, les traitements reposent sur :

- l'exécution du contrat pour la création du compte et la fourniture du service ;
- le respect d'obligations légales lorsque celles-ci s'imposent ;
- notre intérêt légitime pour assurer la sécurité, améliorer le service et prévenir les abus ;
- votre consentement lorsque celui-ci est requis (par exemple pour certains cookies ou communications).
    `,
  },
  {
    title: 'Durée de conservation',
    content: `
Les données sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.

En règle générale :

- les données du compte sont conservées tant que votre compte est actif ;
- les contenus générés et documents importés sont conservés uniquement pendant la durée nécessaire à leur utilisation, puis supprimés ou anonymisés ;
- les journaux techniques sont conservés pour une durée limitée afin d'assurer la sécurité du service.

À l'issue des durées applicables, les données sont supprimées ou anonymisées.
    `,
  },
  {
    title: 'Destinataires des données',
    content: `
Les données sont accessibles uniquement :

- aux personnes habilitées au sein d'EduTutor IA ;
- aux prestataires techniques intervenant pour l'hébergement ou la maintenance, dans la limite nécessaire à leurs missions.

Les contenus soumis pour la génération pédagogique sont traités localement par un modèle d'intelligence artificielle exécuté via Ollama sur notre infrastructure.

Aucune donnée utilisateur n'est transmise à des fournisseurs d'IA externes tels qu'OpenAI ou d'autres services cloud de génération de texte.
    `,
  },
  {
    title: 'Transferts hors UE',
    content: `
EduTutor IA privilégie une infrastructure permettant le traitement local des données.

Les contenus transmis à l'application sont traités sur nos serveurs via Ollama et ne sont pas envoyés vers des services d'intelligence artificielle hébergés hors de l'Union européenne.

En principe, aucun transfert de données personnelles vers un pays situé en dehors de l'Espace économique européen n'est réalisé dans le cadre du traitement des contenus pédagogiques.
    `,
  },
  {
    title: 'Vos droits',
    content: `
Conformément au RGPD, vous disposez des droits suivants :

- droit d'accès ;
- droit de rectification ;
- droit à l'effacement ;
- droit à la limitation du traitement ;
- droit d'opposition ;
- droit à la portabilité des données ;
- droit de retirer votre consentement lorsque le traitement repose sur celui-ci.

Vous pouvez exercer ces droits en nous contactant à l'adresse indiquée dans la section « Contact & réclamation ».

Une réponse vous sera apportée dans les délais prévus par la réglementation.
    `,
  },
  {
    title: 'Cookies',
    content: `
Notre site utilise des cookies et technologies similaires nécessaires à son fonctionnement et, le cas échéant, à la mesure d'audience.

Pour plus d'informations sur les cookies utilisés, leur durée de conservation et la gestion de vos préférences, veuillez consulter notre politique de cookies.
    `,
  },
  {
    title: 'Contact & réclamation',
    content: `
Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, vous pouvez nous contacter à :

Email : contact@edututor.fr
Adresse : 15, bd. Laure EMIPSUM, Nostringval

Si vous estimez que vos droits ne sont pas respectés, vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).
    `,
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalScaffold
      title="Politique de confidentialité"
      intro="Comment les données personnelles des utilisateurs sont collectées, utilisées et protégées (RGPD)."
      sections={SECTIONS}
    />
  );
}
