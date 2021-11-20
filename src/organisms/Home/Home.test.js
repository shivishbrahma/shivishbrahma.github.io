
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

test('checks for rendering Home', () => {
	const { container } = render(<Home/>);
	const homeElement = container.querySelector('section.Home')
	expect(homeElement).toBeInTheDocument();
});
	