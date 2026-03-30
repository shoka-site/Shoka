import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from '../locales/ar.json';
import en from '../locales/en.json';

// Both languages are bundled eagerly.
//
// Previously English was loaded lazily, which caused a hydration mismatch:
// the server (Node.js) can't read document.cookie, so i18n fell back to Arabic
// and rendered "المجالات". The client then loaded English synchronously from
// Turbopack's module cache and rendered "Industries". React threw a hydration error.
//
// Eagerly bundling English ensures both server and client have the same translation
// resources at initialization time, so getFixedT(lang) works identically in both
// environments when the Navbar receives its lang prop from the server layout.
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
            en: { translation: en },
        },
        fallbackLng: 'ar',
        interpolation: { escapeValue: false },
        detection: {
            // htmlTag reads document.documentElement.lang which the server sets via
            // <html lang={lang}> and the inline boot script. Placing it first ensures
            // the client-side language detection matches the server-rendered HTML,
            // which is essential for correct React hydration.
            // lookupHtmlLangAttribute defaults to 'lang' — no need to specify it.
            order: ['htmlTag', 'cookie', 'localStorage'],
            caches: ['localStorage'],
            lookupCookie: 'NEXT_LOCALE',
        },
    });

export default i18n;
