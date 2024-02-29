import { T } from "@psitta/react";
import { useState } from "react";

function ChildComponent({ setLocale }: { setLocale: (locale: string) => void }) {
    const [count, setCount] = useState(0)
  
    return <>
        <div style={{ display: 'flex', marginBottom: '0.5em' }}>
            <button onClick={() => setLocale('pt')}>
                Portuguese
            </button>
            <button onClick={() => setLocale('en')}>
                English
            </button>
        </div>

        <p>
          <T text="I have {num} (apple|apples)" values={{num: count}}>
            {{
                num: ({ decline }) => <><span className="count">{count}</span> {decline(count)}</>
            }}
          </T>
        </p>

        <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
        </button>
    </>;
}

export default ChildComponent;
