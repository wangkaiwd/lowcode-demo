import { useMemoizedFn } from './useMemoizedFn.ts';
import { throttle } from 'lodash-es';
import { updateComponentByUid, useEditorStore } from '../store/editStore.ts';
import React, { useRef } from 'react';

interface StartCoordinate {
  startX: number;
  startY: number;
}

interface UseMoveOptions {
  onMouseDown?: (e: React.MouseEvent) => void;
}

export const useMove = (options: UseMoveOptions = {}) => {
  const { selectedKeys, computed, zoom } = useEditorStore();
  const { componentsMap } = computed;
  const startCoordinate = useRef<StartCoordinate | null>(null);
  const onMove = useMemoizedFn(throttle((e: MouseEvent) => {
    if (!startCoordinate.current) {
      return;
    }
    const { startX, startY } = startCoordinate.current;
    const { clientX, clientY } = e;
    const distanceX = (clientX - startX) / zoom;
    const distanceY = (clientY - startY) / zoom;
    selectedKeys.forEach(key => {
      const component = componentsMap[key];
      if (component && component.wrapperStyle) {
        const { left, top } = component.wrapperStyle;
        updateComponentByUid(key, {
          wrapperStyle: {
            left: left as number + distanceX,
            top: top as number + distanceY
          }
        });
      }
    });
    startCoordinate.current = {
      startX: clientX,
      startY: clientY
    };
  }, 10));

  const onMouseDown = (e: React.MouseEvent) => {
    const { clientX: startX, clientY: startY } = e;
    startCoordinate.current = {
      startX,
      startY
    };
    options.onMouseDown?.(e);
    // avoid image move affect
    e.preventDefault();
    const onUp = () => {
      startCoordinate.current = null;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onUp);
  };
  return {
    onMouseDown
  };
};
