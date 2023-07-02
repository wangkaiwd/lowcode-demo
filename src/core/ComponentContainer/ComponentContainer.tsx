import { ComponentProps } from 'react';
import css from './componentContainer.module.less';
import cls from 'classnames';
import { onChangeSelected, useEditorStore } from '../../store/editStore.ts';

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string;
}

const ComponentContainer = ({ style, className, children, id }: ComponentContainerProps) => {
  const { selectedKeys } = useEditorStore();
  const onClick = () => {
    onChangeSelected(id);
  };
  const selected = selectedKeys.has(id);

  return (
    <div
      className={cls(css.componentContainer, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ComponentContainer;
