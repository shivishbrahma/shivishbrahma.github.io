
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

test('checks for rendering Button', () => {
	const { container } = render(<Button/>);
	const buttonElement = container.querySelector('div.Button')
	expect(buttonElement).toBeInTheDocument();
});
	