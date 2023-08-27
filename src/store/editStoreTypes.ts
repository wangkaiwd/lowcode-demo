import { Schema } from '@/types/schema.ts';

export interface ListItem {
  group: string;
  elements: Schema[];
}

export interface InternalComponent extends Schema {
  uid: string;
}

export interface EditorStoreState {
  dragItem?: InternalComponent;
  components: InternalComponent[];
  zoom: number;
  canvasConfig: Record<string, any>;
  list: ListItem[];
  selectedKeys: Set<string>;
  computed: {
    componentsMap: Record<string, Schema>;
    selectedComponents: Schema[];
  };
}

export interface EditorStoreAction {
  addComponent: (component: InternalComponent) => void;
  setDragItem: (dragItem?: EditorStoreState['dragItem']) => void;
}
