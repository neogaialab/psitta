import { resolve, type ResolveCallback, type ResolveFunction } from './'

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
