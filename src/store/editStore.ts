import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EditorStore } from '@/store/editStoreTypes.ts';
import { titleSchema } from '@/components/Title/schema.tsx';
import { imageSchema } from '@/components/Image/schema.tsx';
import { createComponentsMap } from '@/store/helper.ts';
import { merge } from 'lodash-es';

export const useEditorStore = create(immer<EditorStore>((setState) => {
  return {
    zoom: 1,
    components: [],
    canvasConfig: {
      width: 800,
      height: 600,
    },
    // https://github.com/pmndrs/zustand/issues/132#issuecomment-1120467721
    // todo: why need to nest object ?
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
    updateComponent: (uid, nextProps) => {
      setState((state) => {
        const componentsMap = createComponentsMap(state);
        const component = componentsMap[uid];
        if (component) {
          merge(component, nextProps);
        }
      });
    },
    setDragItem: (dragItem) => {
      setState((state) => {
        state.dragItem = dragItem;
      });
    },
  };
}));

