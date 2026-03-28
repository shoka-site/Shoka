import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Arabic is the default language for this Iraqi platform.
// Only Arabic is bundled — English loads lazily on demand (~19KB saved for Arabic users).
import ar from '../locales/ar.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
        },
        fallbackLng: 'ar',
        interpolation: { escapeValue: false },
        detection: {
            // Only trust explicit user choice (cookie or localStorage).
            // 'navigator' is intentionally excluded — the browser's system language
            // (e.g. en-US) must never override an Arabic-default platform.
            // On first visit with no prior choice, fallbackLng:'ar' takes effect.
            order: ['cookie', 'localStorage'],
            caches: ['localStorage'],
            lookupCookie: 'NEXT_LOCALE',
        },
    });

// Lazily load English only when the user has selected it.
// Falls back to Arabic strings during the async gap — imperceptible in practice.
if (i18n.language?.startsWith('en')) {
    import('../locales/en.json').then((mod) => {
        i18n.addResourceBundle('en', 'translation', mod.default, true, true);
        if (i18n.language?.startsWith('en')) i18n.changeLanguage('en');
    });
}

export default i18n;
