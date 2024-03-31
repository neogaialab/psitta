import { type InterpolateOptions, type Placeholder, type Text, type Value, ValueWithOptions, getConfig, formatValue } from '../main'

function interpolate<T>(
  text: Text,
  placeholder: Placeholder,
  value: Value | ValueWithOptions<T>,
  options?: InterpolateOptions,
): Text {
  const config = getConfig()
  const locale = options?.locale || config.defaultLocale
  const localizedValue = formatValue(value, locale)

  return text.replaceAll(`{${placeholder}}`, localizedValue)
}

export default interpolate
