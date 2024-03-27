import { type Locale, getConfig, Config } from '../main'

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
