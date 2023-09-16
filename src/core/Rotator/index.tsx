import { UndoOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { getSelectedComponent, updateSelectedComponents } from '@/store/helper.ts';
import css from './index.module.less';
import { useThrottleFn } from '../../hooks/useThtottleFn.tsx';
import { useEditorStore } from '@/store/editStore.ts';

const getRotateDeg = (transform: string) => {
  const reg = /rotate\((d)+deg\)/;
  const matched = reg.exec(transform);
  if (matched) {
    return Number(matched[1]);
  }
  return 0;
};

const Rotator = () => {
  const store = useEditorStore();
  const cursorRef = useRef<any>(null);
  const selectedComponent = getSelectedComponent(store);
  const onMouseMove = (e: MouseEvent) => {
    const { startX, startY } = cursorRef.current;
    if (selectedComponent.wrapperStyle) {
      const x = e.pageX;
      const y = e.pageY;

      const disX = x - startX;
      const disY = y - startY;

      // Math.atan() 函数返回一个数值的反正切（以弧度为单位），一个-π/2到π/2弧度之间的数值。
      // 弧度变角度 180/ π*弧度
      let deg = Math.atan2(disY, disX) * 180 / Math.PI - 90;
      deg = Math.ceil(deg);
      updateSelectedComponents({
        wrapperStyle: {
          transform: `rotate(${deg}deg)`
        }
      });
    }
  };
  const throttledOnMouseMove = useThrottleFn(onMouseMove, { wait: 0 });
  const onMouseDown = (e: React.MouseEvent) => {
    document.documentElement.style.pointerEvents = 'none';
    e.stopPropagation();
    const { pageX, pageY } = e;
    const { height, transform }: any = selectedComponent.wrapperStyle;
    const rotate = getRotateDeg(transform);
    const angle = ((rotate + 90) * Math.PI) / 180;

    const radius = height / 2;
    const [offsetX, offsetY] = [
      -Math.cos(angle) * radius,
      -Math.sin(angle) * radius,
    ];
    cursorRef.current = {
      startX: pageX + offsetX,
      startY: pageY + offsetY
    };
    const onUp = () => {
      document.documentElement.style.pointerEvents = 'auto';
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
