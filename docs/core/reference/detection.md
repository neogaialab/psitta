# Detection API {#detection-api}

## detectLocaleFromAcceptLanguage <Badge type="info" text="function" /> {#detectLocaleFromAcceptLanguage}

Detects the user's preferred locale from the Accept-Language header.

- **Signature**

  ```typescript
  function detectLocaleFromAcceptLanguage(
    acceptLanguageHeader: string,
    options: Partial<Config>
  ): Intl.Locale
  ```

- **Parameters**

  - `acceptLanguageHeader`: The Accept-Language header value from the HTTP request.
  - `options`: Optional object containing partial configuration overrides (for Psitta configuration).

- **Returns**

  An `Intl.Locale` object representing the detected locale or `undefined` if no match is found.

- **Details**

  This function relies on the Psitta configuration (`locales` property) to determine the available locales supported by the application. Languages are prioritized based on the quality values (q values) provided in the `Accept-Language` header. Higher q values indicate a stronger preference. The function iterates through the preferred languages, checking if they are included in the `locales` list. If a match is found, the corresponding locale tag is returned as an `Intl.Locale` object. If no matching locale is found, the function returns `undefined`.

## detectLocaleFromCookie <Badge type="info" text="function" /> {#detectLocaleFromCookie}

Detects the user's preferred locale from a cookie value.

- **Signature**

  ```typescript
  function detectLocaleFromCookie(
    localeCookie: string,
    options: Partial<Config>
  ): Locale
  ```

- **Parameters**

  - `localeCookie`: The value of the cookie containing the user's preferred locale (or undefined if not set).
  - `options`: Optional object containing partial configuration overrides (for Psitta configuration).

- **Returns**

  The detected locale code (string) or `null` if no match is found or the cookie value is invalid.

- **Details**

  This function relies on the Psitta configuration (`locales` property) to determine the available locales supported by the application. It checks if the `localeCookie` value exists and is included in the configured `locales` list. If a match is found, the cookie value (which is assumed to be a valid locale code) is returned. Otherwise, the function returns `null`.

## detectLocaleFromNavigator <Badge type="info" text="function" /> {#detectLocaleFromNavigator}

Detects the user's preferred locale from the browser's navigator object.

- **Signature**

  ```typescript
  function detectLocaleFromNavigator(options: Partial<Config>): Intl.Locale
  ```

- **Parameters**

  - `options`: Optional object containing partial configuration overrides (for Psitta configuration).

- **Returns**

  An `Intl.Locale` object representing the detected locale or `null` if no match is found.

- **Details**

  This function uses the browser's `navigator.language` property to get the user's preferred language tag. It then attempts to create an `Intl.Locale` object from this tag. The function relies on the Psitta configuration (`locales` property) to determine the available locales supported by the application. If the language retrieved from the navigator is not included in the `locales` list, the function returns `null`. Otherwise, it returns the created `Intl.Locale` object which can be used for formatting based on the user's preferred language

## detectLocaleFromPathname <Badge type="info" text="function" /> {#detectLocaleFromPathname}

Detects the user's preferred locale from the URL pathname.

- **Signature**

  ```typescript
  function detectLocaleFromPathname(
    pathname: string,
    options: Partial<Config>
  ): Object
  ```

- **Parameters**

  - `pathname`: The URL pathname string.
  - `options`: Optional object containing partial configuration overrides (for Psitta configuration).

- **Returns**

  An object containing the detected locale code and the URL pathname without the locale segment.

- **Details**

  This function assumes that the first path segment in the URL might represent the user's preferred locale. It checks if this segment matches any of the supported locales defined in the Psitta configuration (`locales` property). The function returns an object containing two properties:
    - `locale`: The detected locale code as a string, or `null` if no match is found.
    - `urlWithoutLocale`: A modified URL pathname where the first path segment (assumed to be the locale) has been removed.

- **Examples**

  ```typescript
  const pathname = '/en/about-us';
  const { locale, urlWithoutLocale } = detectLocaleFromPathname(pathname, { locales: ['en', 'fr'] });
  
  if (locale) {
    console.log('Detected locale:', locale);
    // Output: 'en'
    console.log('URL without locale:', urlWithoutLocale);
    // Output: '/about-us'
  } else {
    console.log('No matching locale found in pathname.');
  }
  ```


