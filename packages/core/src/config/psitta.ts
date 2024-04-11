import { DEFAULT_I18N_CONFIG, type Config } from './'

/**
 * Initializes the global Psitta configuration.
 *
 * @param {Partial<Config>} [options] - Optional object containing partial configuration overrides.
 * @returns {Config} The complete Psitta configuration object.
 * 
 * @details
 * If no global Psitta configuration exists yet, `psitta` will create one using the default configuration values. Typically, you provide an optional `options` object to merge additional configuration settings on top of the existing or default configuration. This allows for customization without overwriting the entire configuration.
 * 
 * @example
 * ```typescript
 * const messages = {
 *   'Welcome!': {
 *     pt: 'Seja bem-vind{g} (o|a)',
 *   },
 * } as const;
 *
 * psitta({
 *   locales: ['en', 'pt'], // Define supported locales
 *   messages, // Provide translations for messages
 * });
 * ```
 */
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
