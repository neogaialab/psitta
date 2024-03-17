#!/usr/bin/env node

import path, { dirname } from 'node:path'

const packageName = process.argv.slice(2)[0]
const dirName = packageName.split('/')[1]

const text = `Please refer to [CHANGELOG.md](https://github.com/neogaialab/psitta/blob/main/packages/${dirName}/CHANGELOG.md) for details.`

console.log(text)
