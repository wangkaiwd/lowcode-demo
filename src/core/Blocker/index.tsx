import { ComponentProps, forwardRef } from 'react'
import css from './index.module.less'
import cls from 'classnames'
import { useEditorStore } from '../../store/editStore.ts'
import { useMove } from '../../hooks/useMove.tsx'
import { onChangeSelected } from '../../store/actions.ts'

interface ComponentContainerProps extends ComponentProps<'div'> {
  id: string;
}

const Blocker = forwardRef<HTMLDivElement, ComponentContainerProps>(({
  style,
  className,
  children,
  id
}, ref) => {
  const { selectedKeys, zoom } = useEditorStore()
  const selected = selectedKeys.has(id)
  const { onMouseDown } = useMove({ onMouseDown: () => onChangeSelected(id), zoom, autoAlign: true })
  const onClick = () => {
    onChangeSelected(id)
  }
  return (
    <div
      ref={ref}
      onMouseDown={onMouseDown}
      className={cls(css.blocker, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  )
})

export default Blocker
