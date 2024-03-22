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
  valueLocales: { en: 'en-US', sp: 'sp-SP' },
  defaultValueLocale: 'en',
  messages: {},
}
