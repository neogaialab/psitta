import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initPsitta } from "@psitta/core"

const translations = {
  'Hello {username}': {
    pt: 'Olá {username}',
  },
  'I have {num} (apple|apples)': {
    pt: 'Eu tenho {num} (maçã|maçãs)'
  },
  'Today is {date}': {
    pt: 'Hoje é {date}'
  }
} as const;

initPsitta({
  locales: ['en', 'pt'],
  translations,
  datetimeFormats: { en: 'en-US', pt: 'pt-BR' },
  numberFormats: { en: 'en-US', pt: 'pt-BR' },
})

declare module '@psitta/core' {
  interface Register {
    messages: typeof translations
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
