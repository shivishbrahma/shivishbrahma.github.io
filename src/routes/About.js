import React from 'react';
import Profile from '../components/about/Profile';
import ReactGithubCalendar from '../components/all/ReactGithubCalendar';
import store from '../redux/store';

export default function About() {
	const { app } = store.getState();

	return (
		<main className={app.dark ? 'dark bg-dark' : ''}>
			<Profile dark={app.dark} />
			<div className="section">
				<div className="container-fluid my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h2 className="section-header">
								My WakaTime Dashboard <i className="fas fa-tachometer-alt"></i>
							</h2>
						</div>
						<div className="col-12">
							<div className="row"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="section">
				<div className="container-fluid my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h2 className="section-header">My Skills</h2>
						</div>
						<div className="col-12">
							<div className="row"></div>
						</div>
					</div>
				</div>
			</div>

			<div className="section">
				<div className="container-fluid my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h2 className="section-header">My Blog Posts</h2>
						</div>
						<div className="col-12">
							<div className="row"></div>
						</div>
					</div>
				</div>
			</div>

			<section className="section">
				<div className="container-fluid my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h2 className="section-header">
								My Github <i className="fab fa-github" aria-hidden="true"></i>
							</h2>
						</div>
						<div className="col-12">
							<ReactGithubCalendar username="shivishbrahma" responsive={true} />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
