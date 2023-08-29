import { Button, Drawer, Form, Space } from 'antd';
import { FC, forwardRef, useState } from 'react';
import css from './index.module.less';
import CommonConfig from './CommonConfig.tsx';
import { useEditorStore } from '../../store/editStore.ts';
import { onConfigChange, onWrapperStyleChange } from '../../store/actions.ts';
import { getSelectedComponents } from '../../store/helper.ts';

interface RightPanelConfig {
  Config?: FC<any>;
}

const RightPanel = forwardRef<HTMLDivElement, RightPanelConfig>((props, ref) => {
  const { Config } = props;
  const [form] = Form.useForm();
  const getComponent = () => {
    const selectedComponents = getSelectedComponents(useEditorStore.getState());
    return selectedComponents[0] ?? {};
  };
  const component = getComponent();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    form.setFieldsValue({ ...component.props?.config, wrapperStyle: component.wrapperStyle });
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = () => {
    console.log('finish');
    const { wrapperStyle, ...rest } = form.getFieldsValue();
    onConfigChange(rest);
    onWrapperStyleChange(wrapperStyle);
  };

  const onFinishFailed = () => {
    console.log('finish failed');
  };
  return (
    <div className={css.rightPanel} ref={ref}>
      <Button type="primary" onClick={showDrawer}>
        打开属性面板
      </Button>
      <Drawer
        key={component.key}
        title="修改属性"
        placement="right"
        onClose={onClose}
        open={open}
        size={'large'}
        forceRender
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button
              type="primary"
              onClick={() => {
                onClose();
                form.submit();
              }}
            >
              确认
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CommonConfig/>
          {Config && <Config/>}
        </Form>
      </Drawer>
    </div>
  );

});

export default RightPanel;
