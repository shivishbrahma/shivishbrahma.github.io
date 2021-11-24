
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navlink from './Navlink';

test('checks for rendering Navlink', () => {
	const { container } = render(<Navlink/>);
	const navlinkElement = container.querySelector('div.Navlink')
	expect(navlinkElement).toBeInTheDocument();
});
	