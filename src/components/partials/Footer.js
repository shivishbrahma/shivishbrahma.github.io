import React from 'react';

export default function Footer() {
	return (
		<footer>
			<div className="text-light bg-dark footer-copyright text-center py-3">
				Designed with{' '}
				<i className="fa fa-heart text-danger" aria-hidden="true"></i> by{' '}
				<a className="text-success" href="https://github.com/shivishbrahma">
					Purbayan Chowdhury
				</a>
			</div>
		</footer>
	);
}
