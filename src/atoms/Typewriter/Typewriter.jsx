import React from 'react';
import PropTypes from 'prop-types';
import './Typewriter.scss';
import Cursor from './Cursor';

function Typewriter({
	text,
	cursor,
	cursorClassName,
	cursorRenderer,
	displayTextRenderer,
	speed,
	eraseSpeed,
	typingDelay,
	eraseDelay,
	...otherProps
}) {
	const [currentText, setCurrentText] = React.useState('');
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const [isTyping, setIsTyping] = React.useState(true);
	const [__timeout, set__Timeout] = React.useState(null);

	React.useEffect(() => {
		startTyping();

		return () => {
			__timeout && clearTimeout(__timeout);
		};
	}, []);

	React.useEffect(() => {
		let rawText = getRawText()[currentIndex];
		if (isTyping) {
			if (currentText.length < rawText.length) {
				set__Timeout(setTimeout(type, speed));
			} else {
				setIsTyping(false);
				set__Timeout(setTimeout(erase, eraseDelay));
			}
		} else {
			if (currentText.length === 0) {
				const textArray = getRawText();
				let index = currentIndex + 1 === textArray.length ? 0 : currentIndex + 1;
				if (index === currentIndex) {
					setIsTyping(true);
					setTimeout(startTyping, typingDelay);
				} else {
					setTimeout(() => setCurrentIndex(index), typingDelay);
				}
			} else {
				set__Timeout(setTimeout(erase, eraseSpeed));
			}
		}
	}, [currentText]);

	React.useEffect(() => {
		if (!isTyping) {
			setIsTyping(true);
			startTyping();
		}
	}, [currentIndex]);

	function getRawText() {
		return typeof text === 'string' ? [text] : [...text];
	}

	function startTyping() {
		set__Timeout(
			setTimeout(() => {
				type();
			}, speed)
		);
	}

	function type() {
		let rawText = getRawText()[currentIndex];

		if (currentText.length < rawText.length) {
			let displayText = rawText.substr(0, currentText.length + 1);
			setCurrentText(displayText);
		}
	}

	function erase() {
		let index = currentIndex;
		if (currentText.length === 0) {
			console.log('Start Typing');
			const textArray = getRawText();
			index = index + 1 === textArray.length ? 0 : index + 1;
			setCurrentIndex(index);
		} else {
			let displayText = currentText.substr(-currentText.length, currentText.length - 1);
			setCurrentText(displayText);
		}
	}

	return (
		<div className="Typewriter" {...otherProps}>
			<span className="Typewriter__text">
				{displayTextRenderer ? displayTextRenderer(currentText, currentIndex) : currentText}
			</span>
			<Cursor cursor={cursor} cursorRenderer={cursorRenderer} cursorClassName={cursorClassName} />
		</div>
	);
}

Typewriter.propTypes = {
	speed: PropTypes.number.isRequired,
	eraseSpeed: PropTypes.number.isRequired,
	typingDelay: PropTypes.number.isRequired,
	eraseDelay: PropTypes.number.isRequired,
	cursorClassName: PropTypes.string,
	cursor: PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
	cursorRenderer: PropTypes.func,
	displayTextRenderer: PropTypes.func,
};

Typewriter.defaultProps = {
	speed: 200,
	eraseSpeed: 200,
	typingDelay: 2500,
	eraseDelay: 5000,
};

export default Typewriter;
