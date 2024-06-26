import { getConfig, DEFAULT_I18N_CONFIG } from '../config'

export function getTranslationsObject(key: string) {
  const config = getConfig()
  const boilerplate: any = {}

  const locales = config.locales || DEFAULT_I18N_CONFIG.locales

  boilerplate[key] = {}

  locales
    .filter(locale => locale !== config.defaultLocale)
    .forEach((locale) => {
      boilerplate[key][locale] = ''
    })

  return boilerplate
}
