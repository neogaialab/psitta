import { Config } from 'src/typings'
import { getConfig, parseLocale } from '../utils'

function detectLocaleFromNavigator(options?: Partial<Config>) {
  const config = getConfig(options)
  
  const language = navigator.language
  const preferred = parseLocale(language)

  if (!config.locales.includes(preferred.lang))
    return null

  return preferred
}

export default detectLocaleFromNavigator
