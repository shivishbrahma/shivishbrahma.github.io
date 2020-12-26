import React, { useEffect } from 'react';
import store from '../redux/store';

export default function Tools() {
	const { app } = store.getState();

	useEffect(() => {
		document.title = `${app.name} | Tools`;
	}, [app.name]);

	return <main className={app.dark ? 'dark bg-dark' : ''}></main>;
}
