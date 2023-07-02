import { Schema } from '@/types/schema.ts';

export interface ListItem {
  group: string;
  elements: Schema[];
}

export interface EditorStoreState {
  dragItem?: Schema;
  components: Schema[];
  list: ListItem[];
  selectedKeys: Set<string>;
  componentsMap: Record<string, Schema>;
}

export interface EditorStoreAction {
  addComponent: (component: Schema) => void;
  setDragItem: (dragItem?: EditorStoreState['dragItem']) => void;
}
