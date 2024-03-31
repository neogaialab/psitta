import type { InferValues, Locale, RegisteredMessages, Values } from '@psitta/core'
import { collect, formatToString, prepareFormat } from '@psitta/core'
import { isServer } from '../utils'
import useLocale from './useLocale'

type ValueOf<T> = T[keyof T]

type EveryTranslationOf<D extends keyof RegisteredMessages> = Extract<
  ValueOf<RegisteredMessages[D]>,
  string
>

type TranslateOptions = {
  locale?: Locale,
}

function t<T extends keyof RegisteredMessages>(
  key: T,
  values?: Partial<InferValues<T | EveryTranslationOf<T>>>,
  options?: TranslateOptions,
) {
  if (import.meta.env.DEV) {
    if (!isServer)
      collect(key, values as Values)
  }

  let locale = options?.locale

  if (!locale)
    locale = useLocale()[0]

  const { localizedMessage, formatOptions } = prepareFormat(key as string, locale)

  return formatToString(localizedMessage, values, formatOptions)
}

export default t
