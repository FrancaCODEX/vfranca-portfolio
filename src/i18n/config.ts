export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Texto disponível nos dois idiomas. */
export type Localized<T = string> = Record<Locale, T>;

export const pick = <T,>(value: Localized<T>, locale: Locale): T => value[locale];
