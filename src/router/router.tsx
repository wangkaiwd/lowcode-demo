import {createBrowserRouter} from 'react-router-dom';
import RequiredAuth from '@/components/RequiredAuth.tsx';
import {lazy} from 'react';

const List = lazy(() => import('../pages/List'));
const Edit = lazy(() => import('../pages/Edit'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RequiredAuth/>,
		children: [
			{
				index: true,
				path: 'list',
				element: <List/>
			},
			{
				path: 'edit',
				element: <Edit/>
			}
		]
	}
]);
