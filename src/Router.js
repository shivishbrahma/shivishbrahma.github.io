import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Error from './routes/Error';
import Resume from './routes/Resume';
import Blog from './routes/Blog';

import Header from './components/partials/Header';

function App() {
	return (
		<>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/about" component={About} />
					<Route path="/resume" component={Resume} />
					<Route path="/blog" component={Blog} />
					<Route component={Error} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
