import LeftPanel from '../LeftPanel/LeftPanel.tsx';
import css from './editor.module.less';
import { clearSelected, useEditorStore } from '@/store/editStore.ts';
import { useEffect, useRef } from 'react';
import ComponentContainer from '../ComponentContainer/ComponentContainer.tsx';
import OuterBox from '../OuterBox';

const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { components, addComponent, dragItem, setDragItem } = useEditorStore();
  const containerRef = useRef<any>({});
  const outerBoxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const listenDocument = (e: Event) => {
      const notContains = Object.entries(containerRef.current).every(([, v]: any) => {
        return !v.el.contains(e.target);
      });
      if (notContains && !outerBoxRef.current?.contains(e.target as any)) {
        clearSelected();
      }
    };
    document.addEventListener('click', listenDocument);
    return () => {
      document.removeEventListener('click', listenDocument);
    };
  }, [components]);

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
        top: componentTop,
        width: 100,
        height: 100
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
        <OuterBox ref={outerBoxRef}/>
        {
          components.map((componentSchema) => {
            const Component = componentSchema.type;
            return (
              <ComponentContainer
                ref={(ref) => containerRef.current[componentSchema.uid] = ref}
                id={componentSchema.uid}
                key={componentSchema.uid}
                style={componentSchema.style}
              >
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
