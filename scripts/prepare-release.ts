import { findUpSync } from 'find-up'
import fs from 'fs-extra'
import path, { dirname } from 'node:path'

async function main() {
  const packageName = process.argv.slice(2)[0]
  const dirName = packageName.split('/')[1]
  const root = dirname(findUpSync('pnpm-lock.yaml')!)

  process.chdir(path.join(root, 'packages', dirName))

  const packageJson = await fs.readJson('package.json')

  await fs.writeJson('dist/package.json', packageJson, { spaces: 2 })

  await fs.copy('CHANGELOG.md', 'dist/CHANGELOG.md')
}

main()
