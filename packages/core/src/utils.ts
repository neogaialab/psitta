import { DEFAULT_I18N_CONFIG } from './constants'
import type { Config, Locale, LocaleObject } from './main'

export class RelativeTime {
  constructor(public value: number, public unit: Intl.RelativeTimeFormatUnit) { }
}

export function getConfig(): Config {
  const config: Config = (globalThis.__psitta || DEFAULT_I18N_CONFIG)
  const defaultLocale = getDefaultLocale()
  const locales = config.locales || DEFAULT_I18N_CONFIG.locales

  const translations = config.translations || {}
  const fallbackLocale = config.fallbackLocale || DEFAULT_I18N_CONFIG.fallbackLocale

  const valueLocales = config.valueLocales || DEFAULT_I18N_CONFIG.valueLocales
  const defaultValueLocale = config.defaultValueLocale || DEFAULT_I18N_CONFIG.defaultValueLocale
  const defaultNumberDeclensionRule = config.defaultNumberDeclensionRule || DEFAULT_I18N_CONFIG.defaultNumberDeclensionRule
  const numberDeclensionRules = config.numberDeclensionRules

  return {
    translations,
    fallbackLocale,
    locales,
    defaultLocale,
    defaultNumberDeclensionRule,
    numberDeclensionRules,
    valueLocales,
    defaultValueLocale,
  }
}

export function getDefaultLocale() {
  const i18nConfig: Config = globalThis.__psitta || DEFAULT_I18N_CONFIG
  return i18nConfig.defaultLocale || DEFAULT_I18N_CONFIG.defaultLocale
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
