import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {EditorStoreAction, EditorStoreState} from '@/store/editStoreTypes.ts';

export const useEditorStore = create(immer<EditorStoreState & EditorStoreAction>((setState) => {
	return {
		components: [],
		list: [
			{
				group: '文本',
				elements: [
					{
						name: '标题'
					},
					{
						name: '正文'
					}
				]
			}
		],
		addComponent: (component) => {
			setState((state) => {
				state.components.push(component);
			});
		}
	};
}));
