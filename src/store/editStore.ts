import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {EditorStoreAction, EditorStoreState} from '@/store/editStoreTypes.ts';

export const useEditorStore = create(immer<EditorStoreState & EditorStoreAction>((setState) => {
	return {
		components: [],
		list: [
			{name: 'text'}
		],
		addComponent: (component) => {
			setState((state) => {
				state.components.push(component);
			});
		}
	};
}));
