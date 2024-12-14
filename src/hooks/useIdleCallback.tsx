import { DependencyList, EffectCallback, useEffect } from 'react';

const useIdleCallback = (callback: EffectCallback, deps?: DependencyList) =>
  useEffect(() => {
    let fnClean: any;
    const id = requestIdleCallback(() => {
      fnClean = callback();
    });
    return () => {
      fnClean?.();
      cancelIdleCallback(id);
      fnClean = undefined;
    };
  }, deps);

export default useIdleCallback;
