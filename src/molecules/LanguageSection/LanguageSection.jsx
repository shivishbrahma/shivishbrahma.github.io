import React from "react";
import Globe3D from "../../atoms/Globe3D/Globe3D";
import PageSection from "../../atoms/PageSection/PageSection";
// import PropTypes from "prop-types";

function LanguageSection({ ...otherProps }) {
	const elems = [];
	elems.push({ text: "Az", id: "1", weight: 0.1 });
	elems.push({ text: "Vedi", id: "2", weight: 0.1 });
	elems.push({ text: "Glagol", id: "3", weight: 0.1 });
	elems.push({ text: "Dobro", id: "4", weight: 0.1 });
	elems.push({ text: "Est", id: "5", weight: 0.1 });
	elems.push({ text: "Zelo", id: "6", weight: 0.1 });
	elems.push({ text: "Zemla", id: "7", weight: 0.1 });
	elems.push({ text: "Izhe", id: "8", weight: 0.1 });
	elems.push({ text: "Theta", id: "9", weight: 0.1 });
	elems.push({ text: "I", id: "10", weight: 0.5 });
	elems.push({ text: "Kako", id: "20", weight: 0.5 });
	elems.push({ text: "Ludi", id: "30", weight: 0.5 });
	elems.push({ text: "Myslete", id: "40", weight: 0.5 });
	elems.push({ text: "Nash", id: "50", weight: 0.5 });
	elems.push({ text: "Ksi", id: "60", weight: 0.5 });
	elems.push({ text: "On", id: "70", weight: 0.5 });
	elems.push({ text: "Pokoi", id: "80", weight: 0.5 });
	elems.push({ text: "Cherv", id: "90", weight: 0.5 });
	elems.push({ text: "Rtsy", id: "100", weight: 1.0 });
	elems.push({ text: "Slovo", id: "200", weight: 1.0 });
	elems.push({ text: "Tverdo", id: "300", weight: 1.0 });
	elems.push({ text: "Uk", id: "400", weight: 1.0 });
	elems.push({ text: "Fert", id: "500", weight: 1.0 });
	elems.push({ text: "Kha", id: "600", weight: 1.0 });
	elems.push({ text: "Psi", id: "700", weight: 1.0 });
	elems.push({ text: "Omega", id: "800", weight: 1.0 });
	elems.push({ text: "Tsy", id: "900", weight: 1.0 });

	return (
		<PageSection sectionTitle="Programming Languages" {...otherProps}>
			<Globe3D tags={elems} />
		</PageSection>
	);
}

LanguageSection.propTypes = {};

export default LanguageSection;
