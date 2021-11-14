import React from 'react';
// import logo from '../../logo.svg';
import './App.scss';

// Atomic Components
import Typewriter from '../../atoms/Typewriter/Typewriter';

function App() {
	return (
		<React.Fragment>
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header> */}
			<main className="App-main">
				<Typewriter text={['Hello World!', 'Typewriter']} />
				{/* <Typewriter text={['Hello World!']} /> */}
			</main>
			<footer className="App-footer"></footer>
		</React.Fragment>
	);
}

export default App;
