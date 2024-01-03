export interface XLineProps {
  top?: number
  key?: 'basicX'
}

// interface YLineProps {
//   top?: number
// }

export interface GuideLineProps {
  xLines: XLineProps[]
  onAddXLine: () => void
  onMoveXLine: (lineStyle: XLineProps, i: number) => void
  // yLines: YLineProps[]
}
