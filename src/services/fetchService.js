const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	'User-Agent': 'Web/2.0',
};

export async function loadMockup(file) {
	try {
		const response = await window.fetch(`${process.env.PUBLIC_URL}/data/${file}.json`, {
			method: 'GET',
			headers: headers,
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}
