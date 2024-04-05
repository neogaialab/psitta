import { type InflectFunction } from "../grammar"
import { type Values } from "../interpolation"
import { type Message } from "../localization"

export interface ResolveOptions {
  locale?: string
}

export type ResolveFunction<O> = (
  message: Message,
  values?: Partial<Values>,
  options?: ResolveOptions,
) => O

export type ResolveContext<T> = {
  prev: T
  part: string
  dynamic?: boolean
  key?: string
  inflect: InflectFunction
}
export type ResolveCallback<T> = (c: ResolveContext<T>) => T

export type Segment<P extends Values, V> = {
  type: 'text' | 'placeholder'
  key?: keyof P
  part?: string
  values?: Partial<V>
  inflect: InflectFunction
}
