import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

import { i18nConfig, localizeKey } from "@psitta/core";

const translations = {
    'Hello, {name}': {
        pt: 'Olá, {name}'
    }
} as const;

i18nConfig.locales = ['en', 'pt']
i18nConfig.translations = translations
i18nConfig.datetimeFormats = {
  en: 'en-US',
  pt: 'pt-BR',
}
i18nConfig.numberFormats = {
  en: 'en-US',
  pt: 'pt-BR',
}

declare global {
    namespace I18n {
        type MessageSchema = typeof translations
    }
}

console.log(localizeKey('Hello, {name}', 'pt'))

createApp(App).mount('#app')
