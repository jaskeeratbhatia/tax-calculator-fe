import en from "../i18n/en/translation.json";
import fr from "../i18n/fr/translation.json";

export const resources = {
  en,
  fr
} as const;

export type TranslationKeys = keyof typeof en;