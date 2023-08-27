import { Form, InputNumber } from 'antd';

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
    </>
  );
};

export default CommonConfig;
