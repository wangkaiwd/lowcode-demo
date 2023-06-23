import {Card, List} from 'antd';
import {useEditorStore} from '@/store/editStore.ts';

const LeftPanel = () => {
	const {list, addComponent} = useEditorStore();

	return (
		<List
			grid={{gutter: 16, column: 1}}
			dataSource={list}
			renderItem={(item) => (
				<List.Item>
					<Card size={'small'}>
						<div
							onClick={() => {
								addComponent({name: 'text', styles: {background: 'pink', width: 100, height: 100}});
							}}
						>
							{item.name}
						</div>
					</Card>
				</List.Item>
			)}
		/>
	);
};

export default LeftPanel;
