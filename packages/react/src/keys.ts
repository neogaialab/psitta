import { Locale } from '@psitta/core';
import { createContext } from 'react';

export const LocaleContext = createContext<Locale | null>(null);
