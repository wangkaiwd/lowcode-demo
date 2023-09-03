import { useMemoizedFn } from './useMemoizedFn.ts';
import { throttle, ThrottleSettings } from 'lodash-es';

interface TOptions extends ThrottleSettings {
  wait?: number;
}

type Fn = (...args: any[]) => any
export const useThrottleFn = (fn: Fn, options: TOptions = {}) => {
  const { wait = 200, ...rest } = options;
  return useMemoizedFn(throttle(fn, wait, rest));
};
