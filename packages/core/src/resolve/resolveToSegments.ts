import { type InferContext, type Context } from '../interpolation'
import { type Message } from '../localization'
import { resolve, type ResolveCallback, type ResolveOptions, type Segment } from './'

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

export default resolveToSegments
