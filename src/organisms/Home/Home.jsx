import React from 'react';
// import PropTypes from 'prop-types';
import './Home.scss';
import HeroSection from '../../molecules/HeroSection/HeroSection';
import ProjectSection from '../../molecules/ProjectSection/ProjectSection';
// import LanguageSection from '../../molecules/LanguageSection/LanguageSection';
import GithubSection from '../../molecules/GithubSection/GithubSection';

function Home(props) {
	return (
		<section className="Home">
			<HeroSection />
			<ProjectSection />
			{/* <LanguageSection /> */}
			<GithubSection/>
		</section>
	);
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
