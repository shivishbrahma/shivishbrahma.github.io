import React, { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { PubWakaTime } from '../components/pub-icons';
import Profile from '../components/about/Profile';
import ReactGithubCalendar from '../components/all/ReactGithubCalendar';
import store from '../redux/store';

export default function About() {
	const { app } = store.getState();

	useEffect(() => {
		document.title = `${app.name} | About`;
	}, [app.name]);

	return (
		<main className={app.dark ? 'dark bg-dark' : ''}>
			<Profile dark={app.dark} />
			<div className="section">
				<div className="container-fluid my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h2 className="section-header">
								My WakaTime Dashboard <PubWakaTime />
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
								My Github <FaGithub />
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
