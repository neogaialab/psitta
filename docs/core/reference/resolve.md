# Resolve API {#resolve-api}

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
  const formattedMessage = resolveToString('Hello, {name}!', { name: 'Batou' });
  console.log(formattedMessage);
  // Output: "Hello, Batou!"
  ```


