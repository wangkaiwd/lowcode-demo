import React, { CSSProperties, useRef } from 'react'
import { map } from 'lodash-es'
import { getSelectedComponent, updateSelectedComponentWrapperStyle } from '../store/helper.ts'
import { useThrottleFn } from '@/hooks/useThtottleFn.tsx'
import { useEditorStore } from '@/store/editStore.ts'
import { EditorStore } from '@/store/editStoreTypes.ts'

const SHOW_LINE_DISTANCE = 12
const ALIGN_DISTANCE = 3

interface StartCoordinate {
  startX: number;
  startY: number;
}

interface UseMoveOptions {
  onMouseDown?: (e: React.MouseEvent) => void;
  zoom?: number;
  autoAlign?: boolean
}

const createYLineMap = (targetStyle: CSSProperties, selectedStyle: CSSProperties) => {
  const distanceLR = targetStyle.left as number + (targetStyle.width as number) - (selectedStyle.left as number)
  const distanceLC = targetStyle.left as number + (targetStyle.width as number) / 2 - (selectedStyle.left as number)
  const distanceRR = targetStyle.left as number + (targetStyle.width as number) - (selectedStyle.left as number + (selectedStyle.width as number))
  const distanceRC = targetStyle.left as number + ((targetStyle.width) as number / 2) - (selectedStyle.left as number + (selectedStyle.width as number))
  const distanceLL = targetStyle.left as number - (selectedStyle.left as number)
  const distanceRL = targetStyle.left as number - ((selectedStyle.left as number) + (selectedStyle.width as number))
  return {
    [distanceLR]: {
      lineX: targetStyle.left as number + (targetStyle.width as number),
    },
    [distanceLC]: {
      lineX: targetStyle.left as number + (targetStyle.width as number) / 2
    },
    [distanceRR]: {
      lineX: targetStyle.left as number + (targetStyle.width as number),
      cmpX: targetStyle.left as number + (targetStyle.width as number) - (selectedStyle.width as number)
    },
    [distanceRC]: {
      lineX: targetStyle.left as number + (targetStyle.width as number) / 2,
      cmpX: targetStyle.left as number + (targetStyle.width as number) / 2 - (selectedStyle.width as number)
    },
    [distanceLL]: {
      lineX: targetStyle.left as number
    },
    [distanceRL]: {
      lineX: targetStyle.left as number,
      cmpX: targetStyle.left as number - (selectedStyle.width as number)
    }
  }
}

const autoAlignWhenMove = (storeState: EditorStore) => {
  const { updateLinesCoordinate } = storeState
  const selectedComponent = getSelectedComponent(useEditorStore.getState())
  // get latest components of store state to continue following calculate
  const components = useEditorStore.getState().components
  let noYLine = true
  for (let i = 0; i < components.length; i++) {
    const c = components[i]
    if (c.uid === selectedComponent.uid) {
      continue
    }
    if (c.wrapperStyle && selectedComponent.wrapperStyle) {
      const yMap = createYLineMap(c.wrapperStyle, selectedComponent.wrapperStyle)
      map(yMap, (v, k) => {
        if (Math.abs(Number(k)) < SHOW_LINE_DISTANCE) {
          noYLine = false
          updateLinesCoordinate({ left: v.lineX })
          if (Math.abs(Number(k)) < ALIGN_DISTANCE) {
            updateSelectedComponentWrapperStyle((preProps) => {
              preProps.left = v.cmpX || v.lineX
            })
          }
        }
      })
    }
  }
  if (noYLine) {
    updateLinesCoordinate({ left: undefined })
  }
}

export const useMove = (options: UseMoveOptions = {}) => {
  const { zoom = 1, autoAlign = false } = options
  const storeState = useEditorStore()
  const startCoordinate = useRef<StartCoordinate | null>(null)
  const onMove = useThrottleFn((e: MouseEvent) => {
    if (!startCoordinate.current) {
      return
    }
    const { startX, startY } = startCoordinate.current
    const { clientX, clientY } = e
    const distanceX = (clientX - startX) / zoom
    const distanceY = (clientY - startY) / zoom
    updateSelectedComponentWrapperStyle((preProps) => {
      preProps.top = preProps.top as number + distanceY
      preProps.left = preProps.left as number + distanceX
    })
    if (autoAlign) {
      autoAlignWhenMove(storeState)
    }
    startCoordinate.current = {
      startX: clientX,
      startY: clientY
    }
  }, { wait: 20 })

  const onMouseDown = (e: React.MouseEvent) => {
    const { clientX: startX, clientY: startY } = e
    startCoordinate.current = {
      startX,
      startY,
    }
    options.onMouseDown?.(e)
    // avoid image move affect
    // e.preventDefault();
    const onUp = () => {
      startCoordinate.current = null
      storeState.updateLinesCoordinate({ left: undefined, top: undefined })
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
