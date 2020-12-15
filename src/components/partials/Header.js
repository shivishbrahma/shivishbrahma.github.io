import React from 'react';

import Navigator from '../../routes/Navigator';

export default function Header() {
	return (
		<header>
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark main_navbar">
				<a className="navbar-brand" href="/">
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
