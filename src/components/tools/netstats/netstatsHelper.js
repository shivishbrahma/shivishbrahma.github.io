window.jquery = window.$ = require('jquery');
window.jqBrowser = require('jquery.browser');

const calculateRatio = (num_1, num_2) => {
	for (let num = num_2; num > 1; num--) {
		if (num_1 % num === 0 && num_2 % num === 0) {
			num_1 = num_1 / num;
			num_2 = num_2 / num;
		}
	}
	var ratio = num_1 + ':' + num_2;
	return ratio;
};

const proxy = 'https://cors-anywhere.herokuapp.com/';
const ADDRESS_API_URL = `${proxy}https://darksky.net/rgeo?hires=1`;
const getAddress = (lat, lon) => {
		return fetch(`${ADDRESS_API_URL}&lat=${lat}&lon=${lon}`).then((response) =>
			response.json()
		);
	},
	getIPAddress = async () => {
		// const res1 = await fetch('http://ip-api.com/json', {
		// 	credentials: 'omit',
		// 	method: 'GET',
		// 	mode: 'cors',
		// });
		// console.log(res1.json());

		// const res2 = await fetch(`${proxy}https://ipapi.co/json/`);
		const res2 = await fetch('https://ipapi.co/json/', {
			credentials: 'include',
			method: 'GET',
			mode: 'cors',
		});
		console.log(res2.json());
		return res2.json();
	};

const netstatsHelper = {
	getAppCodeName: () => {
		return navigator.appCodeName;
	},
	getAppName: () => {
		return navigator.appName;
	},
	getAppVersion: () => {
		// return navigator.appVersion;
		return window.$.browser.version;
	},
	getCookieEnabled: () => {
		return navigator.cookieEnabled;
	},
	getLanguage: () => {
		return navigator.language;
	},
	getBrowser: () => {
		return window.$.browser.name;
	},
	getOnline: () => {
		return navigator.onLine;
	},
	getPlatform: () => {
		return navigator.platform;
	},

	getUserAgent: () => {
		return navigator.userAgent;
	},
	getJavaEnabled: () => {
		return navigator.javaEnabled;
	},
	getScreen: () => {
		return `${window.screen.width}px x ${window.screen.height}px`;
	},
	getResolution: () => {
		return `${calculateRatio(
			window.screen.pixelDepth,
			window.screen.colorDepth
		)} (${window.screen.colorDepth}bit)`;
	},
	getDimensions: () => {
		return `${window.innerWidth}px x ${window.innerHeight}px`;
	},
	calculateRatio,
	getAddress,
	getIPAddress,
};
export default netstatsHelper;
