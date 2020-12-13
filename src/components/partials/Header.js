import React from 'react';

export default function Header() {
	return (
		<header>
			<nav className="navbar navbar-expand-sm navbar-dark bg-dark main_navbar">
				<a className="navbar-brand" href="/">
					Shivishbrahma
				</a>
				<button
					className="navbar-toggler btn d-lg-none"
					type="button"
					data-toggle="collapse"
					data-target="#collapsibleNavId"
					aria-controls="collapsibleNavId"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<i class="fa fa-bars" aria-hidden="true"></i>
				</button>
				<div class="collapse navbar-collapse" id="collapsibleNavId">
					<ul class="navbar-nav mr-auto mt-2 mt-lg-0">
						<li class="nav-item active">
							<a className="nav-link" href="/">
								Home
							</a>
						</li>
						<li class="nav-item">
							<a className="nav-link" href="/about">
								About
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}
