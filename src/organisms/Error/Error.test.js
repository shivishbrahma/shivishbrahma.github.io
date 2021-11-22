
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from './Error';

test('checks for rendering Error', () => {
	const { container } = render(<Error/>);
	const errorElement = container.querySelector('section.Error')
	expect(errorElement).toBeInTheDocument();
});
	