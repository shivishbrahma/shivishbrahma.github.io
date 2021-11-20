import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

function Footer({ darkModeToggler, ...otherProps }) {
	return (
		<React.Fragment>
			<section></section>
			<section className="Copyright">Hello, Footer</section>
		</React.Fragment>
	);
}

Footer.propTypes = {
	darkModeToggler: PropTypes.func.isRequired,
};

Footer.defaultProps = {};

export default Footer;
