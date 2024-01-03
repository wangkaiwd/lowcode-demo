import css from './index.module.less'
import { useEditorStore } from '../../store/editStore.ts'
import { forwardRef } from 'react'
import { useMove } from '../../hooks/useMove.tsx'
import StretchControls from '../StretchControls'
import Rotator from '@/core/Rotator'
import { useGetOuterStyle } from '@/core/Blocker/hooks.ts'

const OuterBox = forwardRef<HTMLDivElement>((_props, ref) => {
  const { zoom } = useEditorStore()
  const { onMouseDown } = useMove({ zoom, autoAlign: true })
  const outerStyle = useGetOuterStyle()

  return (
    <div ref={ref} className={css.outerBox} style={outerStyle} onMouseDown={onMouseDown}>
      <StretchControls/>
      <Rotator/>
    </div>
  )
})

export default OuterBox
