import React from 'react';
// import PropTypes from 'prop-types';

import { FaBars, FaTimes } from 'react-icons/fa';
import { GiWorld } from 'react-icons/gi';
import { NavLink } from "react-router-dom";
import './Navbar.scss';

function Navbar(props) {
	const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);

	return (
		<nav className={'Navbar ' + (isNavbarOpen ? 'active' : '')}>
			<div
				className="Navbar-toggler"
				onClick={() => {
					setIsNavbarOpen(!isNavbarOpen);
				}}
			>
				{isNavbarOpen ? <FaTimes /> : <FaBars />}
			</div>
			<ul
				className="Navbar-list"
				onClick={() => {
					setIsNavbarOpen(false);
				}}
			>
				<li className="Navbar-item">
					{/* <a href="#home">Home</a> */}
                    <NavLink to="/">Home</NavLink>
				</li>
				<li className="Navbar-item">
					{/* <a href="#about">About</a> */}
                    <NavLink to="/resume">Resume</NavLink>
				</li>
				<li className="Navbar-item">
					<a href="#projects">Projects</a>
				</li>
				<li className="Navbar-item">
					<a href="#tools">Tools</a>
				</li>
				<li className="Navbar-item">
					<a href="#blogs">Blogs</a>
				</li>
			</ul>
			<div className="Navbar-brand">
				<GiWorld alt="Shivishbrahma Icon" className="Navbar-brand-logo" />
				<span className="Navbar-brand-text">Shivishbrahma</span>
			</div>
		</nav>
	);
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
