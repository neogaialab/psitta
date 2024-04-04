import { Values } from '../interpolation'
import { RegisteredMessages } from '../localization'
import { collection } from './'

function collect(key: keyof RegisteredMessages, values?: Values) {
  collection[key] = values || {}
}

export default collect
