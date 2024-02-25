import { Locale, initPsitta } from "@psitta/core";
import { createPsitta } from '@psitta/vue';
import { createApp, reactive, toRefs } from 'vue';
import App from './App.vue';
import './style.css';

const translations = {
  'Hello, {name}': {
    pt: 'Olá, {name}'
  }
} as const;

initPsitta({
  locales: ['en', 'pt'],
  translations,
  datetimeFormats: { en: 'en-US', pt: 'pt-BR' },
  numberFormats: { en: 'en-US', pt: 'pt-BR' },
})

declare global {
  namespace Psitta {
    type MessageSchema = typeof translations
  }
}

export const store = reactive<{ locale: Locale }>({
  locale: "en"
})

const Psitta = createPsitta({
  locale: toRefs(store).locale,
})

const app = createApp(App);
app.use(Psitta)
app.mount('#app')
