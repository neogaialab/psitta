import { getConfig, type Config } from '../config'

/**
 * Detects the user's preferred locale from the Accept-Language header.
 *
 * @param {string} acceptLanguageHeader - The Accept-Language header value from the HTTP request.
 * @param {Partial<Config>} [options] - Optional object containing partial configuration overrides (for Psitta configuration).
 * @returns {Intl.Locale | undefined} An `Intl.Locale` object representing the detected locale or `undefined` if no match is found.
 *
 * @details
 * 
 * This function relies on the Psitta configuration (`locales` property) to determine the available locales supported by the application. Languages are prioritized based on the quality values (q values) provided in the `Accept-Language` header. Higher q values indicate a stronger preference. The function iterates through the preferred languages, checking if they are included in the `locales` list. If a match is found, the corresponding locale tag is returned as an `Intl.Locale` object. If no matching locale is found, the function returns `undefined`.
 */
function detectLocaleFromAcceptLanguage(acceptLanguageHeader: string, options?: Partial<Config>) {
  const config = getConfig(options)

  const preferredLanguages = acceptLanguageHeader.split(',').map((lang) => {
    const [language, priority = 'q=1.0'] = lang.trim().split(';')
    return { lang: language, priority: Number.parseFloat(priority.split('=')[1]) }
  })

  preferredLanguages.sort((a, b) => b.priority - a.priority)

  let tag

  for (const preferred of preferredLanguages) {
    if (config.locales.includes(preferred.lang)) {
      tag = preferred.lang
      break
    }
  }

  if (!tag)
    return undefined

  return new Intl.Locale(tag)
}

export default detectLocaleFromAcceptLanguage
