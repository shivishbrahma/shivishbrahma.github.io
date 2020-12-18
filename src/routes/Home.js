import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import HeroSection from '../components/home/HeroSection';
import store from '../redux/store';

export default function Home() {
	const { app } = store.getState();
	const [tools, setTools] = useState([]);
	const [projects, setProjects] = useState([]);

	const getData = async () => {
		const response = await fetch('db.jsdb', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});
		const data = await response.json();
		setTools(data.tools);
		setProjects(data.projects);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<main className={app.dark ? 'dark bg-dark' : ''}>
			<HeroSection />
			<section className="section tools">
				<div className="container-fluid my-4">
					<div className="row">
						<div className="col-12">
							<h2 className="section-header">Featured Tools</h2>
						</div>
						{tools.map((ele) => (
							<div className="col-12 col-md-4 col-lg-3" key={ele.id}>
								<div className="card text-left">
									<div className="card-header bg-white">
										<div className="card-icon">
											<img
												className="icon"
												src={'images/tools/' + ele.img}
												alt={ele.title}
											/>
										</div>
									</div>
									<div className="card-body">
										<h4 className="card-title">{ele.title}</h4>
										<p className="card-text">{ele.text}</p>
									</div>
									<div className="card-footer">
										<Link to={ele.url}>CLICK HERE</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="section tools">
				<div className="container-fluid my-4">
					<div className="row">
						<div className="col-12">
							<h2 className="section-header">Featured Projects</h2>
						</div>
						{projects.map((ele) => (
							<div className="col-12 col-md-4 col-lg-3" key={ele.id}>
								<div className="card text-left">
									<div className="card-header p-0 bg-white">
										<div className="card-icon">
											<img src={'images/projects/' + ele.img} alt={ele.title} />
										</div>
									</div>
									<div className="card-body">
										<h4 className="card-title">{ele.title}</h4>
										<p
											className="card-text"
											dangerouslySetInnerHTML={{ __html: ele.text }}
										></p>
									</div>
									<div className="card-footer">
										<Link href={ele.url}>CLICK HERE</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
