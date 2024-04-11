import { type Key } from '../interpolation'

/**
 * Interpolates a value into a string using a placeholder key.
 *
 * @param {string} text - The string containing the placeholder for interpolation.
 * @param {Key} key - The unique key identifying the placeholder within the string.
 * @param {string} valueString - The value to be inserted into the placeholder.
 * @returns {string} The string with the placeholder replaced by the provided value.
 * 
 * @example
 * 
 * ```typescript
 * const interpolatedText = interpolateValue('Hello, my name is {name}!', 'name', 'Batou');
 * console.log(interpolatedText); // Output: Hello, my name is Batou!
 * ```
 */
function interpolateValue(
  text: string,
  key: Key,
  valueString: string,
): string {
  const regex = new RegExp(`{${key}}`, 'g');
  return text.replace(regex, valueString);
}

export default interpolateValue
