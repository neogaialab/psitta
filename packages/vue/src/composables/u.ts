import type { InferContext, Locale } from '@psitta/core';
import { interpolateUrl, localizeUrl } from '@psitta/core';
import useLocale from './useLocale';

type UrlOptions = {
  locale?: Locale;
}

function u<T extends string>(
  url: T,
  context?: Partial<InferContext<T>>,
  options?: UrlOptions,
) {
  let locale = options?.locale

  if (!locale)
    locale = useLocale().value

  let formattedUrl: string;

  if(!context) {
    formattedUrl = url
  } else {
    formattedUrl = interpolateUrl(url, context as any);
  }

  return localizeUrl(formattedUrl, locale)
}

export default u
