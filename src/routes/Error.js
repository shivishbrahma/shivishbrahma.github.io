import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import store from '../redux/store';

function Error({ code, title }) {
	const { app } = store.getState();

	useEffect(() => {
		document.title = `${app.name} | Error`;
	}, [app.name]);

	return (
		<main className={'py-5 ' + (app.dark ? 'dark bg-dark' : '')}>
			<div className="container">
				<div
					className={
						'text-center ' + (app.dark ? 'text-light-red' : 'text-dark-red')
					}
				>
					<h1 className="font-weight-bold my-4">{code}</h1>
					<h3>{title}</h3>
				</div>
			</div>
		</main>
	);
}

Error.propTypes = {
	code: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
};

Error.defaultProps = {
	code: 404,
	title: 'Not Found',
};

export default Error;
