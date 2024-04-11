import { Locale } from './'
import { getConfig, type Config } from '../config'

/**
 * Localizes a URL by prepending the specified locale code to the path.
 *
 * @param {string} [urlString] - The URL string to localize (optional).
 * @param {Locale} [locale] - The desired locale code to prepend to the path (optional).
 * @param {Partial<Config>} [options] - Optional configuration options (overrides defaults).
 * @returns {string} The localized URL or the original URL string if not applicable.
 * 
 * @example
 * 
 * ```typescript
 * const localizedUrl = localizeUrl('/contact', 'es');
 * console.log(localizedUrl); // Output: /es/contact
 * ```
 */
function localizeUrl(
  urlString?: string,
  locale?: Locale,
  options?: Partial<Config>,
) {
  const { defaultLocale } = getConfig(options)

  if (!urlString || !locale || defaultLocale === locale)
    return urlString

  const DUMMY = 'http://dummyhost'
  const url = new URL(urlString, DUMMY)

  if (url.pathname.startsWith(`/${locale}/`))
    return urlString

  url.pathname = `/${locale}${url.pathname}`

  if (!url.toString().startsWith(DUMMY))
    return url.toString()

  return `${url.pathname}${url.search}${url.hash}`
}

export default localizeUrl
