import React from 'react';
import './App.scss';

// Molecular Components
import { themes, setCSSVariables, ThemeSelectorContext } from './theme';
import Navbar from '../../molecules/Navbar/Navbar';
import Footer from '../../molecules/Footer/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../Home/Home';
import Resume from '../Resume/Resume';
import Error from '../Error/Error';

function App() {
	const [theme, setTheme] = React.useState('light');

	function toggleTheme() {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	}

	React.useEffect(() => {
		setCSSVariables(themes[theme]);
	});

	return (
		<ThemeSelectorContext.Provider value={{ theme: themes[theme] }}>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<div className="App">
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
                            <Route path="/tools/:tool_slug" component={ToolSelector} /> */}
							<Route path="*" element={<Error />} />
						</Routes>
					</main>
					<footer className="App-footer">
						<Footer darkModeToggler={toggleTheme} isDark={theme === 'dark'} />
					</footer>
				</div>
			</BrowserRouter>
		</ThemeSelectorContext.Provider>
	);
}

export default App;
