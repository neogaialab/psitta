import { Locale, psitta } from "@psitta/core";
import { createPsitta } from '@psitta/vue';
import { createApp, reactive, toRefs } from 'vue';
import App from './App.vue';
import './style.css';

const messages = {
  'Hello {name}': {
    pt: 'Olá {name}',
  },
  'I have {num} (apple|apples)': {
    pt: 'Eu tenho {num} (maçã|maçãs)'
  },
  'Today is {date}': {
    pt: 'Hoje é {date}'
  }
} as const;

const config = psitta({
  locales: ['en', 'pt'],
  messages,
})

declare module '@psitta/core' {
  interface Register {
    messages: typeof messages
  }
}

export const store = reactive<{ locale: Locale }>({
  locale: config.defaultLocale,
})

const Psitta = createPsitta({
  locale: toRefs(store).locale,
})

const app = createApp(App);
app.use(Psitta)
app.mount('#app')
