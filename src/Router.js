import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';

// import About from './Components/About';
import Home from './routes/Home';
// import Dashboard from './Components/Dashboard';

function App() {
	return (
		<main>
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Home} />
					{/* <Route path="/dashboard" component={Dashboard}/>
            <Route path="/about" component={About}></Route> */}
				</Switch>
			</BrowserRouter>
		</main>
	);
}

export default App;
