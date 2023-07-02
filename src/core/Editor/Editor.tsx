import LeftPanel from '../LeftPanel/LeftPanel.tsx';
import css from './editor.module.less';
import { useEditorStore } from '@/store/editStore.ts';
import { useRef, useState } from 'react';
import ComponentContainer from '../ComponentContainer/ComponentContainer.tsx';

interface Position {
  left: number;
  top: number;
}

const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { components, addComponent, dragItem, setDragItem } = useEditorStore();
  const [positions, setPositions] = useState<Record<string, Position>>({});
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragItem || !canvasRef.current) return;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const componentLeft = clientX - left;
    const componentTop = clientY - top;
    const { key } = dragItem;
    setPositions({
      ...positions,
      [key]: {
        left: componentLeft,
        top: componentTop
      }
    });
    addComponent(dragItem);
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
          components.map((componentSchema) => {
            const Component = componentSchema.type;
            const position = positions[componentSchema.key];
            return (
              <ComponentContainer id={componentSchema.key} key={componentSchema.key} style={position}>
                <Component key={componentSchema.key} {...componentSchema.initialProps}/>
              </ComponentContainer>
            );
          })
        }
      </div>
    </div>
  );
};

export default Editor;
