import LeftPanel from '../LeftPanel/LeftPanel.tsx'
import css from './editor.module.less'
import { useEditorStore } from '@/store/editStore.ts'
import React, { useEffect, useRef, useState } from 'react'
import Blocker from '../Blocker'
import OuterBox from '../OuterBox'
import Scale from '../Scale'
import RightPanel from '../RightPanel'
import { clearSelected, onChangeSelected } from '../../store/actions.ts'
import { getSelectedComponents } from '../../store/helper.ts'
import MarkerLines from '@/core/MarkerLines'
import { Button, Dropdown, MenuProps, Space, Tooltip } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import GuideLine from '@/core/GuideLine'
import { GuideLineProps, XLineProps } from '@/core/GuideLine/types.ts'

// const xs = [
//   {
//     groupUid: 'x',
//     uid: '1',
//   },
//   {
//     groupUid: 'x',
//     uid: '2'
//   },
//   {
//     uid: 'x',
//     childrenUid: ['1', '2']
//   }
// ]

const guideLineType = {
  vertical: 'vertical',
  horizontal: 'horizontal',
  delete: 'delete'
} as const
const Editor = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [guideLinesX, setGuideLinesX] = useState<GuideLineProps['xLines']>([])
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
    onChangeSelected(dragItem.uid)
  }

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === guideLineType.horizontal) {
      setGuideLinesX([...guideLinesX, {}])
    } else if (key === guideLineType.delete) {
      setGuideLinesX([])
    }
  }

  const items = [
    {
      key: 'horizontal',
      // label: '横向',
      label: <Tooltip title={'在画布中间添加横向的绘图辅助线，支持拖动'}>横向</Tooltip>,
    },
    {
      key: 'vertical',
      label: '纵向',
    },
    {
      key: 'delete',
      label: '删除',
    }
  ]

  const onMouseXLine = (line: XLineProps, i: number) => {
    guideLinesX[i] = line
    setGuideLinesX([...guideLinesX])
  }
  return (
    <div className={css.editor}>
      <div className={css.leftPanel}>
        <LeftPanel/>
      </div>
      <div className={css.canvasWrapper}>
        <Space>
          <RightPanel Config={selectedComponents[0]?.ConfigView}/>
          <Button type="primary" size={'small'} icon={<ArrowLeftOutlined/>}>
            后退
          </Button>
          <Button type="primary" size={'small'} icon={<ArrowRightOutlined/>}>
            前进
          </Button>
          <Dropdown.Button
            menu={{
              items,
              onClick: onMenuClick
            }}
          >
            辅助线
          </Dropdown.Button>
          <Button size="small">
            分组
          </Button>
          <Button size="small">
            拆分
          </Button>
        </Space>
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
            <GuideLine onMoveXLine={onMouseXLine} onAddXLine={() => { setGuideLinesX([...guideLinesX, {}]) }}
                       xLines={guideLinesX}/>
            <MarkerLines/>
            {
              components.map((componentSchema) => {
                const Component = componentSchema.type
                if (!Component) return null
                return (
                  <Blocker
                    ref={(ref) => {
                      if (!ref) return
                      blockerRef.current[componentSchema.uid] = ref
                      if (componentSchema.el) {return}
                      const { width, height } = ref.getBoundingClientRect()
                      updateComponent(componentSchema.uid, { el: ref, wrapperStyle: { width, height } })
                    }}
                    uid={componentSchema.uid}
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
