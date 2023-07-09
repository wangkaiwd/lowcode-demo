import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EditorStoreAction, EditorStoreState } from '@/store/editStoreTypes.ts';
import { titleSchema } from '@/components/Title/schema.tsx';
import { imageSchema } from '@/components/Image/schema.tsx';
import { Schema } from '../types/schema.ts';

export const useEditorStore = create(immer<EditorStoreState & EditorStoreAction>((setState, getState) => {
  return {
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

export const updateComponentByKey = (key: string, newProps: Partial<Schema>) => {
  useEditorStore.setState((draft) => {
    const { componentsMap } = draft.computed;
    const component = componentsMap[key];
    componentsMap[key] = {
      ...component,
      ...newProps,
      style: {
        ...component.style,
        ...newProps.style
      }
    };
    console.log('new', componentsMap);
  });
};
