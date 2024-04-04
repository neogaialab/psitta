import { resolve, type ResolveCallback, type ResolveFunction } from './'

const resolveToString: ResolveFunction<string> = (
  text,
  values = {},
  options,
) => {
  const cb: ResolveCallback<string> = (c) => {
    return c.prev + c.part
  }

  return resolve(text, values, cb, '', options)
}

export default resolveToString
