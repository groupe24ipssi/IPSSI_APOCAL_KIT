/** Mentions légales (modèle vierge à compléter). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Éditeur du site',
    content: `Le site EduTutor IA est édité par la société EduTutor IA

Siège social :
15, boulevard Laure EMIPSUM
12345 Nostringval
France

Email : contact@edututor.fr`,
  },
  {
    title: 'Directeur de la publication',
    content: `Le directeur de la publication est Anne Onyme, Présidente d'EduTutor.

Email : dpo@edututor-ia.test`,
  },
  { title: 'Hébergeur',
    content: `Le site est hébergé par :
Société L'Hébergeur à l'Hébergère (HAH)
28, place HOLDER
00100 Fictiville
France

Email : contact@hah-web.com
Tél : 06.07.08.09.010` },
  {
    title: 'Propriété intellectuelle',
    content: `L'ensemble des éléments composant EduTutor IA, notamment les textes, illustrations, graphismes, logos, interfaces, bases de données, développements logiciels, modèles de prompts, ainsi que le code source original, est protégé par les dispositions du Code de la propriété intellectuelle.

Sauf autorisation écrite préalable de l'éditeur, toute reproduction, représentation, modification, diffusion ou exploitation, totale ou partielle, est interdite.

Les contenus pédagogiques importés par les utilisateurs demeurent leur propriété ou celle de leurs ayants droit. Ils sont utilisés uniquement dans le cadre du fonctionnement de la plateforme et ne sont pas exploités pour entraîner des modèles d'intelligence artificielle tiers.`,
  },
  { title: 'Contact',
    content: `Pour toute question relative aux présentes mentions légales, à l'utilisation du site ou à toute demande d'ordre juridique, vous pouvez contacter l'éditeur à l'adresse suivante :

Service juridique – EduTutor IA
contact@edututor.fr` },
];

export default function MentionsLegalesPage() {
  return (
    <LegalScaffold
      title="Mentions légales"
      intro="Informations légales obligatoires identifiant l'éditeur et l'hébergeur du site."
      sections={SECTIONS}
    />
  );
}
