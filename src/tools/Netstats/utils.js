export function getLanguage() {
	return window.navigator.languages && window.navigator.languages.length
		? window.navigator.languages[0]
		: window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage || 'en';
}

export function getBrowser() {
	let nAgt = window.navigator.userAgent,
		browserName = window.navigator.appName,
		fullVersion = window.navigator.appVersion,
		majorVersion = window.navigator.appVersion.split('.')[0];
	let nameOffset, verOffset, ix;

	// In Opera 15+, the true version is after "OPR/"
	if ((verOffset = nAgt.indexOf('OPR/')) !== -1) {
		browserName = 'Opera';
		fullVersion = nAgt.substring(verOffset + 4);
	}
	// In older Opera, the true version is after "Opera" or after "Version"
	else if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
		browserName = 'Opera';
		fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf('Version')) !== -1) fullVersion = nAgt.substring(verOffset + 8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
		browserName = 'Microsoft Internet Explorer';
		fullVersion = nAgt.substring(verOffset + 5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
		browserName = 'Chrome';
		fullVersion = nAgt.substring(verOffset + 7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
		browserName = 'Safari';
		fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf('Version')) !== -1) fullVersion = nAgt.substring(verOffset + 8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
		browserName = 'Firefox';
		fullVersion = nAgt.substring(verOffset + 8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		browserName = nAgt.substring(nameOffset, verOffset);
		fullVersion = nAgt.substring(verOffset + 1);
		if (browserName.toLowerCase() === browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = fullVersion.indexOf(';')) !== -1) fullVersion = fullVersion.substring(0, ix);
	if ((ix = fullVersion.indexOf(' ')) !== -1) fullVersion = fullVersion.substring(0, ix);

	majorVersion = parseInt('' + fullVersion, 10);
	if (isNaN(majorVersion)) {
		fullVersion = '' + parseFloat(navigator.appVersion);
		majorVersion = parseInt(navigator.appVersion, 10);
	}

	return {
		name: browserName,
		version: fullVersion,
		majorVersion: majorVersion,
		userAgent: nAgt,
		isIE: browserName === 'Microsoft Internet Explorer',
		isEdge: browserName === 'Microsoft Edge',
		isChrome: browserName === 'Chrome',
		isSafari: browserName === 'Safari',
		isFirefox: browserName === 'Firefox',
		isOpera: browserName === 'Opera',
		isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nAgt),
		isTablet: /iPad|PlayBook|Kindle|Silk/i.test(nAgt),
		isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nAgt),
	};
}

export function getOs() {
	let OSName = 'Unknown OS',
		nAgt = window.navigator.userAgent;
	if (navigator.appVersion.indexOf('Win') !== -1) OSName = 'Windows';
	if (navigator.appVersion.indexOf('Mac') !== -1) OSName = 'MacOS';
	if (navigator.appVersion.indexOf('X11') !== -1) OSName = 'UNIX';
	if (navigator.appVersion.indexOf('Linux') !== -1) OSName = 'Linux';

	return {
		OSName: OSName,
		platform: window.navigator.platform,
		isWindows: OSName === 'Windows',
		isMac: OSName === 'MacOS',
		isUNIX: OSName === 'UNIX',
		isLinux: OSName === 'Linux',
		isIOS: /iPhone|iPad|iPod/i.test(nAgt),
		isAndroid: /Android/i.test(nAgt),
	};
}

export function getAndroidVersion() {
	let ua = navigator.userAgent;
	let match = ua.match(/Android\s([0-9.]*)/);
	return match ? match[1] : false;
}

export function getIosVersion() {
    let ua = navigator.userAgent;
    let match = ua.match(/OS\s([0-9_]*)/);
    return match ? match[1] : false;
}

function calculateRatio(num_1, num_2) {
	for (let num = num_2; num > 1; num--) {
		if (num_1 % num === 0 && num_2 % num === 0) {
			num_1 = num_1 / num;
			num_2 = num_2 / num;
		}
	}
	var ratio = num_1 + ':' + num_2;
	return ratio;
}

export function getDeviceInfo() {
	let winW = 630,
		winH = 460;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	if (document.compatMode === 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
		winW = document.documentElement.offsetWidth;
		winH = document.documentElement.offsetHeight;
	}
	if (window.innerWidth && window.innerHeight) {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}

	let screenW = 640,
		screenH = 480;
	if (parseInt(navigator.appVersion) > 3) {
		screenW = window.screen.width;
		screenH = window.screen.height;
	} else if (navigator.appName === 'Netscape' && parseInt(navigator.appVersion) === 3 && navigator.javaEnabled()) {
		var jToolkit = window.java.awt.Toolkit.getDefaultToolkit();
		var jScreenSize = jToolkit.getScreenSize();
		screenW = jScreenSize.width;
		screenH = jScreenSize.height;
	}

	return {
		dimensions: `${winW}px x ${winH}px`,
		screen: `${screenW}px x ${screenH}px`,
		resolution: `${calculateRatio(window.screen.pixelDepth, window.screen.colorDepth)} (${
			window.screen.colorDepth
		}bit)`,
	};
}

export function getStatusInfo() {
	return {
		cookie_enabled: window.navigator.cookieEnabled,
		online: window.navigator.onLine,
		java_enabled: window.navigator.javaEnabled,
	};
}
