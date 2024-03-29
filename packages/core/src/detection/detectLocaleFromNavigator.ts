import { Config } from 'src/typings'
import { getConfig } from '../utils'

function detectLocaleFromNavigator(options?: Partial<Config>) {
  const config = getConfig(options)
  
  const tag = navigator.language
  const preferred = new Intl.Locale(tag)

  if (!config.locales.includes(preferred.language))
    return null

  return preferred
}

export default detectLocaleFromNavigator
