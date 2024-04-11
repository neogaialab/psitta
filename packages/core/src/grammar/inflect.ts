import { getConfig } from '../config'
import { FORMS_PATTERN, Inflection, Phrase } from '.'
import type { Value } from '../interpolation'
import type { Locale } from '../localization'

/**
 * Inflects a phrase based on the provided value and locale (grammar rules).
 *
 * @param {Phrase} phrase - The phrase containing potential inflection patterns.
 * @param {Value} value - The value used for inflection (number or string).
 * @param {Locale} [locale] - The optional locale code to use for inflection rules (defaults to user's locale).
 * @returns {Inflection} An object containing the inflected phrase and the chosen form.
 *
 * @details
 * 
 * This function inflects a phrase based on the provided value and the grammar rules for the specified locale.
 * It searches for patterns within the phrase enclosed in parentheses `()`. These patterns represent possible forms the phrase can take depending on the value.
 *
 * The function supports two inflection types:
 *   - Number inflection: Used for phrases that change based on numerical values (e.g., "There is 1 apple", "There are 2 apples").
 *   - Gender inflection: Used for phrases that change based on a provided string value representing a gender (e.g., "Seja bem-vindo", "Seja bem-vinda").
 *
 * The specific inflection logic is determined by rules defined in the grammar configuration. The function first checks for locale-specific rules (`rules[locale]`) and falls back to default rules (`config.grammar.defaultRules`) if not found.
 *
 * If no matching inflection pattern is found or the value doesn't match the expected type (number or string), the original phrase is returned without modification.
 *
 * @example
 * 
 * ```typescript
 * const inflection = inflect('You have {count} (apple|apples).', 1, 'en');
 * console.log(inflection.phrase); // Output: You have {count} apple.
 * ```
 */
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
