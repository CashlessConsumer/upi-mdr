import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "hi" | "ta" | "te" | "bn" | "mr" | "gu" | "kn" | "ml" | "pa";
export type TranslationDictionary = Record<string, string>;

export const locales: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "gu", label: "Gujarati", nativeLabel: "ગુજરાતી" },
  { code: "kn", label: "Kannada", nativeLabel: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", nativeLabel: "മലയാളം" },
  { code: "pa", label: "Punjabi", nativeLabel: "ਪੰਜਾਬੀ" },
];

import hi from "./locales/hi";
import ta from "./locales/ta";
import mr from "./locales/mr";
import bn from "./locales/bn";
import te from "./locales/te";

const translations: Partial<Record<Locale, TranslationDictionary>> = {
  en: {},
  hi,
  ta,
  mr,
  bn,
  te,
};

function getInitialLocale(): Locale {
  const stored = window.localStorage.getItem("upi-mdr-locale") as Locale | null;
  if (stored && locales.some((locale) => locale.code === stored)) return stored;
  const browser = navigator.language.split("-")[0] as Locale;
  return locales.some((locale) => locale.code === browser) ? browser : "en";
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("upi-mdr-locale", next);
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (key, values) => {
      let result = translations[locale]?.[key] ?? translations.en?.[key] ?? key;
      for (const [name, replacement] of Object.entries(values ?? {})) {
        result = result.replaceAll(`{{${name}}}`, String(replacement));
      }
      return result;
    },
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
