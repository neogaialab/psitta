# Format API {#format-api}

## format <Badge type="info" text="function" /> {#format}

Formats a value for display based on its type and provided options.

- **Signature**

  ```typescript
  function format(value: V, locale: Locale): string
  ```

- **Parameters**

  - `value`: The value to be formatted.
    - If a single argument, it's the value itself.
    - If an array, the first element is the value and the second is an options object.
  - `locale`: The optional locale code to use for formatting (defaults to user's locale).

- **Returns**

  The formatted representation of the value.

- **Details**

  This function acts as a wrapper around the built-in `Intl` API for formatting different data types.
  It supports:
    - Numbers using `toLocaleString`
    - Dates using `toLocaleDateString`
    - `RelativeTime` objects using `Intl.RelativeTimeFormat`
    - `DateRange` objects using `Intl.DateTimeFormat.formatRange`
    - Arrays using `Intl.ListFormat`
  
  Additionally, it allows for custom formatting functions through the `custom` option within the options object.
  If provided, the custom function receives the value, locale, and remaining options and should return the formatted string.
  
  This function also leverages utilities like `RelativeTime` and `DateRange` for representing time-related data before formatting.

- **Examples**

  ```typescript
  // Formatting a date with US English locale
  const formattedDate = format(new Date(2024, 3, 11), 'en-US');
  console.log(formattedDate);
  // Output: "4/11/2024"
  ```


