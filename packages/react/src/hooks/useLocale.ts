import { useContext } from 'react'
import { LocaleContext } from '../keys'
import { Locale, getDefaultLocale } from '@psitta/core'

function useLocale() {
  const locale = useContext<Locale | null>(LocaleContext)
  return locale || getDefaultLocale()
}

export default useLocale
