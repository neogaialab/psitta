import { getConfig, type Locale } from '@psitta/core';
import type { Ref } from 'vue';
import { inject, ref } from 'vue';
import { localeKey } from '../keys';

function useLocale() {
  const config = getConfig();
  const locale = inject<Ref<Locale>>(localeKey, ref(config.defaultLocale))
  return locale
}

export default useLocale
