import { EditorStoreState } from './editStoreTypes.ts';
import { getComponentByUid, getSelectedComponents, updateComponentByUid } from './helper.ts';
import { CSSProperties } from 'react';
import { useEditorStore } from './editStore.ts';

export const onConfigChange = (newConfig?: Record<string, any>) => {
  if (!newConfig) {return;}
  useEditorStore.setState((draft) => {
    const component = getComponentByUid(draft);
    if (component) {
      component.props.config = newConfig;
    }
  });
};
export const onWrapperStyleChange = (newWrapperStyle: CSSProperties) => {
  useEditorStore.setState((draft) => {
    const component = getComponentByUid(draft);
    if (component) {
      component.wrapperStyle = newWrapperStyle;
    }
  });
};
export const onZoomChange = (value: EditorStoreState['zoom']) => {
  useEditorStore.setState((draft) => {
    draft.zoom = value;
  });
};
export const onChangeSelected = (key: string) => {
  useEditorStore.setState((draft) => {
    const { selectedKeys } = draft;
    if (!selectedKeys.has(key)) {
      selectedKeys.add(key);
    }
  });
};
export const clearSelected = () => {
  useEditorStore.setState((draft) => {
    const { selectedKeys } = draft;
    selectedKeys.clear();
  });
};
export const updateSelectedComponentsDimensions = (deltaX: number, deltaY: number, deltaLeft: number, deltaTop: number) => {
  // getState will get latest state
  const selectedComponents = getSelectedComponents(useEditorStore.getState());
  selectedComponents.map((component) => {
    if (component.wrapperStyle) {
      const { width, height, left, top } = component.wrapperStyle;
      const newWidth = width as number + deltaX;
      const newHeight = height as number + deltaY;
      const newLeft = left as number + deltaLeft;
      const newTop = top as number + deltaTop;
      updateComponentByUid(component.uid, {
        wrapperStyle: {
          width: newWidth,
          height: newHeight,
          left: newLeft,
          top: newTop
        }
      });
    }
  });
};
