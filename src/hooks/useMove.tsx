import React, { useMemo, useRef } from 'react'

import { getSelectedComponents, updateSelectedComponents } from '../store/helper.ts'
import { useThrottleFn } from '@/hooks/useThtottleFn.tsx'
import { useEditorStore } from '@/store/editStore.ts'

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
  const selectedComponents = getSelectedComponents(useEditorStore.getState())
  const outerStyle = useMemo(() => {
    if (!selectedComponents.length) {return { display: 'none' }}
    let minLeft = 99999, minTop = 99999, maxLeftWithWidth = 0, maxTopWithHeight = 0
    const selectedComponent = selectedComponents[0]
    for (let i = 0; i < selectedComponents.length; i++) {
      const current = selectedComponents[i]
      if (current.wrapperStyle) {
        const {
          left,
          top,
          width,
          height,
        } = current.wrapperStyle
        minLeft = Math.min(minLeft, left as number || 0)
        minTop = Math.min(minTop, top as number || 0)
        maxLeftWithWidth = Math.max(maxLeftWithWidth, (left as number) + (width as number))
        maxTopWithHeight = Math.max(maxTopWithHeight, (top as number) + (height as number))
      }
    }
    return {
      left: minLeft,
      top: minTop,
      transform: selectedComponent.wrapperStyle?.transform,
      width: maxLeftWithWidth - minLeft,
      height: maxTopWithHeight - minTop
    }
  }, [selectedComponents])
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
    const { clientX: startX, clientY: startY } = e
    startCoordinate.current = {
      startX,
      startY,
      startLeft: outerStyle.left!,
      startTop: outerStyle.top!
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
