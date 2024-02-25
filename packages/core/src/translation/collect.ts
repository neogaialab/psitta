import type { Key, Values } from '../main'
import { collection } from './context'

function collect(key: Key, values?: Values) {
  collection[key] = values || {}
}

export default collect
