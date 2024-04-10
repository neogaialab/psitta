import type { InferContext, Locale, RegisteredMessages, Context } from '@psitta/core'
import { collect, localizeMessage, resolveToString } from '@psitta/core'
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
  context?: Partial<InferContext<T | EveryTranslationOf<T>>>,
  options?: TranslateOptions,
) {
  if (import.meta.env.DEV) {
    if (!isServer)
      collect(key, context as Context)
  }

  let locale = options?.locale

  if (!locale)
    locale = useLocale().value

  const localizedMessage = localizeMessage(key as string, locale)

  return resolveToString(localizedMessage, context, {
    locale
  })
}

export default t
