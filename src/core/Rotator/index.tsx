import { UndoOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { updateSelectedComponents } from '@/store/helper.ts';
import css from './index.module.less';
import { useThrottleFn } from '../../hooks/useThtottleFn.tsx';

const Rotator = () => {
  const cursorRef = useRef<any>(null);
  const onMouseMove = (e: MouseEvent) => {
    const { pageX, pageY } = e;
    const deltaX = pageX - cursorRef.current.startX;
    const deltaY = pageY - cursorRef.current.startY;
    const radians = Math.atan2(deltaX, deltaY);
    const degree = radians * (180 / Math.PI) - 90;
    updateSelectedComponents({
      wrapperStyle: {
        transform: `rotate(-${degree}deg)`
      }
    });
  };
  const throttledOnMouseMove = useThrottleFn(onMouseMove);
  const onMouseDown = (e: React.MouseEvent) => {

    e.stopPropagation();
    const { pageX, pageY } = e;
    cursorRef.current = {
      startX: pageX,
      startY: pageY
    };
    const onUp = () => {
      cursorRef.current = null;
      document.removeEventListener('mousemove', throttledOnMouseMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
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
