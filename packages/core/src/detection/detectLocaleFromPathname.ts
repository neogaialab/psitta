import { getConfig, type Config } from '../config'
import type { Locale } from '../localization'

/**
 * Detects the user's preferred locale from the URL pathname.
 *
 * @param {string} pathname - The URL pathname string.
 * @param {Partial<Config>} [options] - Optional object containing partial configuration overrides (for Psitta configuration).
 * @returns {{ locale: Locale | null, urlWithoutLocale: string }} An object containing the detected locale code and the URL pathname without the locale segment.
 *
 * @details
 *
 * This function assumes that the first path segment in the URL might represent the user's preferred locale. It checks if this segment matches any of the supported locales defined in the Psitta configuration (`locales` property). The function returns an object containing two properties:
 *   - `locale`: The detected locale code as a string, or `null` if no match is found.
 *   - `urlWithoutLocale`: A modified URL pathname where the first path segment (assumed to be the locale) has been removed.
 *
 * @example
 * 
 * ```typescript
 * const pathname = '/en/about-us';
 * const { locale, urlWithoutLocale } = detectLocaleFromPathname(pathname, { locales: ['en', 'fr'] });
 *
 * if (locale) {
 *   console.log('Detected locale:', locale);
 *   // Output: 'en'
 *   console.log('URL without locale:', urlWithoutLocale);
 *   // Output: '/about-us'
 * } else {
 *   console.log('No matching locale found in pathname.');
 * }
 * ```
 */
function detectLocaleFromPathname(pathname: string, options?: Partial<Config>) {
  const config = getConfig(options)

  const urlPaths = pathname.split('/')
  const firstPath = urlPaths[1]

  let urlWithoutLocale = pathname
  let locale: Locale | null

  if (config.locales.includes(firstPath)) {
    locale = firstPath
    urlWithoutLocale = `/${urlPaths.slice(2).join('/')}`
  }
  else {
    locale = null
  }

  return { locale, urlWithoutLocale }
}

export default detectLocaleFromPathname
