import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigator() {
	return (
		<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
			<li className="nav-item">
				<NavLink className="nav-link" activeClassName="active" exact to="/">
					Home
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" activeClassName="active" to="/about">
					About
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" activeClassName="active" to="/tools">
					Tools
				</NavLink>
			</li>
			<li className="nav-item">
				<NavLink className="nav-link" activeClassName="active" to="/blog">
					Blog
				</NavLink>
			</li>
		</ul>
	);
}
