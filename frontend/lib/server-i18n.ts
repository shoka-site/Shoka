import en from "../locales/en.json";
import ar from "../locales/ar.json";

const resources = { en, ar };

export function getServerTranslation(lang: "en" | "ar" = "ar") {
  const translations = resources[lang] || resources.ar;

  return {
    t: (key: string, fallback?: string) => {
      const keys = key.split(".");
      let result: any = translations;
      
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = result[k];
        } else {
          return fallback || key;
        }
      }
      
      return typeof result === "string" ? result : fallback || key;
    },
    lang,
    isRtl: lang === "ar"
  };
}
