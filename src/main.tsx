import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {StyleProvider} from '@ant-design/cssinjs';
import {App as AntdApp} from 'antd';
import './assets/styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StyleProvider hashPriority={'high'}>
		<AntdApp>
			<App/>
		</AntdApp>
	</StyleProvider>
);
