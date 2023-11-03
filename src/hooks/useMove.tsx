import { useMemoizedFn } from './useMemoizedFn.ts'
import { throttle } from 'lodash-es'
import React, { useRef } from 'react'

import { updateSelectedComponents } from '../store/helper.ts'

interface StartCoordinate {
  startX: number;
  startY: number;
}

interface UseMoveOptions {
  onMouseDown?: (e: React.MouseEvent) => void;
  zoom?: number;
}

export const useMove = (options: UseMoveOptions = {}) => {
  const { zoom = 1 } = options
  const startCoordinate = useRef<StartCoordinate | null>(null)
  const onMove = useMemoizedFn(throttle((e: MouseEvent) => {
    if (!startCoordinate.current) {
      return
    }
    const { startX, startY } = startCoordinate.current
    const { clientX, clientY } = e
    const distanceX = (clientX - startX) / zoom
    const distanceY = (clientY - startY) / zoom
    updateSelectedComponents((preProps) => {
      if (!preProps.wrapperStyle) {return {}}
      const { left, top } = preProps.wrapperStyle
      return {
        wrapperStyle: {
          left: left as number + distanceX,
          top: top as number + distanceY
        }
      }
    })
    startCoordinate.current = {
      startX: clientX,
      startY: clientY
    }
  }))

  const onMouseDown = (e: React.MouseEvent) => {
    const { clientX: startX, clientY: startY } = e
    startCoordinate.current = {
      startX,
      startY
    }
    options.onMouseDown?.(e)
    // avoid image move affect
    // e.preventDefault();
    const onUp = () => {
      startCoordinate.current = null
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onUp)
  }
  return {
    onMouseDown
  }
}
