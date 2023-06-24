import {Layout} from 'antd';
import {Outlet} from 'react-router-dom';
import styles from './index.module.less';

const {Header, Content} = Layout;
const BasicLayout = () => {
	return (
		<Layout className={styles.basicLayout}>
			<Header className={styles.header}>
				Login
			</Header>
			<Content>
				<Outlet/>
			</Content>
		</Layout>
	);
};

export default BasicLayout;
