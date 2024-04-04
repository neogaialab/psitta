import { type Key, type Text } from '../main'

function interpolateValue(
  text: Text,
  key: Key,
  valueString: string,
): Text {
  const regex = new RegExp(`{${key}}`, 'g');
  return text.replace(regex, valueString);
}

export default interpolateValue
