# Installation {#installation}

:::warning WARNING
We recommend scaffolding your project with your favorite web framework before installing Psitta, followed by integrating it with a Web framework for a seamless experience.
:::

::: tip NOTE
Psitta is an ESM-only package. Don't use `require()` to import it, and make sure your nearest `package.json` contains `"type": "module"`, or change the file extension of your relevant files to `.mjs/.mts`. Refer to Vite's troubleshooting guide for more details. Also, inside async CJS contexts, you can use `await import('@psitta/core')` instead.
:::

:::info Prerequisites
Ensure that you have the following prerequisites:

- [Node.js](https://nodejs.org/en/download/) installed on your development environment
- Your preferred IDE ([Visual Studio Code](https://code.visualstudio.com/) is recommended)
:::

## Official Web Framework Integration {#official-integration}

Psitta provides official integrations for [Vue](https://vuejs.org) and [React](https://react.dev). These integrations offer features such as locale state management, a versatile component for localizing content with slots, hooks/composables for easy localization, and more.

::: code-group

```sh [pnpm]
  $ pnpm add @psitta/core @psitta/{framework}
```

```sh [npm]
  $ npm install @psitta/core @psitta/{framework}
```

```sh [yarn]
  $ yarn add @psitta/core @psitta/{framework}
```

```sh [bun]
  $ bun install @psitta/core @psitta/{framework}
```

:::

After installation, proceed to the [Configure Guide](/core/guide/configuration) to set up Psitta for your project.

## Your Own Integration <Badge type="danger" text="advanced" /> {#your-own-integration}

If you prefer manual setup or are not using a Web framework, you can install Psitta directly in your project using one of the following package managers:

::: code-group

```sh [pnpm]
  $ pnpm install @psitta/core
```

```sh [npm]
  $ npm install @psitta/core
```

```sh [yarn]
  $ yarn install @psitta/core
```

```sh [bun]
  $ bun install @psitta/core
```

:::

After installing Psitta Core, you can implement locale state management, localization functions, locale detection, and more according to your project's needs. Psitta Core includes utilities for implementing i18n. Here are some useful reference links for implementing your integration:

- [Localization API Reference](/core/reference/localization): Contains utilities for localizing messages or URLs.
- [Detection API Reference](/core/reference/detection): Provides utilities for detecting the user's locale.
- [Format API Reference](/core/reference/format): API for formatting strings or segments. It also includes a reference for interpolation and declension.
- [Library Reference](/core/reference/library): Details of other integration implementations and their usage, which can serve as a base for your integration.
