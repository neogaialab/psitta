import type { Locale } from '@psitta/core'
import { DEFAULT_DISPLAY_NAMES_OPTIONS } from '@psitta/core'
import useLocale from './useLocale'

type DisplayNamesOptions = {
  locale?: Locale
}

function dn(
  code: string,
  intlOptions?: Intl.DisplayNamesOptions,
  options?: DisplayNamesOptions,
) {
  const resolvedOptions = intlOptions || DEFAULT_DISPLAY_NAMES_OPTIONS
  let locale = options?.locale

  if (!locale)
    locale = useLocale().value

  return new Intl.DisplayNames(locale, resolvedOptions).of(code)
}

export default dn
