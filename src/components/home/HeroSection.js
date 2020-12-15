import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import heroImage from '../../images/hero1.jpg';

export default function HeroSection() {
	return (
		<div
			className="hero_slider"
			style={{
				backgroundImage: `url('${heroImage}')`,
			}}
		>
			<div className="overlay_div"></div>
			<div className="overlay_text">
				<h1>Hi, I am Purbayan Chowdhury</h1>
				<ReactTypingEffect
					className="w-100 text-center d-inline-block"
					text={[
						'Web Developer',
						'Data Scientist',
						'Coding Geek',
						'Number Cruncher',
					]}
					typingDelay="1000ms"
					eraseDelay="1200ms"
					cursorRenderer={(cursor) => <h3>{cursor}</h3>}
					displayTextRenderer={(text, i) => {
						return (
							<h3>
								{text.split('').map((char, i) => {
									const key = `${i}`;
									return (
										<span
											key={key}
											style={
												i % 2 === 0
													? { color: 'var(--orange)' }
													: { color: 'var(--yellow)' }
											}
										>
											{char}
										</span>
									);
								})}
							</h3>
						);
					}}
				/>
			</div>
		</div>
	);
}
