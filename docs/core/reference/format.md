# Format API {#format-api}

:::info See also
To better understand the Format APIs, it is recommended to read the following chapters in the guide:

- [Formatting Fundamentals](/core/guide/formatting)
- [Interpolation](/core/guide/formatting#interpolation)
- [Declension](/core/guide/formatting#declension)
  :::

## format() {#format}

Formats a text string with dynamic values.

- **Signature**

  ```ts
  function format<T>(
    text: Text,
    values: Partial<Values> = {},
    callbackFn: FormatCallback<T>,
    initialValue: T,
    options?: FormatOptions,
  ): T
  ```

- **Parameters**

  - `text`: The text string to be formatted.
  - `values`: An object containing the dynamic values to be inserted into the text. Defaults to an empty object.
  - `callbackFn`: A callback function called for each part of the formatted text.
  - `initialValue`: The initial value for the formatting process.
  - `options`: Optional formatting options.

- **Return value**

  Returns the formatted text.

- **Details**

  The `format()` function formats a text string by replacing placeholders with dynamic values. It iterates through the text string, replacing placeholders with corresponding values from the `values` object.

  - Placeholders are enclosed in curly braces (`{}`) and correspond to keys in the `values` object.
  - If a placeholder does not have a corresponding key in the `values` object, it remains unchanged in the formatted text.
  - The `callbackFn` parameter allows customization of the formatting process. It is called for each part of the formatted text, providing flexibility for handling different types of placeholders.
  - The `options` parameter allows customization of formatting options, such as datetime and number formatting.
    - `datetimeFormat`
    - `numberDeclensionRule`
    - `numberFormat`

- **Example**

  ```ts
  import { format } from '@psitta/core'

  const text = 'Hello, {name}! Today is {now}. You have {n} (apple|apples).'
  const values = {
    name: 'Luis',
    now: {
      date: new Date(),
      year: 'numeric',
    },
    n: 2,
  }

  const formattedText = format(
    text,
    values,
    ({ prev, part, dynamic, key, decline }) => {
      if (dynamic) {
        const value = values[key!]
        const phrase = decline(value)
        const dynamicPart = phrase ? `${value} __${phrase}__` : part

        return prev + `**${dynamicPart}**`
      }

      return prev + part
    },
    '',
    { datetimeFormat: 'en-US' }
  )

  console.log(formattedText)
  // Output: 'Hello, **Luis**! Today is **2024**. You have **1 __apple__**.'
  ```

- **See also**

  - [Documentation - Placeholder Patterns](#placeholder-patterns)
  - [Guide - Advanced Formatting Techniques](#advanced-formatting-techniques)

## formatToString() {#formatToString}

Formats a text string and returns the result as a string.

- **Signature**

  ```ts
  function formatToString(
    text: Text,
    values?: Partial<Values>,
    options?: FormatOptions,
  ): string
  ```

- **Parameters**

  - `text`: The text string to be formatted.
  - `values`: An optional object containing the dynamic values to be inserted into the text. Defaults to an empty object.
  - `options`: Optional formatting options.

- **Return value**

  Returns the formatted text as a string.

- **Details**

  The `formatToString()` function is a convenience wrapper around the `format()` function. It formats a text string with dynamic values and returns the result as a string.

  - If `values` are not provided, the function assumes an empty object for the `values` parameter.
  - Formatting options can be passed via the `options` parameter.

- **Example**

  ```ts
  import { formatToString } from 'formatter'

  const text = 'Hello, {name}! Today is {date}.'
  const values = { name: 'Luis', date: new Date() }

  const formattedText = formatToString(text, values, { datetimeFormat: 'YYYY-MM-DD' })

  console.log(formattedText)
  // Output: "Hello, Luis! Today is 2024-02-26."
  ```

- **See also**

  - [Documentation - Placeholder Patterns](#placeholder-patterns)
  - [Guide - Using formatToString()](#using-formatToString)

## formatToSegments() {#formatToSegments}

Formats a text string and returns an array of segments representing the formatted text.

- **Signature**

  ```ts
  function formatToSegments(
    text: Text,
    values?: Partial<Values>,
    options?: FormatOptions,
  ): Segment[]
  ```

- **Parameters**

  - `text`: The text string to be formatted.
  - `values`: An optional object containing the dynamic values to be inserted into the text. Defaults to an empty object.
  - `options`: Optional formatting options.

- **Return value**

  Returns an array of segments representing the formatted text.

- **Details**

  The `formatToSegments()` function formats a text string with dynamic values and returns an array of segments representing the formatted text. Each segment contains information about whether it is a text segment or a placeholder segment, along with the corresponding key and values.

  - If `values` are not provided, the function assumes an empty object for the `values` parameter.
  - Formatting options can be passed via the `options` parameter.

- **Example**

  ```ts
  import { formatToSegments } from 'formatter'

  const text = 'Hello, {name}! Today is {date}.'
  const values = { name: 'Luis', date: new Date() }

  const segments = formatToSegments(text, values, { datetimeFormat: 'YYYY-MM-DD' })

  console.log(segments)
  // Output:
  // [
  //   { type: 'text', part: 'Hello, ', key: undefined, values: {}, decline: [Function: DUMMY_DECLINE] },
  //   { type: 'placeholder', part: '{name}', key: 'name', values: { name: 'Luis', date: [object Date] }, decline: [Function: declinePhrase] },
  //   { type: 'text', part: '! Today is ', key: undefined, values: {}, decline: [Function: DUMMY_DECLINE] },
  //   { type: 'placeholder', part: '{date}', key: 'date', values: { name: 'Luis', date: [object Date] }, decline: [Function: declinePhrase] }
  // ]
  ```

- **See also**

  - [Documentation - Placeholder Patterns](#placeholder-patterns)
  - [Guide - Working with Segments](#working-with-segments)

## interpolate() {#interpolate}

Interpolates a placeholder in a text string with a corresponding value.

- **Signature**

  ```ts
  function interpolate(
    text: Text,
    placeholder: Placeholder,
    value: Value,
    options: InterpolateOptions,
  ): Text
  ```

- **Parameters**

  - `text`: The text string containing the placeholder to be replaced.
  - `placeholder`: The placeholder to be replaced in the text string.
  - `value`: The value to interpolate into the placeholder.
  - `options`: Options for interpolation.

- **Return value**

  Returns the text string with the placeholder replaced by the interpolated value.

- **Details**

  The `interpolate()` function replaces a placeholder in a text string with a corresponding value. It supports interpolation of various types of values, including dates and numbers, with customizable formatting options.

  - If the value is a `Date` object, it is formatted according to the provided datetime format or default options.
  - If the value is an object with a `date` property, it is treated as a date object and formatted accordingly.
  - If the value is an object with a `number` property, it is treated as a number object and formatted accordingly.
  - For other types of values, they are converted to strings and directly interpolated into the text.

- **Example**

  ```ts
  import { interpolate } from 'formatter'

  const text = 'Hello, {name}! Today is {date}. Your balance is {balance}.'
  const values = {
    name: 'Luis',
    date: new Date(),
    balance: 1000,
  }

  const interpolatedText = interpolate(text, 'date', values.date, { datetimeFormat: 'YYYY-MM-DD' })
  console.log(interpolatedText)
  // Output: "Hello, Luis! Today is 2024-02-26. Your balance is 1000."
```

- **See also**

  - [Documentation - Placeholder Patterns](#placeholder-patterns)
  - [Guide - Advanced Interpolation Techniques](#advanced-interpolation-techniques)
```

## decline() {#decline}

Generates a declension for a placeholder in a text string based on the provided value.

- **Signature**

  ```ts
  function decline(
    part: string,
    value: Value,
    options?: DeclineOptions,
  ): Declension
  ```

- **Parameters**

  - `part`: The text string containing the placeholder with possible declensions.
  - `value`: The value used to determine the appropriate declension.
  - `options`: Optional configuration for declension.

- **Return value**

  Returns a `Declension` object representing the result of the declension process.

- **Details**

  The `decline()` function generates a declension for a placeholder in a text string based on the provided value. It currently supports only number declensions. The placeholder pattern for declensions should be specified using pipes (`|`) to separate different forms.

  For example, a placeholder might be defined as `'I have {count} (apple|apples)'`, where the `count` value determines whether to use the singular or plural form of the word 'apple'.

- **Example**

  ```ts
  import { decline } from 'formatter'

  const part = 'You have {count} (apple|apples)'
  const value = 5

  const result = decline(part, value)

  console.log(result)
  // Output: { phrase: 'You have 5 apples', form: 'apples' }
  ```

- **See also**

  - [Documentation - Placeholder Patterns](#placeholder-patterns)
  - [Guide - Declension with Decline()](#declension-with-decline)
