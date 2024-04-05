import { DEFAULT_I18N_CONFIG, type Config } from './'

export function getConfig(options?: Partial<Config>): Config {
  const config = {
    ...DEFAULT_I18N_CONFIG,
    ...globalThis.__psitta,
    ...options,
  }

  return config
}
