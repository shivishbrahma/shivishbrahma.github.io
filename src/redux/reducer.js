const initialState = {
	app: {
		dark: false,
	},
};

export default function rootReducer(state = initialState, action) {
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
			return newState;
		default:
			return state;
	}
}
