import { DEFAULT_I18N_CONFIG } from './constants'
import type { Config, Locale, LocaleObject } from './main'

export class RelativeTime {
  constructor(public value: number, public unit: Intl.RelativeTimeFormatUnit) { }
}

export function getConfig(): Config {
  const config = {
    ...DEFAULT_I18N_CONFIG,
    ...globalThis.__psitta,
  }

  return config
}

export function getDefaultLocale() {
  const config = globalThis.__psitta
  return config.defaultLocale || DEFAULT_I18N_CONFIG.defaultLocale
}

export function stringifyLocale(locale: LocaleObject) {
  let str = locale.lang

  if (locale.region)
    str += `-${locale.region}`

  return str
}

export function parseLocale(lang: string): LocaleObject {
  const parsed = lang.split('-')

  return {
    lang: parsed[0],
    region: parsed[1],
  }
}

export function getNumberDeclensionRule(locale: Locale, options?: Config) {
  const { numberDeclensionRules, defaultNumberDeclensionRule }
    = options || getConfig()

  return numberDeclensionRules?.[locale] || defaultNumberDeclensionRule
}

export function getValueLocale(locale: Locale, options?: Config) {
  const { valueLocales, defaultValueLocale } = options || getConfig()

  return valueLocales?.[locale] || defaultValueLocale
}

export function getFormatOptions(locale: Locale, options?: Config) {
  const numberDeclensionRule = getNumberDeclensionRule(locale, options)
  const valueLocale = getValueLocale(locale, options)
  const formatOptions = { numberDeclensionRule, valueLocale }

  return formatOptions
}
