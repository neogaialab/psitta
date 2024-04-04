import interpolateValue from '../interpolation/interpolateValue'
import { MESSAGE_PATTERN } from '../constants'
import { NumberDeclensionRule, Values, getConfig, type FormatCallback, type Text, type Value, formatValue } from '../main'
import { decline } from './decline'

function startEscaping(text: string) {
  return (text = text
    .replaceAll('\\{', '__CURLY_OPEN')
    .replaceAll('\\}', '__CURLY_CLOSE')
    .replaceAll('\\|', '__PIPE')
    .replaceAll('\\(', '__PARENTHESES_OPEN')
    .replaceAll('\\)', '__PARENTHESES_CLOSE'))
}

function endEscaping(text: string) {
  return (text = text
    .replaceAll('__CURLY_OPEN', '{')
    .replaceAll('__CURLY_CLOSE', '}')
    .replaceAll('__PIPE', '|')
    .replaceAll('__PARENTHESES_OPEN', '(')
    .replaceAll('__PARENTHESES_CLOSE', ')'))
}

export interface FormatOptions {
  numberDeclensionRule?: NumberDeclensionRule
  locale?: string
}

function format<I, V>(
  text: Text,
  values: Partial<Values<V>> = {},
  callbackFn: FormatCallback<I>,
  initialValue: I,
  options?: FormatOptions,
) {
  const config = getConfig()
  const locale = options?.locale || config.defaultLocale

  text = startEscaping(text)

  const DUMMY_DECLINE = () => ''

  return (
    text.match(MESSAGE_PATTERN)?.reduce((prev, part) => {
      const isNamed = part.startsWith('{')

      if (!isNamed) {
        part = endEscaping(part)
        return callbackFn({ prev, part, decline: DUMMY_DECLINE })
      }

      const key = part.substring(1, part.indexOf('}'))
      const value = (values as any)[key]

      if (value === undefined) {
        part = endEscaping(part)
        return callbackFn({ prev, part, key, decline: DUMMY_DECLINE })
      }

      const declineOptions = { numberDeclensionRule: options?.numberDeclensionRule }
      const phrase = part
      const declension = decline(phrase, value, declineOptions)


      const formattedValue = formatValue(value, locale) 
      part = interpolateValue(declension.phrase, key, formattedValue)

      part = endEscaping(part)

      const declinePhrase = (v: Value) => {
        return decline(phrase, v, declineOptions).form || ''
      }

      return callbackFn({
        prev,
        part,
        key,
        dynamic: true,
        decline: declinePhrase,
      })
    }, initialValue) || initialValue
  )
}

export default format
