import { getConfig, type Config } from '../config';
import { type Locale, type LocalizedMessage, type Message, type RegisteredMessages } from '../localization'

/**
 * Localizes a message based on the provided locale and configuration.
 *
 * @template T - The key of the message within the registered message translations.
 * @param {T} message - The key of the message to localize.
 * @param {Locale} [locale] - The preferred locale code for the message (optional).
 * @param {Partial<Config>} [options] - Optional configuration options for localization (overrides defaults).
 * @returns {LocalizedMessage} The localized message or the message key itself if no translation found.
 * @throws {Error} - If no translation is found and fallback is disabled in the configuration.
 * 
 * @example
 * 
 * ```typescript
 * const spanishMessage = localizeMessage('Hello!', 'es'); // assuming translations exist
 * console.log(spanishMessage);
 * // Output: "¡Hola!"
 * ```
 */
function localizeMessage<T extends keyof RegisteredMessages>(
  message: T,
  locale?: Locale,
  options?: Partial<Config>,
): LocalizedMessage {
  const { defaultLocale, messages, fallback } = getConfig(options)
  const resolvedLocale = locale || defaultLocale;

  if (resolvedLocale === defaultLocale)
    return message as unknown as Message

  const translations = (messages as unknown)[message]
  const translation = translations?.[resolvedLocale]

  if (!translations || !translation) {
    if (!fallback) {
      throw new Error(
        `No translation found for: \`${message
        }\`. To use the default locale, you can enable fallback in the i18n config.`,
      )
    }

    return message as unknown as Message
  }

  return translation
}

export default localizeMessage
