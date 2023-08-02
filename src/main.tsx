import ReactDOM from 'react-dom/client';
import { App as AntdApp } from 'antd';
import './assets/styles/index.css';
import { RouterProvider } from 'react-router-dom';
import { routes } from './router/routes.tsx';
import { enableMapSet } from 'immer';

enableMapSet();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AntdApp>
    <RouterProvider router={routes}/>
  </AntdApp>
);
