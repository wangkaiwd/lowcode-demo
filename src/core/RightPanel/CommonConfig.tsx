import { Form, InputNumber } from 'antd';
import { getRotateDeg } from '@/shared/transform.ts';

const RotateField = (props: any) => {
  const { value, onChange } = props;
  const rotate = getRotateDeg(value);
  const onInputNumberChange = (val: number | null) => {
    const newVal = val || 0;
    onChange(`rotate(${newVal}deg)`);
  };
  return <InputNumber value={rotate} onChange={onInputNumberChange}/>;
};

const CommonConfig = () => {
  return (
    <>
      <Form.Item
        label="宽度"
        name={['wrapperStyle', 'width']}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        label="高度"
        name={['wrapperStyle', 'height']}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        label="垂直位置(距离画布左上角)"
        name={['wrapperStyle', 'top']}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        label="水平位置(距离画布左上角)"
        name={['wrapperStyle', 'left']}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        label="宽度"
        name={['wrapperStyle', 'width']}
      >
        <InputNumber/>
      </Form.Item>
      <Form.Item
        label="旋转角度"
        name={['wrapperStyle', 'transform']}
      >
        <RotateField/>
      </Form.Item>
    </>
  );
};

export default CommonConfig;
