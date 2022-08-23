import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Navbar = () => {

	const { store, actions } = useContext(Context);


	return (
		<nav className='navbar navbar-light bg-light'>
			<div className='container'>
				<Link to='/'>
					<span className='navbar-brand h1'>Home</span>
				</Link>
				<div className='ml-auto'>
					<Link to='/register'>
						<button className='btn btn-info me-3'>Registro</button>
					</Link>
					{
						!store.token ?
							<Link to='/login'>
								<button className='btn btn-info'>Login</button>
							</Link>
							:
							<Link to={'/'} onClick={() => actions.logout()} className='btn btn-info'>Logout</Link>
					}

				</div>
			</div>
		</nav>
	);
};
