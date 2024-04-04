import { type Message } from "../localization"
import { ValueWithOptions, DateRange, RelativeTime } from "../format"

export type Key = string
export type Value = string | number | boolean | null | undefined | Date | RelativeTime | DateRange | Iterable<string>

export type Values<V extends Value = any> = Record<Key, Value | ValueWithOptions<V>>

export type InferValues<
  T extends Message,
  // eslint-disable-next-line
  P = {},
  V extends Value = any,
// @ts-expect-error
// eslint-disable-next-line,
> = T extends `${infer Text}{${infer Var}}${infer Rest}`
  ? InferValues<Rest, P & { [K in Var]: Value | ValueWithOptions<V> }>
  : P

export function defineValue<V extends Value>(value: V | ValueWithOptions<V>) {
  return value
}

export function defineValues<V extends Value>(values: Record<string, V | ValueWithOptions<V>>) {
  return values
}
