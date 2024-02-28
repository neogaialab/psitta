import type { Locale } from '@psitta/core'
import { getConfig } from '@psitta/core'
import type { Plugin, Ref } from 'vue'
import { computed } from 'vue'
import { localeKey } from './keys'

export interface PsittaOptions {
  locale?: Locale | Ref<Locale>
}

function createPsitta(options?: PsittaOptions) {
  const config = getConfig()

  const localeOption = options?.locale || config.defaultLocale

  const locale = typeof localeOption === 'string'
    ? computed(() => localeOption)
    : localeOption

  const plugin: Plugin = {
    install(app) {
      app.provide(localeKey, locale)
    },
  }

  return plugin
}

export default createPsitta
