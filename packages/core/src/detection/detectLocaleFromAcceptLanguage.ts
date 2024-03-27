import { Config } from 'src/typings'
import { getConfig, parseLocale } from '../utils'

function detectLocaleFromAcceptLanguage(acceptLanguageHeader: string, options?: Partial<Config>) {
  const config = getConfig(options)

  const preferredLanguages = acceptLanguageHeader.split(',').map((lang) => {
    const [language, priority = 'q=1.0'] = lang.trim().split(';')
    return { lang: language, priority: Number.parseFloat(priority.split('=')[1]) }
  })

  preferredLanguages.sort((a, b) => b.priority - a.priority)

  let lang

  for (const preferred of preferredLanguages) {
    if (config.locales.includes(preferred.lang)) {
      lang = preferred.lang
      break
    }
  }

  if (!lang)
    return undefined

  return parseLocale(lang)
}

export default detectLocaleFromAcceptLanguage
