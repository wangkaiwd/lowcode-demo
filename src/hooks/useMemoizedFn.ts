import { useCallback, useRef } from 'react';

export const useMemoizedFn = (fn: (...args: any[]) => any) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return useCallback((...args: any[]) => {
    return fnRef.current(...args);
  }, []);
};
