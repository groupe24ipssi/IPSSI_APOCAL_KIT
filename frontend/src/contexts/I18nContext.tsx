import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { defaultLocale, getInitialLocale, locales, translate, type Locale, type TranslationKey } from '@/i18n/translations';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem('apocal_locale', locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: Locale) => setLocaleState(next),
      t: (key: TranslationKey) => translate(locale, key),
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="flex items-center gap-1" aria-label={t('languageSwitcherLabel')}>
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`px-2 py-1 rounded text-xs font-semibold ${
            locale === option ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-pressed={locale === option}
        >
          {option === 'fr' ? t('languageFrench') : t('languageEnglish')}
        </button>
      ))}
    </div>
  );
}

export { defaultLocale, locales };
