import { type Locale, getDefaultLocale } from '@psitta/core'
import { localeKey } from '../keys'
import type { ComputedRef } from 'vue'
import { inject } from 'vue'

function useLocale() {
  const locale = inject<ComputedRef<Locale>>(localeKey, getDefaultLocale())
  return locale
}

export default useLocale
