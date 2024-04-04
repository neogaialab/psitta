import { DateRange, RelativeTime } from "."
import { Value } from "../interpolation"
import { type Locale, type Register } from "../localization"

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
  : V extends DateRange
  ? Intl.DateTimeFormatOptions
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

export type ValueWithOptions<V extends Value = any> = [V, (InferFormatOptions<V> & CustomFormatOptions<V> & RegisteredFormatOptions)?]
