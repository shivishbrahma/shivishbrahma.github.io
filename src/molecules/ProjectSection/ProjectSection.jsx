import React from 'react';
import PageSection from '../../atoms/PageSection/PageSection';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
// import PropTypes from 'prop-types';
import './ProjectSection.scss';
import { loadMockup } from '../../services/fetchService';

function ProjectSection({ ...otherProps }) {
	const [projects, setProjects] = React.useState([]);
	React.useEffect(() => {
		loadMockup('projects').then(function (data) {
			setProjects(data.projects);
		});
	}, []);

	return (
		<PageSection sectionTitle="Featured Projects" {...otherProps}>
			<div className="Card-list">
				{projects
					? projects.map((project, index) => {
							return (
								<Card
									key={index}
									cardImg={<img src={project.cover} alt={project.name + ' Cover'} />}
									cardHoverContent={
										<>
											<div className="Project__hover__header">
												<h3 className="Project__title">{project.displayName}</h3>
												{project.languages && project.languages.length > 0 && (
													<div className="Project__languages">
														{project.languages.map((language, index) => {
															return (
																<span
																	className={
																		'Project__languages__tag ' +
																		(language === project.primaryLanguage
																			? 'Project__languages__tag__primary'
																			: '')
																	}
																	key={index}
																>
																	{language}
																</span>
															);
														})}
													</div>
												)}
											</div>
											<div className="Project_hover__content">
												&nbsp;
												<p className="Project__description">{project.description}</p>
											</div>
											<div className="Project__hover__footer">
												<div className="Project__buttons">
													{project.githubUrl && (
														<Button type="link" href={project.githubUrl} target="_blank">
															View Code
														</Button>
													)}
													{project.website && (
														<Button type="link" href={project.githubUrl} target="_blank">
															View Website
														</Button>
													)}
												</div>
											</div>
										</>
									}
								>
									<h3 className="Project__display_name">{project.name}</h3>
									<p className="Project__summary">{project.summary}</p>
								</Card>
							);
					  })
					: 'There are currently no projects to show'}
			</div>
		</PageSection>
	);
}

ProjectSection.propTypes = {};

ProjectSection.defaultProps = {};

export default ProjectSection;
