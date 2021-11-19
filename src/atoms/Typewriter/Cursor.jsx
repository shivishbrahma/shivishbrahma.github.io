import React from 'react';
import PropTypes from 'prop-types';

function Cursor(props) {
	const { cursor, cursorRenderer, className } = props;

	return (
		<React.Fragment>
			<span className={className + ' Typewriter__cursor'}>
				{cursorRenderer ? cursorRenderer(cursor) : cursor}
			</span>
		</React.Fragment>
	);
}

Cursor.propTypes = {
	cursor: PropTypes.string,
	className: PropTypes.string,
	cursorRenderer: PropTypes.func,
};

Cursor.defaultProps = {
	cursor: '|',
	className: '',
	cursorRenderer: null,
};

export default Cursor;