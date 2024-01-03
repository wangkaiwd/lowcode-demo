import css from './index.module.less'
import { GuideLineProps } from '@/core/GuideLine/types.ts'
import { useRef } from 'react'
import editorCss from '../Editor/editor.module.less'
import { useThrottleFn } from '@/hooks/useThtottleFn.ts'

const GuideLine = (props: GuideLineProps) => {
  const { xLines, onMoveXLine } = props
  const isMoving = useRef(false)
  const _onInternalMoveXLine = (i: number, e: MouseEvent) => {
    if (!isMoving.current) {return}
    const canvasEl = document.querySelector(`.${editorCss.canvas}`)!
    const { top } = canvasEl.getBoundingClientRect()
    const { clientY } = e
    const lineTop = clientY - top
    onMoveXLine({ top: lineTop }, i)
  }
  const onInternalMoveXLine = useThrottleFn(_onInternalMoveXLine, { wait: 40 })

  const onMouseDown = (i: number) => {
    isMoving.current = true
    const onMove = (e: MouseEvent) => {
      onInternalMoveXLine(i, e)
    }
    const onMouseUp = () => {
      isMoving.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onMouseUp)
  }
  const renderXLines = () => xLines.map((line, i) => {
    return (
      <div className={css.x} key={i} style={line} onMouseDown={() => onMouseDown(i)}>
        <div className={css.xInner}></div>
      </div>
    )
  })

  return (
    <div className={css.guideLine}>
      {renderXLines()}
    </div>
  )
}

export default GuideLine
