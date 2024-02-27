import type { Config } from './main'
import { DEFAULT_I18N_CONFIG } from './main'

export interface PsittaOptions extends Partial<Config> {}

function initPsitta(options?: PsittaOptions) {
  if (!globalThis.__psitta)
    globalThis.__psitta = DEFAULT_I18N_CONFIG

  for (const option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option))
      globalThis.__psitta[option] = options[option]
  }
}

export default initPsitta
