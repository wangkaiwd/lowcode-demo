import LeftPanel from '@/core/Editor/LeftPanel.tsx';
import css from './editor.module.less';
import {useEditorStore} from '@/store/editStore.ts';
import {useRef} from 'react';
import {simpleDeepClone} from '@/shared/deepClone.ts';

const Editor = () => {
	const canvasRef = useRef<HTMLDivElement>(null);
	const {components, addComponent, dragItem, setDragItem} = useEditorStore();
	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		if (!dragItem || !canvasRef.current) return;
		const {style} = dragItem.initialProps;
		const copyStyle = simpleDeepClone(style);
		const {left, top} = canvasRef.current.getBoundingClientRect();
		const {clientX, clientY} = e;
		copyStyle.left = clientX - left;
		copyStyle.top = clientY - top;
		addComponent({
			...dragItem,
			initialProps: {
				...dragItem.initialProps,
				style: copyStyle
			}
		});
		setDragItem();
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
					components.map((componentSchema, i) => {
						const Component = componentSchema.type;
						return <Component key={i} {...componentSchema.initialProps}/>;
					})
				}
			</div>
		</div>
	);
};

export default Editor;
