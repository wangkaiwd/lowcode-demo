import { EditorStore, InternalComponent } from './editStoreTypes.ts';
import { useEditorStore } from './editStore.ts';
import { merge } from 'lodash-es';

export const createComponentsMap = (editorStore: EditorStore) => {
  const { components } = editorStore;
  return components.reduce<Record<string, InternalComponent>>((acc, com) => {
    acc[com.uid] = com;
    return acc;
  }, {});
};

export const getSelectedComponents = (editorStore: EditorStore) => {
  const { selectedKeys } = editorStore;
  const componentsMap = createComponentsMap(editorStore);
  const keys = [...selectedKeys.keys()];
  return keys.map(key => componentsMap[key]);
};

export const getComponentByUid = (editorStore: EditorStore) => {
  const selectedComponents = getSelectedComponents(editorStore);
  return selectedComponents[0];
};
export const updateComponentByUid = (uid: string, newProps: Record<string, any>) => {
  useEditorStore.setState((draft) => {
    const componentsMap = createComponentsMap(draft);
    componentsMap[uid] = merge(componentsMap[uid], newProps);
  });
};
