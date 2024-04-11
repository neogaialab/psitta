import { getConfig, type Config } from '../config'

/**
 * Detects the user's preferred locale from the browser's navigator object.
 * 
 * @param {Partial<Config>} [options] - Optional object containing partial configuration overrides (for Psitta configuration).
 * @returns {Intl.Locale | null} An `Intl.Locale` object representing the detected locale or `null` if no match is found.
 *
 * @details
 *
 * This function uses the browser's `navigator.language` property to get the user's preferred language tag. It then attempts to create an `Intl.Locale` object from this tag. The function relies on the Psitta configuration (`locales` property) to determine the available locales supported by the application. If the language retrieved from the navigator is not included in the `locales` list, the function returns `null`. Otherwise, it returns the created `Intl.Locale` object which can be used for formatting based on the user's preferred language
 */
function detectLocaleFromNavigator(options?: Partial<Config>) {
  const config = getConfig(options)
  
  const tag = navigator.language
  const preferred = new Intl.Locale(tag)

  if (!config.locales.includes(preferred.language))
    return null

  return preferred
}

export default detectLocaleFromNavigator
