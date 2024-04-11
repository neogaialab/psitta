import { type ValueWithOptions } from '.'
import type { Value } from '../interpolation'
import type { Locale } from '../localization'
import { DateRange, RelativeTime } from './formats'

/**
 * Formats a value for display based on its type and provided options.
 *
 * @template V - The type of the value to be formatted.
 * @param {V | ValueWithOptions<V>} value - The value to be formatted.
 *     - If a single argument, it's the value itself.
 *     - If an array, the first element is the value and the second is an options object.
 * @param {Locale} [locale] - The optional locale code to use for formatting (defaults to user's locale).
 * @returns {string} The formatted representation of the value.
 * 
 * @details
 * 
 * This function acts as a wrapper around the built-in `Intl` API for formatting different data types. 
 * It supports:
 *   - Numbers using `toLocaleString`
 *   - Dates using `toLocaleDateString`
 *   - `RelativeTime` objects using `Intl.RelativeTimeFormat`
 *   - `DateRange` objects using `Intl.DateTimeFormat.formatRange`
 *   - Arrays using `Intl.ListFormat`
 *
 * Additionally, it allows for custom formatting functions through the `custom` option within the options object.
 * If provided, the custom function receives the value, locale, and remaining options and should return the formatted string.
 *
 * This function also leverages utilities like `RelativeTime` and `DateRange` for representing time-related data before formatting.
 * 
 * @example
 * 
 * ```typescript
 * // Formatting a date with US English locale
 * const formattedDate = format(new Date(2024, 3, 11), 'en-US');
 * console.log(formattedDate);
 * // Output: "4/11/2024"
 * ```
 */
function format<V extends Value>(
  value: Value | ValueWithOptions<V>,
  locale?: Locale,
) {
  let options: any
  let proposed: any

  if (Array.isArray(value)) {
    proposed = value[0]
    options = value[1]

    if (typeof options?.custom === 'function') {
      const toCustomString = options.custom
      delete options.custom
      return toCustomString(proposed, locale, options)
    }
  } else {
    proposed = value
  }

  if (typeof proposed === 'number') {
    return proposed.toLocaleString(locale, options)
  }

  if (proposed instanceof Date) {
    return proposed.toLocaleDateString(locale, options)
  }

  if (proposed instanceof RelativeTime) {
    return new Intl.RelativeTimeFormat(locale, options).format(proposed.value, proposed.unit)
  }

  if (proposed instanceof DateRange) {
    return new Intl.DateTimeFormat(locale, options).formatRange(proposed.startDate, proposed.endDate)
  }

  if (Array.isArray(proposed)) {
    return new Intl.ListFormat(locale, options).format(proposed)
  }

  return String(proposed)
}

export default format
