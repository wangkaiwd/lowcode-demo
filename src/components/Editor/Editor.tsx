import LeftPanel from '@/components/Editor/LeftPanel.tsx';
import css from './editor.module.less';
import {useEditorStore} from '@/store/editStore.ts';

const Editor = () => {
	const {components} = useEditorStore();
	return (
		<div className={css.editor}>
			<div className={css.leftPanel}>
				<LeftPanel/>
			</div>
			<div className={css.canvas}>
				{
					components.map((component, i) => {
						return <div style={component.styles} key={i}></div>;
					})
				}
			</div>
		</div>
	);
};

export default Editor;
