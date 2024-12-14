import { useCallback, useEffect, useRef, useState } from 'react';

type OptionsSetValue = {
  immediately?: boolean;
  delayMs?: number;
};

type SetValueHandler<T> = (value: T, opts?: OptionsSetValue) => void;

const useDebounceState = <T = any>(initValue: T, delay = 1000): [T, SetValueHandler<T>] => {
  const [debounceValue, setDebounceValue] = useState(initValue);
  const timeoutRef = useRef<any>();

  const setValue: SetValueHandler<T> = useCallback(
    (value, opt) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      if (!opt?.immediately) {
        timeoutRef.current = setTimeout(() => {
          setDebounceValue(value);
        }, opt?.delayMs || delay);
      } else {
        setDebounceValue(value);
      }
    },
    [delay],
  );

  useEffect(() => () => void timeoutRef.current && clearTimeout(timeoutRef.current), []);

  return [debounceValue, setValue] as const;
};

export default useDebounceState;
