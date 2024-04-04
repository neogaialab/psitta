export function startEscaping(text: string) {
  return (text = text
    .replaceAll('\\{', '__CURLY_OPEN')
    .replaceAll('\\}', '__CURLY_CLOSE')
    .replaceAll('\\|', '__PIPE')
    .replaceAll('\\(', '__PARENTHESES_OPEN')
    .replaceAll('\\)', '__PARENTHESES_CLOSE'))
}

export function endEscaping(text: string) {
  return (text = text
    .replaceAll('__CURLY_OPEN', '{')
    .replaceAll('__CURLY_CLOSE', '}')
    .replaceAll('__PIPE', '|')
    .replaceAll('__PARENTHESES_OPEN', '(')
    .replaceAll('__PARENTHESES_CLOSE', ')'))
}
