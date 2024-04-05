import type { InflectionRule } from "../grammar"
import type { Locale, RegisteredMessages } from "../localization"

export interface Config {
  defaultLocale: Locale
  fallback: boolean
  locales: Locale[]
  messages: RegisteredMessages
  grammar: GrammarConfig
}

export interface GrammarConfig {
  rules: Record<Locale, InflectionRules>
  defaultRules: InflectionRules
}

export interface InflectionRules {
  number: InflectionRule<number> | null
  gender: InflectionRule<string> | null
}
