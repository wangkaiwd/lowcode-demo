import css from './index.module.less';
import { useEditorStore } from '../../store/editStore.ts';
import { forwardRef, useMemo } from 'react';
import { useMove } from '../../hooks/useMove.tsx';
import StretchControls from '../StretchControls';
import { getSelectedComponents } from '../../store/helper.ts';
import Rotator from '@/core/Rotator';

const OuterBox = forwardRef<HTMLDivElement>((_props, ref) => {
  const selectedComponents = getSelectedComponents(useEditorStore.getState());
  const { zoom } = useEditorStore();
  const { onMouseDown } = useMove({ zoom });
  const outerStyle = useMemo(() => {
    if (!selectedComponents.length) {return { display: 'none' };}
    let minLeft = 99999, minTop = 99999, maxLeftWithWidth = 0, maxTopWithHeight = 0;
    const selectedComponent = selectedComponents[0];
    for (let i = 0; i < selectedComponents.length; i++) {
      const current = selectedComponents[i];
      if (current.wrapperStyle) {
        const {
          left,
          top,
          width,
          height,
        } = current.wrapperStyle;
        minLeft = Math.min(minLeft, left as number || 0);
        minTop = Math.min(minTop, top as number || 0);
        maxLeftWithWidth = Math.max(maxLeftWithWidth, (left as number) + (width as number));
        maxTopWithHeight = Math.max(maxTopWithHeight, (top as number) + (height as number));
      }
    }
    return {
      left: minLeft,
      top: minTop,
      transform: selectedComponent.wrapperStyle?.transform,
      width: maxLeftWithWidth - minLeft,
      height: maxTopWithHeight - minTop
    };
  }, [selectedComponents]);

  return (
    <div ref={ref} className={css.outerBox} style={outerStyle} onMouseDown={onMouseDown}>
      <StretchControls/>
      <Rotator/>
    </div>
  );
});

export default OuterBox;
