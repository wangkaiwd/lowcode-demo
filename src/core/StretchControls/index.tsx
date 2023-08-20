import css from './index.module.less';
import cls from 'classnames';
import { updateSelectedComponentsDimensions, useEditorStore } from '../../store/editStore.ts';
import { throttle } from 'lodash-es';
import { Direction } from './types.ts';
import React from 'react';

const StretchControls = () => {
  const { zoom } = useEditorStore();
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: Direction) => {
    let { clientX: startX, clientY: startY } = e;
    e.stopPropagation();
    // update resize position and size
    const onMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rawDeltaX = (clientX - startX) / zoom;
      const rawDeltaY = (clientY - startY) / zoom;
      const directionsMap = {
        topLeft: { deltaX: -rawDeltaX, deltaY: -rawDeltaY, deltaLeft: rawDeltaX, deltaTop: rawDeltaY },
        top: { deltaX: 0, deltaY: -rawDeltaY, deltaLeft: 0, deltaTop: rawDeltaY },
        topRight: { deltaX: rawDeltaX, deltaY: -rawDeltaY, deltaLeft: 0, deltaTop: rawDeltaY },
        right: { deltaX: rawDeltaX, deltaY: 0, deltaLeft: 0, deltaTop: 0 },
        bottomRight: { deltaX: rawDeltaX, deltaY: rawDeltaY, deltaLeft: 0, deltaTop: 0 },
        bottom: { deltaX: 0, deltaY: rawDeltaY, deltaLeft: 0, deltaTop: 0 },
        bottomLeft: { deltaX: -rawDeltaX, deltaY: rawDeltaY, deltaLeft: rawDeltaX, deltaTop: 0 },
        left: { deltaX: -rawDeltaX, deltaY: 0, deltaLeft: rawDeltaX, deltaTop: 0 },
      };
      const { deltaX, deltaY, deltaTop, deltaLeft } = directionsMap[direction];
      updateSelectedComponentsDimensions(deltaX, deltaY, deltaLeft, deltaTop);

      startX = clientX;
      startY = clientY;
    }, 10);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  return (
    <div className={css.stretchDots}>
      <div
        className={cls(css.circle, css.topLeft)}
        onMouseDown={(e) => onMouseDown(e, 'topLeft')}
      >
      </div>
      <div
        className={cls(css.square, css.top)}
        onMouseDown={(e) => onMouseDown(e, 'top')}
      >
      </div>
      <div
        className={cls(css.circle, css.topRight)}
        onMouseDown={(e) => onMouseDown(e, 'topRight')}
      >
      </div>
      <div
        className={cls(css.square, css.right)}
        onMouseDown={(e) => onMouseDown(e, 'right')}
      >
      </div>
      <div
        className={cls(css.circle, css.bottomRight)}
        onMouseDown={(e) => onMouseDown(e, 'bottomRight')}
      >
      </div>
      <div
        className={cls(css.square, css.bottom)}
        onMouseDown={(e) => onMouseDown(e, 'bottom')}
      >
      </div>
      <div
        className={cls(css.circle, css.bottomLeft)}
        onMouseDown={(e) => onMouseDown(e, 'bottomLeft')}
      >
      </div>
      <div
        className={cls(css.square, css.left)}
        onMouseDown={(e) => onMouseDown(e, 'left')}
      >
      </div>
    </div>
  );
};

export default StretchControls;
