import { type InflectFunction } from "../grammar"
import { type Context } from "../interpolation"
import { type Message } from "../localization"

export interface ResolveOptions {
  locale?: string
}

export type ResolveFunction<O> = (
  message: Message,
  context?: Partial<Context>,
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

export type Segment<P extends Context, V> = {
  type: 'text' | 'placeholder'
  key?: keyof P
  part?: string
  context?: Partial<V>
  inflect: InflectFunction
}
