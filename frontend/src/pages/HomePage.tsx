import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useI18n } from '@/contexts/I18nContext';

export default function HomePage() {
  const { user } = useAuth();
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {t('homeTitleLine1')}{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
            {t('homeTitleLine2')}
          </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('homeSubtitle')}</p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <span className="text-sm text-slate-600">{t('languageSwitcherLabel')}</span>
            <button
              type="button"
              onClick={() => setLocale(locale === 'fr' ? 'en' : 'fr')}
              className="rounded-full bg-indigo-600 px-3 py-1 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              {locale === 'fr' ? t('languageEnglish') : t('languageFrench')}
            </button>
          </div>

          {user ? (
            <>
              <Link to="/upload" className="btn-primary px-6 py-3 text-base">
                {t('homeCreateQuiz')}
              </Link>
              <Link to="/history" className="btn-secondary px-6 py-3 text-base">
                {t('homeViewHistory')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-primary px-6 py-3 text-base">
                {t('homeStartFree')}
              </Link>
              <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                {t('homeLogin')}
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-2xl mb-2">📄</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('homeCardUploadTitle')}</h3>
          <p className="text-sm">{t('homeCardUploadBody')}</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">🤖</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('homeCardQuizTitle')}</h3>
          <p className="text-sm">{t('homeCardQuizBody')}</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('homeCardProgressTitle')}</h3>
          <p className="text-sm">{t('homeCardProgressBody')}</p>
        </div>
      </section>
    </div>
  );
}
