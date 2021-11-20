
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

test('checks for rendering Footer', () => {
	const { container } = render(<Footer/>);
	const footerElement = container.querySelector('section.Copyright')
	expect(footerElement).toBeInTheDocument();
});
	