import type { Locale, Value, ValueWithOptions } from '@psitta/core'
import { formatValue } from '@psitta/core'
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
    locale = useLocale().value

  return formatValue(value, locale)
}

export default v
