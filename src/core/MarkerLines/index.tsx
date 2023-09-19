import css from './index.module.less';
import { useEditorStore } from '@/store/editStore.ts';
import { getSelectedComponent } from '@/store/helper.ts';
import { useMemo } from 'react';

const diff = 4;
const MarkerLines = () => {
  const storeState = useEditorStore();
  const { components } = storeState;
  const selectedComponent = getSelectedComponent(storeState);
  const linesCoordinate = useMemo(() => {
    if (!selectedComponent) {
      return null;
    }
    for (let i = 0; i < components.length; i++) {
      const component = components[i];
      if (component.uid === selectedComponent.uid) {
        continue;
      }
      const { left: cmpLeft }: any = component.wrapperStyle;
      const { left: selectedCmpLeft }: any = selectedComponent.wrapperStyle;
      if (Math.abs(cmpLeft - selectedCmpLeft) <= diff) {
        return {
          left: cmpLeft
        };
      }
    }
  }, [components, selectedComponent]);
  return (
    <div className={css.markerLines}>
      {
        linesCoordinate?.left &&
        <div className={css.lineY} style={{ left: linesCoordinate.left }}></div>
      }
      <div className={css.lineX}></div>
    </div>
  );
};

export default MarkerLines;
