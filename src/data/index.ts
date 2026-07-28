import { en } from "./en.ts";
import { es } from "./es.ts";
import type { CvData } from "./types.ts";

export const locales = { es, en } satisfies Record<string, CvData>;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = "es";

export function getData(locale: Locale = defaultLocale): CvData {
  return locales[locale];
}

/** Reemplaza marcadores tipo {years} o {name} en los textos de interfaz. */
export function t(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}

/** Años de experiencia calculados en cada build. */
export function yearsOfExperience(careerStart: string) {
  const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;
  return Math.floor((Date.now() - new Date(careerStart).getTime()) / MS_PER_YEAR);
}
