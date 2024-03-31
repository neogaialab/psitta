import { getConfig } from '@psitta/core';
import { LocaleContext } from '@psitta/react';
import { useState } from 'react';
import ChildComponent from './ChildComponent';

function App() {
  const config = getConfig()
  const [locale, setLocale] = useState(config.defaultLocale);

  return (
    <LocaleContext.Provider value={[locale, setLocale]}>
      <ChildComponent />
    </LocaleContext.Provider>
  )
}

export default App
