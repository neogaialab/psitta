import { DEFAULT_GENDER_INFLECTION_RULE, DEFAULT_NUMBER_INFLECTION_RULE } from "../grammar";
import type { Config } from './';

export const MESSAGE_PATTERN = /{[^{}]+}\s?(?:\([^)]+\))?|[^{}]+/g

export const DEFAULT_I18N_CONFIG: Config = {
  locales: ['en', 'es'],
  defaultLocale: 'en',
  fallback: true,
  messages: {},
  grammar: {
    rules: {
      en: {
        gender: null,
        number: DEFAULT_NUMBER_INFLECTION_RULE,
      },
      es: {
        gender: DEFAULT_GENDER_INFLECTION_RULE,
        number: DEFAULT_NUMBER_INFLECTION_RULE,
      },
    },
    defaultRules: {
      gender: DEFAULT_GENDER_INFLECTION_RULE,
      number: DEFAULT_NUMBER_INFLECTION_RULE,
    }
  },
}
