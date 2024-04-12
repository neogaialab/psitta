# Configuration {#configuration}

## psitta <Badge type="info" text="function" /> {#psitta}

Initializes the global Psitta configuration.

- **Signature**

  ```typescript
  function psitta(options: Partial<Config>): Config
  ```

- **Parameters**

  - `options`: Optional object containing partial configuration overrides.

- **Returns**

  The complete Psitta configuration object.

- **Details**

  If no global Psitta configuration exists yet, `psitta` will create one using the default configuration values. Typically, you provide an optional `options` object to merge additional configuration settings on top of the existing or default configuration. This allows for customization without overwriting the entire configuration.

- **Examples**

  ```typescript
  const messages = {
    'Welcome!': {
      pt: 'Seja bem-vind{g} (o|a)',
    },
  } as const;
  
  psitta({
    locales: ['en', 'pt'], // Define supported locales
    messages, // Provide translations for messages
  });
  ```

## getConfig <Badge type="info" text="function" /> {#getConfig}

Gets the Psitta configuration object, merging defaults, global options, and provided options.

- **Signature**

  ```typescript
  function getConfig(options: Partial<Config>): Config
  ```

- **Parameters**

  - `options`: Optional object containing partial configuration overrides.

- **Returns**

  The complete Psitta configuration object.

- **Examples**

  ```typescript
  // Get the default configuration
  const defaultConfig = getConfig();
  console.log(defaultConfig);
  // Output: Contains default i18n configuration values
  // Override some options with custom ones
  const customConfig = getConfig({
    locale: 'fr', // Set custom locale
  });
  console.log(customConfig);
  // Output: Merged configuration with custom options
  ```


