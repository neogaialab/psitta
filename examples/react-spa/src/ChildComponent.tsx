import { getConfig } from "@psitta/core";
import { LocaleContext, T, dn, t, u, v } from "@psitta/react";
import { useContext, useState } from "react";

function ChildComponent() {
  const config = getConfig()
  const [count, setCount] = useState(0)
  const [_, setLocale] = useContext(LocaleContext)

  return <div>
    {t('Hello {name}', { name: 'Batou', g: 'masc' })}

    <div style={{ display: "flex", gap: '2em' }}>
      <p>
        <T text="I have {num} (apple|apples)" context={{ num: count }}>
          {{
            num: ({ inflect }) => <><span className="count">{count}</span> {inflect(count)}</>
          }}
        </T>
      </p>

      <button onClick={() => setCount((count) => count + 1)}>
        Add apple
      </button>

    </div>
    
    <p>
      {v([new Date(), { dateStyle: 'long' }])}
    </p>

    <div style={{ display: 'flex', marginBottom: '0.5em', marginTop: '0.5em' }}>
      {config.locales.map((locale) => (
        <button key={locale} onClick={() => setLocale(locale)}>
          {dn(locale, { type: 'language' }, { locale })}
        </button>
      ))}
    </div>

    <a href={u('/product/{name}', { name: 'Futuristic Hoverboard' })}>
      Localized link
    </a>
  </div>;
}

export default ChildComponent;
