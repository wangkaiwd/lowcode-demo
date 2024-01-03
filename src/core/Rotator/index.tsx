import { UndoOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { getSelectedComponent, updateSelectedComponents } from '@/store/helper.ts';
import css from './index.module.less';
import { useThrottleFn } from '../../hooks/useThtottleFn.ts';
import { useEditorStore } from '@/store/editStore.ts';
import { getRotateDeg } from '@/shared/transform.ts';

// thinking: 跨象限的时候，刚好 负旋转角度和正旋转角度视觉效果相同
// https://excalidraw.com/#json=j7oC2h-V1UaaUZB5qOZec,jSjBjs5nElI1dlvGCxiYzw
// Math.atan2
const Rotator = () => {
  const store = useEditorStore();
  const cursorRef = useRef<any>(null);
  const selectedComponent = getSelectedComponent(store);
  const onMouseMove = (e: MouseEvent) => {
    const curX = e.clientX;
    const curY = e.clientY;
    const { oX, oY, startDeg, beforeDeg } = cursorRef.current;
    const afterDeg = getAtan2Degree(curY - oY, curX - oX);
    const deg = startDeg + afterDeg - beforeDeg;
    updateSelectedComponents({
      wrapperStyle: {
        transform: `rotate(${deg}deg)`
      }
    });
  };
  const getAtan2Degree = (y: number, x: number) => {
    return Math.atan2(y, x) * 180 / Math.PI;
  };
  const throttledOnMouseMove = useThrottleFn(onMouseMove, { wait: 50 });
  const onMouseDown = (e: React.MouseEvent) => {
    document.documentElement.style.pointerEvents = 'none';
    e.stopPropagation();
    const { clientX, clientY } = e;
    const { el, wrapperStyle }: any = selectedComponent;
    // noted: wrapperStyle top,left relative to canvas
    // here we need coordinate relative to viewport (because mouse event clientX,clientY)
    if (el && wrapperStyle) {
      const { transform } = wrapperStyle;
      const { left, top, width, height } = el.getBoundingClientRect();
      const oX = left + width / 2;
      const oY = top + height / 2;
      // calculate offset position
      // ensure start point is y axis
      cursorRef.current = {
        startX: clientX,
        startY: clientY,
        oX,
        oY,
        startDeg: getRotateDeg(transform),
        beforeDeg: getAtan2Degree(clientY - oY, clientX - oX)
      };
    }

    const onUp = () => {
      document.removeEventListener('mousemove', throttledOnMouseMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
      document.documentElement.style.pointerEvents = 'auto';
      cursorRef.current = null;
    };
    document.addEventListener('mousemove', throttledOnMouseMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  };
  return (
    <div className={css.rotator} onMouseDown={onMouseDown}>
      <UndoOutlined/>
    </div>
  );
};

export default Rotator;
