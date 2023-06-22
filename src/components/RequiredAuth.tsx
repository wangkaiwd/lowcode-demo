import {Outlet} from 'react-router-dom';

const RequiredAuth = () => {
	return (
		<div>
			Required
			<Outlet/>
		</div>
	);
};

export default RequiredAuth;
