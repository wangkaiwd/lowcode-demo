import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EditorStoreAction, EditorStoreState } from '@/store/editStoreTypes.ts';
import { titleSchema } from '@/components/Title/schema.tsx';
import { imageSchema } from '@/components/Image/schema.tsx';
import { Schema } from '../types/schema.ts';
import { merge } from 'lodash-es';

export const useEditorStore = create(immer<EditorStoreState & EditorStoreAction>((setState, getState) => {
  return {
    zoom: 1,
    components: [],
    // https://github.com/pmndrs/zustand/issues/132#issuecomment-1120467721
    // todo: why need to nest object ?
    computed: {
      get componentsMap () {
        const { components } = getState();
        return components.reduce<Record<string, Schema>>((acc, com) => {
          acc[com.uid] = com;
          return acc;
        }, {});
      },
    },
    selectedKeys: new Set(),
    list: [
      {
        group: '文本',
        elements: [titleSchema]
      },
      {
        group: '图片',
        elements: [imageSchema]
      }
    ],
    addComponent: (component) => {
      setState((state) => {
        state.components.push(component);
      });
    },
    setDragItem: (dragItem) => {
      setState((state) => {
        state.dragItem = dragItem;
      });
    }
  };
}));

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
  const { selectedKeys, computed } = useEditorStore.getState();
  const { componentsMap } = computed;
  const selectedKeysArray = [...selectedKeys];
  selectedKeysArray.map((key) => {
    const component = componentsMap[key];
    if (component.style) {
      const { width, height, left, top } = component.style;
      const newWidth = width as number + deltaX;
      const newHeight = height as number + deltaY;
      const newLeft = left as number + deltaLeft;
      const newTop = top as number + deltaTop;
      updateComponentByUid(key, { style: { width: newWidth, height: newHeight, left: newLeft, top: newTop } });
    }
  });
};

export const updateComponentByUid = (uid: string, newProps: Partial<Schema>) => {
  useEditorStore.setState((draft) => {
    const { components } = draft;
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (component.uid === uid) {
        components[i] = merge(component, newProps);
        return;
      }
    }
  });
};
