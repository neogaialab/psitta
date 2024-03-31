import { getConfig, type Declension, type NumberDeclensionRule, type Phrase, type Value } from '../main'

export function declineForNumber(
  phrase: Phrase,
  formsString: string,
  value: Value,
  numberDeclensionRule: NumberDeclensionRule,
): Declension {
  const forms = formsString.split('|')
  const i = numberDeclensionRule(forms, value as number)

  if (i > forms.length || typeof value !== 'number')
    return { phrase, form: undefined }

  const form = forms[i]

  phrase = phrase.replaceAll(`(${formsString})`, form)
  return { phrase, form }
}

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
