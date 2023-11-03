import { useMemo } from 'react'
import { getSelectedComponents } from '@/store/helper.ts'
import { useEditorStore } from '@/store/editStore.ts'

export const useGetOuterStyle = () => {
  const selectedComponents = getSelectedComponents(useEditorStore.getState())
  // can't move multiple elements
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
        if (!height || !width) {
          return {
            left: 0,
            top: 0,
            width: 0,
            height: 0
          }
        }
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
  return outerStyle
}
