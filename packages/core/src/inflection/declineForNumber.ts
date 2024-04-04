import { type Value } from "../interpolation"
import { type Declension, type NumberDeclensionRule, type Phrase } from "."

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
