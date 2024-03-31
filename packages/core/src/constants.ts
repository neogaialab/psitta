import type { Config, NumberDeclensionRule } from './main'

export const MESSAGE_PATTERN = /{[^{}]+}\s?(?:\([^)]+\))?|[^{}]+/g

export const DEFAULT_NUMBER_DECLENSION_RULE: NumberDeclensionRule = (
  forms,
  count,
) => {
  return count === 1 ? 0 : forms.length - 1
}

export const DEFAULT_I18N_CONFIG: Config = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  fallback: true,
  defaultNumberDeclensionRule: DEFAULT_NUMBER_DECLENSION_RULE,
  messages: {},
  numberDeclensionRules: { en: DEFAULT_NUMBER_DECLENSION_RULE, sp: DEFAULT_NUMBER_DECLENSION_RULE }
}

export const RESOLVABLE_CONFIG_KEYS = ['numberDeclensionRules'] as const;

export type ResolvableConfigKey = typeof RESOLVABLE_CONFIG_KEYS[number];

export const DEFAULT_DISPLAY_NAMES_OPTIONS: Intl.DisplayNamesOptions = {
  type: 'language'
}
