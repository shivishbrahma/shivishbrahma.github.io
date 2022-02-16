const headers = {
	// 'Content-Type': 'application/json',
	// Accept: 'application/json',
	'User-Agent': 'Web/2.0',
	Authorization: 'Bearer ' + process.env.REACT_APP_GITHUB_TOKEN,
};

function createCalendarData(graphqlData) {
	const data = [],
		LEVELS = ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'];
	graphqlData.contributionsCollection.contributionCalendar.weeks.forEach((week) => {
		week.contributionDays.forEach((day) => {
			data.push({
				date: day.date,
				count: day.contributionCount,
				color: day.color,
				level: LEVELS.findIndex((level) => level === day.contributionLevel),
			});
		});
	});
	return data;
}

export async function getContributionData(username) {
	console.log(process.env.REACT_APP_GITHUB_TOKEN);
	const body = {
		query: `query {
                user(login: "${username}") {
                  name
                  contributionsCollection {
                    contributionCalendar {
                      colors
                      totalContributions
                      weeks {
                        contributionDays {
                          contributionCount
                          contributionLevel
                          date
                          weekday
                        }
                        firstDay
                      }
                    }
                  }
                }
              }`,
	};

	const response = await window.fetch('https://api.github.com/graphql', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: headers,
	});
	const data = await response.json();
	if (data.message) throw new Error(data.message);
	return createCalendarData(data.data.user);
}
