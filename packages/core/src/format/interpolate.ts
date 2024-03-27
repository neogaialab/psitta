import { localizeValue, type InterpolateOptions, type Placeholder, type Text, type Value, ValueWithOptions, getConfig } from '../main'

function interpolate<T>(
  text: Text,
  placeholder: Placeholder,
  value: Value | ValueWithOptions<T>,
  options?: InterpolateOptions,
): Text {
  const config = getConfig()
  const locale = options.valueLocale || config.defaultValueLocale
  const localizedValue = localizeValue(value, locale)

  return text.replaceAll(`{${placeholder}}`, localizedValue)
}

export default interpolate
