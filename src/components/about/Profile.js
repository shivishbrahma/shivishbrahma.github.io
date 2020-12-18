import React from 'react';
import profileImage from '../../images/profile1.jpg';

export default function Profile({ dark }) {
	return (
		<section
			className={'about_me ' + (dark ? 'bg-dark-gray' : 'bg-light-gray')}
		>
			<div className={'container-fluid ' + (dark ? 'text-white' : '')}>
				<div className="row justify-content-center">
					<div className="col-12 media-card">
						<div className="row justify-content-md-center p-4">
							<div
								className="col-6 col-md-4 mt-2"
								style={{ maxWidth: '300px' }}
							>
								<img src={profileImage} className="profile-pic" alt="Profile" />
							</div>
							<div className="col-6 col-md-8">
								<h1 className="mb-1 mt-1 font-weight-bold">
									Purbayan Chowdhury
								</h1>
								<h3 className={dark ? 'text-light' : 'text-secondary'}>
									Web Developer & ML Engineer
								</h3>
								<p style={{ fontSize: '1.2rem' }}>
									I am a web developer and ml engineer with specialisation in
									scalable web apps that solves day-to-day problems. I write
									about website designing, software development in my blog.
								</p>
								<a className="btn btn-primary mx-1" href="/blog" role="button">
									<i
										className="fa fa-arrow-circle-right"
										aria-hidden="true"
									></i>
									&nbsp; Visit My Blog
								</a>
								<a className="btn btn-info mx-1" href="/resume" role="button">
									<i className="fas fa-file-alt"></i> &nbsp; View My Resume
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
