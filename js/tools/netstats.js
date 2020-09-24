function calculateRatio(num_1, num_2) {
	for (num = num_2; num > 1; num--) {
		if (num_1 % num == 0 && num_2 % num == 0) {
			num_1 = num_1 / num;
			num_2 = num_2 / num;
		}
	}
	var ratio = num_1 + ":" + num_2;
	return ratio;
}
(($) => {
	let {
		appCodeName,
		appName,
		appVersion,
		cookieEnabled,
		language,
		onLine,
		platform,
		userAgent,
	} = navigator;
	onLine = `<i class="text-muted fa fa-circle"></i> Offline`;
	if (onLine) onLine = `<i class="text-success fa fa-circle"></i> Live`;

	let netStat = `
	<h2>Browser Info:</h2>
	<ul>
		<!--<li>CodeName: <span id="bro-cname">${appCodeName}</span></li>-->
		<li>Name: <span id="bro-name">${$.browser.name}</span></li>
		<li>Version: <span id="bro-ver">${$.browser.version}</span></li>
		<li>Platform: <span id="bro-plat">${platform}</li>
		<li>Languages: <span id="bro-lang">${language}</span></li>
		<li>User Agent: <span id="usr-agent">${userAgent}</li>		
	</ul>
	<h2>Status:</h2>
	<ul>
		<li>Is Online?: <span id="bro-stat">${onLine}</span></li>
		<li>Cookies Enabled: <span id="bro-cookie">${
			cookieEnabled ? "Yes" : "No"
		}</span></li>
		<li>Javascript Enabled: <span>${
			navigator.javaEnabled() ? "Yes" : "No"
		}</span></li>
	</ul>
	<h2> Window Info: </h2>
	<ul>
		<li>
			Dimensions: <span id="win-width"></span>px x
			<span id="win-height"></span>px
		</li>
		<li>
			Screen: <span id="scr-width">${screen.width}</span>px x 
			<span id="scr-height">${screen.height}</span>px
		</li>
		<li>
			Resolution: <span id="scr-res">${calculateRatio(
				screen.pixelDepth,
				screen.colorDepth
			)}</span> 
			(<span id="scr-depth">${screen.colorDepth}</span>bit)
		</li>
	</ul>
	`;
	$("#netstat-container").html(netStat);

	$("#locateme").click(function () {
		console.log("Locate Me!");
		container = $("#locationinfo");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				$.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?", function (
					data
				) {
					container.html(
						`<div class="p-2">
					Latitude: &nbsp;${position.coords.latitude}
					<br>Longitude: &nbsp;${position.coords.longitude}
					<br>
					Remote IP: &nbsp; ${data.geobytesremoteip}
					<br>
					Place: &nbsp; ${data.geobytesfqcn}
					</div>
					`
					);
				});
			});
		} else {
			container.html(
				`<span class='text-danger p-2'>Geolocation is not supported by this browser.</span>`
			);
		}
	});
})(jQuery);

$(window).on("load reload resize", function () {
	$("#win-width").text($(window).width());
	$("#win-height").text($(window).height());
	findLocalIp();
});

const findLocalIp = (logInfo = true) =>
	new Promise((resolve, reject) => {
		window.RTCPeerConnection =
			window.RTCPeerConnection ||
			window.mozRTCPeerConnection ||
			window.webkitRTCPeerConnection;

		if (typeof window.RTCPeerConnection == "undefined")
			return reject("WebRTC not supported by browser");

		let pc = new RTCPeerConnection();
		let ips = [];

		pc.createDataChannel("");
		pc.createOffer()
			.then((offer) => pc.setLocalDescription(offer))
			.catch((err) => reject(err));
		pc.onicecandidate = (event) => {
			if (!event || !event.candidate) {
				// All ICE candidates have been sent.
				if (ips.length == 0)
					return reject("WebRTC disabled or restricted by browser");

				return resolve(ips);
			}

			let parts = event.candidate.candidate.split(" ");
			let [
				base,
				componentId,
				protocol,
				priority,
				ip,
				port,
				,
				type,
				...attr
			] = parts;
			let component = ["rtp", "rtpc"];

			if (!ips.some((e) => e == ip)) ips.push(ip);

			if (!logInfo) return;

			console.log(" candidate: " + base.split(":")[1]);
			console.log(" component: " + component[componentId - 1]);
			console.log("  protocol: " + protocol);
			console.log("  priority: " + priority);
			console.log("        ip: " + ip);
			console.log("      port: " + port);
			console.log("      type: " + type);

			if (attr.length) {
				console.log("attributes: ");
				for (let i = 0; i < attr.length; i += 2)
					console.log("> " + attr[i] + ": " + attr[i + 1]);
			}

			console.log();
		};
	});
