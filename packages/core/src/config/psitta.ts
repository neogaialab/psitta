import { DEFAULT_I18N_CONFIG, type Config } from './'

function psitta(options?: Partial<Config>) {
  if (!globalThis.__psitta) {
    globalThis.__psitta = DEFAULT_I18N_CONFIG
  }

  for (const option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      globalThis.__psitta[option] = options[option]
    }
  }

  return globalThis.__psitta
}

declare global {
  var __psitta: Config | undefined
}

export default psitta
