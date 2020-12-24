import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';

import Router from './Router';
import Footer from './components/partials/Footer';

import './styles/App.scss';

export default class App extends Component {
	componentDidMount() {
		store.subscribe(this.forceUpdate.bind(this));
	}
	componentWillUnmount() {}
	render() {
		return (
			<Provider store={store}>
				<Router />
				<Footer />
			</Provider>
		);
	}
}
