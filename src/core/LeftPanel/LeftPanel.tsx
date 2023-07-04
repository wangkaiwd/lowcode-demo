import { Card, Col, List, Row } from 'antd';
import { useEditorStore } from '../../store/editStore.ts';
import css from './leftPanel.module.less';
import { uid } from '../../shared/utils.ts';
import { InternalComponent } from '../../store/editStoreTypes.ts';

const LeftPanel = () => {
  const { list, addComponent, setDragItem } = useEditorStore();
  const onDragStart = (internalComponent: InternalComponent) => {
    setDragItem(internalComponent);
  };
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={list}
      className={css.leftPanel}
      renderItem={(item) => (
        <List.Item>
          <Card size={'small'} title={item.group}>
            <Row gutter={12}>
              {
                item.elements.map((componentSchema, i) => {
                  const internalComponent = {
                    ...componentSchema,
                    uid: uid()
                  };
                  return (
                    <Col key={i} span={8}>
                      <div
                        onDragStart={() => onDragStart(internalComponent)}
                        draggable
                        className={css.item}
                        onClick={() => {
                          addComponent(internalComponent);
                        }}
                      >
                        {componentSchema.name}
                      </div>
                    </Col>
                  );
                })
              }
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default LeftPanel;
