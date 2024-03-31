import tLocale from './t'
import dnLocale from './dn'
import vLocale from './v'
import uLocale from './u'
import useLocale from './useLocale'

function useI18n() {
  const [locale, setLocale] = useLocale()

  const t: typeof tLocale = (text, values, options) => {
    return tLocale(text, values, options || { locale })
  }

  const dn: typeof dnLocale = (code, intlOptions, options) => {
    return dnLocale(code, intlOptions, options || { locale })
  }

  const v: typeof vLocale = (value, options) => {
    return vLocale(value, options || { locale })
  }

  const u: typeof uLocale = (url, values, options) => {
    return uLocale(url, values, options || { locale })
  }

  return { locale, setLocale, t, dn, v, u }
}

export default useI18n
