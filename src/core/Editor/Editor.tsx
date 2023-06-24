import LeftPanel from '@/core/Editor/LeftPanel.tsx';
import css from './editor.module.less';
import {useEditorStore} from '@/store/editStore.ts';
import {useRef} from 'react';

const Editor = () => {
	const canvasRef = useRef<HTMLDivElement>(null);
	const {components, addComponent} = useEditorStore();
	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const dragItemString = e.dataTransfer.getData('drag-item');
		const dragItem = JSON.parse(dragItemString);
		if (!dragItem || !canvasRef.current) return;
		const {left, top} = canvasRef.current.getBoundingClientRect();
		const {clientX, clientY} = e;
		dragItem.style.left = clientX - left;
		dragItem.style.top = clientY - top;
		dragItem.style.position = 'absolute';
		addComponent(dragItem);
	};
	return (
		<div className={css.editor}>
			<div className={css.leftPanel}>
				<LeftPanel/>
			</div>
			<div
				ref={canvasRef}
				className={css.canvas}
				onDrop={onDrop}
				onDragOver={(e) => {
					// todo: must prevent browser, otherwise drop event can't execute
					e.preventDefault();
				}}
			>
				{
					components.map((component, i) => {
						return <div style={component.style} key={i}></div>;
					})
				}
			</div>
		</div>
	);
};

export default Editor;
