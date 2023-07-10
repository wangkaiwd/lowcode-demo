import { useRef } from 'react';

export const useLatest = <T> (state: T) => {
  const ref = useRef(state);
  ref.current = state;
  return ref;
};
