import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('check if header present', () => {
	const { container } = render(<App />);
	const headerElement = container.querySelector('header.App-header');
	expect(headerElement).toBeInTheDocument();
});

test('check if main present', () => {
	const { container } = render(<App />);
	const mainElement = container.querySelector('main.App-main');
	expect(mainElement).toBeInTheDocument();
});

test('check if footer present', () => {
	const { container } = render(<App />);
	const footerElement = container.querySelector('footer.App-footer');
	expect(footerElement).toBeInTheDocument();
});
