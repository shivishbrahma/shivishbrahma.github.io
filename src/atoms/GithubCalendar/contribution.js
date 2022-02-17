const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'User-Agent': 'Web/2.0',
    "Allow-Control-Allow-Origin": "*",
    "mode": "no-cors"
};

export async function getContributionData(username) {
	const response = await window.fetch(`https://shivishbrahma-rest-api.netlify.app/github/contributions/${username}`, {
		method: 'GET',
		headers: headers,
	});
	const data = await response.json();
	if (data.message) throw new Error(data.message);
	return data.contributions;
}
