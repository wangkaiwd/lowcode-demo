import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {EditorStoreAction, EditorStoreState} from '@/store/editStoreTypes.ts';
import {titleSchema} from '@/components/Title/schema.tsx';
import {imageSchema} from '@/components/Image/schema.tsx';

export const useEditorStore = create(immer<EditorStoreState & EditorStoreAction>((setState) => {
	return {
		components: [],
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
