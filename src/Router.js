import React from 'react';

import { Route, HashRouter, BrowserRouter, Switch } from 'react-router-dom';

import Home from './routes/Home';
import About from './routes/About';
import Error from './routes/Error';
import Resume from './routes/Resume';
import Blog from './routes/Blog';
import Tools from './routes/Tools';
import ToolSelector from './routes/ToolSelector';

import Header from './components/partials/Header';

function App() {
	return (
		<>
			<BrowserRouter basename={process.env.PUBLIC_URL}>
				<Header />
				<Route
					render={({ location }) => (
						<Switch location={location}>
							<Route path="/" exact component={Home} />
							<Route path="/about" exact component={About} />
							<Route path="/resume" exact component={Resume} />
							<Route path="/blog" exact component={Blog} />
							<Route path="/tools" exact component={Tools} />
							<Route path="/tools/:tool_slug" component={ToolSelector} />
							<Route component={Error} />
						</Switch>
					)}
				/>
			</BrowserRouter>
		</>
	);
}

export default App;
