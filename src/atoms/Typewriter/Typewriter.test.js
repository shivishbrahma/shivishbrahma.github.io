import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Typewriter from './Typewriter';

beforeEach(() => {
	jest.useFakeTimers();
});

test('checks for rendering Typewriter and Cursor', () => {
	const { container } = render(<Typewriter text={['Hello World!', 'Typewriter']} />);
	const typewriterTextElement = container.querySelector('span.Typewriter__text');
	expect(typewriterTextElement).toBeInTheDocument();
	const typewriterCursorElement = container.querySelector('span.Typewriter__cursor');
	expect(typewriterCursorElement).toBeInTheDocument();
});

test('checks if text is typing & erasing', () => {
	const text = 'Hello!',
		speed = 1,
		eraseSpeed = 2,
		eraseDelay = 30,
		typingDelay = 10;
	const iterations_count = 3;
	const { container } = render(
		<Typewriter
			text={text}
			speed={speed}
			eraseSpeed={eraseSpeed}
			eraseDelay={eraseDelay}
			typingDelay={typingDelay}
		/>
	);
	expect(container.querySelector('.Typewriter__text').textContent).toBe('');

	for (let count = 0; count < iterations_count; count++) {
		for (let i = 0; i < text.length; i++) {
			jest.advanceTimersByTime(speed);
			expect(container.querySelector('.Typewriter__text').textContent).toBe(text.substring(0, i + 1));
		}
		jest.advanceTimersByTime(eraseDelay);
		for (let i = 0; i < text.length; i++) {
			expect(container.querySelector('.Typewriter__text').textContent).toBe(
				text.substring(0, text.length - i - 1)
			);
			if (i === text.length - 1) {
				jest.advanceTimersByTime(typingDelay);
			} else {
				jest.advanceTimersByTime(eraseSpeed);
			}
		}
	}
});

test('checks if text array is typing & erasing', () => {
	const textArray = ['Hello!', 'World'],
		speed = 1,
		eraseSpeed = 2,
		eraseDelay = 30,
		typingDelay = 10;
	const iterations_count = 3;
	const { container } = render(
		<Typewriter
			text={textArray}
			speed={speed}
			eraseSpeed={eraseSpeed}
			eraseDelay={eraseDelay}
			typingDelay={typingDelay}
		/>
	);
	expect(container.querySelector('.Typewriter__text').textContent).toBe('');

	for (let count = 0; count < iterations_count; count++) {
		for (let j = 0; j < textArray.length; j++) {
			let text = textArray[j];
			for (let i = 0; i < text.length; i++) {
				jest.advanceTimersByTime(speed);
				expect(container.querySelector('.Typewriter__text').textContent).toBe(text.substring(0, i + 1));
			}
			jest.advanceTimersByTime(eraseDelay);
			for (let i = 0; i < text.length; i++) {
				expect(container.querySelector('.Typewriter__text').textContent).toBe(
					text.substring(0, text.length - i - 1)
				);
				if (i === text.length - 1) {
					jest.advanceTimersByTime(typingDelay);
				} else {
					jest.advanceTimersByTime(eraseSpeed);
				}
			}
		}
	}
});
