import type { Config } from './'
import { DEFAULT_NUMBER_DECLENSION_RULE } from "../inflection";

export const MESSAGE_PATTERN = /{[^{}]+}\s?(?:\([^)]+\))?|[^{}]+/g

export const DEFAULT_I18N_CONFIG: Config = {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: true,
    defaultNumberDeclensionRule: DEFAULT_NUMBER_DECLENSION_RULE,
    messages: {},
    numberDeclensionRules: { en: DEFAULT_NUMBER_DECLENSION_RULE, sp: DEFAULT_NUMBER_DECLENSION_RULE }
}

export const RESOLVABLE_CONFIG_KEYS = ['numberDeclensionRules'] as const;
