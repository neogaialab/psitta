# Quickstart {#quickstart}

This quickstart guide will help you get up and running with Psitta (Vue) in no time.

:::info Prerequisites
Ensure that you have the following prerequisites:

- [Node.js](https://nodejs.org/en/download/) installed on your development environment
- [PNPM](https://pnpm.io/installation) installed on your system
- Your preferred IDE ([Visual Studio Code](https://code.visualstudio.com/) is recommended)
:::

## Installation {#installation}

First, scaffold a Vue app using [Vite](https://vitejs.dev):

```sh
  $ pnpm create vite@latest my-psitta-app --template vue
```

Then, navigate to your project directory and install Psitta along with the Vue integration:

```sh
  $ cd my-psitta-app
  $ pnpm install @psitta/core @psitta/vue
  $ pnpm dev
```

Next, run the development server:

```sh
pnpm dev
```

## Configuration {#configuration}

1. Create a file called `psitta.ts` in your project's root directory and add the following code:

  ```typescript
  // psitta.ts
  import { psitta } from '@psitta/core'

  // Define your message translations here
  const messages = {
    'Hello {user}': {
      es: 'Hola {user}'
    },
    'Today is {now}': {
      es: 'Hoy es {now}'
    }
  } as const

  psitta({
    locales: ['en', 'es'], // Specify supported locales
    defaultLocale: 'en', // Set the default locale (used in the source code)
    messages, // Pass your message translations
  })

  declare module '@psitta/core' {
    interface Register {
      messages: typeof messages
    }
  }
  ```

2. Import Psitta configuration globally in your entry point file (`src/main.js`):

  ```typescript
  // src/main.js

  import '../psitta.ts' // [!code ++]
  import { createPsitta } from '@psitta/vue' // [!code ++]
  import { getConfig } from '@psitta/core' // [!code ++]
  import { ref } from 'vue' // [!code ++]
  import { createApp } from 'vue'
  import './style.css'
  import App from './App.vue'

  const locale = ref(getConfig().defaultLocale); // [!code ++:5]

  const Psitta = createPsitta({
    locale,
  })

  createApp(App).use(Psitta).mount('#app') // [!code ++]
  createApp(App).mount('#app') // [!code --]
  ```

## Localization {#localization}

Use the `t()` function from `@psitta/vue` to localize messages in your Vue components:

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { t } from '@psitta/vue' // [!code ++]
</script>

<template>
  <!-- [!code ++:10] -->
  <div>
    {{ t('Hello {user}', { user: 'Motoko' }) }}
  </div>

  <div>
    {{ t('Today is {now}', {
      now: [new Date(), { dateStyle: 'long' }],
    }) }}
  </div>

  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```

## Locale Switching {#locale-switching}

To switch the locale in your application using Psitta, you can utilize the `useLocale` composable provided by `@psitta/vue`. Here's how you can do it:

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { t } from '@psitta/vue'
import { useLocale } from '@psitta/vue' // [!code ++]
const locale = useLocale() // [!code ++]
</script>

<template>
  <div>
    {{ t('Hello {user}', { user: 'Motoko' }) }}
  </div>

  <div>
    {{ t('Today is {now}', {
      now: [new Date(), { dateStyle: 'long' }],
    }) }}
  </div>
  <!-- [!code ++:4] -->
  <button @click="locale = locale === 'es' ? 'en' : 'es'">
    Toggle locale
  </button>

  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo">
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo">
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
```

## What's Next? {#whats-next}

Now that you've learned the basics, you can explore more advanced features based on your requirements:

- Refer to the [Guides](/core/guide/installation) to learn how to accomplish specific goals and tasks with Psitta.
- Consult the [API Reference](/core/reference/config) for detailed documentation on Psitta's functions and methods, enabling you to leverage its full capabilities.
- If you're curious about the API design decisions behind Psitta, delve into the [Explanations](/core/explanations/key-design.md) to gain insights into its architecture and key concepts.
