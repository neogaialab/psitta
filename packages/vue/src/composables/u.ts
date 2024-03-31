import type { Locale } from '@psitta/core';
import { interpolateUrl, localizeUrl } from '@psitta/core';
import useLocale from './useLocale';

type UrlOptions = {
  locale?: Locale;
}

function u(
  url: string,
  values?: Record<string, string>,
  options?: UrlOptions,
) {
  let locale = options?.locale

  if (!locale)
    locale = useLocale().value

  let formattedUrl: string;

  if(!values) {
    formattedUrl = url
  } else {
    formattedUrl = interpolateUrl(url, values);
  }

  return localizeUrl(formattedUrl, locale)
}

export default u
