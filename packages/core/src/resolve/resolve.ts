import { getConfig, MESSAGE_PATTERN } from '../config'
import { format } from '../format'
import { decline } from '../inflection'
import { interpolateValue, type Values, type Value } from '../interpolation'
import { type Message } from '../localization'
import { type ResolveOptions, type ResolveCallback } from './'
import { endEscaping, startEscaping } from './utils'

function resolve<I, V extends Value>(
  message: Message,
  values: Partial<Values<V>> = {},
  callbackFn: ResolveCallback<I>,
  initialValue: I,
  options?: ResolveOptions,
) {
  const config = getConfig()
  const locale = options?.locale || config.defaultLocale

  message = startEscaping(message)

  const DUMMY_DECLINE = () => ''

  return (
    message.match(MESSAGE_PATTERN)?.reduce((prev, part) => {
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

      const formattedValue = format(value, locale)
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

export default resolve
