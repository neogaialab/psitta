import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { basename, dirname } from 'node:path'
import process from 'node:process'

/* colors */

export const reset = '\x1B[0m'
export const red = '\x1B[31m'
export const green = '\x1B[32m'
export const blue = '\u001B[34m'
export const orange = '\x1B[33m'

/* lib */

const pkg = readPackageJson()
pkg.getNextVersion = () => null

export function packageJson(options) {
  const { updateType, packageManager } = {
    updateType: 'patch',
    packageManager: 'npm',
    ...options,
  }

  if (!updateType) {
    console.error(`${red}No release type provided. Use "major"${red}, "minor"${red}, or "patch"${red}.${reset}`)
    process.exit(1)
  }

  const available = ['patch', 'minor', 'major']

  if (!available.includes(updateType)) {
    console.error(`${red} Invalid release type. Use "major"${red}, "minor"${red}, or "patch"${red}.${reset}`)
    process.exit(1)
  }

  const bump = () => {
    const nextVersion = execSync(`${packageManager} version ${updateType}`)
      .toString()
      .replace('v', '')
      .replace('\n', '')
    pkg.getNextVersion = () => nextVersion

    return { nextVersion }
  }

  const publish = (otp) => {
    execSync(`${packageManager} publish --no-git-checks --otp ${otp}`)
  }

  const getPublishUrl = () => {
    const nextVersion = pkg.getNextVersion()
    return new URL(`https://npmjs.org/package/${pkg.name}/v/${nextVersion}`)
  }

  pkg.bump = bump
  pkg.publish = publish
  pkg.getPublishUrl = getPublishUrl

  return pkg
}

export function git(options) {
  const nextVersion = pkg.getNextVersion()

  const { commitMessage, tagName, tagMessage, commit, tag, push } = {
    tagName: `${pkg.name}@${nextVersion}`,
    message: `chore: release ${pkg.name} v${nextVersion}`,
    tagMessage: `Release ${nextVersion}`,
    push: true,
    commit: true,
    tag: true,
    ...options,
  }

  if (commit) {
    execSync(`git add .`)
    execSync(`git commit -m "${commitMessage}"`)
  }

  if (tag) {
    const tagMessageArg = tagMessage ? ` -m "${tagMessage}"` : ''
    execSync(`git tag ${tagName}${tagMessageArg}`)
  }

  if (push) {
    execSync(`git push`)
    execSync(`git push --tags`)
  }
}

export function github(options) {
  const { tagName, releaseName, releaseNotes, prerelease } = {
    ...options,
  }

  const repositoryUrl = pkg.repository.url.replace('git+', '').replace('.git', '')
  const releaseUrl = new URL(`${repositoryUrl}/releases/new`)

  const searchParams = releaseUrl.searchParams
  searchParams.set('tag', tagName)
  searchParams.set('title', releaseName)
  searchParams.set('body', releaseNotes)
  prerelease && searchParams.set('prerelease', prerelease)

  return { releaseUrl: releaseUrl.toString() }
}

export function keepAChangelog(options) {
  let { changelogPath, frontmatter } = {
    changelogPath: './CHANGELOG.md',
    frontmatter: 'id: changelog\nname: Changelog\ndescription: All notable changes to this project will be documented in this file.',
    ...options,
  }

  const nextVersion = pkg.getNextVersion()
  const date = new Date().toISOString().split('T')[0]
  let data

  if (!fs.existsSync(changelogPath)) {
    const directory = dirname(changelogPath)
    fs.mkdirSync(directory, { recursive: true })

    const frontmatterString = frontmatter ? `---\n${frontmatter}\n---\n` : ''
    const content = `## [Unreleased]\n\n`
    data = `${frontmatterString}${content}`
    fs.writeFileSync(changelogPath, data, 'utf-8')
  }
  else {
    data = fs.readFileSync(changelogPath, 'utf-8')
  }

  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?/

  const match = data.match(frontmatterRegex)
  frontmatter = match ? match[1] : null
  let content = match ? data.slice(match[0].length) : data
  const frontmatterString = frontmatter === null ? '' : `---\n${frontmatter}\n---\n`

  const bump = () => {
    const newContent = content.replace('## [Unreleased]', `## [${nextVersion}] - ${date}`)
    content = newContent

    const data = `${frontmatterString}${newContent}`
    fs.writeFileSync(changelogPath, data)
  }

  const addUnreleasedSection = () => {
    const newContent = `\n## [Unreleased]\n${content}`
    const data = `${frontmatterString}${newContent}`

    fs.writeFileSync(changelogPath, data)
  }

  return { bump, addUnreleasedSection }
}

export function npm() {
  const isAuthenticated = () => {
    try {
      const output = execSync('npm whoami', { encoding: 'utf-8' })

      return Boolean(output.trim())
    }
    catch (error) {
      return false
    }
  }

  return { isAuthenticated }
}

export function verify(options) {
  const { npm: verifyNpm, git } = {
    npm: true,
    git: true,
    ...options,
  }

  if (verifyNpm) {
    const n = npm()

    if (!n.isAuthenticated()) {
      console.error(`${red}Unable to release: You need to authorize NPM.${reset}`)
      process.exit(1)
    }
  }

  if (git) {
    if (hasModifiedFiles()) {
      console.error(`${red}Unable to release: Modified files exist without commits. ${orange}Please commit or stash your changes before creating a release.${reset}`)
      process.exit(1)
    }

    if (!isRemoteSync()) {
      console.error(`${red}Unable to release: The tip of your current branch is behind its remote counterpart.`)
      process.exit(1)
    }
  }
}

/* utils */

export function readPackageJson() {
  try {
    const data = fs.readFileSync('./package.json', 'utf8')
    const packageJson = JSON.parse(data)
    return packageJson
  }
  catch (error) {
    console.error(`${red}Error reading package.json:${reset}`, error)
    throw error
  }
}

export function getParentDir() {
  const rootDir = process.cwd()
  const parentDirName = basename(rootDir)

  return parentDirName
}

export function a({ href }, content = null) {
  return `${blue}\x1B]8;;${href}\x07${content || href}\x1B]8;;\x07${reset}`
}

export function hasModifiedFiles() {
  try {
    const output = execSync('git diff --name-only', { encoding: 'utf-8' })

    return output.trim().length > 0
  }
  catch (error) {
    return false
  }
}

export function isRemoteSync() {
  try {
    const local = execSync('git rev-parse main', { encoding: 'utf-8' }).trim()
    const remote = execSync('git rev-parse origin/main', { encoding: 'utf-8' }).trim()

    return local === remote
  }
  catch (error) {
    return false
  }
}

export function validateNpmOtp(value) {
  const otpRegex = /^\d{6}$/
  if (!otpRegex.test(value))
    throw new Error('Invalid OTP format. OTP must be a 6-digit number. Follow: 000000')

  return value
}
