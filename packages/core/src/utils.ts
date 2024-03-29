import { DEFAULT_I18N_CONFIG } from './constants'
import type { Config, Locale, LocalizableConfigKey } from './main'

export class RelativeTime {
  constructor(public value: number, public unit: Intl.RelativeTimeFormatUnit) { }
}

export class DateRange {
  constructor(public startDate: Date, public endDate: Date) { }
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
  } satisfies Partial<Record<LocalizableConfigKey, keyof Config>>

  const config = getConfig(options)
  const value = config[key]?.[locale]
  const defaultValue = config[defaultValueKeys[key]];

  return value || defaultValue
}

export function getLocalizedConfig(locale: Locale, options?: Partial<Config>) {
  const numberDeclensionRule = getLocalizedConfigValue('numberDeclensionRules', locale, options)
  
  return {
    numberDeclensionRule,
  }
}
