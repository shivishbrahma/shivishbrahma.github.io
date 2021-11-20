
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Resume from './Resume';

test('checks for rendering Resume', () => {
	const { container } = render(<Resume/>);
	const resumeElement = container.querySelector('section.Resume')
	expect(resumeElement).toBeInTheDocument();
});
	