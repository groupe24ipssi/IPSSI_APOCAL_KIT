/** Politique de gestion des cookies (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  { title: "Qu'est-ce qu'un cookie ?",
    content: `Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou smartphone) lorsque vous consultez un site internet. Il permet notamment de reconnaître votre navigateur, de mémoriser certaines informations entre deux visites ou d'assurer le bon fonctionnement des services proposés.

D'autres technologies de stockage (comme le localStorage du navigateur) peuvent également être utilisées pour conserver certaines informations nécessaires au fonctionnement de l'application.` },
  {
    title: 'Cookies et stockage utilisés',
    content: `EduTutor IA utilise uniquement les cookies et mécanismes de stockage nécessaires au fonctionnement de la plateforme ainsi qu'à l'amélioration de l'expérience utilisateur.

Les technologies utilisées sont notamment les suivantes :

- Cookie de session | Cookie technique | Maintient la connexion de l'utilisateur pendant sa navigation.
- Jeton d'authentification | LocalStorage ou cookie sécurisé | Permet d'identifier l'utilisateur connecté de manière sécurisée.
- Préférences utilisateur | LocalStorage | Mémorise certains paramètres (thème, langue, préférences d'affichage, etc.).
- Consentement aux cookies | Cookie | Conserve le choix exprimé par l'utilisateur concernant les cookies.
- Historique local temporaire | LocalStorage | Améliore l'expérience utilisateur en conservant certaines informations non sensibles entre deux sessions.

Aucun cookie publicitaire ou de profilage n'est déposé.`,
  },
  {
    title: 'Finalité de chaque cookie',
    content: `Les cookies et espaces de stockage utilisés poursuivent exclusivement les finalités suivantes :

- Fonctionnement technique de l'application : authentification des utilisateurs, maintien de la session, sécurisation des accès.
- Conservation des préférences utilisateur : mémorisation des paramètres d'affichage et des choix de navigation.
- Gestion du consentement : conservation de la décision relative aux cookies afin de ne pas solliciter l'utilisateur à chaque visite.
- Amélioration de l'expérience utilisateur : conservation temporaire de certaines informations permettant une navigation plus fluide.

Les données pédagogiques (cours déposés par les enseignants, chapitres suivis, quiz générés, historiques de révision, résultats des étudiants, etc.) sont enregistrées dans la base de données de l'application. Elles ne constituent pas des cookies et sont conservées conformément à la politique de confidentialité d'EduTutor IA.

Aucune donnée transmise aux outils d'intelligence artificielle ne quitte les serveurs hébergeant EduTutor IA. Les traitements sont réalisés localement via Ollama afin de garantir la confidentialité des données et leur maintien au sein de l'infrastructure d'hébergement.`,
  },
  {
    title: 'Consentement',
    content: `Les cookies strictement nécessaires au fonctionnement d'EduTutor IA sont déposés sans consentement préalable, conformément à la réglementation applicable.

Si, à l'avenir, des cookies de mesure d'audience non exemptés ou d'autres cookies facultatifs étaient utilisés, leur dépôt serait soumis au consentement préalable de l'utilisateur au moyen d'une bannière dédiée. L'utilisateur pourrait accepter, refuser ou personnaliser son choix avant tout dépôt de ces cookies.

Le consentement pourra être retiré à tout moment depuis les paramètres de gestion des cookies disponibles sur le site.`,
  },
  { title: 'Durée de conservation',
    content: `Les durées de conservation sont limitées au strict nécessaire :

- Cookie de session : Jusqu'à la fermeture du navigateur ou au maximum 24 heures
- Jeton d'authentification: Jusqu'à 30 jours (ou jusqu'à la déconnexion)
- Préférences utilisateur : 12 mois
- Consentement aux cookies : 6 mois
- Données conservées dans la base de données (cours, quiz, résultats, historique) : Jusqu'à la suppression du compte ou l'exercice du droit à l'effacement, sous réserve des obligations légales applicables

Toutes les durées sont données à titre indicatif.` },
  {
    title: 'Gérer ou refuser les cookies',
    content: `Vous pouvez à tout moment gérer les cookies :

- en utilisant les paramètres de la bannière de gestion des cookies lorsqu'elle est proposée ;
- en configurant votre navigateur afin d'accepter, refuser ou supprimer les cookies déjà enregistrés ;
- en supprimant les données de navigation stockées par votre navigateur.

Le refus des cookies strictement nécessaires au fonctionnement du service peut empêcher l'accès à certaines fonctionnalités d'EduTutor IA, notamment l'authentification et le maintien de la session utilisateur.`,
  },
];

export default function CookiesPage() {
  return (
    <LegalScaffold
      title="Politique de gestion des cookies"
      intro="Les cookies et technologies de stockage utilisés par le site, et comment les gérer."
      sections={SECTIONS}
    >
      <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600">
        💡 Indice pour votre équipe : ce kit stocke actuellement le{' '}
        <code className="bg-slate-200 px-1 rounded">token</code> d'authentification dans le{' '}
        <code className="bg-slate-200 px-1 rounded">localStorage</code> du navigateur. C'est un bon
        point de départ à documenter ici.
      </div>
    </LegalScaffold>
  );
}
