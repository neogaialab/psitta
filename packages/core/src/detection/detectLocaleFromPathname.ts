import { type Locale, getConfig, Config } from '../main'

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
