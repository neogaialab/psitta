import { type Message } from "../localization"
import { type NumberDeclensionRule, type DeclineFunction } from "../inflection"
import { type Values } from "../interpolation"

export interface ResolveOptions {
  numberDeclensionRule?: NumberDeclensionRule
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
  decline: DeclineFunction
}
export type ResolveCallback<T> = (c: ResolveContext<T>) => T

export type Segment<P extends Values, V> = {
  type: 'text' | 'placeholder'
  key?: keyof P
  part?: string
  values?: Partial<V>
  decline: DeclineFunction
}
