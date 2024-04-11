import { DEFAULT_I18N_CONFIG, type Config } from './'

/**
 * Gets the Psitta configuration object, merging defaults, global options, and provided options.
 *
 * @param {Partial<Config>} [options] - Optional object containing partial configuration overrides.
 * @returns {Config} The complete Psitta configuration object.
 *
 * @example
 * ```typescript
 * // Get the default configuration
 * const defaultConfig = getConfig();
 * console.log(defaultConfig);
 * // Output: Contains default i18n configuration values

 * // Override some options with custom ones
 * const customConfig = getConfig({
 *   locale: 'fr', // Set custom locale
 * });
 * console.log(customConfig);
 * // Output: Merged configuration with custom options
 * ```
 */
export function getConfig(options?: Partial<Config>): Config {
  const config = {
    ...DEFAULT_I18N_CONFIG,
    ...globalThis.__psitta,
    ...options,
  }

  return config
}
