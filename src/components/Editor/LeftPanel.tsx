import {Card, Col, List, Row} from 'antd';
import {useEditorStore} from '@/store/editStore.ts';
import css from './leftPanel.module.less';

const LeftPanel = () => {
	const {list, addComponent} = useEditorStore();
	const onDragStart = (e: any) => {
		console.log('e', e);
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
													addComponent({name: 'text', styles: {background: 'pink', width: 100, height: 100}});
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
