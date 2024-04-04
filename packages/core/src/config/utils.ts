import { DEFAULT_I18N_CONFIG, type Config, type ResolvableConfigKey } from './'
import type { Locale } from '../localization'

export function getConfig(options?: Partial<Config>): Config {
  const config = {
    ...DEFAULT_I18N_CONFIG,
    ...globalThis.__psitta,
    ...options,
  }

  return config
}

export function resolveConfigValue(key: ResolvableConfigKey, locale: Locale, options?: Partial<Config>) {
  const defaultValueKeys = {
    numberDeclensionRules: 'defaultNumberDeclensionRule',
  } satisfies Partial<Record<ResolvableConfigKey, keyof Config>>

  const config = getConfig(options)
  const value = config[key]?.[locale]
  const defaultValue = config[defaultValueKeys[key]];

  return value || defaultValue
}

export function resolveConfig(locale: Locale, options?: Partial<Config>) {
  const numberDeclensionRule = resolveConfigValue('numberDeclensionRules', locale, options)

  return {
    numberDeclensionRule,
  }
}
