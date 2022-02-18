import React from 'react';
// import PropTypes from 'prop-types';
import './HeroSection.scss';
import Typewriter from '../../atoms/Typewriter/Typewriter';

function HeroSection(props) {
	return (
		<div className="HeroSection">
			<div className="HeroSection__image"></div>
			<div className="HeroSection__content">
				<h1>
					Hi! ✋ <br /> I am Purbayan Chowdhury
				</h1>
				<Typewriter
					text={['A Web Developer', 'A Data Science Enthusiast', 'A Coding Geek', 'A Number Cruncher']}
					displayTextRenderer={(text) => <h4>{text}</h4>}
					cursorRenderer={(cursor) => <h4>|</h4>}
				/>
			</div>
		</div>
	);
}

HeroSection.propTypes = {};

HeroSection.defaultProps = {};

export default HeroSection;
