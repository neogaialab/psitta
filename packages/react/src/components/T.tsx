import { FormatContext, InferValues, Values, collect, formatToSegments, prepareFormat } from '@psitta/core';
import React, { ReactNode, useEffect, useMemo } from 'react';
import useLocale from '../hooks/useLocale';
import { Register } from '@psitta/core';

type SlotProps<V> = V & { decline: FormatContext<any>['decline'] }
type Slots<V> = Partial<Record<keyof V, (ReactNode | ((slotProps: SlotProps<V>) => ReactNode))>>

const T = <
  R extends Register,
    // @ts-ignore
  K extends keyof R['messages'],
    // @ts-ignore
  V extends InferValues<K | E>,
  // @ts-ignore
  E extends R['messages'][K][keyof R['messages'][K]]
>({
  text,
  values = {} as V,
  tag = 'span',
  children
}: {
  text: K;
  values?: Partial<V>;
  tag?: keyof JSX.IntrinsicElements;
  children?: Slots<V>
}) => {
  const [locale] = useLocale();

  const segments = useMemo(() => {
    const { formatOptions, localizedMessage } = prepareFormat(text as string, locale)
    
    return formatToSegments(localizedMessage, values || {}, formatOptions);
  }, [text, values]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      collect(text as any, values as Values);
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
            ? slots[segment.key!]({ ...segment.values as V, decline: segment.decline })
            : slots[segment.key!]
        }</>
      )}
    </React.Fragment>
  )))
};

export default T;
