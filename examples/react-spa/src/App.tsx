import { getDefaultLocale } from '@psitta/core';
import { LocaleContext } from '@psitta/react';
import { useState } from 'react';
import ChildComponent from './ChildComponent';

function App() {
  const [locale, setLocale] = useState(getDefaultLocale());

  return (
    <>
      <LocaleContext.Provider value={locale}>
        <div>
          <ChildComponent setLocale={setLocale} />
        </div>
      </LocaleContext.Provider>
    </>
  )
}

export default App
