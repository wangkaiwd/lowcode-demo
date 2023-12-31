import { Col, InputNumber, Row, Slider } from 'antd';
import { useEditorStore } from '../../store/editStore.ts';
import { forwardRef } from 'react';
import { onZoomChange } from '../../store/actions.ts';

const Scale = forwardRef<HTMLDivElement>((_props, ref) => {
  const { zoom } = useEditorStore();
  const onChange = (newValue: number | null) => {
    if (newValue != null) {
      onZoomChange(newValue);
    }
  };

  return (
    <Row ref={ref}>
      <Col span={12}>
        <Slider
          min={0}
          max={2}
          onChange={onChange}
          step={0.1}
          value={zoom || 1}
        />
      </Col>
      <Col span={4}>
        <InputNumber
          min={0}
          max={2}
          step={0.1}
          precision={1}
          style={{ margin: '0 16px' }}
          value={zoom}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
});

export default Scale;
