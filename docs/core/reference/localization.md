# Localization API {#localization-api}

## localizeUrl() {#localizeUrl}

Generates a localized URL by appending or modifying the path based on the provided locale.

- **Signature**

  ```ts
  function localizeUrl(
    urlString?: string,
    locale?: Locale,
    options?: Partial<Config>,
  ): string | undefined
  ```

- **Parameters**

  - `urlString` (optional): The URL string to be localized.
  - `locale` (optional): The locale to be used for localization.
  - `options` (optional): Additional configuration options.

- **Return value**

  Returns the localized URL string if successful; otherwise, `undefined`.

- **Details**

  The `localizeUrl()` function generates a localized URL by appending or modifying the path based on the provided locale. If the `urlString` is not provided, or if the `locale` is not specified, or if the default locale matches the provided locale, the function returns the original URL string.

  If the URL already contains the locale path segment, the function returns the original URL string without any modifications.

  The function utilizes a dummy host (`http://dummyhost`) to parse and manipulate the URL. After localization, it ensures that the modified URL does not start with the dummy host before returning the final result.

- **Example**

  ```ts
  import localizeUrl from 'path-to-localize-url'

  const originalUrl = 'https://example.com/page'
  const locale = 'en'

  const localizedUrl = localizeUrl(originalUrl, locale)

  console.log(localizedUrl)
  // Output: 'https://example.com/en/page'
  ```

- **See also**

  - [Documentation - Placeholder Patterns](#placeholder-patterns)
  - [Guide - Declension with Decline()](#declension-with-decline)
