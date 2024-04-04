import { resolveConfig } from "../config"
import { type Locale } from "../localization"
import { localizeMessage } from "./"

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
