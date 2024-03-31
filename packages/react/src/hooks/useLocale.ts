import { getConfig } from '@psitta/core'
import { useContext } from 'react'
import { LocaleContext } from '../keys'

function useLocale() {
  const [locale, setLocale] = useContext(LocaleContext)
  const defaultLocale = getConfig().defaultLocale;

  return [locale || defaultLocale, setLocale] as [string, typeof setLocale]
}

export default useLocale
