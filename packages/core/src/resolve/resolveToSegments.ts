import { type InferValues, type Values } from '../interpolation'
import { type Message } from '../localization'
import { resolve, type ResolveCallback, type ResolveOptions, type Segment } from './'

function resolveToSegments(
  message: Message,
  values: Partial<Values> = {},
  options?: ResolveOptions,
) {
  type Placeholders = InferValues<typeof message>

  const cb: ResolveCallback<Segment<Placeholders, Values>[]> = (c) => {
    const segment: Segment<Placeholders, Values> = {
      type: !c.dynamic ? 'text' : 'placeholder',
      part: c.part,
      key: c.key as keyof Placeholders,
      values,
      inflect: c.inflect,
    }

    return [...c.prev, segment]
  }

  return resolve(message, values, cb, [], options)
}

export default resolveToSegments
