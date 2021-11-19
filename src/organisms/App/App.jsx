import React from 'react';
// import logo from '../../logo.svg';
import './App.scss';

// Molecular Components
import Navbar from '../../molecules/Navbar/Navbar';
import HeroSection from '../../molecules/HeroSection/HeroSection';

function App() {
	const [isDark, setIsDark] = React.useState(false);

	return (
		<div className={'App ' + (isDark ? 'App-dark' : '')}>
			<header className="App-header">
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				<Navbar />
				<HeroSection />
			</header>
			<main className="App-main">
				<div></div>
			</main>
			<footer className="App-footer">Footer Element</footer>
		</div>
	);
}

export default App;
