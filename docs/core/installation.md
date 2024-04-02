# Installation {#installation}

:::info NOTE
We recommend scaffolding your project with your favorite web framework before installing Psitta, followed by integrating it with a Web framework for a seamless localization experience.
:::

## Official Web Framework Integration {#official-integration}

We currently provide implementations for Vue and React. These integrations offer features such as locale state management, a versatile component for localizing content with slots, and hooks/composables for easy localization.

- [Vue Integration Documentation](/vue/installation)
- [React Integration Documentation](/react/installation)

Follow the documentation specific to your favorite framework integration for detailed setup instructions and usage examples.

## Your Own Integration {#your-own-integration}

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

::: tip NOTE

Psitta is an ESM-only package. Don't use `require()` to import it, and make sure your nearest `package.json` contains `"type": "module"`, or change the file extension of your relevant files to `.mjs/.mts`. Refer to Vite's troubleshooting guide for more details. Also, inside async CJS contexts, you can use `await import('@psitta/core')` instead.

:::

After installing Psitta core, you can implement locale state management and localization functions manually according to your project's needs.
