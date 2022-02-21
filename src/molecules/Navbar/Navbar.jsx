import React from 'react';
// import PropTypes from 'prop-types';

import { FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.svg';
import logo_text from './logo_text.svg';
// import { NavLink } from "react-router-dom";
import Navlink from '../../atoms/Navlink/Navlink';
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
					<Navlink to="/">Home</Navlink>
				</li>
				<li className="Navbar-item">
					{/* <a href="#about">About</a> */}
					<Navlink to="/resume">Resume</Navlink>
				</li>
				{/* <li className="Navbar-item">
					<Navlink to="/projects">Projects</Navlink>
				</li>
				<li className="Navbar-item">
					<Navlink to="/tools">Tools</Navlink>
				</li>
				<li className="Navbar-item">
					<Navlink to="/blogs">Blogs</Navlink>
				</li> */}
			</ul>
			<div className="Navbar-brand">
				<img src={logo} alt="Brand Icon" className="Navbar-brand-logo" />
				{/* <span className="Navbar-brand-text">Shivishbrahma</span> */}
				<img src={logo_text} alt="Brand Text" className="Navbar-brand-text" />
			</div>
		</nav>
	);
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
