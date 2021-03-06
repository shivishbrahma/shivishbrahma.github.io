import React from 'react';

import store from '../../redux/store';
import { FaHeart, FaMoon, FaSun } from 'react-icons/fa';

function Footer() {
	const { app } = store.getState();

	return (
		<footer
			className={`${
				app.dark ? 'bg-dark-pink text-light' : 'bg-light-pink text-dark'
			} footer-copyright py-3`}
		>
			<div className="container-fluid">
				<div className="row justify-content-center">
					<div className="col-6 col-md-4">
						<h3>Links</h3>
					</div>
					<div className="col-6 col-md-4">
						<div className="float-right">
							<button
								className={`btn ${app.dark ? 'text-light' : 'text-dark'}`}
								onClick={() => {
									store.dispatch({ type: 'toggleDarkMode' });
								}}
							>
								<span style={{ display: 'inline-block', marginTop: '-0.5rem' }}>
									{app.dark ? <FaSun /> : <FaMoon />}
								</span>
								<span className="pl-2">{app.dark ? 'Light' : 'Dark'}</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="text-center">
				Designed with{' '}
				<span className={app.dark ? 'text-light-red' : 'text-dark-red'}>
					<FaHeart />
				</span>{' '}
				by{' '}
				<a
					className={app.dark ? 'text-light-green' : 'text-dark-green'}
					href="https://github.com/shivishbrahma"
				>
					Purbayan Chowdhury
				</a>
			</div>
		</footer>
	);
}

export default Footer;
