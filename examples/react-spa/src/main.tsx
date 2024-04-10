import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { psitta } from "@psitta/core"

const messages = {
  'Hello {name}': {
    pt: 'Olá {name}, seja bem-vind{g} (o|a)',
  },
  'I have {num} (apple|apples)': {
    pt: 'Eu tenho {num} (maçã|maçãs)'
  },
  'Today is {date}': {
    pt: 'Hoje é {date}'
  }
} as const;

psitta({
  locales: ['en', 'pt'],
  messages,
})

declare module '@psitta/core' {
  interface Register {
    messages: typeof messages
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
