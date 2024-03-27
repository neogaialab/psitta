import { FormatOptions } from "./main"
import { RelativeTime } from "./utils"

export interface Config {
  defaultLocale: string
  fallback: boolean
  locales: Locale[]
  messages: RegisteredMessages
  numberDeclensionRules: Record<Locale, NumberDeclensionRule>
  defaultNumberDeclensionRule: NumberDeclensionRule
  valueLocales: Record<Locale, string>
  defaultValueLocale: string
}

export interface Register { }

export type AnyMessages = Messages

export type RegisteredMessages = Register extends {
  messages: infer TMessages extends AnyMessages
}
  ? TMessages
  : AnyMessages

export type Locale = string
export type Text = string
export type Phrase = string
export type Message = string

export type LocaleObject = {
  lang: string
  region?: string
}

export type Translation = Text
export type Translations = Record<Locale, Translation>
export type Messages = Record<Text, Translations>

export type NumberDeclensionRule = (forms: string[], count: number) => number

export type Value = string | number | boolean | null | undefined | Date | RelativeTime | Iterable<string>

export type AnyFormatOptions = Record<string, unknown>

export type RegisteredFormatOptions = Register extends {
  formatOptions: infer T extends AnyFormatOptions
}
  ? T
  : AnyFormatOptions

export type InferFormatOptions<V> = V extends number
  ? Intl.NumberFormatOptions
  : V extends Date
  ? Intl.DateTimeFormatOptions
  : V extends RelativeTime
  ? Intl.RelativeTimeFormatOptions
  : V extends string
  ? unknown
  : V extends Iterable<string>
  ? Intl.ListFormatOptions
  : never

export type CustomFormatOptions<V> = {
  custom?: (value: V, locale: Locale, options: ValueFormatOptions<V>) => string
}

export type ValueFormatOptions<V> = Intl.NumberFormatOptions
  & Intl.RelativeTimeFormatOptions
  & Intl.DateTimeFormatOptions
  & Intl.ListFormatOptions
  & CustomFormatOptions<V>
  & RegisteredFormatOptions

export type ValueWithOptions<V> = [V, (InferFormatOptions<V> & CustomFormatOptions<V> & RegisteredFormatOptions)?]

export type Values<V = any> = Record<Placeholder, Value | ValueWithOptions<V>>

export type Placeholder = string

export type InferValues<
  T extends Text,
  // eslint-disable-next-line
  P = {},
  V = unknown
  // @ts-expect-error
  // eslint-disable-next-line,
> = T extends `${infer Text}{${infer Var}}${infer Rest}`
  ? InferValues<Rest, P & { [K in Var]: Value | ValueWithOptions<V> }>
  : P

export type FormatFunction<O> = (
  text: Text,
  values?: Partial<Values>,
  options?: FormatOptions,
) => O

export type FormatContext<T> = {
  prev: T
  part: string
  dynamic?: boolean
  key?: string
  decline: DeclineFunction
}
export type FormatCallback<T> = (c: FormatContext<T>) => T

export type Declension = {
  phrase: string
  form: string | undefined
}
export type DeclineFunction = (value: Value) => string

export type Segment<P extends Values, V> = {
  type: 'text' | 'placeholder'
  key?: keyof P
  part?: string
  values?: Partial<V>
  decline: DeclineFunction
}

export interface InterpolateOptions {
  valueLocale: string
}

export function defineValue<V>(value: V | ValueWithOptions<V>) {
  return value
}

export { }
