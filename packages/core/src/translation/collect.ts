import type { RegisteredMessages, Values } from '../main'
import { collection } from './context'

function collect(key: keyof RegisteredMessages, values?: Values) {
  collection[key] = values || {}
}

export default collect
