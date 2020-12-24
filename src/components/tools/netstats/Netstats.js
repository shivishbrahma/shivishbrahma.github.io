import React, { useState, useEffect } from 'react';

import netstatsHelper from './netstatsHelper';

import '../../../styles/Netstats.scss';
import { FaCircle, FaLocationArrow } from 'react-icons/fa';

export default function NetworkTool() {
	const [location, setLocation] = useState(null);
	const [dimension, setDimension] = useState(netstatsHelper.getDimensions());
	const [ip, setIP] = useState(null);
	useEffect(() => {
		window.addEventListener('resize', () => {
			setDimension(netstatsHelper.getDimensions());
		});
		netstatsHelper.getIPAddress().then((e) => {
			setIP(e);
		});
	}, []);

	const locateMe = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude, longitude } = position.coords;
				netstatsHelper.getAddress(latitude, longitude).then((address) => {
					const newLocation = { latitude, longitude, ...address };
					setLocation(newLocation);
				});
			});
		} else {
			setLocation({ error: 'Geolocation is not supported by this browser.' });
		}
	};

	return (
		<>
			<section className="section netstats">
				<div className="container my-4">
					<div className="row justify-content-center">
						<div className="col-12">
							<h1>Netstats</h1>
							<h3>Browser Info:</h3>
							<ul>
								<li>Name: {netstatsHelper.getBrowser()}</li>
								<li>Version: 87.0.4280.88</li>
								<li>Platform: {netstatsHelper.getPlatform()}</li>
								<li>Languages: {netstatsHelper.getLanguage()}</li>
								<li>User Agent: {netstatsHelper.getUserAgent()}</li>
							</ul>
						</div>
						<div className="col-12">
							<h3>Status:</h3>
							<ul>
								<li>
									Is Online?:{' '}
									{netstatsHelper.getOnline ? (
										<span>
											<FaCircle className="text-success mr-1" />
											Live
										</span>
									) : (
										<span>
											<FaCircle className="text-gray mr-1" /> Offline
										</span>
									)}
								</li>
								<li>
									Cookies Enabled:
									{netstatsHelper.getCookieEnabled ? 'Yes' : 'No'}
								</li>
								<li>
									Javascript Enabled:{' '}
									{netstatsHelper.getJavaEnabled ? 'Yes' : 'No'}
								</li>
							</ul>
						</div>
						<div className="col-12">
							<h3>Window Info:</h3>
							<ul>
								<li>Dimensions: {dimension}</li>
								<li>Screen: {netstatsHelper.getScreen()}</li>
								<li>Resolution: {netstatsHelper.getResolution()}</li>
							</ul>
						</div>
						{ip ? (
							<div className="col-12">
								<h3>IP Info</h3>
								<ul>
									<li>
										{ip.version}: {ip.ip}
									</li>
									<li>Organisation: {ip.org}</li>
									<li>ASN: {ip.asn}</li>
									<li>
										Location as per IP:{' '}
										{ip.city + ', ' + ip.region + ', ' + ip.country_name}
									</li>
								</ul>
							</div>
						) : (
							<></>
						)}

						<div className="col-12">
							<h3>Location:</h3>
							<button
								className="btn btn-info"
								onClick={() => {
									locateMe();
								}}
							>
								<FaLocationArrow /> Locate Me!
							</button>
							{location ? (
								location.error ? (
									<p>Geolocation is not supported by this browser.</p>
								) : (
									<ul className="my-2">
										<li>Latitude: {location.latitude}</li>
										<li>Longitude: {location.longitude}</li>
										<li>Address: {location.street + ' ' + location.name}</li>
									</ul>
								)
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
