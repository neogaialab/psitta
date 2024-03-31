import { Locale } from '@psitta/core';
import { createContext } from 'react';

type LocaleContext = [
  Locale,
  (locale: Locale) => void
]

export const LocaleContext = createContext<LocaleContext>([null as unknown as Locale, () => {}]);
