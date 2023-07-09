import { ComponentProps } from 'react';
import css from './componentContainer.module.less';
import cls from 'classnames';
import { onChangeSelected, updateComponentByKey, useEditorStore } from '../../store/editStore.ts';

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string;
}

const ComponentContainer = ({ style, className, children, id }: ComponentContainerProps) => {
  const { selectedKeys, computed, components } = useEditorStore();
  const { componentsMap } = computed;
  const onClick = () => {
    onChangeSelected(id);
  };
  const selected = selectedKeys.has(id);
  console.log('log', componentsMap, components);
  const onMouseDown = (e: React.MouseEvent) => {
    const { clientX: startX, clientY: startY } = e;
    e.preventDefault();
    const onMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const distanceX = clientX - startX;
      const distanceY = clientY - startY;
      selectedKeys.forEach(key => {
        const component = componentsMap[key];
        if (component && component.style) {
          const { left, top } = component.style;
          updateComponentByKey(key, {
            style: {
              left: left as number + distanceX,
              top: top as number + distanceY
            }
          });
        }
      });
    };
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    console.log('mouse down');
  };
  const onMouseUp = () => {
    console.log('mouse up');
  };
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={cls(css.componentContainer, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ComponentContainer;
