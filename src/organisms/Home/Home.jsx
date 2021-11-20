import React from 'react';
// import PropTypes from 'prop-types';
import './Home.scss';
import HeroSection from '../../molecules/HeroSection/HeroSection';

function Home(props) {
	return (
		<section className="Home">
			<HeroSection />
		</section>
	);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
