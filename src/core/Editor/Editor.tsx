import LeftPanel from '../LeftPanel/LeftPanel.tsx';
import css from './editor.module.less';
import componentContainerCss from '../ComponentContainer/componentContainer.module.less';
import { clearSelected, useEditorStore } from '@/store/editStore.ts';
import { useEffect, useRef } from 'react';
import ComponentContainer from '../ComponentContainer/ComponentContainer.tsx';

const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { components, addComponent, dragItem, setDragItem } = useEditorStore();

  useEffect(() => {
    const listenDocument = (e: Event) => {
      const componentContainerRef = document.querySelector(`.${componentContainerCss.componentContainer}`);
      if (!componentContainerRef?.contains(e.target as HTMLDivElement)) {
        clearSelected();
      }
    };
    document.addEventListener('click', listenDocument);
    return () => {
      document.removeEventListener('click', listenDocument);
    };
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!dragItem || !canvasRef.current) return;
    const { left, top } = canvasRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    const componentLeft = clientX - left;
    const componentTop = clientY - top;
    addComponent({
      ...dragItem,
      style: {
        left: componentLeft,
        top: componentTop
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
          components.map((componentSchema) => {
            const Component = componentSchema.type;
            return (
              <ComponentContainer id={componentSchema.uid} key={componentSchema.uid} style={componentSchema.style}>
                <Component {...componentSchema.initialProps}/>
              </ComponentContainer>
            );
          })
        }
      </div>
    </div>
  );
};

export default Editor;
