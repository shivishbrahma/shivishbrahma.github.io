import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ShLove from './icons/ShLove';

class SvgIcon extends Component {
	render() {
		return (
			<>
				{(() => {
					switch (this.props.type) {
						case 'love':
							return <ShLove />;

						default:
							return 'Invalid Logo';
					}
				})()}
			</>
		);
	}
}

SvgIcon.propTypes = {
	type: PropTypes.string.isRequired,
	size: PropTypes.number,
};

SvgIcon.defaultProps = {
	type: 'test',
	size: 16,
};

export default SvgIcon;
