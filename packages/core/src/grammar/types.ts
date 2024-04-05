import { type Value } from "../interpolation"

export type Phrase = string

export type InflectionRule<V = unknown> = (forms: string[], value: V) => number

export type InflectFunction = (value: Value) => string
export type Inflection = {
  phrase: Phrase
  form: string | null
}
