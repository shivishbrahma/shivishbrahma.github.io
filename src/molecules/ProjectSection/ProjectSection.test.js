
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectSection from './ProjectSection';

test('checks for rendering ProjectSection', () => {
	const { container } = render(<ProjectSection/>);
	const projectSectionElement = container.querySelector('section.ProjectSection')
	expect(projectSectionElement).toBeInTheDocument();
});
	