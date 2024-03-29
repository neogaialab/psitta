import type { Config, NumberDeclensionRule } from './main'

export const MESSAGE_PATTERN = /{[^{}]+}\s?(?:\([^)]+\))?|[^{}]+/g

export const DEFAULT_NUMBER_DECLENSION_RULE: NumberDeclensionRule = (
  forms,
  count,
) => {
  return count === 1 ? 0 : forms.length - 1
}

export const DEFAULT_I18N_CONFIG: Config = {
  locales: ['en', 'sp'],
  defaultLocale: 'en',
  fallback: true,
  defaultNumberDeclensionRule: DEFAULT_NUMBER_DECLENSION_RULE,
  messages: {},
  numberDeclensionRules: { en: DEFAULT_NUMBER_DECLENSION_RULE, sp: DEFAULT_NUMBER_DECLENSION_RULE }
}

export const LOCALIZABLE_CONFIG_KEYS = ['numberDeclensionRules'] as const;

export type LocalizableConfigKey = typeof LOCALIZABLE_CONFIG_KEYS[number];
