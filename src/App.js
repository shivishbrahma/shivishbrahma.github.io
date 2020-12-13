import React from 'react';

import Router from './Router';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import './styles/App.scss';

export default function App() {
	return (
		<>
			<Header />
			<Router />
			<Footer />
		</>
	);
}
