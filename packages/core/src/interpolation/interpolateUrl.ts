import interpolateValue from "./interpolateValue";

function slugify(text: string) {
  return text.trim().replaceAll(' ', '-').replaceAll('/', '-').toLowerCase()
}

/**
 * Interpolates values from a context object into a URL string using placeholders.
 *
 * @param {string} url - The URL string containing placeholders for interpolation.
 * @param {Record<string, string>} context - An object containing key-value pairs for interpolation.
 * @returns {string} The URL with placeholders replaced by corresponding values from the context.
 *
 * @example
 * 
 * ```typescript
 * const interpolatedUrl = interpolateUrl('/product/{name}', { name: 'Cyberbrain' });
 * console.log(interpolatedUrl); // Output: /product/cyberbrain
 * ```
 */
function interpolateUrl(url: string, context: Record<string, string>) {
  Object.keys(context).forEach(key => {
    const value = context[key];
    const slugifiedValue = slugify(value);

    url = interpolateValue(url, key, slugifiedValue);
  });

  return url;
}

export default interpolateUrl
