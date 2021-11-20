import React from 'react';
// import logo from '../../logo.svg';
import './App.scss';

// Molecular Components
import Navbar from '../../molecules/Navbar/Navbar';
import Footer from '../../molecules/Footer/Footer';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Resume from '../Resume/Resume';

function App() {
	const [isDark, setIsDark] = React.useState(false);

	return (
		<HashRouter basename={process.env.PUBLIC_URL}>
			<div className={'App ' + (isDark ? 'App-dark' : '')}>
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<Navbar />
				</header>
				<main className="App-main">
					<Routes>
						<Route path="/" exact element={<Home />} />
						{/* <Route path="/about" exact component={About} /> */}
						<Route path="resume" exact element={<Resume />} />
						{/* <Route path="/blog" exact component={Blog} />
								<Route path="/tools" exact component={Tools} />
								<Route path="/tools/:tool_slug" component={ToolSelector} />
								<Route component={Error} /> */}
					</Routes>
				</main>
				<footer className="App-footer">
					<Footer darkModeToggler={setIsDark} />
				</footer>
			</div>
		</HashRouter>
	);
}

export default App;
