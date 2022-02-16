import React from 'react';
import GithubCalendar from '../../atoms/GithubCalendar/GithubCalendar';
import PageSection from '../../atoms/PageSection/PageSection';
// import PropTypes from 'prop-types'
import './GithubSection.scss';

function GithubSection(props) {
	return (
		<PageSection sectionTitle="Github">
			<GithubCalendar username="shivishbrahma" showTooltip />
		</PageSection>
	);
}

GithubSection.propTypes = {};

export default GithubSection;
