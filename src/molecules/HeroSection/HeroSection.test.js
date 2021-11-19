
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from './HeroSection';

test('checks for rendering HeroSection', () => {
	const { container } = render(<HeroSection/>);
	const heroSectionElement = container.querySelector('div.HeroSection')
	expect(heroSectionElement).toBeInTheDocument();
});
	