import React from 'react';
import PropTypes from 'prop-types';

import MyResume from '../../data/resume.json';
import './Resume.scss';

const ResumeContent = React.forwardRef((props, ref) => {
	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
	});

	return (
		<React.Fragment>
			<div className="Resume-content" ref={ref}>
				<header>
					<h1 className="Resume-title">
						{MyResume.basics.name.split(' ').map((e, i) => {
							return (
								<span className={'shade-' + ((i % 2) + 1)} key={i}>
									{e}
								</span>
							);
						})}
					</h1>
					<p className="Resume-title-content">
						<div>
							<span>
								<a href={MyResume.basics.website}>{MyResume.basics.website}</a>
							</span>
						</div>
						<div>
							<span>
								<a href={'tel:' + MyResume.basics.phone}>{MyResume.basics.phone}</a>
							</span>
							<span>
								<a href={'mailto:' + MyResume.basics.email}>{MyResume.basics.email}</a>
							</span>
						</div>
					</p>
				</header>
				<main>
					<aside>
						{/* My Education */}
						{MyResume.education ? (
							<section className="Resume-section">
								<h2 className="Resume-section-title">Education</h2>
								<ul className="Resume-section-list">
									{MyResume.education.map((item, index) => (
										<li key={index}>
											<h3 className="Resume-section-subtitle">
												<a href={item.url ? item.url : '#'}>{item.institution}</a>
											</h3>
											{item.studyType || item.area ? (
												<>
													<h4 className="Resume-section-description">
														{item.studyType} in {item.area}
													</h4>
												</>
											) : (
												<></>
											)}
											<p className="Resume-section-content"></p>
										</li>
									))}
								</ul>
							</section>
						) : (
							<></>
						)}
						{/* My Links */}
						{MyResume.basics.profiles ? (
							<section className="Resume-section links">
								<h2 className="Resume-section-title">Links</h2>
								<ul className="Resume-section-list">
									{MyResume.basics.profiles.map((item, index) => (
										<li key={index}>
											<h3 className="Resume-section-subtitle">{item.network}</h3>
											<p className="Resume-section-description">
												<a href={item.url} className={item.network.toLowerCase()}>
													{item.username}
												</a>
											</p>
										</li>
									))}
								</ul>
							</section>
						) : (
							<></>
						)}
						{/* My Skills  */}
						{MyResume.skills ? (
							<section className="Resume-section skills">
								<h2 className="Resume-section-title">Skills</h2>
								<ul className="Resume-section-list">
									{[5, 4, 3, 2, 1].map((i, index) => (
										<>
											{MyResume.skills.filter((item) => item.rating === i).length === 0 ? (
												''
											) : (
												<li className={'Resume-section-rating-' + i} key={index}>
													<h3 className="Resume-section-subtitle">
														{MyResume.skills.filter((item) => item.rating === i)[0].level}
													</h3>
													{MyResume.skills
														.filter((item) => item.rating === i)
														.map((item, index) => (
															<span className="Resume-section-skill" key={index}>
																{item.name}
															</span>
														))}
												</li>
											)}
										</>
									))}
								</ul>
							</section>
						) : (
							<></>
						)}
					</aside>
					<article>
						{/* My Experience */}
						{MyResume.work ? (
							<section className="Resume-section experience">
								<h2 className="Resume-section-title">Experience</h2>
								<ul className="Resume-section-list">
									{MyResume.work.map((item, index) => (
										<li key={index}>
											<h3 className="Resume-section-subtitle">
												<a href={item.url ? item.url : '#'}>{item.company}</a>
											</h3>
											<h4 className="Resume-section-description">{item.position}</h4>
											<div className="Resume-section-location">
												<span>
													{dateFormatter.format(new Date(item.startDate))} -{' '}
													{dateFormatter.format(new Date(item.endDate))}
												</span>{' '}
												| {item.location}
											</div>
											<p className="Resume-section-content">{item.summary}</p>
										</li>
									))}
								</ul>
							</section>
						) : (
							<></>
						)}
						{/* My Projects */}
						{MyResume.projects ? (
							<section className="Resume-section projects">
								<h2 className="Resume-section-title">Projects</h2>
								<ul className="Resume-section-list">
									{MyResume.projects.map((item, index) => (
										<li key={index}>
											<h3 className="Resume-section-subtitle">{item.name}</h3>
											<h4 className="Resume-section-description">{item.summary}</h4>
											<div className="Resume-section-location">
												{item.startDate && item.endDate ? (
													<>
														<span>
															{dateFormatter.format(new Date(item.startDate))} -{' '}
															{dateFormatter.format(new Date(item.endDate))}
														</span>{' '}
														|
													</>
												) : (
													' '
												)}
												{item.primaryLanguage}
											</div>
											<p className="Resume-section-content">
												<a href={item.repositoryUrl ? item.repositoryUrl : '#'}>
													{item.repositoryUrl}
												</a>
											</p>
										</li>
									))}
								</ul>
							</section>
						) : (
							<></>
						)}
						{/* My Awards */}
						{MyResume.awards ? <></> : <></>}
						{/* My Publications */}
						{MyResume.publications ? <></> : <></>}
					</article>
				</main>
			</div>
		</React.Fragment>
	);
});

ResumeContent.propTypes = {};

export default ResumeContent;
