import React from 'react';
import PropTypes from 'prop-types';
import './PageSection.scss';

function PageSection({ sectionTitle, sectionTheme, sectionFooter, children, ...otherProps }) {
	return (
		<section className={'PageSection PageSection__' + sectionTheme} {...otherProps}>
			<h2 className="PageSection__heading">{sectionTitle}</h2>
			<div className="PageSection__container">{children}</div>
			{sectionFooter}
		</section>
	);
}

PageSection.propTypes = {
	sectionTitle: PropTypes.string,
	sectionTheme: PropTypes.string,
};

PageSection.defaultProps = {
	sectionTitle: 'Section Header',
	sectionTheme: 'primary',
};

export default PageSection;
