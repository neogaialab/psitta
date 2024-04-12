# Grammar API {#grammar-api}

## inflect <Badge type="info" text="function" /> {#inflect}

Inflects a phrase based on the provided value and locale (grammar rules).

- **Signature**

  ```typescript
  function inflect(
    phrase: Phrase,
    value: Value,
    locale: Locale
  ): Inflection
  ```

- **Parameters**

  - `phrase`: The phrase containing potential inflection patterns.
  - `value`: The value used for inflection (number or string).
  - `locale`: The optional locale code to use for inflection rules (defaults to user's locale).

- **Returns**

  An object containing the inflected phrase and the chosen form.

- **Details**

  This function inflects a phrase based on the provided value and the grammar rules for the specified locale.
  It searches for patterns within the phrase enclosed in parentheses `()`. These patterns represent possible forms the phrase can take depending on the value.
  
  The function supports two inflection types:
    - Number inflection: Used for phrases that change based on numerical values (e.g., "There is 1 apple", "There are 2 apples").
    - Gender inflection: Used for phrases that change based on a provided string value representing a gender (e.g., "Seja bem-vindo", "Seja bem-vinda").
  
  The specific inflection logic is determined by rules defined in the grammar configuration. The function first checks for locale-specific rules (`rules[locale]`) and falls back to default rules (`config.grammar.defaultRules`) if not found.
  
  If no matching inflection pattern is found or the value doesn't match the expected type (number or string), the original phrase is returned without modification.

- **Examples**

  ```typescript
  const inflection = inflect('You have {count} (apple|apples).', 1, 'en');
  console.log(inflection.phrase); // Output: You have {count} apple.
  ```


