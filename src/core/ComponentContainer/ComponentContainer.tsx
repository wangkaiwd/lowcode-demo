import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';
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

const ComponentContainer = forwardRef(({
  style,
  className,
  children,
  id
}: ComponentContainerProps, ref) => {
  const { selectedKeys, computed } = useEditorStore();
  const { componentsMap } = computed;
  const elRef = useRef<HTMLDivElement | null>(null);
  const startCoordinate = useRef<StartCoordinate | null>(null);
  useImperativeHandle(ref, () => {
    return {
      el: elRef.current
    };
  });
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
    selectedKeys.forEach(key => {
      const component = componentsMap[key];
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
    startCoordinate.current = {
      startX: clientX,
      startY: clientY
    };
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
      document.removeEventListener('mouseleave', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  };
  return (
    <div
      ref={elRef}
      onMouseDown={onMouseDown}
      className={cls(css.componentContainer, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
});

export default ComponentContainer;
