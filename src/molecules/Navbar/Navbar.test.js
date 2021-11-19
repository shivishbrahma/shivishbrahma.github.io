
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from './Navbar';

test('checks for rendering Navbar', () => {
	const { container } = render(<Navbar/>);
	const navbarElement = container.querySelector('div.Navbar')
	expect(navbarElement).toBeInTheDocument();
});
	