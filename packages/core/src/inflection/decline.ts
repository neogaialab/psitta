import { declineForNumber, type Declension, type NumberDeclensionRule } from '.'
import { getConfig } from '../config'
import { Value } from '../interpolation'

export interface DeclineOptions {
  numberDeclensionRule?: NumberDeclensionRule
}

export function decline(
  part: string,
  value: Value,
  options?: DeclineOptions,
) {
  const config = getConfig()
  const numberDeclensionRule
    = options?.numberDeclensionRule || config.defaultNumberDeclensionRule

  const declensionMatch = part.match(/\(([^)]+)\)/)

  const rDeclension: Declension = { phrase: part, form: undefined }

  if (declensionMatch) {
    const forms = declensionMatch[1]
    const declension = declineForNumber(part, forms, value, numberDeclensionRule)

    rDeclension.form = declension.form
    rDeclension.phrase = declension.phrase
  }

  return rDeclension
}
