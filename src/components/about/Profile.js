import React from 'react';
import { FaArrowCircleRight, FaFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
								className="col-12 col-md-4 mt-2"
								style={{ maxWidth: '300px' }}
							>
								<img src={profileImage} className="profile-pic" alt="Profile" />
							</div>
							<div className="col-12 col-md-8">
								<h1 className="mb-1 mt-1 font-weight-bold">
									Purbayan Chowdhury
								</h1>
								<h3 className={dark ? 'text-light' : 'text-secondary'}>
									Web Developer & ML Engineer
								</h3>
								<p className="text-justify" style={{ fontSize: '1.2rem' }}>
									I am a web developer and ml engineer with specialisation in
									scalable web apps that solves day-to-day problems. I write
									about website designing, software development in my blog.
								</p>
								<Link className="btn btn-primary mx-1" to="/blog" role="button">
									<FaArrowCircleRight />
									&nbsp; Visit My Blog
								</Link>
								<Link className="btn btn-info mx-1" to="/resume" role="button">
									<FaFileAlt /> &nbsp; View My Resume
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
