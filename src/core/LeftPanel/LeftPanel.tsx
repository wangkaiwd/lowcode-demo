import {Card, Col, List, Row} from 'antd';
import {useEditorStore} from '../../store/editStore.ts';
import css from './leftPanel.module.less';
import {Schema} from '../../types/schema.ts';

const LeftPanel = () => {
	const {list, addComponent, setDragItem} = useEditorStore();
	const onDragStart = (componentSchema: Schema) => {
		setDragItem(componentSchema);
	};
	return (
		<List
			grid={{gutter: 16, column: 1}}
			dataSource={list}
			className={css.leftPanel}
			renderItem={(item) => (
				<List.Item>
					<Card size={'small'} title={item.group}>
						<Row gutter={12}>
							{
								item.elements.map((componentSchema, i) => {
									return (
										<Col key={i} span={8}>
											<div
												onDragStart={() => onDragStart(componentSchema)}
												draggable
												className={css.item}
												onClick={() => {
													addComponent(componentSchema);
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
