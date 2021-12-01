import React from 'react';
// import PropTypes from 'prop-types';
import './Home.scss';
import HeroSection from '../../molecules/HeroSection/HeroSection';
import ProjectSection from '../../molecules/ProjectSection/ProjectSection';

function Home(props) {
	return (
		<section className="Home">
			<HeroSection />
            <ProjectSection />
		</section>
	);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
