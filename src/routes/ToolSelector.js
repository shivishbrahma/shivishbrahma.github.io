import React from 'react';

import Netstats from '../components/tools/netstats/Netstats';
import store from '../redux/store';

export default function ToolSelector({ match }) {
	const { app } = store.getState();
	const tool = match.params.tool_slug;

	return (
		<main className={app.dark ? 'dark' : ''}>
			{tool === 'netstats' && <Netstats />}
		</main>
	);
}
