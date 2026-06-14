import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "@/locales/en/common.json";
import deCommon from "@/locales/de/common.json";

export type Locale = "en" | "de";
export const SUPPORTED_LOCALES: Locale[] = ["en", "de"];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  de: "DE",
};

export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
};

if (!i18n.isInitialized) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (i18n.use(initReactI18next) as any).init({
    resources: {
      en: {
        common: enCommon,
      },
      de: {
        common: deCommon,
      },
    },
    lng: DEFAULT_LOCALE,
    fallbackLng: DEFAULT_LOCALE,
    defaultNS: "common",
    ns: ["common"],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    initImmediate: false,
  });
}

export default i18n;

/** Derive locale from a URL pathname. */
export function localeFromPathname(pathname: string): Locale {
  return pathname.startsWith("/de") ? "de" : "en";
}

/** Build the equivalent path in another locale. */
export function pathForLocale(pathname: string, targetLocale: Locale): string {
  const currentLocale = localeFromPathname(pathname);
  if (currentLocale === targetLocale) return pathname;

  if (targetLocale === "de") {
    return pathname === "/" ? "/de" : `/de${pathname}`;
  } else {
    const stripped = pathname.replace(/^\/de/, "");
    return stripped === "" ? "/" : stripped;
  }
}
