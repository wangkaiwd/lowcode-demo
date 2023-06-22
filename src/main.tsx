import ReactDOM from 'react-dom/client';
import {StyleProvider} from '@ant-design/cssinjs';
import {App as AntdApp} from 'antd';
import './assets/styles/index.css';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/router/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StyleProvider hashPriority={'high'}>
		<AntdApp>
			<RouterProvider router={router}/>
		</AntdApp>
	</StyleProvider>
);
