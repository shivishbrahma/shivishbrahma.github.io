import React, { createRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Globe3D.scss";

function sign(a) {
	return a > 0 ? 1 : a < 0 ? -1 : 0;
}

function parseColor(text) {
	let hex = parseInt(text.substr(1), 16);
	return [Math.floor(hex / 65536), Math.floor((hex / 256) % 256), Math.floor(hex % 256)];
}

const Globe3DTag = (props) => {
	const { constants, text, weight, x, y, z } = props;

	const tagRef = createRef();

	// console.log(props);

	// function drawObjs() {
	const filters = typeof document.body.filters == "object",
		w = document.body.clientWidth,
		h = document.body.clientHeight;
	let color = "currentColor",
		width = 0,
		height = 0;

	// 	const newObjs = objs.map(function (o, i) {
	if (!tagRef) {
		let c = 1;
		for (let i in constants.colorMax) {
			c = c * 256 + Math.floor((constants.colorMax[i] - constants.colorMin[i]) * weight + constants.colorMin[i]);
		}
		color = "#" + c.toString(16).substr(1);
		width = 0;
		height = 0;
	}

	const size = constants.fontSize + z * constants.fontShift;
	const factor = size / constants.fontSize;
	if (width === 0 && tagRef && tagRef.current) {
		width = tagRef.current.clientWidth / factor;
		height = tagRef.current.clientHeight / factor;
	}
	const fontSize = Math.round(size),
		screenX = (w * (x * constants.xScale + 1)) / 2,
		left = screenX - (width * factor) / 2,
		screenY = (h * (y * constants.yScale + 1)) / 2,
		top = screenY - (height * factor) / 2,
		zIndex = z >= 0 ? 10 : 5;

	console.log(width);

	// 		const opa = (Math.sin((o.z * Math.PI) / 2) / 2 + 0.5) * (1 - opaque) + opaque;
	// 		if (!filters) o.opacity = opa;
	// 		return o;
	// 	});

	// 	setObjs(newObjs);
	// }

	return (
		<span
			className="Globe3D__Tag"
			ref={tagRef}
			style={{
				fontWeight: "bold",
				position: "absolute",
				color,
				fontSize,
				left,
				top,
				zIndex,
			}}
		>
			{text}
		</span>
	);
};

Globe3DTag.defaultProps = {};

function Globe3D({
	tags,
	callback,
	fontSize,
	fontShift,
	colorMax,
	colorMin,
	colorBgr,
	interval,
	stepAngle,
	idleMotion,
	opaque,
	nonSense,
	xScale,
	yScale,
	...otherProps
}) {
	let w = 0,
		h = 0;
	let lastX,
		lastY,
		rho = 0,
		theta = 0,
		timer = null,
		containerTop,
		timing = [1],
		timingMax = 8,
		container;

	const [closest, setClosest] = React.useState(null);
	const [objs, setObjs] = React.useState([]);
    const screenRef = React.createRef();

	const objsRef = React.useRef([]);
	if (objsRef.current.length !== tags.length) {
		objsRef.current = Array(tags.length)
			.fill()
			.map((_, i) => objsRef.current[i] || createRef());
	}

	function onMouseMoveEvent(evt) {
		if (!evt) {
			evt = window.event;
		}
	}

	function onMouseLeaveEvent(evt) {
		if (!evt) {
			evt = window.event;
		}
		rho = idleMotion;
		setClosest(null);
	}

	React.useEffect(() => {
		spin((Math.random() * 2 - 1) * Math.PI);
		step((Math.random() * 2 - 1) * Math.PI);
		spin((Math.random() * 2 - 1) * Math.PI);
	}, []);

	function spin(obj, angle) {
		const { x, y } = obj;
		const newX = x * Math.cos(angle) - y * Math.sin(angle),
			newY = x * Math.sin(angle) + y * Math.cos(angle);
		return {
			...obj,
			x: newX,
			y: newY,
		};
	}

	function step(obj, angle) {
		const { x, z } = obj;
		const newX = x * Math.cos(angle) - z * Math.sin(angle),
			newZ = x * Math.sin(angle) + z * Math.cos(angle);
		return {
			...obj,
			x: newX,
			z: newZ,
		};
	}

	function setupElements(elems) {
		const newObjs = [];
		for (let eli in elems) {
			const c = {};
			c.text = elems[eli].text;
			c.id = elems[eli].id;
			c.weight = elems[eli].weight;
			c.x = 1;
			c.y = 0;
			c.z = 0;
			spin(c, (Math.random() * 2 - 1) * Math.PI);
			step(c, (Math.random() * 2 - 1) * Math.PI);
			spin(c, (Math.random() * 2 - 1) * Math.PI);
			newObjs.push(c);
		}
		setObjs(newObjs);
	}

	useEffect(() => {
		setupElements(tags);
		return () => {};
	}, [tags]);

	useEffect(() => {});

	return (
		<div className="Globe3D" ref={screenRef}>
			<div
				className="Globe3D__container"
				style={{
					backgroundColor: colorBgr,
				}}
			>
				{objs.map((tag, i) => {
					const constants = {
						fontSize,
						fontShift,
						colorMax,
						colorMin,
						xScale,
						yScale,
					};
					return <Globe3DTag key={i} constants={constants} {...tag} />;
				})}
			</div>
		</div>
	);
}

Globe3D.propTypes = {
	callback: PropTypes.func,
	fontSize: PropTypes.number,
	fontShift: PropTypes.number,
};

Globe3D.defaultProps = {
	callback: function (id) {
		alert(id);
	},
	fontSize: 14,
	fontShift: 7,
	colorMax: parseColor("#000000"),
	colorMin: parseColor("#C0C0C0"),
	colorBgr: "transparent",
	interval: 50,
	stepAngle: 0.08722,
	idleMotion: 0.2,
	opaque: 0.4,
	nonSense: 0.025,
	xScale: 0.9,
	yScale: 0.9,
};

export default Globe3D;
