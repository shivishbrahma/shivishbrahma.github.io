const getInitialState = () => {
	const defaultState = {
		app: {
			name: 'Shivishbrahma',
			dark: true,
		},
	};

	return localStorage.shivishbrahma
		? JSON.parse(localStorage.shivishbrahma)
		: defaultState;
};

const setInitialState = (initialState) => {
	localStorage.shivishbrahma = JSON.stringify(initialState);
};

export default function rootReducer(state = getInitialState(), action) {
	switch (action.type) {
		case 'toggleDarkMode':
			const app = state.app;
			app.dark = !app.dark;
			const newState = {
				app: {
					...app,
				},
				...state,
			};
			setInitialState(newState);
			return newState;
		default:
			return state;
	}
}
