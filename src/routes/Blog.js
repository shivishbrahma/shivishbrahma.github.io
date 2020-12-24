import React, { useEffect } from 'react';
import store from '../redux/store';

export default function Blog() {
	const { app } = store.getState();

	useEffect(() => {
		document.title = `${app.name} | Blogs`;
	}, [app.name]);

	return (
		<main>
			<section className="blog_section"></section>
		</main>
	);
}
