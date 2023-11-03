import { useMemoizedFn } from './useMemoizedFn.ts'
import { throttle } from 'lodash-es'
import React, { useRef } from 'react'

import { updateSelectedComponents } from '../store/helper.ts'
import { useThrottleFn } from '@/hooks/useThtottleFn.tsx'
import { useGetOuterStyle } from '@/core/Blocker/hooks.ts'

interface StartCoordinate {
  startX: number;
  startY: number;
  startLeft: number;
  startTop: number;
}

interface UseMoveOptions {
  onMouseDown?: (e: React.MouseEvent) => void;
  zoom?: number;
}

export const useMove = (options: UseMoveOptions = {}) => {
  const { zoom = 1 } = options
  const startCoordinate = useRef<StartCoordinate | null>(null)
  const outerStyle = useGetOuterStyle()
  const onMove = useThrottleFn((e: MouseEvent) => {
    if (!startCoordinate.current) {
      return
    }
    const { startX, startY, startLeft, startTop } = startCoordinate.current
    const { clientX, clientY } = e
    const distanceX = (clientX - startX) / zoom
    const distanceY = (clientY - startY) / zoom
    updateSelectedComponents((preProps) => {
      if (!preProps.wrapperStyle) {return {}}
      return {
        wrapperStyle: {
          left: startLeft + distanceX,
          top: startTop + distanceY
        }
      }
    })
  }, { wait: 20 })

  const onMouseDown = (e: React.MouseEvent) => {
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
    const { clientX: startX, clientY: startY } = e
    startCoordinate.current = {
      startX,
      startY,
      startLeft: outerStyle.left!,
      startTop: outerStyle.top!
    }
  }
  return {
    onMouseDown
  }
}
