import jsdoc2md from 'jsdoc-to-markdown'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { generateItemReference, generatePage } from './generate-reference-lib.js'

export const config = {
  dest: './docs/core/reference/',
  templatesPath: './docs/.vitepress/templates',
  style: {
    signature: {
      maxParamsLength: 60,
    },
  },
}

function main() {
  // transpile // tsc --outDir ./dist/docs ./src/**/*.ts

  const templates = readdirSync(config.templatesPath)

  for (const templateBasename of templates) {
    const templatePath = join(config.templatesPath, templateBasename)
    const template = readFileSync(templatePath, { encoding: 'utf-8' })

    const pageId = templateBasename.replace('.md', '')

    const path = pageId

    let data = []

    try {
      data = jsdoc2md.getTemplateDataSync({
        files: `./packages/core/dist/docs/${path}/*.js`,
      })
    }
    catch (e) {
      console.error(e.message)
    }

    let main = ''

    for (const item of data) {
      const reference = generateItemReference(item)
      main += `${reference}\n`
    }

    const filename = `${pageId}.md`
    const filePath = join(config.dest, filename)

    if (!existsSync(filePath))
      mkdirSync(join(config.dest), { recursive: true })

    const page = generatePage(template, main)

    writeFileSync(filePath, page)

    console.log(filePath)
  }
}

main()
