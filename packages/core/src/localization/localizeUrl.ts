import type { Config, Locale } from '../main'
import { getConfig } from '../utils'

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
