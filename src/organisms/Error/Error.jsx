import React from 'react';
import PropTypes from 'prop-types';
import './Error.scss';

function Error({ type, message, ...otherProps }) {
	return (
		<section className="Error">
			<h1>{type}</h1>
            <h5>
                {message || 'Something went wrong'}
            </h5>
		</section>
	);
}

Error.propTypes = {
	type: PropTypes.string,
    message: PropTypes.string,
};

Error.defaultProps = {
    type: '404',
    message: 'Page not found',
};

export default Error;
