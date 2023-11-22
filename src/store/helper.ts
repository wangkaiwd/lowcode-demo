import { EditorStore, InternalComponent } from './editStoreTypes.ts'
import { useEditorStore } from './editStore.ts'
import { merge } from 'lodash-es'
import { isFunction } from '../shared/utils.ts'
import { CSSProperties } from 'react'

export const createComponentsMap = (editorStore: EditorStore) => {
  const { components } = editorStore
  return components.reduce<Record<string, InternalComponent>>((acc, com) => {
    acc[com.uid] = com
    return acc
  }, {})
}

export const getSelectedComponents = (editorStore: EditorStore) => {
  const { selectedKeys } = editorStore
  const componentsMap = createComponentsMap(editorStore)
  const keys = [...selectedKeys.keys()]
  return keys.map(key => componentsMap[key])
}

export const getSelectedComponent = (editorStore: EditorStore) => {
  const selectedComponents = getSelectedComponents(editorStore)
  return selectedComponents[0]
}
type SetNewProps = (preProps: InternalComponent) => Partial<InternalComponent>

export function updateSelectedComponents (setNewProps: SetNewProps): void
export function updateSelectedComponents (newProps: Partial<InternalComponent>): void
export function updateSelectedComponents (newProps: any) {
  useEditorStore.setState((draft) => {
    const selectedComponents = getSelectedComponents(draft)
    selectedComponents.map(component => {
      merge(component, isFunction(newProps) ? newProps(component) : newProps)
    })
  })
}

// use immer can update state directly
export const updateSelectedComponentWrapperStyle = (updater: (preStyle: CSSProperties) => void) => {
  useEditorStore.setState((draft) => {
    const selectedComponent = getSelectedComponent(draft)
    updater(selectedComponent.wrapperStyle!)
  })
}
