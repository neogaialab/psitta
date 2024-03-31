#!/usr/bin/env node
import { a, getParentDir, git, github, green, keepAChangelog, packageJson, reset, validateNpmOtp, verify } from './release-lib.js'
import process from 'node:process'

import yargs from 'yargs/yargs'

const argv = yargs(process.argv.slice(2))
  .command('$0 <release-type>', 'Release', (yargs) => {
    yargs.positional('release-type', {
      describe: 'Semver to bump',
      choices: ['major', 'minor', 'patch'],
    })
  })
  .options({
    'run-dry': {
      alias: 'd',
      describe: 'Run in dry mode',
      type: 'boolean',
      default: false,
    },
    'skip-git': {
      describe: 'Skip Git-related tasks',
      type: 'boolean',
      default: false,
    },
    'skip-npm': {
      describe: 'Skip npm-related tasks',
      type: 'boolean',
      default: false,
    },
    'skip-github': {
      describe: 'Skip GitHub-related tasks',
      type: 'boolean',
      default: false,
    },
    'skip-changelog': {
      describe: 'Skip changelog generation',
      type: 'boolean',
      default: false,
    },
    'skip-bump': {
      describe: 'Skip version bumping',
      type: 'boolean',
      default: false,
    },
    'npm-otp': {
      describe: 'Specify the OTP for npm authentication',
      type: 'string',
      demandOption: true,
      coerce: validateNpmOtp,
    },
  })
  .help()
  .argv

const RUN_DRY = argv['run-dry'] || argv.d
const SKIP_GIT = !!argv['skip-git']
const SKIP_NPM = argv['skip-npm']
const SKIP_GITHUB = argv['skip-github']
const SKIP_CHANGELOG = argv['skip-changelog']
const SKIP_BUMP = argv['skip-bump']
const NPM_OTP = argv['npm-otp']
const RELEASE_TYPE = argv['release-type']

verify({
  npm: !SKIP_NPM,
  git: !SKIP_GIT,
})

const dirName = getParentDir()

const pkg = packageJson({
  updateType: RELEASE_TYPE,
  packageManager: 'pnpm',
})

let nextVersion = pkg.version

if (!SKIP_BUMP) {
  const bump = pkg.bump()
  nextVersion = bump.nextVersion
}

let changelog

if (!SKIP_CHANGELOG) {
  changelog = keepAChangelog()

  if (!SKIP_BUMP)
    changelog.bump()
}

const tagName = `${pkg.name}@${nextVersion}`

!SKIP_GIT && git({
  tagName,
  commitMessage: `chore: release ${pkg.name} v${nextVersion}`,
  push: !RUN_DRY,
})

if (!RUN_DRY && !SKIP_NPM)
  pkg.publish(NPM_OTP)

if (!SKIP_CHANGELOG)
  changelog.addUnreleasedSection()

const releaseName = `${pkg.name}@${nextVersion}`

if (!SKIP_GITHUB) {
  const { releaseUrl } = github({
    tagName,
    releaseName,
    releaseNotes: `Please refer to [CHANGELOG.md](https://github.com/neogaialab/psitta/blob/main/packages/${dirName}/CHANGELOG.md) for details.`,
  })

  const anchor = a({ href: releaseUrl }, 'https://github.com/neogaialab/psitta/releases/new')
  console.log('➕ Release on GitHub:', anchor, '\n')
}

console.log(`${green}Released ${releaseName}${reset}`)

if (!SKIP_NPM)
  console.log(`🔗 ${a({ href: pkg.getPublishUrl().toString() })}\n`)
