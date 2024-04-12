# Localization API {#localization-api}

## localizeMessage <Badge type="info" text="function" /> {#localizeMessage}

Localizes a message based on the provided locale and configuration.

- **Signature**

  ```typescript
  function localizeMessage(
    message: T,
    locale: Locale,
    options: Partial<Config>
  ): LocalizedMessage
  ```

- **Parameters**

  - `message`: The key of the message to localize.
  - `locale`: The preferred locale code for the message (optional).
  - `options`: Optional configuration options for localization (overrides defaults).

- **Returns**

  The localized message or the message key itself if no translation found.

- **Examples**

  ```typescript
  const spanishMessage = localizeMessage('Hello!', 'es'); // assuming translations exist
  console.log(spanishMessage);
  // Output: "¡Hola!"
  ```

- **Exceptions**

  - `Error`: - If no translation is found and fallback is disabled in the configuration.

## localizeUrl <Badge type="info" text="function" /> {#localizeUrl}

Localizes a URL by prepending the specified locale code to the path.

- **Signature**

  ```typescript
  function localizeUrl(
    urlString: string,
    locale: Locale,
    options: Partial<Config>
  ): string
  ```

- **Parameters**

  - `urlString`: The URL string to localize (optional).
  - `locale`: The desired locale code to prepend to the path (optional).
  - `options`: Optional configuration options (overrides defaults).

- **Returns**

  The localized URL or the original URL string if not applicable.

- **Examples**

  ```typescript
  const localizedUrl = localizeUrl('/contact', 'es');
  console.log(localizedUrl); // Output: /es/contact
  ```


