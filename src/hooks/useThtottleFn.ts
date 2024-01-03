import { throttle, ThrottleSettings } from 'lodash-es'
import { useCallback, useRef } from 'react'

interface TOptions extends ThrottleSettings {
  wait?: number;
}

type Fn = (...args: any[]) => any
export const useThrottleFn = (fn: Fn, options: TOptions = {}) => {
  const fnRef = useRef(fn)
  fnRef.current = fn
  const { wait = 200, ...rest } = options
  return useCallback(throttle(<T> (...args: T[]) => fnRef.current(...args), wait, rest), [fnRef])
}
