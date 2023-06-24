import {Card, Col, List, Row} from 'antd';
import {useEditorStore} from '@/store/editStore.ts';
import css from './leftPanel.module.less';
import {DragEvent} from 'react';

const LeftPanel = () => {
	const {list, addComponent} = useEditorStore();
	const onDragStart = (e: DragEvent<HTMLDivElement>) => {
		const stringifyComponent = JSON.stringify({name: 'text', style: {background: 'pink', width: 100, height: 100}});
		e.dataTransfer.setData('drag-item', stringifyComponent);
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
								item.elements.map((el, i) => {
									return (
										<Col key={i} span={8}>
											<div
												onDragStart={onDragStart}
												draggable
												className={css.item}
												onClick={() => {
													addComponent({name: 'text', style: {background: 'pink', width: 100, height: 100}});
												}}
											>
												{el.name}
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
