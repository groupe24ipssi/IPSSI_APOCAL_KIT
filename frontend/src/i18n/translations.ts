export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

export const messages = {
  fr: {
    navNewQuiz: 'Nouveau quiz',
    navDashboard: 'Tableau de bord',
    navReview: 'Révision',
    navHistory: 'Historique',
    navAdmin: 'Admin',
    navProfileTitle: 'Mon profil',
    navLogin: 'Connexion',
    navSignup: 'S\'inscrire',
    navLogout: 'Déconnexion',
    navLegalMentions: 'Mentions légales',
    navLegalPrivacy: 'Confidentialité',
    navLegalCgu: 'CGU',
    navLegalCookies: 'Cookies',
    footerCourse: 'Cours Agile',
    themeToggleLabel: 'Basculer le thème clair/sombre',
    languageSwitcherLabel: 'Changer la langue',
    languageFrench: 'FR',
    languageEnglish: 'EN',
    homeTitleLine1: 'Révise mieux,',
    homeTitleLine2: 'grâce à l\'IA.',
    homeSubtitle:
      "Upload ton cours, EduTutor te génère 10 questions QCM, te corrige et identifie tes lacunes. Le tout sur ta machine, en open source.",
    homeCreateQuiz: 'Créer un quiz',
    homeViewHistory: 'Voir mon historique',
    homeStartFree: 'Commencer gratuitement',
    homeLogin: 'Se connecter',
    homeCardUploadTitle: 'Uploade ton cours',
    homeCardUploadBody: 'PDF ≤ 5 Mo ou texte collé. Tout reste local sur ta machine.',
    homeCardQuizTitle: '10 QCM générés',
    homeCardQuizBody: 'Llama 3.1 8B via Ollama. Aucune API payante, aucune fuite de données.',
    homeCardProgressTitle: 'Mesure ta progression',
    homeCardProgressBody: 'Historique des scores, lacunes identifiées (extension Release 2).',
    homeKitMessage: 'Kit de démarrage APOCAL\'IPSSI 2026.',
    loginTitle: 'Connexion',
    loginSubtitle: 'Pas encore de compte ?',
    loginLinkSignup: 'S\'inscrire',
    loginForgotPassword: 'Mot de passe oublié ?',
    loginSubmit: 'Se connecter',
    loginSubmitting: 'Connexion…',
    loginEmailLabel: 'Email',
    loginPasswordLabel: 'Mot de passe',
    signupTitle: 'Créer un compte',
    signupSubtitle: 'Déjà inscrit ?',
    signupLinkLogin: 'Se connecter',
    signupClosedTitle: 'Inscriptions fermées',
    signupClosedBody: 'Les inscriptions sont actuellement désactivées. Revenez plus tard.',
    signupClosedLink: 'Déjà un compte ? Se connecter',
    signupFirstNameLabel: 'Prénom',
    signupFirstNameHint: 'facultatif',
    signupLastNameLabel: 'Nom',
    signupLastNameHint: 'facultatif',
    signupPasswordLabel: 'Mot de passe',
    signupPasswordHint: '≥ 8 caractères',
    signupSubmit: 'Créer mon compte',
    signupSubmitting: 'Création du compte…',
    forgotTitle: 'Mot de passe oublié',
    forgotSubtitle:
      'Saisissez votre email : si un compte existe, vous recevrez un lien pour choisir un nouveau mot de passe.',
    forgotEmailLabel: 'Email',
    forgotSubmit: 'Envoyer le lien',
    forgotSubmitting: 'Envoi…',
    forgotBack: '← Retour à la connexion',
  },
  en: {
    navNewQuiz: 'New quiz',
    navDashboard: 'Dashboard',
    navReview: 'Review',
    navHistory: 'History',
    navAdmin: 'Admin',
    navProfileTitle: 'My profile',
    navLogin: 'Log in',
    navSignup: 'Sign up',
    navLogout: 'Log out',
    navLegalMentions: 'Legal notice',
    navLegalPrivacy: 'Privacy',
    navLegalCgu: 'Terms',
    navLegalCookies: 'Cookies',
    footerCourse: 'Agile course',
    themeToggleLabel: 'Switch light/dark theme',
    languageSwitcherLabel: 'Change language',
    languageFrench: 'FR',
    languageEnglish: 'EN',
    homeTitleLine1: 'Revise better,',
    homeTitleLine2: 'with AI.',
    homeSubtitle:
      'Upload your course, EduTutor generates 10 MCQs, corrects them and identifies your weak spots. Everything runs on your machine, open source.',
    homeCreateQuiz: 'Create a quiz',
    homeViewHistory: 'See my history',
    homeStartFree: 'Start for free',
    homeLogin: 'Log in',
    homeCardUploadTitle: 'Upload your course',
    homeCardUploadBody: 'PDF ≤ 5 MB or pasted text. Everything stays local on your machine.',
    homeCardQuizTitle: '10 MCQs generated',
    homeCardQuizBody: 'Llama 3.1 8B via Ollama. No paid API and no data leak.',
    homeCardProgressTitle: 'Track your progress',
    homeCardProgressBody: 'Score history, weaknesses identified (Release 2 extension).',
    homeKitMessage: 'APOCAL\'IPSSI 2026 starter kit.',
    loginTitle: 'Log in',
    loginSubtitle: 'No account yet?',
    loginLinkSignup: 'Sign up',
    loginForgotPassword: 'Forgot your password?',
    loginSubmit: 'Log in',
    loginSubmitting: 'Logging in…',
    loginEmailLabel: 'Email',
    loginPasswordLabel: 'Password',
    signupTitle: 'Create an account',
    signupSubtitle: 'Already registered?',
    signupLinkLogin: 'Log in',
    signupClosedTitle: 'Signups closed',
    signupClosedBody: 'Signups are currently disabled. Please come back later.',
    signupClosedLink: 'Already have an account? Log in',
    signupFirstNameLabel: 'First name',
    signupFirstNameHint: 'optional',
    signupLastNameLabel: 'Last name',
    signupLastNameHint: 'optional',
    signupPasswordLabel: 'Password',
    signupPasswordHint: '≥ 8 characters',
    signupSubmit: 'Create my account',
    signupSubmitting: 'Creating account…',
    forgotTitle: 'Forgot your password',
    forgotSubtitle:
      'Enter your email address: if an account exists, you will receive a link to choose a new password.',
    forgotEmailLabel: 'Email',
    forgotSubmit: 'Send the link',
    forgotSubmitting: 'Sending…',
    forgotBack: '← Back to log in',
  },
} as const;

export type TranslationKey = keyof (typeof messages)[typeof defaultLocale];

export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return defaultLocale;
  }

  const saved = window.localStorage.getItem('apocal_locale');
  if (saved && locales.includes(saved as Locale)) {
    return saved as Locale;
  }

  const navigatorLanguage = window.navigator.language.toLowerCase();
  if (navigatorLanguage.startsWith('en')) {
    return 'en';
  }

  return defaultLocale;
}

export function translate(locale: Locale, key: TranslationKey): string {
  return messages[locale][key] ?? messages[defaultLocale][key] ?? key;
}
