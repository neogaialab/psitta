import type { Config } from './main'
import { DEFAULT_I18N_CONFIG } from './main'

function psitta(options?: Partial<Config>) {
  if (!globalThis.__psitta) {
    globalThis.__psitta = DEFAULT_I18N_CONFIG
  }

  for (const option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      globalThis.__psitta[option] = options[option]
    }
  }
}

declare global {
  var __psitta: Config | undefined
}

export default psitta
