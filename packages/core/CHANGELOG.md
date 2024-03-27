---
id: changelog
name: Changelog
description: All notable changes to this project will be documented in this file.
---

## [Unreleased]

## Added

- Added `localizeValue()`
- Added `RelativeTime`
- Added list localization
- Added custom formatting

## Changed

- Renamed `config.translations` to `config.messages`
- Renamed `config.fallbackLocale` to `config.fallback`
- Renamed `initPsitta()` to `psitta()`
- Improved types, especially `getConfig()`
- Renamed `localizeKey()` to `localizeMessage()`
- Improved config default options

## [0.1.2] - 2024-03-17

### Added

- Added support for interpolation, including date and number formatting using `Intl`
- Added `format` API, with utilities like `formatToSegments` and `formatToString`
- Added key and URL localization
- Added support for declension, particularly number declension
- Added configuration and related utilities
- Added locale detection, including URL pathname, cookies, `navigator.language` and `Accept-Language` HTTP header

## [0.1.1] - 2024-03-16 [YANKED]

**Note**: This release was yanked due to missing files. Please refer to version 0.1.2 for the latest changes.

## [0.1.0] - 2024-03-16 [YANKED]

**Note**: This release was yanked due to missing files. Please refer to version 0.1.2 for the latest changes.
