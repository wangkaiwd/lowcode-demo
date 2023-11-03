import LeftPanel from '../LeftPanel/LeftPanel.tsx'
import css from './editor.module.less'
import { useEditorStore } from '@/store/editStore.ts'
import React, { useEffect, useRef } from 'react'
import Blocker from '../Blocker'
import OuterBox from '../OuterBox'
import Scale from '../Scale'
import RightPanel from '../RightPanel'
import { clearSelected } from '../../store/actions.ts'
import { getSelectedComponents } from '../../store/helper.ts'
import MarkerLines from '@/core/MarkerLines'

const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const {
    components,
    addComponent,
    updateComponent,
    dragItem,
    setDragItem,
    zoom,
    canvasConfig,
  } = useEditorStore()
  const selectedComponents = getSelectedComponents(useEditorStore.getState())

  const blockerRef = useRef<any>({})
  const outerBoxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const listenDocument = (e: Event) => {
      if (!canvasRef.current?.contains(e.target as HTMLDivElement)) return
      const notContains = Object.entries(blockerRef.current).every(([, v]: any) => {
        return !v.contains(e.target)
      })
      if (notContains && !outerBoxRef.current?.contains(e.target as HTMLDivElement)) {
        clearSelected()
      }
    }
    document.addEventListener('click', listenDocument)
    return () => {
      document.removeEventListener('click', listenDocument)
    }
  }, [])

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (!dragItem || !canvasRef.current) return
    const { left, top } = canvasRef.current.getBoundingClientRect()
    const { clientX, clientY } = e
    const componentLeft = clientX - left
    const componentTop = clientY - top
    addComponent({
      ...dragItem,
      wrapperStyle: {
        left: componentLeft,
        top: componentTop,
      }
    })
    setDragItem()
  }
  return (
    <div className={css.editor}>
      <div className={css.leftPanel}>
        <LeftPanel/>
      </div>
      <div className={css.canvasWrapper}>
        <RightPanel Config={selectedComponents[0]?.ConfigView}/>
        <Scale/>
        <div className={css.canvasScrollView}>
          <div
            ref={canvasRef}
            className={css.canvas}
            onDrop={onDrop}
            style={{ ...canvasConfig, transform: `scale(${zoom})` }}
            onDragOver={(e) => {
              // todo: must prevent browser, otherwise drop event can't execute
              e.preventDefault()
            }}
          >
            <OuterBox ref={outerBoxRef}/>
            <MarkerLines/>
            {
              components.map((componentSchema) => {
                const Component = componentSchema.type
                return (
                  <Blocker
                    ref={(ref) => {
                      if (!ref) return
                      blockerRef.current[componentSchema.uid] = ref
                      if (componentSchema.el) {return}
                      const { width, height } = ref.getBoundingClientRect()
                      updateComponent(componentSchema.uid, { el: ref, wrapperStyle: { width, height } })
                    }}
                    id={componentSchema.uid}
                    key={componentSchema.uid}
                    style={componentSchema.wrapperStyle}
                  >
                    <Component {...componentSchema.props} className={css.component}/>
                  </Blocker>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editor
