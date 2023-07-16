import css from './index.module.less';
import { useEditorStore } from '../../store/editStore.ts';
import { forwardRef, useMemo } from 'react';
import { useMove } from '../../hooks/useMove.tsx';
import StretchControls from '../StretchControls';

const OuterBox = forwardRef<HTMLDivElement>((_props, ref) => {
  const { selectedKeys, computed } = useEditorStore();
  const { componentsMap } = computed;
  const selectedKeysArray = [...selectedKeys];
  const selectedComponents = selectedKeysArray.map((uid) => componentsMap[uid]);
  const { onMouseDown } = useMove();
  const outerStyle = useMemo(() => {
    if (!selectedComponents.length) {return { display: 'none' };}
    let minLeft = 99999, minTop = 99999, maxLeftWithWidth = 0, maxTopWithHeight = 0;
    for (let i = 0; i < selectedComponents.length; i++) {
      const current = selectedComponents[i];
      if (current.style) {
        const {
          left,
          top,
          width,
          height
        } = current.style;
        minLeft = Math.min(minLeft, left as number || 0);
        minTop = Math.min(minTop, top as number || 0);
        maxLeftWithWidth = Math.max(maxLeftWithWidth, (left as number) + (width as number));
        maxTopWithHeight = Math.max(maxTopWithHeight, (top as number) + (height as number));
      }
    }
    return {
      left: minLeft,
      top: minTop,
      width: maxLeftWithWidth - minLeft,
      height: maxTopWithHeight - minTop
    };
  }, [selectedComponents]);

  return (
    <div ref={ref} className={css.outerBox} style={outerStyle} onMouseDown={onMouseDown}>
      <StretchControls/>
    </div>
  );
});

export default OuterBox;
