
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

test('checks for rendering Card', () => {
	const { container } = render(<Card/>);
	const cardElement = container.querySelector('div.Card')
	expect(cardElement).toBeInTheDocument();
});
	