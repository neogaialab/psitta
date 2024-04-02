# Usage {#usage}

:::info NOTE
Before using Psitta, make sure you have:

- [Installed Psitta](./installation)
- [Initialized configuration](./configuration.md)
:::

## Import {#import}

First of all, import Psitta globally in your entry point file. If you're rendering on the server, import the config file there as well.

::: code-group

```typescript [TypeScript]
// entry-client.ts

import '~/psitta.ts'

// ...
```

```javascript [JavaScript]
// entry-client.js

import '~/psitta.js'

// ...
```

:::

## Localization {#localization}

Use the `t()` function from the web framework integration to localize messages in your application/site.

::: code-group

```tsx [React]
import { t } from '@psitta/react'

export default function Example() {
  return (
    <div>
      {t('Hello {user}', { user: 'Motoko' })}
    </div>
  )
}
```

```vue [Vue]
<script setup lang="ts">
import { t } from '@psitta/vue'
</script>

<template>
  <div>
    {{ t('Hello {user}', { user: 'Motoko' }) }}
  </div>
</template>
```

:::

For more details or more advanced features on localization, go to [Localization Guide](/core/guide/localization).

## Formatting {#formatting}

Psitta provides a way for easy formatting of dates, times, and numbers according to locale-specific conventions.

You can just provide a array with the value you want to format in the first element and the Intl option as the second element.

::: code-group

```tsx [React]
import { t } from '@psitta/react'

export default function Example() {
  return (
    <div>
      {
        t('Today is {now}', {
          now: [new Date(), { dateStyle: 'long' }]
        })
      }

      {/* Today is Jan 1, 2045 */}
    </div>
  )
}
```

```vue [Vue]
<script setup lang="ts">
import { t } from '@psitta/vue'
</script>

<template>
  <div>
    {{
      t('Today is {now}', {
        now: [new Date(), { dateStyle: 'long' }],
      })
    }}

    <!-- Today is Jan 1, 2045 -->
  </div>
</template>
```

:::

For more advanced formatting features and details, refer to the [Localization Guide](/core/guide/localization).

## Locale Switching {#locale-switching}

To switch the locale in your application using Psitta, follow these examples based on your chosen framework:

::: code-group

```javascript [React]
import { useLocale } from '@psitta/react'

// ...

const [locale, setLocale] = useLocale()
setLocale('es') // Set the new locale
```

```javascript [Vue]
import { useLocale } from '@psitta/vue'

// ...

const locale = useLocale()
locale.value = 'es' // Set the new locale
```

:::

Replace `es` with the desired locale code, such as `en` for English or `fr` for French, based on your application's localization requirements.

## What's Next? {#whats-next}

Now that you've learned the basics, you can explore more advanced features based on your requirements:

- Refer to the [Guides](/core/guide/localization) to learn how to accomplish specific goals and tasks with Psitta.
- Consult the [API Reference](/core/reference/localization) for detailed documentation on Psitta's functions and methods, enabling you to leverage its full capabilities.
- If you're curious about the API design decisions behind Psitta, delve into the [Explanations](/core/explanations/key-design.md) to gain insights into its architecture and key concepts.
