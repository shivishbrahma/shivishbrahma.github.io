import React, { useEffect } from 'react';
import store from '../redux/store';

export default function Blog() {
	const { app } = store.getState();

	useEffect(() => {
		document.title = `${app.name} | Blogs`;
	}, [app.name]);

	return (
		<main className={app.dark ? 'dark bg-dark' : ''}>
			<section className="blog_section"></section>
		</main>
	);
}
