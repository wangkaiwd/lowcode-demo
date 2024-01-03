import { EditorStoreState } from './editStoreTypes.ts'
import { getSelectedComponent, updateSelectedComponents } from './helper.ts'
import { CSSProperties } from 'react'
import { useEditorStore } from './editStore.ts'

export const onConfigChange = (newConfig?: Record<string, any>) => {
  if (!newConfig) {return}
  useEditorStore.setState((draft) => {
    const component = getSelectedComponent(draft)
    if (component) {
      component.props.config = newConfig
    }
  })
}
export const onWrapperStyleChange = (newWrapperStyle: CSSProperties) => {
  useEditorStore.setState((draft) => {
    const component = getSelectedComponent(draft)
    if (component) {
      component.wrapperStyle = newWrapperStyle
    }
  })
}
export const onZoomChange = (value: EditorStoreState['zoom']) => {
  useEditorStore.setState((draft) => {
    draft.zoom = value
  })
}
export const onChangeSelected = (key: string) => {
  useEditorStore.setState((draft) => {
    const { selectedKeys } = draft
    // uid -> groupUid -> childrenUid
    // add children to Set
    // first only support operate single element
    selectedKeys.clear()
    if (!selectedKeys.has(key)) {
      selectedKeys.add(key)
    }
  })
}
export const clearSelected = () => {
  useEditorStore.setState((draft) => {
    const { selectedKeys } = draft
    selectedKeys.clear()
  })
}
export const updateSelectedComponentsDimensions = (deltaX: number, deltaY: number, deltaLeft: number, deltaTop: number) => {
  updateSelectedComponents((preProps) => {
    if (!preProps.wrapperStyle) {return {}}
    const { width, height, left, top } = preProps.wrapperStyle
    const newWidth = width as number + deltaX
    const newHeight = height as number + deltaY
    const newLeft = left as number + deltaLeft
    const newTop = top as number + deltaTop
    return {
      wrapperStyle: {
        width: newWidth,
        height: newHeight,
        left: newLeft,
        top: newTop
      }
    }
  })
}
