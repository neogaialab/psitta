import { DEFAULT_I18N_CONFIG } from './constants'
import type { Config, Locale, LocaleObject, LocalizableConfigKey } from './main'

export class RelativeTime {
  constructor(public value: number, public unit: Intl.RelativeTimeFormatUnit) { }
}

export function getConfig(options?: Partial<Config>): Config {
  const config = {
    ...DEFAULT_I18N_CONFIG,
    ...globalThis.__psitta,
    ...options,
  }

  return config
}

export function getLocalizedConfigValue(key: LocalizableConfigKey, locale: Locale, options?: Partial<Config>) {
  const defaultValueKeys = {
    numberDeclensionRules: 'defaultNumberDeclensionRule',
    valueLocales: 'defaultValueLocale',
  } satisfies Partial<Record<LocalizableConfigKey, keyof Config>>

  const config = getConfig(options)
  const value = config[key]?.[locale]
  const defaultValue = config[defaultValueKeys[key]];

  return value || defaultValue
}

export function getLocalizedConfig(locale: Locale, options?: Partial<Config>) {
  const numberDeclensionRule = getLocalizedConfigValue('numberDeclensionRules', locale, options)
  const valueLocale = getLocalizedConfigValue('valueLocales', locale, options)
  
  return {
    numberDeclensionRule,
    valueLocale
  }
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
