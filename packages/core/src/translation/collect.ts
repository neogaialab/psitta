import { Context } from '../interpolation'
import { RegisteredMessages } from '../localization'
import { collection } from './'

function collect(key: keyof RegisteredMessages, context?: Context) {
  collection[key] = context || {}
}

export default collect
