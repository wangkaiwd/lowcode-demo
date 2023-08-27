import { Form, Input } from 'antd';

const Config = () => {
  return (
    <div>
      <Form.Item
        name={'url'}
        label={'图片url'}
      >
        <Input/>
      </Form.Item>
    </div>
  );
};

export default Config;
