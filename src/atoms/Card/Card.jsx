import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

function Card({ cardImg, cardFooter, children, cardHoverContent, ...otherProps }) {
	const [isFlip, setIsFlip] = React.useState(false);
	return (
		<div
			className="Card"
			onClick={(e) => {
				e.stopPropagation();
				setIsFlip(!isFlip);
			}}
			{...otherProps}
		>
			<div className={'Card_content' + (isFlip ? ' hovering' : '')}>
				<div className="Card__header">{cardImg && <div className="Card__img">{cardImg}</div>}</div>
				<div className="Card__container">{children}</div>
				<div className="Card__footer">{cardFooter}</div>
			</div>
			<div className={'Card__hover' + (isFlip ? ' hovering' : '')}>
				<div className="Card__hover__content">{cardHoverContent}</div>
			</div>
		</div>
	);
}

Card.propTypes = {
	cardImg: PropTypes.node,
};

Card.defaultProps = {};

export default Card;
