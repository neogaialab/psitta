import { getConfig } from '../config'
import { FORMS_PATTERN, Inflection, Phrase } from '.'
import type { Value } from '../interpolation'
import type { Locale } from '../localization'

function inflect(
  phrase: Phrase,
  value: Value,
  locale?: Locale,
): Inflection {
  let newInflection: Inflection = { phrase, form: null }

  const config = getConfig()
  const options = config.grammar;
  const rules = options.rules[locale];

  const inflectionMatch = phrase.match(FORMS_PATTERN);

  if (inflectionMatch) {
    const formsString = inflectionMatch[1]
    const forms = formsString.split('|')

    if (typeof value === 'number') {
      const inflectFn = rules?.number ?? config.grammar.defaultRules.number
      
      if(!inflectFn) {
        return newInflection
      }

      const i = inflectFn(forms, value);

      if (i > forms.length) {
        return newInflection;
      }

      const form = forms[i]
      const inflectedPhrase = phrase.replaceAll(`(${formsString})`, form);

      return {
        phrase: inflectedPhrase,
        form,
      }
    }

    if (typeof value === 'string') {
      const inflectFn = rules?.gender ?? config.grammar.defaultRules.gender
      
      if(!inflectFn) {
        return newInflection
      }

      const i = inflectFn(forms, value);

      if (i > forms.length) {
        return newInflection;
      }

      const form = forms[i]

      return {
        phrase: form,
        form,
      }
    }
  }

  return newInflection
}

export default inflect
