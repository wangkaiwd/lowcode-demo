import { Schema } from '@/types/schema.ts'

export interface ListItem {
  group: string;
  elements: Schema[];
}

export interface InternalComponent extends Schema {
  uid: string;
  el?: any;
}

export interface EditorStoreState {
  dragItem?: InternalComponent;
  components: InternalComponent[];
  zoom: number;
  canvasConfig: Record<string, any>;
  list: ListItem[];
  selectedKeys: Set<string>;
  linesCoordinate: {
    left?: number
  }
}

export interface EditorStoreAction {
  addComponent: (component: InternalComponent) => void;
  setDragItem: (dragItem?: EditorStoreState['dragItem']) => void;
  updateComponent: (uid: string, newProps: Partial<InternalComponent>) => void;
  updateLinesCoordinate: (coordinate: EditorStoreState['linesCoordinate']) => void
}

export type EditorStore = EditorStoreState & EditorStoreAction
