import type { Locale, Value, ValueWithOptions } from '@psitta/core'
import { format } from '@psitta/core'
import useLocale from './useLocale'

type ValueOptions = {
  locale?: Locale,
}

function v<V extends Value>(
  value?: V | ValueWithOptions<V>,
  options?: ValueOptions,
) {
  let locale = options?.locale

  if (!locale)
    locale = useLocale()[0]

  return format(value, locale)
}

export default v
