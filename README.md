# Psitta

> [!WARNING]
> Psitta is currently a work in progress. Expect potential bugs, incomplete documentation, and ongoing development. Approach it with a growth mindset, enjoy experimenting, and refrain from using it for critical production purposes at this time.

Psitta is a modern and experimental Web internationalization framework designed to simplify the localization of messages, URLs, and values. It focuses on being ESM-only, type-safe, machine-translatable, and provides easy-to-use i18n common tasks based on the Intl Web APIs.

## Goals

- **Simplify internationalization**: Provide an intuitive way to handle message localization and URL management for web applications.
- **Ensure code reliability**: Implement type-safe measures using TypeScript to enhance code quality and reduce errors.
- **Explore AI integration**: Experiment with AI technologies for potential automated and accurate translation capabilities.

## Scope

This project encompasses the development and management of the following components:

- **Message and URL Localization:** Simplify the localization process for messages and URLs within web applications.
- **Formatting:** Utilize the Intl API for formatting dates, times, numbers, and other locale-specific conventions.
- **Grammar Rules Application:** Implement grammar rules, including gender inflection and number inflection (pluralization), for accurate language representation.
- **Locale Detection:** Automatically detect user locale from various sources such as cookies, URLs, `navigator.language`, or headers, ensuring a seamless experience.
- **Translator Integration:** Integrate advanced AI technologies for accurate and seamless translation of content.
- **Message Resolution:** Providing functionality for resolving messages into segments and strings, which is useful for styling message parts.

**The project does not include:**

* Translation management tools or services for managing localization workflows

## Features

- 🔒 **Type-safe**: Ensures type safety using TypeScript.
- ✨ **AI-translatable**: Uses advanced AI for accurate translation.
- 🔄 **Framework agnostic**: Compatible with any JavaScript framework or library.
- 🌍 **Intl-based Formatting**: Formats dates, times, and numbers according to locale conventions.
- 🍪 **Locale detection**: Automatically detects user locale from various sources.
- 📦 **ESM-only**: Designed for ECMAScript Modules (ESM) in modern JavaScript.

## Installing

To install Psitta, please follow the [Installation Guide](https://neogaialab.github.io/psitta/core/guide/installation.html) in the documentation.

## Documentation

- [Reference](https://neogaialab.github.io/psitta/core/reference/config.html)
- [Homepage](https://neogaialab.github.io/psitta/)

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/neogaialab/psitta/issues) or [submit a pull request](https://github.com/neogaialab/psitta/pulls) on the Psitta GitHub repository.
