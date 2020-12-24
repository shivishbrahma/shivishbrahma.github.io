import React from 'react';
import PropTypes from 'prop-types';

import store from '../../redux/store';
import logo from '../../images/logo.png';
import Navigator from '../../routes/Navigator';

function Header() {
	const { app } = store.getState();
	return (
		<header>
			<nav
				className={
					'navbar navbar-expand-sm navbar-dark ' +
					(app.dark ? 'bg-dark-blue' : 'bg-light-blue') +
					' main_navbar'
				}
			>
				<a className="navbar-brand" href="/">
					<img
						className="d-inline-block mr-2"
						src={logo}
						style={{ width: '32px' }}
						alt="logo"
					/>
					Shivishbrahma
				</a>
				<button
					className="navbar-toggler btn d-lg-none"
					type="button"
					data-toggle="collapse"
					data-target="#collapsibleNavId"
					aria-controls="collapsibleNavId"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<i className="fa fa-bars" aria-hidden="true"></i>
				</button>
				<div className="collapse navbar-collapse" id="collapsibleNavId">
					<Navigator />
				</div>
			</nav>
		</header>
	);
}

Header.propTypes = {
	darkMode: PropTypes.bool,
};

Header.defaultProps = {
	darkMode: false,
};

export default Header;
