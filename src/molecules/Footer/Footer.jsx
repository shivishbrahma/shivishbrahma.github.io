import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';
import { FaCoffee, FaHeart, FaSun, FaMoon } from 'react-icons/fa';
import Button from '../../atoms/Button/Button';

function Footer({ darkModeToggler, isDark, ...otherProps }) {
	return (
		<section className="Footer">
			<div className="Footer__buttons">
				<Button
					className=""
					onClick={() => {
						darkModeToggler();
					}}
                    title="Dark Mode Toggler"
				>
					{isDark ? <FaMoon /> : <FaSun />}
				</Button>
			</div>
			<div className="Copyright">
				Made with <FaHeart className="red-heart" /> and <FaCoffee className="green-tea" /> by Purbayan Chowdhury
			</div>
		</section>
	);
}

Footer.propTypes = {
	darkModeToggler: PropTypes.func.isRequired,
};

Footer.defaultProps = {
	darkMode: false,
};

export default Footer;
