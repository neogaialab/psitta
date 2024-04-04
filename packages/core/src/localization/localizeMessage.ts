import type { Config, Locale, LocalizedMessage, Message, RegisteredMessages } from '../main';
import { getConfig } from '../utils';

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
