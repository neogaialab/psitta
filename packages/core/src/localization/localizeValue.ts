import { RelativeTime, ValueWithOptions, type Locale, type Value, DateRange } from '../main'

function localizeValue<T>(
  value: Value | ValueWithOptions<T>,
  locale?: Locale,
) {
  let options: any
  let proposed: any

  if(Array.isArray(value)) {
    proposed = value[0]
    options = value[1]

    if (typeof options?.custom === 'function') {
      const toCustomString = options.custom
      delete options.custom
      return toCustomString(proposed, locale, options)
    }
  } else {
    proposed = value
  }

  if (typeof proposed === 'number') {
    return proposed.toLocaleString(locale, options)
  }

  if (proposed instanceof Date) {
    return proposed.toLocaleDateString(locale, options)
  }
  
  if(proposed instanceof RelativeTime) {
    return new Intl.RelativeTimeFormat(locale, options).format(proposed.value, proposed.unit)
  }

  if(proposed instanceof DateRange) {
    return new Intl.DateTimeFormat(locale, options).formatRange(proposed.startDate, proposed.endDate)
  }

  if (Array.isArray(proposed)) {
    return new Intl.ListFormat(locale, options).format(proposed)
  }

  return String(proposed)
}

export default localizeValue
