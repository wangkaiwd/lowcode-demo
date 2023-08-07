import { ComponentProps, forwardRef } from 'react';
import css from './componentContainer.module.less';
import cls from 'classnames';
import { onChangeSelected, useEditorStore } from '../../store/editStore.ts';
import { useMove } from '../../hooks/useMove.tsx';

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string;
}

const ComponentContainer = forwardRef<HTMLDivElement, ComponentContainerProps>(({
  style,
  className,
  children,
  id
}, ref) => {
  const { selectedKeys } = useEditorStore();
  const selected = selectedKeys.has(id);
  const { onMouseDown } = useMove({ onMouseDown: () => onChangeSelected(id) });
  const onClick = () => {
    onChangeSelected(id);
  };
  return (
    <div
      ref={ref}
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
