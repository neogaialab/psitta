import inflect from '../grammar/inflect'
import { getConfig, MESSAGE_PATTERN } from '../config'
import { format } from '../format'
import { DUMMY_INFLECT } from '../grammar'
import { interpolateValue, type Context, type Value } from '../interpolation'
import { type Message } from '../localization'
import { type ResolveOptions, type ResolveCallback } from './'
import { endEscaping, startEscaping } from './utils'

function resolve<I, V extends Value>(
  message: Message,
  context: Partial<Context<V>> = {},
  callbackFn: ResolveCallback<I>,
  initialValue: I,
  options?: ResolveOptions,
) {
  const config = getConfig()
  const locale = options?.locale || config.defaultLocale

  message = startEscaping(message)

  return (
    message.match(MESSAGE_PATTERN)?.reduce((prev, part) => {
      const isNamed = part.startsWith('{')

      if (!isNamed) {
        part = endEscaping(part)
        return callbackFn({ prev, part, inflect: DUMMY_INFLECT })
      }

      const key = part.substring(1, part.indexOf('}'))
      const value = (context as any)[key]

      if (value === undefined) {
        part = endEscaping(part)
        return callbackFn({ prev, part, key, inflect: DUMMY_INFLECT })
      }

      const phrase = part
      const inflection = inflect(phrase, value, locale)

      const formattedValue = format(value, locale)
      part = interpolateValue(inflection.phrase, key, formattedValue)

      part = endEscaping(part)

      const inflectPhrase = (value: Value) => {
        return inflect(phrase, value, locale).form || ''
      }

      return callbackFn({
        prev,
        part,
        key,
        dynamic: true,
        inflect: inflectPhrase,
      })
    }, initialValue) || initialValue
  )
}

export default resolve
