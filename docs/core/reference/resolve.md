# Resolve API {#resolve-api}

## resolve <Badge type="info" text="function" /> {#resolve}

Resolves a message string with placeholders, replacing them with values from the context.
Escapes and unescapes parts of the message as needed.

- **Signature**

  ```typescript
  function resolve(
    message: Message,
    context: Partial<Context<V>>,
    callbackFn: ResolveCallback<I>,
    initialValue: I,
    options: ResolveOptions
  ): I
  ```

- **Parameters**

  - `message`: The message string with placeholders.
  - `context`: The context object containing values to replace placeholders in the message. Default is an empty object.
  - `callbackFn`: The callback function called for each part of the resolved message.
  - `initialValue`: The initial value used in the callback function.
  - `options`: Additional options for resolving the message, such as the locale.

- **Returns**

  The resolved message after replacing placeholders with values from the context.

- **Details**

  This function takes a message string with placeholders and resolves it by:
    * Escaping special characters to prevent them from being interpreted as part of the message.
    * Iterating through each segment of the message:
      * Unescaping plain text segments.
      * Identifying named placeholders (`{key}`) and extracting the key name.
      * Looking up the value for the key in the context object.
      * If the value is found:
        * Applying any necessary inflections (e.g., singular/plural) based on the value and locale.
        * Formatting the value according to the locale.
        * Replacing the placeholder with the formatted and inflected value.
      * If the value is not found:
        * Leaving the placeholder intact.
    * Unescaping any remaining escaped characters.
    * Calling the `callbackFn` for each segment (escaped text, placeholder, or resolved value) allowing for custom processing.
  
  The resolved message is returned for further use.

- **Examples**

  ```typescript
  const cb: ResolveCallback<string> = (c) => {
    return c.prev + c.part
  }
  const resolvedMessage = resolve('Hello, {name}!', { name: 'Batou' }, cb, '');
  console.log(resolvedMessage);
  // Output: "Hello, Batou!"
  ```

- **See Also**

  - [resolveToString](https://neogaialab.github.io/psitta/core/reference/resolve.html#resolveToString)
  - [resolveToSegments](https://neogaialab.github.io/psitta/core/reference/resolve.html#resolveToSegments)

## resolveToSegments <Badge type="info" text="function" /> {#resolveToSegments}

Resolves a message template into an array of segments representing its structure.

- **Signature**

  ```typescript
  function resolveToSegments(
    message: Message,
    context: Partial<Context>,
    options: ResolveOptions
  ): Array.<Segment.<Placeholders, Context>>
  ```

- **Parameters**

  - `message`: The message template string containing placeholders.
  - `context`: Optional object containing values to replace placeholders. Defaults to `{}`.
  - `options`: Optional configuration options for formatting.

- **Returns**

  An array of segments representing the message structure (text or placeholder information).

- **Details**

  This function utilizes the `resolve` function to analyze the message template. It uses a custom callback function to
  create an array of `Segment` objects. Each segment represents a portion of the message and its properties:
   - `type`: Indicates whether the segment is plain text (`'text'`) or a placeholder (`'placeholder'`).
   - `part`: The actual content of the segment (text or placeholder string).
   - `key`: If a placeholder, the key extracted from the curly braces (`{key}`).
   - `context`: The provided context object (passed along for potential use).
   - `inflect` (optional): A function for dynamic inflection based on value and locale (if the `resolve` function provides this information).
  
  This allows for more granular manipulation of the message structure after processing.

- **Examples**

  ```typescript
  const segments = resolveToSegments('Hello, {name}!', { name: 'Batou' });
  console.log(segments);
  // Output: [
  //   { type: 'text', part: 'Hello, ', key: undefined, context: { name: 'Batou' }, inflect: [Function: DUMMY_INFLECT] },
  //   { type: 'placeholder', part: '{name}', key: 'name', context: { name: 'Batou' }, inflect: [Function: DUMMY_INFLECT] }
  //   { type: 'text', part: '!', key: undefined, context: { name: 'Batou' }, inflect: [Function: DUMMY_INFLECT] }
  // ]
  ```

## resolveToString <Badge type="info" text="function" /> {#resolveToString}

Resolves a message template into a single string with resolved placeholders.

- **Signature**

  ```typescript
  function resolveToString(
    text: Message,
    context: Partial<Context>,
    options: ResolveOptions
  ): string
  ```

- **Parameters**

  - `text`: The message template string containing placeholders.
  - `context`: Optional object containing values to replace placeholders. Defaults to `{}`.
  - `options`: Optional configuration options for resolving.

- **Returns**

  The final resolved message string.

- **Details**

  This function is a convenience wrapper around `resolve`. It takes a message template and context, and resolves the message into a single string by concatenating the processed parts. It uses a callback function that simply combines the previous accumulated string (`prev`) with the current part (`part`). The `resolve` function handles the logic of processing text and placeholder parts based on the provided context and options.

- **Examples**

  ```typescript
  const resolvedMessage = resolveToString('Hello, {name}!', { name: 'Batou' });
  console.log(resolvedMessage);
  // Output: "Hello, Batou!"
  ```


