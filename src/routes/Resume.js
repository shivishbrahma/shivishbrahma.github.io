import React from 'react';
import profileImage from '../images/profile1.jpg';
import '../styles/Resume.scss';
import '../styles/ResumePrint.scss';

export default function Resume() {
	return (
		<main className="resume_section bg-gray">
			<div className="container-fluid">
				<div className="col-12 my-5">
					<div className="resume-wrapper">
						<div className="resume bg-white p-4">
							<div className="row">
								<div className="col-md-6">
									<h1 className="text-uppercase d-inline-block">
										Purbayan Chowdhury
									</h1>
									<h6 className="sm-field">
										<i className="fas fa-phone" aria-hidden="true"></i> +91
										9123801180
									</h6>
									<h6 className="sm-field">
										<i className="fas fa-envelope" aria-hidden="true"></i>{' '}
										pur.cho.99@gmail.com
									</h6>
									<h6 className="sm-field">
										<i className="fas fa-map-marker" aria-hidden="true"></i>{' '}
										Ghusuri, Howrah, West Bengal, India
									</h6>
									<h6 className="sm-field">
										<i className="fa fa-globe" aria-hidden="true"></i>{' '}
										<a href="https://shivishbrahma.github.io/">
											https://shivishbrahma.github.io/
										</a>
									</h6>
								</div>
								<div className="col-md-6">
									<div className="circle-icon d-inline-block float-right">
										<img
											src={profileImage}
											alt="profileImage"
											title="ProfileImage"
										/>
									</div>
								</div>
								<div className="col-12">
									<hr />
								</div>
								<div className="col-12 h4">
									<h3 className="title">Summary</h3>A computer science and
									engineering student passionate about open source software
									development and interested in problem solving
								</div>
								<div className="col-12">
									<hr />
								</div>
								<div className="col-12">
									<h3 className="title">education</h3>
									<table className="table table-bordered">
										<thead>
											<tr>
												<th className="text-center">Year</th>
												<th className="text-center">Degree</th>
												<th className="text-center">Discipline</th>
												<th className="text-center">Board</th>
												<th className="text-center">Institute</th>
												<th className="text-center">Percent/Percentile</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>2018-21</td>
												<td>
													B.Tech
													<i>(Pursuing)</i>
												</td>
												<td>Computer Science and Engineering</td>
												<td>MAKAUT</td>
												<td>Institute of Engineering & Management, Kolkata</td>
												<td>9.04</td>
											</tr>
											<tr>
												<td>2017</td>
												<td>12</td>
												<td>Science</td>
												<td>ISC</td>
												<td>Sunrise (Eng. Med.) School, Howrah</td>
												<td>92.67%</td>
											</tr>
											<tr>
												<td>2015</td>
												<td>10</td>
												<td>Science & Humanities</td>
												<td>ICSE</td>
												<td>Sunrise (Eng. Med.) School, Howrah</td>
												<td>90.14%</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="col-12">
									<hr />
								</div>
								<div className="col-12">
									<h3 className="title">skills</h3>
									<table className="table table-bordered table-responsive">
										<thead>
											<tr>
												<th className="text-center">Topic</th>
												<th className="text-center">Details</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Programming Languages</td>
												<td>C, C++, Java</td>
											</tr>
											<tr>
												<td>Course Subjects</td>
												<td>
													Database Management System, Object Oriented
													Programming
												</td>
											</tr>
											<tr>
												<td>Operating System</td>
												<td>Debian Linux, Windows</td>
											</tr>
											<tr>
												<td>Basic Web Development</td>
												<td>HTML, CSS, JS, jQuery, Bootstrap</td>
											</tr>
											<tr>
												<td>Frontend Web Development</td>

												<td>Twig, Handlebars</td>
											</tr>
											<tr>
												<td>Backend Web Development</td>

												<td>Node, Express, PHP</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="col-12">
									<hr />
								</div>
								<div className="col-12">
									<h3 className="title">Interest</h3>
									<ul>
										<li>Web Development</li>
										<li>Machine Learning</li>
									</ul>
								</div>
								<div className="col-12">
									<hr />
								</div>
								<div className="col-12">
									<h3 className="title">projects</h3>
									<ul>
										<li>
											<b>Online Library</b>
											<br />
											An online library website designed using Javascript and
											PHP for storing and viewing books online with book
											recommendation system.
										</li>
										<li>
											<b>Virtual Assistant </b>
											<br />A chatbot that acts both as a virtual assistant and
											chatting person, built in Python and using NLTK library
											and works by speech recognition. English one- Rebecca &
											Bengali one – Tilottama.
										</li>
										<li>
											<b>Online Music Player</b>
											<br />
											An online music player with lyrics support and basic music
											player support.
										</li>
										<li>
											<b>Online Map Logger</b>
											<br />A Full Stack MERN Project map logger of my
											travelling experiences with ratings.
											https://travelmap-ecru.vercel.app/
										</li>
									</ul>
								</div>

								<div className="col-12">
									<hr />
								</div>

								<div className="col-12">
									<h3 className="title">Achievements and responsibilities</h3>
									<ul>
										<li>Participated in IEM Diversion 2k18.</li>
										<li>Participated in IEM Innovare 2k19 and stood first.</li>

										<li>
											Was a part of IEM CV Club and IEM Google Explore ML
											Chapter
										</li>
										<li>Lecturer and Volunteer in ML Summit 2k20.</li>
									</ul>
								</div>

								<div className="col-12">
									<hr />
								</div>

								<div className="col-12">
									<h3 className="title">Internships</h3>
									<ul>
										<li>
											<b>IBM</b> Certified Data Scientist
										</li>
										<li>
											<b>Coursera</b> Certified Deep Learning Scientist
										</li>
										<li>
											<b>DIY Baazar</b> <br />
											Worked as a Front-end developer
										</li>
										<li>
											<b>Filium Enterprises</b> <br />
											Worked as an Intern for PHP and JS development
										</li>
									</ul>
								</div>

								<div className="col-12">
									<hr />
								</div>

								<div className="col-12">
									<h3 className="title">Personal Details</h3>
									<ul>
										<li>
											<b>Date of Birth</b>: 28th September, 1999
										</li>
										<li>
											<b>Address</b>: 30/2/3, Krishna Taran Naskar Lane,
											Ghusuri, Howrah-711107
										</li>
										<li>
											<b>WhatsApp No.</b>: +91 9123801180
										</li>
									</ul>
								</div>

								<div className="col-12">
									<hr />
								</div>

								<div className="col-md-4">
									<h6 className="sm-field text-center">
										<i className="fab fa-github mr-1" aria-hidden="true"></i>{' '}
										<a href="https://github.com/shivishbrahma">
											github.com/shivishbrahma
										</a>
									</h6>
								</div>
								<div className="col-md-4">
									<h6 className="sm-field text-center">
										<i className="fab fa-twitter mr-1" aria-hidden="true"></i>{' '}
										<a href="https://twitter.com/shivishbrahma">
											@shivishbrahma
										</a>
									</h6>
								</div>
								<div className="col-md-4">
									<h6 className="sm-field text-center">
										<i className="fab fa-linkedin mr-1" aria-hidden="true"></i>{' '}
										<a href="https://www.linkedin.com/in/purbayan-chowdhury/">
											linkedin.com/in/purbayan-chowdhury/
										</a>
									</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
