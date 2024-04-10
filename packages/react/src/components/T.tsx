import { ResolveContext, InferContext, Context, collect, resolveToSegments, localizeMessage } from '@psitta/core';
import React, { ReactNode, useEffect, useMemo } from 'react';
import useLocale from '../hooks/useLocale';
import { Register } from '@psitta/core';

type SlotProps<V> = V & { inflect: ResolveContext<any>['inflect'] }
type Slots<V> = Partial<Record<keyof V, (ReactNode | ((slotProps: SlotProps<V>) => ReactNode))>>

const T = <
  R extends Register,
    // @ts-ignore
  K extends keyof R['messages'],
    // @ts-ignore
  V extends InferContext<K | E>,
  // @ts-ignore
  E extends R['messages'][K][keyof R['messages'][K]]
>({
  text,
  context = {} as V,
  tag = 'span',
  children
}: {
  text: K;
  context?: Partial<V>;
  tag?: keyof JSX.IntrinsicElements;
  children?: Slots<V>
}) => {
  const [locale] = useLocale();

  const segments = useMemo(() => {
    const localizedMessage = localizeMessage(text as string, locale)
    
    return resolveToSegments(localizedMessage, context || {}, {
      locale,
    });
  }, [text, context]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      collect(text as any, context as Context);
    }
  }, []);

  const slots = children || {};

  return React.createElement(tag, {}, segments.map((segment, i) => (
    <React.Fragment key={i}>
      {segment.type === 'text' || (segment.key && !slots[segment.key]) ? (
        <>{segment.part}</>
      ) : (
        <>{
          typeof slots[segment.key!] === 'function'
            // @ts-ignore
            ? slots[segment.key!]({ ...segment.context as V, inflect: segment.inflect })
            : slots[segment.key!]
        }</>
      )}
    </React.Fragment>
  )))
};

export default T;
