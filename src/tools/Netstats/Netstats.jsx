import React from 'react';
import './Netstats.scss';
import { getBrowser, getDeviceInfo, getLanguage, getOs, getStatusInfo } from './utils';
import chromeIcon from '../../images/icons/chrome.svg';
import edgeIcon from '../../images/icons/edge.svg';
import safariIcon from '../../images/icons/safari.svg';
import ieIcon from '../../images/icons/ie.svg';
import firefoxIcon from '../../images/icons/firefox.png';
import operaIcon from '../../images/icons/opera.svg';

export default function Netstats() {
	React.useEffect(() => {});
	return (
		<section className="Netstats">
			<h1 className="Netstats__title">Netstats</h1>

			<h3 className="Netstats__subtitle">Browser Info:</h3>
			<ul className="Netstats__list">
				<li>
					<span className="Netstats__fieldname">Name:</span>
					{getBrowser().isChrome && <img src={chromeIcon} alt="Chrome" className="Netstats__icon" />}
					{getBrowser().isFirefox && <img src={firefoxIcon} alt="Firefox" className="Netstats__icon" />}
					{getBrowser().isEdge && <img src={edgeIcon} alt="Edge" className="Netstats__icon" />}
					{getBrowser().isOpera && <img src={operaIcon} alt="Opera" className="Netstats__icon" />}
					{getBrowser().isSafari && <img src={safariIcon} alt="Safari" className="Netstats__icon" />}
					{getBrowser().isIE && <img src={ieIcon} alt="IE" className="Netstats__icon" />}
					{getBrowser().name}
				</li>
				<li>
					<span className="Netstats__fieldname">Version:</span>
					{getBrowser().version}
				</li>
				<li>
					<span className="Netstats__fieldname">Major Version:</span>
					{getBrowser().majorVersion}
				</li>
				<li>
					<span className="Netstats__fieldname">Language:</span>
					{getLanguage()}
				</li>
				<li>
					<span className="Netstats__fieldname">OS:</span>
					{getOs().OSName} ({getOs().platform})
				</li>
			</ul>

			<h3 className="Netstats__subtitle">Status Info:</h3>
			<ul className="Netstats__list">
				<li>
					<span className="Netstats__fieldname">Online:</span>
					{getStatusInfo().online ? 'Online' : 'Offline'}
				</li>
				<li>
					<span className="Netstats__fieldname">Cookies Enabled:</span>
					{getStatusInfo().cookie_enabled ? 'Yes' : 'No'}
				</li>
				<li>
					<span className="Netstats__fieldname">Javascript Enabled:</span>
					{getStatusInfo().java_enabled ? 'Yes' : 'No'}
				</li>
			</ul>

			<h3 className="Netstats__subtitle">Device Info:</h3>
			<ul className="Netstats__list">
				<li>
					<span className="Netstats__fieldname">Dimensions:</span>
					{getDeviceInfo().dimensions}
				</li>
				<li>
					<span className="Netstats__fieldname">Screen:</span>
					{getDeviceInfo().screen}
				</li>
				<li>
					<span className="Netstats__fieldname">Resolution:</span>
					{getDeviceInfo().resolution}
				</li>
			</ul>
		</section>
	);
}
