import { getConfig, type Config } from '../config'

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
