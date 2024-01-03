import { ComponentProps, forwardRef } from 'react'
import css from './index.module.less'
import cls from 'classnames'
import { useEditorStore } from '@/store/editStore.ts'
import { onChangeSelected } from '@/store/actions.ts'

interface ComponentContainerProps extends ComponentProps<'div'> {
  uid: string;
}

const Blocker = forwardRef<HTMLDivElement, ComponentContainerProps>(({
  style,
  className,
  children,
  uid
}, ref) => {
  const { selectedKeys } = useEditorStore()
  const selected = selectedKeys.has(uid)
  // const { onMouseDown } = useMove({ onMouseDown: () => onChangeSelected(uid), zoom, autoAlign: true })
  const onClick = () => {
    onChangeSelected(uid)
  }
  return (
    <div
      ref={ref}
      // onMouseDown={onMouseDown}
      className={cls(css.blocker, className, { [css.selected]: selected })}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  )
})

export default Blocker
