/**
 * Gabarit commun aux pages légales (Lot 5).
 *
 * [Note pédagogique] Ces pages sont volontairement VIERGES : elles fournissent
 * la STRUCTURE (les rubriques attendues) et des indications, mais c'est à votre
 * équipe de les rédiger pendant la semaine APOCAL'IPSSI. Un site qui collecte
 * des données personnelles DOIT légalement publier ces informations.
 *
 * Pour vous aider, chaque page renvoie vers le cours « Réglementation des
 * données » de Mohamed EL AFRIT.
 */
import type { ReactNode } from 'react';

/** URL du cours de référence sur la réglementation des données. */
export const REGLEMENTATION_URL = 'https://mohamedelafrit.com/teaching/Reglementation_des_Donnees';

export type LegalSection = {
  /** Titre de la rubrique (ce que la loi attend de voir). */
  title: string;
  /** Indication pour l'équipe : quoi écrire dans cette rubrique. */
  hint?: string;
  /** Contenu rédigé de la rubrique. */
  content?: string;
};

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Contenu libre optionnel ajouté après les rubriques. */
  children?: ReactNode;
};

export default function LegalScaffold({ title, intro, sections, children }: Props) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-600 mb-6">{intro}</p>


      <div className="space-y-6">
        {sections.map((section, i) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              {i + 1}. {section.title}
            </h2>
            {section.content ? (
              <p className="text-sm text-slate-700 whitespace-pre-line">{section.content}</p>
            ) : (
              <p className="text-sm text-slate-500 italic">À compléter — {section.hint}</p>
            )}
          </section>
        ))}
      </div>

      {children}

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200">
        Dernière mise à jour : 1er juillet 2026. Document rédigé dans le cadre pédagogique
        APOCAL'IPSSI 2026.
      </p>
    </article>
  );
}
