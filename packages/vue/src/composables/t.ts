import { collect, formatToString, getConfig, getFormatOptions, localizeKey } from '@psitta/core'
import type { InferValues, Key, Locale, Psitta, Values } from '@psitta/core'
import useLocale from './useLocale'
import { isServer } from '../utils'

type ValueOf<T> = T[keyof T]

type EveryTranslationOf<D extends string & keyof Psitta.MessageSchema> = Extract<
  ValueOf<Psitta.MessageSchema[D]>,
  string
>

function t<T extends Key & keyof Psitta.MessageSchema>(
  key: T,
  values?: Partial<InferValues<T | EveryTranslationOf<T>>>,
  locale?: Locale,
) {
  if (import.meta.env.DEV) {
    if (!isServer)
      collect(key, values as Values)
  }

  const options = getConfig()

  if (!locale)
    locale = useLocale().value

  const message = localizeKey(key, locale, options)
  const formatOptions = getFormatOptions(locale, options)

  return formatToString(message, values, formatOptions)
}

export default t
