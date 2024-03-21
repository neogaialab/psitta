import type { Config, NumberDeclensionRule } from './main'

export const MESSAGE_PATTERN = /{[^{}]+}\s?(?:\([^)]+\))?|[^{}]+/g

export const DEFAULT_NUMBER_DECLENSION_RULE: NumberDeclensionRule = (
  forms,
  count,
) => {
  return count === 1 ? 0 : forms.length - 1
}

export const DEFAULT_I18N_CONFIG = {
  locales: ['en'],
  defaultLocale: 'en',
  fallbackLocale: true,
  defaultNumberDeclensionRule: DEFAULT_NUMBER_DECLENSION_RULE,
  valueLocales: undefined,
  defaultValueLocale: 'en-US',
} satisfies Config
