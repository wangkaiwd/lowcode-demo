import css from './index.module.less';
import cls from 'classnames';
import { updateSelectedComponentsDimensions } from '../../store/editStore.ts';
import { throttle } from 'lodash-es';
import { Direction } from './types.ts';

const StretchControls = () => {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>, direction: Direction) => {
    let { clientX: startX, clientY: startY } = e;
    e.stopPropagation();
    const onMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e;
      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      if (direction === 'right' || direction === 'left') {
        updateSelectedComponentsDimensions(deltaX, 0, direction);
      } else if (direction === 'top' || direction === 'bottom') {
        updateSelectedComponentsDimensions(0, deltaY, direction);
      } else {
        updateSelectedComponentsDimensions(deltaX, deltaY, direction);
      }
      startX = clientX;
      startY = clientY;
    });
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  return (
    <div className={css.stretchDots}>
      <div className={cls(css.circle, css.topLeft)} onMouseDown={(e) => onMouseDown(e, 'topLeft')}></div>
      <div className={cls(css.square, css.top)} onMouseDown={(e) => onMouseDown(e, 'top')}></div>
      <div className={cls(css.circle, css.topRight)} onMouseDown={(e) => onMouseDown(e, 'topRight')}></div>
      <div className={cls(css.square, css.right)} onMouseDown={(e) => onMouseDown(e, 'right')}></div>
      <div className={cls(css.circle, css.bottomRight)} onMouseDown={(e) => onMouseDown(e, 'bottomRight')}></div>
      <div className={cls(css.square, css.bottom)} onMouseDown={(e) => onMouseDown(e, 'bottom')}></div>
      <div className={cls(css.circle, css.bottomLeft)} onMouseDown={(e) => onMouseDown(e, 'bottomLeft')}></div>
      <div className={cls(css.square, css.left)} onMouseDown={(e) => onMouseDown(e, 'left')}></div>
    </div>
  );
};

export default StretchControls;
