import { type Value } from "../interpolation"

export type Phrase = string

export type Declension = {
    phrase: Phrase
    form: string | undefined
}
export type DeclineFunction = (value: Value) => string

export type NumberDeclensionRule = (forms: string[], count: number) => number
