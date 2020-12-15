import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GithubCalendar from 'github-calendar';
import 'github-calendar/dist/github-calendar-responsive.css';

export default class ReactGithubCalendar extends Component {
	static propTypes = {
		username: PropTypes.string.isRequired,
		responsive: PropTypes.bool,
		tooltips: PropTypes.bool,
		global_stats: PropTypes.bool,
		cache: PropTypes.number,
		summary_text: PropTypes.string,
		proxy: PropTypes.func,
	};
	static defaultProps = {
		username: 'shivishbrahma',
		responsive: false,
		tooltips: false,
		global_stats: true,
		cache: 20,
		summary_text:
			'Summary of pull requests, issues opened, and commits made by <username>',
		proxy: (username) => {
			return fetch(
				`https://cors-anywhere.herokuapp.com/github?user=${username}`
			);
		},
	};

	componentDidMount() {
		const {
			username,
			responsive,
			tooltips,
			global_stats,
			cache,
			summary_text,
			proxy,
		} = this.props;
		let opt = {
			summary_text,
			proxy,
			global_stats,
			responsive,
			tooltips,
			cache,
		};
		GithubCalendar(this.refs.container, username, opt);
	}

	render() {
		const {
			username,
			responsive,
			tooltips,
			global_stats,
			cache,
			summary_text,
			proxy,
			...otherProps
		} = this.props;
		return (
			<div
				className={
					'calendar' + (this.props.className ? ' ' + this.props.className : '')
				}
				{...otherProps}
				ref="container"
			>
				{/* Loading stuff */}
				Loading the data just for you.
			</div>
		);
	}
}
