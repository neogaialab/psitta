import { a, getParentDir, git, github, green, keepAChangelog, packageJson, reset, verify } from './release-lib.js'
import process from 'node:process'

const args = process.argv.slice(2)

const RUN_DRY = args.includes('--run-dry') || args.includes('-d')
const NO_GIT = args.includes('--no-git')
const NO_NPM = args.includes('--no-npm')
const NO_GITHUB = args.includes('--no-github')
const NO_CHANGELOG = args.includes('--no-changelog')
const NO_BUMP = args.includes('--no-bump')
const RELEASE_TYPE = args[0]

verify({
  npm: !NO_NPM,
  git: !NO_GIT,
})

const dirName = getParentDir()

const pkg = packageJson({
  updateType: RELEASE_TYPE,
  packageManager: 'pnpm',
})

let nextVersion = pkg.version

if (!NO_BUMP) {
  const bump = pkg.bump()
  nextVersion = bump.nextVersion
}

let changelog

if (!NO_CHANGELOG) {
  changelog = keepAChangelog()

  if (!NO_BUMP)
    changelog.bump()
}

const tagName = `${pkg.name}@${nextVersion}`

!NO_GIT && git({
  tagName,
  commitMessage: `chore: release ${pkg.name} v${nextVersion}`,
  push: !RUN_DRY,
})

if (!RUN_DRY && !NO_NPM)
  pkg.publish()

if (!NO_CHANGELOG)
  changelog.addUnreleasedSection()

const releaseName = `${pkg.name}@${nextVersion}`

if (!NO_GITHUB) {
  const { releaseUrl } = github({
    tagName,
    releaseName,
    releaseNotes: `Please refer to [CHANGELOG.md](https://github.com/neogaialab/psitta/blob/main/packages/${dirName}/CHANGELOG.md) for details.`,
  })

  const anchor = a({ href: releaseUrl }, 'https://github.com/neogaialab/psitta/releases/new')
  console.log('➕ Release on GitHub:', anchor, '\n')
}

console.log(`${green}Released ${releaseName}${reset}`)

if (!NO_NPM)
  console.log(`🔗 ${a({ href: pkg.getPublishUrl().toString() })}\n`)
