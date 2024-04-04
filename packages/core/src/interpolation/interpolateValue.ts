import { type Key } from '../interpolation'

function interpolateValue(
  text: string,
  key: Key,
  valueString: string,
): string {
  const regex = new RegExp(`{${key}}`, 'g');
  return text.replace(regex, valueString);
}

export default interpolateValue
