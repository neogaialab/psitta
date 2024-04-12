// #region Utils

import { config } from './generate-reference.js'

export function replaceJsDocLinks(text) {
  const linkRegex = /\{@link\s+(.+?)(?:\|(.+?))?\}/g
  return text.replace(linkRegex, (match, url, label) => {
    let normalizedUrl

    try {
      normalizedUrl = new URL(url).toString()
    }
    catch (e) {
      normalizedUrl = `#${url}`
    }

    const content = label || url

    return `[${content}](${normalizedUrl})`
  })
}

export function generateCode(code) {
  const formattedCode = code.split('\n').map(line => `  ${line}`).join('\n')
  return `\`\`\`typescript\n${formattedCode}\n  \`\`\``
}

// #endregion

// #region Generators

export function generateParams(params) {
  if (!params?.length)
    return null

  return params.map((param) => {
    let item = `  - \`${param.name}\``

    if (param.description)
      item += `: ${replaceJsDocLinks(param.description)}`

    return item
  }).join('\n')
}

export function generateSeeAlso(see) {
  if (!see?.length)
    return null

  return see.map((s) => {
    const item = `  - ${replaceJsDocLinks(s)}`

    return item
  }).join('\n')
}

export function generateExceptions(exceptions) {
  if (!exceptions?.length)
    return null

  return exceptions.map((e) => {
    let item = `  - \`${e.type.names[0]}\``

    if (e.description)
      item += `: ${replaceJsDocLinks(e.description)}`

    return item
  }).join('\n')
}

export function generateExamples(examples) {
  if (!examples?.length)
    return null

  return examples.map((e) => {
    const lines = e.split('\n')
    const linesWithSpace = lines.map(line => `  ${line}`)
    const stringWithSpace = linesWithSpace.join('\n')

    const item = `${stringWithSpace}`

    return item
  }).join('\n\n')
}

export function generateDetails(details) {
  if (!details)
    return null

  const lines = details.split('\n')
  const linesWithSpace = lines.map(line => `  ${line}`)
  const stringWithSpace = linesWithSpace.join('\n')

  const content = `${stringWithSpace}`

  return content
}

export function generateSignature(item) {
  let signature = ''

  if (item.kind === 'function') {
    const returns = item.returns?.[0]
    const returnType = returns?.type?.names?.[0]
    const params = item.params?.length
      ? item.params.map((param) => {
        return `${param.name}: ${param.type.names?.[0].replaceAll('.', '')}`
      })
      : []
    const isParamsLengthy = params.join(params.join(', ')).length > config.style.signature.maxParamsLength

    signature += `function ${item.name}(`
    signature += isParamsLengthy ? '\n  ' : ''
    signature += params.join(isParamsLengthy ? ',\n  ' : ', ')
    signature += isParamsLengthy ? '\n' : ''
    signature += `)`
    signature += `: ${returnType || 'void'}`

    return signature
  }

  return null
}

export function generateItemReference(item) {
  const signature = generateSignature(item)
  const params = generateParams(item.params)
  const seeAlso = generateSeeAlso(item.see)
  const exceptions = generateExceptions(item.exceptions)
  const examples = generateExamples(item.examples)
  const returns = item.returns[0].description
  const deprecated = item.deprecated
  const details = generateDetails(item.customTags?.find(el => el.tag === 'details').value)

  let reference = `## ${item.name} <Badge type="info" text="${item.kind}" />${deprecated ? '<Badge type="warning" text="Deprecated" /> ' : ''} {#${item.id}}\n`

  if (deprecated) {
    reference += '\n::: warning Deprecated\n\n'
    reference += `${replaceJsDocLinks(deprecated)}\n`
    reference += '\n:::\n'
  }

  reference += item.description ? `\n${item.description}\n` : ''

  if (signature) {
    reference += '\n- **Signature**\n\n'
    reference += `  ${generateCode(signature)}\n`
  }

  if (params) {
    reference += '\n- **Parameters**\n\n'
    reference += `${params}\n`
  }

  reference += '\n- **Returns**\n\n'
  reference += returns ? `  ${returns}\n` : 'Void.\n'

  if (details) {
    reference += '\n- **Details**\n\n'
    reference += `${details}\n`
  }

  if (examples) {
    reference += `\n- **Example${examples?.length === 1 ? '' : 's'}**\n\n`
    reference += `${examples}\n`
  }

  if (exceptions) {
    reference += '\n- **Exceptions**\n\n'
    reference += `${exceptions}\n`
  }

  if (seeAlso) {
    reference += '\n- **See Also**\n\n'
    reference += `${seeAlso}\n`
  }

  return reference
}

export function generatePage(template, main) {
  const content = template.replaceAll('<!-- MAIN -->', main)

  return content
}

// #endregion
