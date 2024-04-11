import type { Locale } from '../localization'
import { getConfig, type Config } from '../config'

/**
 * Detects the user's preferred locale from a cookie value.
 *
 * @param {string | undefined} localeCookie - The value of the cookie containing the user's preferred locale (or undefined if not set).
 * @param {Partial<Config>} [options] - Optional object containing partial configuration overrides (for Psitta configuration).
 * @returns {Locale | null} The detected locale code (string) or `null` if no match is found or the cookie value is invalid.
 *
 * @details
 * 
 * This function relies on the Psitta configuration (`locales` property) to determine the available locales supported by the application. It checks if the `localeCookie` value exists and is included in the configured `locales` list. If a match is found, the cookie value (which is assumed to be a valid locale code) is returned. Otherwise, the function returns `null`.
 */
function detectLocaleFromCookie(localeCookie: string | undefined, options?: Partial<Config>) {
  const config = getConfig(options)

  let locale: Locale | null

  if (localeCookie && config.locales.includes(localeCookie))
    locale = localeCookie
  else
    locale = null

  return locale
}

export default detectLocaleFromCookie
