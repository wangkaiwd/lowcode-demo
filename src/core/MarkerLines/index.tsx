import css from './index.module.less'
import { useEditorStore } from '@/store/editStore.ts'

const MarkerLines = () => {
  const storeState = useEditorStore()
  const { linesCoordinate } = storeState
  return (
    <div className={css.markerLines}>
      {
        linesCoordinate?.left &&
        <div className={css.lineY} style={{ left: linesCoordinate.left }}></div>
      }
      {/*<div className={css.lineX}></div>*/}
    </div>
  )
}

export default MarkerLines
