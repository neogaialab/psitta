import inflect from '../grammar/inflect'
import { getConfig, MESSAGE_PATTERN } from '../config'
import { format } from '../format'
import { DUMMY_INFLECT } from '../grammar'
import { interpolateValue, type Context, type Value } from '../interpolation'
import { type Message } from '../localization'
import { type ResolveOptions, type ResolveCallback } from './'
import { endEscaping, startEscaping } from './utils'

/**
 * Resolves a message string with placeholders, replacing them with values from the context.
 * Escapes and unescapes parts of the message as needed.
 *
 * @template I - The type of the initial value.
 * @template V - The type of the values in the context.
 * @param {Message} message - The message string with placeholders.
 * @param {Partial<Context<V>>} [context] - The context object containing values to replace placeholders in the message. Default is an empty object.
 * @param {ResolveCallback<I>} callbackFn - The callback function called for each part of the resolved message.
 * @param {I} initialValue - The initial value used in the callback function.
 * @param {ResolveOptions} [options] - Additional options for resolving the message, such as the locale.
 * @returns {I} The resolved message after replacing placeholders with values from the context.
 * 
 * @details
 *
 * This function takes a message string with placeholders and resolves it by:
 *   * Escaping special characters to prevent them from being interpreted as part of the message.
 *   * Iterating through each segment of the message:
 *     * Unescaping plain text segments.
 *     * Identifying named placeholders (`{key}`) and extracting the key name.
 *     * Looking up the value for the key in the context object.
 *     * If the value is found:
 *       * Applying any necessary inflections (e.g., singular/plural) based on the value and locale.
 *       * Formatting the value according to the locale.
 *       * Replacing the placeholder with the formatted and inflected value.
 *     * If the value is not found:
 *       * Leaving the placeholder intact.
 *   * Unescaping any remaining escaped characters.
 *   * Calling the `callbackFn` for each segment (escaped text, placeholder, or resolved value) allowing for custom processing.
 *
 * The resolved message is returned for further use.
 * 
 * @example
 *
 * ```typescript
 * const cb: ResolveCallback<string> = (c) => {
 *   return c.prev + c.part
 * }

 * const resolvedMessage = resolve('Hello, {name}!', { name: 'Batou' }, cb, '');
 * console.log(resolvedMessage);
 * // Output: "Hello, Batou!"
 * ```
 * 
 * @see {@link https://neogaialab.github.io/psitta/core/reference/resolve.html#resolveToString|resolveToString}
 * @see {@link https://neogaialab.github.io/psitta/core/reference/resolve.html#resolveToSegments|resolveToSegments}
 */
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
