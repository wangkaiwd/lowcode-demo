import { ComponentProps, forwardRef, useImperativeHandle, useRef } from 'react';
import css from './componentContainer.module.less';
import cls from 'classnames';
import { onChangeSelected, useEditorStore } from '../../store/editStore.ts';
import { useMove } from '../../hooks/useMove.tsx';
import StretchControls from '../StretchControls';

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string;
}

const ComponentContainer = forwardRef(({
  style,
  className,
  children,
  id
}: ComponentContainerProps, ref) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const { selectedKeys } = useEditorStore();
  const selected = selectedKeys.has(id);
  const { onMouseDown } = useMove({ onMouseDown: () => onChangeSelected(id) });
  useImperativeHandle(ref, () => {
    return {
      el: elRef.current
    };
  });
  const onClick = () => {
    onChangeSelected(id);
  };
  return (
    <div
      ref={elRef}
      onMouseDown={onMouseDown}
      className={cls(css.componentContainer, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {
        selected &&
        <StretchControls/>
      }
      {children}
    </div>
  );
});

export default ComponentContainer;
