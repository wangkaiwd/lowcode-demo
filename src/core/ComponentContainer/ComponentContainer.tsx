import { ComponentProps, useRef } from 'react';
import css from './componentContainer.module.less';
import cls from 'classnames';
import { onChangeSelected, updateComponentByUid, useEditorStore } from '../../store/editStore.ts';
import { throttle } from 'lodash-es';
import { useMemoizedFn } from '../../hooks/useMemoizedFn.ts';

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string;
}

interface StartCoordinate {
  startX: number;
  startY: number;
}

const ComponentContainer = ({ style, className, children, id }: ComponentContainerProps) => {
  const { selectedKeys, computed } = useEditorStore();
  const { componentsMap } = computed;
  const startCoordinate = useRef<StartCoordinate | null>(null);
  const onClick = () => {
    onChangeSelected(id);
  };
  const onMove = useMemoizedFn(throttle((e: MouseEvent) => {
    if (!startCoordinate.current) {
      return;
    }
    const { startX, startY } = startCoordinate.current;
    const { clientX, clientY } = e;
    const distanceX = clientX - startX;
    const distanceY = clientY - startY;
    console.log('client', distanceX, distanceY);
    selectedKeys.forEach(key => {
      const component = componentsMap[key];
      console.log('cmp', JSON.stringify(component.style, null, 2));
      if (component && component.style) {
        const { left, top } = component.style;
        updateComponentByUid(key, {
          style: {
            left: left as number + distanceX,
            top: top as number + distanceY
          }
        });
      }
    });
  }, 10));
  const selected = selectedKeys.has(id);
  const onMouseDown = (e: React.MouseEvent) => {
    const { clientX: startX, clientY: startY } = e;
    startCoordinate.current = {
      startX,
      startY
    };
    onChangeSelected(id);
    e.preventDefault();
    const onUp = () => {
      startCoordinate.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onMove);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  };
  return (
    <div
      onMouseDown={onMouseDown}
      className={cls(css.componentContainer, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ComponentContainer;
