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
		<li>CodeName: <span id="bro-cname">${appCodeName}</span></li>
		<li>Name: <span id="bro-name">${appName}</span></li>
		<li>Version: <span id="bro-ver">${appVersion}</span></li>
		<li>Platform: <span id="bro-plat">${platform}</li>
		<li>Cookies Enabled: <span id="bro-cookie">${cookieEnabled}</span></li>
		<li>Languages: <span id="bro-lang">${language}</span></li>
		<li>Status: <span id="bro-stat">${onLine}</span></li>
		<li>User Agent: <span id="usr-agent">${userAgent}</li>
		
	</ul>
	<h2> Window Info: </h2>
	<ul>
		<li>
			Dimensions: <span id="win-width"></span>px x
			<span id="win-height"></span>px
		</li>
	</ul>
	`;
	$("#netstat-container").html(netStat);

	$("#locateme").click(function () {
		console.log("Locate Me!");
		container = $("#locationinfo");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				container.html(
					`<div class="p-2">
					Latitude: &nbsp;${position.coords.latitude}
				    <br>Longitude: &nbsp;${position.coords.longitude}
					</div>
					`
				);
			});
		} else {
			container.html(
				`<span class='text-danger p-2'>Geolocation is not supported by this browser.</span>`
			);
		}
	});

	fetch("http://gd.geobytes.com/GetCityDetails", {
		headers: {
			accept:
				"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"accept-language": "en-US,en;q=0.9,bn;q=0.8,hi;q=0.7,la;q=0.6",
			"cache-control": "max-age=0",
			"upgrade-insecure-requests": "1",
		},
		referrerPolicy: "no-referrer",
		body: null,
		method: "GET",
		mode: "cors",
		credentials: "omit",
	}).then((response) => {
		console.log(response);
	});
})(jQuery);

$(window).on("load reload resize", function () {
	$("#win-width").text($(window).width());
	$("#win-height").text($(window).height());
});
