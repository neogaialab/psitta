import { type InferContext, type Context } from '../interpolation'
import { type Message } from '../localization'
import { resolve, type ResolveCallback, type ResolveOptions, type Segment } from './'

/**
 * Resolves a message template into an array of segments representing its structure.
 *
 * @param {Message} message - The message template string containing placeholders.
 * @param {Partial<Context>} [context={}] - Optional object containing values to replace placeholders.
 * @param {ResolveOptions} [options] - Optional configuration options for formatting.
 * @returns {Segment<Placeholders, Context>[]} An array of segments representing the message structure (text or placeholder information).
 *
 * @details
 *
 * This function utilizes the `resolve` function to analyze the message template. It uses a custom callback function to
 * create an array of `Segment` objects. Each segment represents a portion of the message and its properties:
 *  - `type`: Indicates whether the segment is plain text (`'text'`) or a placeholder (`'placeholder'`).
 *  - `part`: The actual content of the segment (text or placeholder string).
 *  - `key`: If a placeholder, the key extracted from the curly braces (`{key}`).
 *  - `context`: The provided context object (passed along for potential use).
 *  - `inflect` (optional): A function for dynamic inflection based on value and locale (if the `resolve` function provides this information).
 *
 * This allows for more granular manipulation of the message structure after processing.
 *
 * @example
 *
 * ```typescript
 * const segments = resolveToSegments('Hello, {name}!', { name: 'Batou' });
 * console.log(segments);
 * // Output: [
 * //   { type: 'text', part: 'Hello, ', key: undefined, context: { name: 'Batou' }, inflect: [Function: DUMMY_INFLECT] },
 * //   { type: 'placeholder', part: '{name}', key: 'name', context: { name: 'Batou' }, inflect: [Function: DUMMY_INFLECT] }
 * //   { type: 'text', part: '!', key: undefined, context: { name: 'Batou' }, inflect: [Function: DUMMY_INFLECT] }
 * // ]
 * ```
 */
function resolveToSegments(
  message: Message,
  context: Partial<Context> = {},
  options?: ResolveOptions,
) {
  type Placeholders = InferContext<typeof message>

  const cb: ResolveCallback<Segment<Placeholders, Context>[]> = (c) => {
    const segment: Segment<Placeholders, Context> = {
      type: !c.dynamic ? 'text' : 'placeholder',
      part: c.part,
      key: c.key as keyof Placeholders,
      context,
      inflect: c.inflect,
    }

    return [...c.prev, segment]
  }

  return resolve(message, context, cb, [], options)
}

const segments = resolveToSegments('Hello, {name}!', { name: 'Batou' });
console.log(segments);
// Output: [
//   { type: 'text', part: 'Hello, ', key: undefined, context: { name: 'Batou' }, inflect: undefined },
//   { type: 'placeholder', part: '{name}', key: 'name', context: { name: 'Batou' }, inflect: undefined }
//   { type: 'text', part: '!', key: undefined, context: { name: 'Batou' }, inflect: undefined }
// ]

export default resolveToSegments
