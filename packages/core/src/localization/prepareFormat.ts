import { Locale } from "../typings"
import { resolveConfig } from "../utils"
import localizeMessage from "./localizeMessage"

function prepareFormat(message: string, locale?: Locale) {
  const localizedMessage = localizeMessage(message, locale)
  const resolvedConfig = resolveConfig(locale)
  const formatOptions = {
    locale,
    ...resolvedConfig,
  }

  return {
    formatOptions,
    localizedMessage,
  }
}

export default prepareFormat
