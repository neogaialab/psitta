import { RESOLVABLE_CONFIG_KEYS } from "./"
import type { NumberDeclensionRule } from "../inflection"
import type { Locale, RegisteredMessages } from "../localization"

export interface Config {
  defaultLocale: Locale
  fallback: boolean
  locales: Locale[]
  messages: RegisteredMessages
  numberDeclensionRules: Record<Locale, NumberDeclensionRule>
  defaultNumberDeclensionRule: NumberDeclensionRule
}

export type ResolvableConfigKey = typeof RESOLVABLE_CONFIG_KEYS[number];
