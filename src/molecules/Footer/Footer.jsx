import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { FaCoffee, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import Button from '../../atoms/Button/Button';

function Footer({ darkModeToggler, isDark, ...otherProps }) {
	return (
		<div className="Footer">
			<section>
				<Button
					className=""
					onClick={() => {
						darkModeToggler();
					}}
				>
					{isDark ? <FaMoon /> : <FaSun />}
				</Button>
			</section>
			<section className="Copyright">
				Made with <FaHeart className="red-heart" /> and <FaCoffee className="green-tea" /> by Purbayan Chowdhury
			</section>
		</div>
	);
}

Footer.propTypes = {
	darkModeToggler: PropTypes.func.isRequired,
};

Footer.defaultProps = {
	darkMode: false,
};

export default Footer;
