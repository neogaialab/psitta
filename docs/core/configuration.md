# Configuration {#configuration}

## Initialization {#initialization}

::: code-group

```typescript [TypeScript]
// psitta.ts
import { psitta } from '@psitta/core'

// Define your message translations here
const messages = {
  'Hello {user}': {
    es: 'Hola {user}'
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

```javascript [JavaScript]
// psitta.js
import { psitta } from '@psitta/core'

// Define your message translations here
const messages = {
  'Hello {user}': {
    es: 'Hola {user}'
  }
}

psitta({
  locales: ['en', 'es'], // Specify supported locales
  defaultLocale: 'en', // Set the default locale (used in the source code)
  messages, // Pass your message translations
})
```

:::

## Localization File <Badge type="info" text="optional" /> {#localization-file}

For better organization, it's recommended to separate the messages object into its own file. Create a file named `locales/index.js` and export your message translations.

Example:

```javascript
// locales/index.js

export default {
  'Hello {user}': {
    es: 'Hola {user}'
  },
  // Add more translations as needed
}
```

In your main configuration file, import the localization file and pass the translations to the Psitta initialization function.

```javascript
// psitta.(ts/js)

import { psitta } from '@psitta/core'
import messages from './locales' // Import the localization file

psitta({
  // ...
  messages, // Pass your message translations
})

// ...
```

By organizing your message translations in a separate file, you can manage them more efficiently and keep your codebase clean.
