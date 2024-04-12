import { resolve, type ResolveCallback, type ResolveFunction } from './'

/**
 * Resolves a message template into a single string with resolved placeholders.
 *
 * @param {Message} text - The message template string containing placeholders.
 * @param {Partial<Context>} [context] - Optional object containing values to replace placeholders. Defaults to `{}`.
 * @param {ResolveOptions} [options] - Optional configuration options for resolving.
 * @returns {string} The final resolved message string.
 *
 * @details
 *
 * This function is a convenience wrapper around `resolve`. It takes a message template and context, and resolves the message into a single string by concatenating the processed parts. It uses a callback function that simply combines the previous accumulated string (`prev`) with the current part (`part`). The `resolve` function handles the logic of processing text and placeholder parts based on the provided context and options.
 * 
 * @example
 *
 * ```typescript
 * const formattedMessage = resolveToString('Hello, {name}!', { name: 'Batou' });
 * console.log(formattedMessage);
 * // Output: "Hello, Batou!"
 * ```
 */
const resolveToString: ResolveFunction<string> = (
  text,
  context = {},
  options,
) => {
  const cb: ResolveCallback<string> = (c) => {
    return c.prev + c.part
  }

  return resolve(text, context, cb, '', options)
}

export default resolveToString
