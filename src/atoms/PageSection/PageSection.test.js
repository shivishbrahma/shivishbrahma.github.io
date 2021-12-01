
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageSection from './PageSection';

test('checks for rendering PageSection', () => {
	const { container } = render(<PageSection/>);
	const pageSectionElement = container.querySelector('section.PageSection')
	expect(pageSectionElement).toBeInTheDocument();
});
	