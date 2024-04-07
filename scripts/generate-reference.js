import jsdoc2md from 'jsdoc-to-markdown'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { generateItemReference, generatePage } from './generate-reference-lib'

export const config = {
  dest: './docs/core/reference/',
  pages: [
    { id: 'localization', title: 'Localization API' },
  ],
  style: {
    signature: {
      maxParamsLength: 60,
    },
  },
}

function main() {
  // transpile // tsc --outDir ./dist/docs ./src/**/*.ts

  for (const page of config.pages) {
    const path = page.id
    const data = jsdoc2md.getTemplateDataSync({
      files: `./packages/core/dist/docs/${path}/*.js`,
    })

    let pageContent = generatePage(page)

    for (const item of data) {
      const reference = generateItemReference(item)
      pageContent += reference
    }
    const filename = `${page.id}.md`
    const filePath = join(config.dest, filename)

    if (!existsSync(filePath))
      mkdirSync(join(config.dest), { recursive: true })

    writeFileSync(filePath, pageContent)

    console.log(filePath)
  }
}

main()
