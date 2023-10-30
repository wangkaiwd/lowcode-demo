import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import BasicLayout from '@/layout/BasicLayout/BasicLayout.tsx';

const List = lazy(() => import('../pages/List'));
const Edit = lazy(() => import('../pages/Edit'));

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout/>,
    children: [
      {
        index: true,
        element: <Edit/>
      },
      {
        path: 'list',
        element: <List/>
      }
    ]
  }
]);
