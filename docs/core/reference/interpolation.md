# Interpolate API {#interpolate-api}

## interpolateUrl <Badge type="info" text="function" /> {#interpolateUrl}

Interpolates values from a context object into a URL string using placeholders.

- **Signature**

  ```typescript
  function interpolateUrl(
    url: string,
    context: Record<string, string>
  ): string
  ```

- **Parameters**

  - `url`: The URL string containing placeholders for interpolation.
  - `context`: An object containing key-value pairs for interpolation.

- **Returns**

  The URL with placeholders replaced by corresponding values from the context.

- **Examples**

  ```typescript
  const interpolatedUrl = interpolateUrl('/product/{name}', { name: 'Cyberbrain' });
  console.log(interpolatedUrl); // Output: /product/cyberbrain
  ```

## interpolateValue <Badge type="info" text="function" /> {#interpolateValue}

Interpolates a value into a string using a placeholder key.

- **Signature**

  ```typescript
  function interpolateValue(
    text: string,
    key: Key,
    valueString: string
  ): string
  ```

- **Parameters**

  - `text`: The string containing the placeholder for interpolation.
  - `key`: The unique key identifying the placeholder within the string.
  - `valueString`: The value to be inserted into the placeholder.

- **Returns**

  The string with the placeholder replaced by the provided value.

- **Examples**

  ```typescript
  const interpolatedText = interpolateValue('Hello, my name is {name}!', 'name', 'Batou');
  console.log(interpolatedText); // Output: Hello, my name is Batou!
  ```


