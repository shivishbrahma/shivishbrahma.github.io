import React from 'react';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import getYear from 'date-fns/getYear';
import parseISO from 'date-fns/parseISO';

import styles from './styles.module.css';

import {
	generateEmptyData,
	getClassName,
	getMonthLabels,
	getTheme,
	groupByWeeks,
	MIN_DISTANCE_MONTH_LABELS,
	NAMESPACE,
	DEFAULT_WEEKDAY_LABELS,
	DEFAULT_LABELS,
} from './util.js';

function ActivityCalendar({
	data,
	blockMargin,
	blockRadius,
	blockSize,
	children,
	color,
	dateFormat,
	eventHandlers,
	fontSize,
	hideColorLegend,
	hideMonthLabels,
	hideTotalCount,
	labels: labelsProp,
	loading,
	showWeekdayLabels,
	style,
	theme: themeProp,
	weekStart,
}) {
	if (loading) data = generateEmptyData();

	if (data.length === 0) return null;

	const weeks = groupByWeeks(data, weekStart);
	const totalCount = data.reduce((sum, day) => sum + day.count, 0);
	const year = getYear(parseISO(data[0].date));

	const theme = getTheme(themeProp, color);
	const labels = Object.assign({}, DEFAULT_LABELS, labelsProp);
	const textHeight = hideMonthLabels ? 0 : fontSize + 2 * blockMargin;

	function getDimensions() {
		return {
			width: weeks.length * (blockSize + blockMargin) - blockMargin,
			height: textHeight + (blockSize + blockMargin) * 7 - blockMargin,
		};
	}

	function getTooltipMessage(contribution) {
		const date = format(parseISO(contribution.date), dateFormat);
		return `<strong>${contribution.count} contributions</strong> on ${date}`;
	}

	function getEventHandlers(data) {
		return Object.keys(eventHandlers).reduce(
			(handlers, key) => ({
				...handlers,
				[key]: (event) => eventHandlers[key].event(data),
			}),
			{}
		);
	}

	function renderLabels() {
		const style = {
			fontSize,
		};

		if (!showWeekdayLabels && hideMonthLabels) {
			return null;
		}

		return (
			<>
				{showWeekdayLabels && (
					<g className={getClassName('legend-weekday')} style={style}>
						{weeks[1].map((day, y) => {
							if (!day || y % 2 === 0) {
								return null;
							}

							const dayIndex = getDay(parseISO(day.date));

							return (
								<text
									x={-2 * blockMargin}
									y={textHeight + (fontSize / 2 + blockMargin) + (blockSize + blockMargin) * y}
									textAnchor="end"
									key={day.date}
								>
									{labels.weekdays ? labels.weekdays[dayIndex] : DEFAULT_WEEKDAY_LABELS[dayIndex]}
								</text>
							);
						})}
					</g>
				)}
				{!hideMonthLabels && (
					<g className={getClassName('legend-month')} style={style}>
						{getMonthLabels(weeks, labels.months).map(({ text, x }, index, labels) => {
							// Skip the first month label if there's not enough space to the next one
							if (index === 0 && labels[1] && labels[1].x - x <= MIN_DISTANCE_MONTH_LABELS) {
								return null;
							}

							return (
								<text x={(blockSize + blockMargin) * x} alignmentBaseline="hanging" key={x}>
									{text}
								</text>
							);
						})}
					</g>
				)}
			</>
		);
	}

	function renderBlocks() {
		return weeks
			.map((week, weekIndex) =>
				week.map((day, dayIndex) => {
					if (!day) {
						return null;
					}

					const style = loading
						? {
								animation: `${styles.loadingAnimation} 1.5s ease-in-out infinite`,
								animationDelay: `${weekIndex * 20 + dayIndex * 20}ms`,
						  }
						: undefined;

					return (
						<rect
							{...getEventHandlers(day)}
							x={0}
							y={textHeight + (blockSize + blockMargin) * dayIndex}
							width={blockSize}
							height={blockSize}
							fill={theme[`level${day.level}`]}
							rx={blockRadius}
							ry={blockRadius}
							className={styles.block}
							data-date={day.date}
							data-tip={children ? getTooltipMessage(day) : undefined}
							key={day.date}
							style={style}
						/>
					);
				})
			)
			.map((week, x) => (
				<g key={x} transform={`translate(${(blockSize + blockMargin) * x}, 0)`}>
					{week}
				</g>
			));
	}

	function renderFooter() {
		if (hideTotalCount && hideColorLegend) {
			return null;
		}

		return (
			<footer className={getClassName('footer', styles.footer)} style={{ marginTop: 2 * blockMargin, fontSize }}>
				{/* Placeholder */}
				{loading && <div>&nbsp;</div>}

				{!loading && !hideTotalCount && (
					<div className={getClassName('count')}>
						{labels.totalCount
							? labels.totalCount
									.replace('{{count}}', String(totalCount))
									.replace('{{year}}', String(year))
							: `${totalCount} contributions in ${year}`}
					</div>
				)}

				{!loading && !hideColorLegend && (
					<div className={getClassName('legend-colors', styles.legendColors)}>
						<span style={{ marginRight: '0.4em' }}>{labels.legend.less ?? 'Less'}</span>
						{Array(5)
							.fill(undefined)
							.map((_, index) => (
								<svg width={blockSize} height={blockSize} key={index}>
									<rect
										width={blockSize}
										height={blockSize}
										fill={theme[`level${index}`]}
										rx={blockRadius}
										ry={blockRadius}
									/>
								</svg>
							))}
						<span style={{ marginLeft: '0.4em' }}>{labels.legend.more ?? 'More'}</span>
					</div>
				)}
			</footer>
		);
	}

	const { width, height } = getDimensions();
	const additionalStyles = {
		maxWidth: width,
		// Required for correct colors in CSS loading animation
		[`--${NAMESPACE}-loading`]: theme.level0,
		[`--${NAMESPACE}-loading-active`]: tinycolor(theme.level0).darken(8).toString(),
	};

	return (
		<article className={NAMESPACE} style={{ ...style, ...additionalStyles }}>
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				className={getClassName('calendar', styles.calendar)}
			>
				{!loading && renderLabels()}
				{renderBlocks()}
			</svg>
			{renderFooter()}
			{children}
		</article>
	);
}

ActivityCalendar.propTypes = {
	blockMargin: PropTypes.number,
	blockRadius: PropTypes.number,
	blockSize: PropTypes.number,
	children: PropTypes.node,
	dateFormat: PropTypes.string,
	fontSize: PropTypes.number,
	hideColorLegend: PropTypes.bool,
	hideMonthLabels: PropTypes.bool,
	hideTotalCount: PropTypes.bool,
	labels: PropTypes.shape({
		legend: PropTypes.shape({
			less: PropTypes.string,
			more: PropTypes.string,
		}),
		totalCount: PropTypes.string,
	}),
	loading: PropTypes.bool,
	theme: PropTypes.shape({
		level0: PropTypes.string,
		level1: PropTypes.string,
		level2: PropTypes.string,
		level3: PropTypes.string,
		level4: PropTypes.string,
		level5: PropTypes.string,
	}),
};

ActivityCalendar.defaultProps = {
	blockMargin: 4,
	blockRadius: 2,
	blockSize: 12,
	color: undefined,
	dateFormat: 'MMM do, yyyy',
	eventHandlers: {},
	fontSize: 14,
	hideColorLegend: false,
	hideMonthLabels: false,
	hideTotalCount: false,
	loading: false,
	showWeekdayLabels: false,
	style: {},
	weekStart: 0,
};

export const Skeleton = (props) => <ActivityCalendar data={[]} {...props} />;

export default ActivityCalendar;

/**
 * <ActivityCalendar
  blockMargin={5}
  blockRadius={7}
  blockSize={14}
  data={[
    {
      count: 0,
      date: '2022-01-01',
      level: 0
    },
    {
      count: 0,
      date: '2022-01-02',
      level: 0
    },
    {
      count: 0,
      date: '2022-01-03',
      level: 0
    },
    {
      count: 0,
      date: '2022-01-04',
      level: 0
    },
    {
      count: 0,
      date: '2022-01-05',
      level: 0
    },
    {
      count: 1,
      date: '2022-01-06',
      level: 1
    },
    {
      count: 1,
      date: '2022-01-07',
      level: 1
    },
    {
      count: 10,
      date: '2022-01-08',
      level: 4
    },
    {
      count: 9,
      date: '2022-01-09',
      level: 4
    },
    {
      count: 2,
      date: '2022-01-10',
      level: 1
    },
    {
      count: 5,
      date: '2022-01-11',
      level: 2
    },
    {
      count: 1,
      date: '2022-01-12',
      level: 1
    },
    {
      count: 1,
      date: '2022-01-13',
      level: 1
    },
    {
      count: 0,
      date: '2022-01-14',
      level: 0
    },
    {
      count: 6,
      date: '2022-01-15',
      level: 3
    },
    {
      count: 4,
      date: '2022-01-16',
      level: 2
    },
    {
      count: 0,
      date: '2022-01-17',
      level: 0
    },
    {
      count: 7,
      date: '2022-01-18',
      level: 3
    },
    {
      count: 1,
      date: '2022-01-19',
      level: 1
    },
    {
      count: 6,
      date: '2022-01-20',
      level: 3
    },
    {
      count: 6,
      date: '2022-01-21',
      level: 3
    },
    {
      count: 0,
      date: '2022-01-22',
      level: 0
    },
    {
      count: 2,
      date: '2022-01-23',
      level: 1
    },
    {
      count: 0,
      date: '2022-01-24',
      level: 0
    },
    {
      count: 0,
      date: '2022-01-25',
      level: 0
    },
    {
      count: 4,
      date: '2022-01-26',
      level: 2
    },
    {
      count: 0,
      date: '2022-01-27',
      level: 0
    },
    {
      count: 0,
      date: '2022-01-28',
      level: 0
    },
    {
      count: 5,
      date: '2022-01-29',
      level: 2
    },
    {
      count: 1,
      date: '2022-01-30',
      level: 1
    },
    {
      count: 5,
      date: '2022-01-31',
      level: 2
    },
    {
      count: 0,
      date: '2022-02-01',
      level: 0
    },
    {
      count: 4,
      date: '2022-02-02',
      level: 2
    },
    {
      count: 1,
      date: '2022-02-03',
      level: 1
    },
    {
      count: 4,
      date: '2022-02-04',
      level: 2
    },
    {
      count: 4,
      date: '2022-02-05',
      level: 2
    },
    {
      count: 3,
      date: '2022-02-06',
      level: 2
    },
    {
      count: 1,
      date: '2022-02-07',
      level: 1
    },
    {
      count: 3,
      date: '2022-02-08',
      level: 2
    },
    {
      count: 3,
      date: '2022-02-09',
      level: 2
    },
    {
      count: 0,
      date: '2022-02-10',
      level: 0
    },
    {
      count: 3,
      date: '2022-02-11',
      level: 2
    },
    {
      count: 0,
      date: '2022-02-12',
      level: 0
    },
    {
      count: 5,
      date: '2022-02-13',
      level: 2
    },
    {
      count: 0,
      date: '2022-02-14',
      level: 0
    },
    {
      count: 1,
      date: '2022-02-15',
      level: 1
    },
    {
      count: 6,
      date: '2022-02-16',
      level: 3
    },
    {
      count: 2,
      date: '2022-02-17',
      level: 1
    },
    {
      count: 4,
      date: '2022-02-18',
      level: 2
    },
    {
      count: 5,
      date: '2022-02-19',
      level: 2
    },
    {
      count: 1,
      date: '2022-02-20',
      level: 1
    },
    {
      count: 3,
      date: '2022-02-21',
      level: 2
    },
    {
      count: 0,
      date: '2022-02-22',
      level: 0
    },
    {
      count: 2,
      date: '2022-02-23',
      level: 1
    },
    {
      count: 3,
      date: '2022-02-24',
      level: 2
    },
    {
      count: 6,
      date: '2022-02-25',
      level: 3
    },
    {
      count: 0,
      date: '2022-02-26',
      level: 0
    },
    {
      count: 7,
      date: '2022-02-27',
      level: 3
    },
    {
      count: 0,
      date: '2022-02-28',
      level: 0
    },
    {
      count: 0,
      date: '2022-03-01',
      level: 0
    },
    {
      count: 0,
      date: '2022-03-02',
      level: 0
    },
    {
      count: 4,
      date: '2022-03-03',
      level: 2
    },
    {
      count: 0,
      date: '2022-03-04',
      level: 0
    },
    {
      count: 3,
      date: '2022-03-05',
      level: 2
    },
    {
      count: 2,
      date: '2022-03-06',
      level: 1
    },
    {
      count: 0,
      date: '2022-03-07',
      level: 0
    },
    {
      count: 0,
      date: '2022-03-08',
      level: 0
    },
    {
      count: 0,
      date: '2022-03-09',
      level: 0
    },
    {
      count: 4,
      date: '2022-03-10',
      level: 2
    },
    {
      count: 0,
      date: '2022-03-11',
      level: 0
    },
    {
      count: 5,
      date: '2022-03-12',
      level: 2
    },
    {
      count: 3,
      date: '2022-03-13',
      level: 2
    },
    {
      count: 0,
      date: '2022-03-14',
      level: 0
    },
    {
      count: 1,
      date: '2022-03-15',
      level: 1
    },
    {
      count: 5,
      date: '2022-03-16',
      level: 2
    },
    {
      count: 1,
      date: '2022-03-17',
      level: 1
    },
    {
      count: 0,
      date: '2022-03-18',
      level: 0
    },
    {
      count: 7,
      date: '2022-03-19',
      level: 3
    },
    {
      count: 2,
      date: '2022-03-20',
      level: 1
    },
    {
      count: 0,
      date: '2022-03-21',
      level: 0
    },
    {
      count: 0,
      date: '2022-03-22',
      level: 0
    },
    {
      count: 1,
      date: '2022-03-23',
      level: 1
    },
    {
      count: 3,
      date: '2022-03-24',
      level: 2
    },
    {
      count: 0,
      date: '2022-03-25',
      level: 0
    },
    {
      count: 1,
      date: '2022-03-26',
      level: 1
    },
    {
      count: 1,
      date: '2022-03-27',
      level: 1
    },
    {
      count: 4,
      date: '2022-03-28',
      level: 2
    },
    {
      count: 1,
      date: '2022-03-29',
      level: 1
    },
    {
      count: 0,
      date: '2022-03-30',
      level: 0
    },
    {
      count: 0,
      date: '2022-03-31',
      level: 0
    },
    {
      count: 2,
      date: '2022-04-01',
      level: 1
    },
    {
      count: 4,
      date: '2022-04-02',
      level: 2
    },
    {
      count: 0,
      date: '2022-04-03',
      level: 0
    },
    {
      count: 4,
      date: '2022-04-04',
      level: 2
    },
    {
      count: 8,
      date: '2022-04-05',
      level: 4
    },
    {
      count: 6,
      date: '2022-04-06',
      level: 3
    },
    {
      count: 5,
      date: '2022-04-07',
      level: 2
    },
    {
      count: 4,
      date: '2022-04-08',
      level: 2
    },
    {
      count: 4,
      date: '2022-04-09',
      level: 2
    },
    {
      count: 0,
      date: '2022-04-10',
      level: 0
    },
    {
      count: 0,
      date: '2022-04-11',
      level: 0
    },
    {
      count: 0,
      date: '2022-04-12',
      level: 0
    },
    {
      count: 0,
      date: '2022-04-13',
      level: 0
    },
    {
      count: 0,
      date: '2022-04-14',
      level: 0
    },
    {
      count: 3,
      date: '2022-04-15',
      level: 2
    },
    {
      count: 0,
      date: '2022-04-16',
      level: 0
    },
    {
      count: 0,
      date: '2022-04-17',
      level: 0
    },
    {
      count: 1,
      date: '2022-04-18',
      level: 1
    },
    {
      count: 0,
      date: '2022-04-19',
      level: 0
    },
    {
      count: 7,
      date: '2022-04-20',
      level: 3
    },
    {
      count: 3,
      date: '2022-04-21',
      level: 2
    },
    {
      count: 1,
      date: '2022-04-22',
      level: 1
    },
    {
      count: 6,
      date: '2022-04-23',
      level: 3
    },
    {
      count: 2,
      date: '2022-04-24',
      level: 1
    },
    {
      count: 4,
      date: '2022-04-25',
      level: 2
    },
    {
      count: 5,
      date: '2022-04-26',
      level: 2
    },
    {
      count: 6,
      date: '2022-04-27',
      level: 3
    },
    {
      count: 1,
      date: '2022-04-28',
      level: 1
    },
    {
      count: 0,
      date: '2022-04-29',
      level: 0
    },
    {
      count: 0,
      date: '2022-04-30',
      level: 0
    },
    {
      count: 5,
      date: '2022-05-01',
      level: 2
    },
    {
      count: 4,
      date: '2022-05-02',
      level: 2
    },
    {
      count: 0,
      date: '2022-05-03',
      level: 0
    },
    {
      count: 2,
      date: '2022-05-04',
      level: 1
    },
    {
      count: 0,
      date: '2022-05-05',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-06',
      level: 0
    },
    {
      count: 2,
      date: '2022-05-07',
      level: 1
    },
    {
      count: 0,
      date: '2022-05-08',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-09',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-10',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-11',
      level: 0
    },
    {
      count: 7,
      date: '2022-05-12',
      level: 3
    },
    {
      count: 4,
      date: '2022-05-13',
      level: 2
    },
    {
      count: 4,
      date: '2022-05-14',
      level: 2
    },
    {
      count: 3,
      date: '2022-05-15',
      level: 2
    },
    {
      count: 2,
      date: '2022-05-16',
      level: 1
    },
    {
      count: 0,
      date: '2022-05-17',
      level: 0
    },
    {
      count: 1,
      date: '2022-05-18',
      level: 1
    },
    {
      count: 3,
      date: '2022-05-19',
      level: 2
    },
    {
      count: 1,
      date: '2022-05-20',
      level: 1
    },
    {
      count: 0,
      date: '2022-05-21',
      level: 0
    },
    {
      count: 3,
      date: '2022-05-22',
      level: 2
    },
    {
      count: 8,
      date: '2022-05-23',
      level: 4
    },
    {
      count: 7,
      date: '2022-05-24',
      level: 3
    },
    {
      count: 0,
      date: '2022-05-25',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-26',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-27',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-28',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-29',
      level: 0
    },
    {
      count: 0,
      date: '2022-05-30',
      level: 0
    },
    {
      count: 2,
      date: '2022-05-31',
      level: 1
    },
    {
      count: 0,
      date: '2022-06-01',
      level: 0
    },
    {
      count: 0,
      date: '2022-06-02',
      level: 0
    },
    {
      count: 6,
      date: '2022-06-03',
      level: 3
    },
    {
      count: 1,
      date: '2022-06-04',
      level: 1
    },
    {
      count: 4,
      date: '2022-06-05',
      level: 2
    },
    {
      count: 0,
      date: '2022-06-06',
      level: 0
    },
    {
      count: 0,
      date: '2022-06-07',
      level: 0
    },
    {
      count: 3,
      date: '2022-06-08',
      level: 2
    },
    {
      count: 4,
      date: '2022-06-09',
      level: 2
    },
    {
      count: 0,
      date: '2022-06-10',
      level: 0
    },
    {
      count: 3,
      date: '2022-06-11',
      level: 2
    },
    {
      count: 2,
      date: '2022-06-12',
      level: 1
    },
    {
      count: 1,
      date: '2022-06-13',
      level: 1
    },
    {
      count: 0,
      date: '2022-06-14',
      level: 0
    },
    {
      count: 1,
      date: '2022-06-15',
      level: 1
    },
    {
      count: 0,
      date: '2022-06-16',
      level: 0
    },
    {
      count: 2,
      date: '2022-06-17',
      level: 1
    },
    {
      count: 0,
      date: '2022-06-18',
      level: 0
    },
    {
      count: 0,
      date: '2022-06-19',
      level: 0
    },
    {
      count: 4,
      date: '2022-06-20',
      level: 2
    },
    {
      count: 3,
      date: '2022-06-21',
      level: 2
    },
    {
      count: 0,
      date: '2022-06-22',
      level: 0
    },
    {
      count: 6,
      date: '2022-06-23',
      level: 3
    },
    {
      count: 8,
      date: '2022-06-24',
      level: 4
    },
    {
      count: 0,
      date: '2022-06-25',
      level: 0
    },
    {
      count: 0,
      date: '2022-06-26',
      level: 0
    },
    {
      count: 0,
      date: '2022-06-27',
      level: 0
    },
    {
      count: 0,
      date: '2022-06-28',
      level: 0
    },
    {
      count: 1,
      date: '2022-06-29',
      level: 1
    },
    {
      count: 0,
      date: '2022-06-30',
      level: 0
    },
    {
      count: 5,
      date: '2022-07-01',
      level: 2
    },
    {
      count: 0,
      date: '2022-07-02',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-03',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-04',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-05',
      level: 0
    },
    {
      count: 4,
      date: '2022-07-06',
      level: 2
    },
    {
      count: 0,
      date: '2022-07-07',
      level: 0
    },
    {
      count: 3,
      date: '2022-07-08',
      level: 2
    },
    {
      count: 0,
      date: '2022-07-09',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-10',
      level: 0
    },
    {
      count: 6,
      date: '2022-07-11',
      level: 3
    },
    {
      count: 0,
      date: '2022-07-12',
      level: 0
    },
    {
      count: 2,
      date: '2022-07-13',
      level: 1
    },
    {
      count: 3,
      date: '2022-07-14',
      level: 2
    },
    {
      count: 6,
      date: '2022-07-15',
      level: 3
    },
    {
      count: 0,
      date: '2022-07-16',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-17',
      level: 0
    },
    {
      count: 1,
      date: '2022-07-18',
      level: 1
    },
    {
      count: 8,
      date: '2022-07-19',
      level: 4
    },
    {
      count: 4,
      date: '2022-07-20',
      level: 2
    },
    {
      count: 0,
      date: '2022-07-21',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-22',
      level: 0
    },
    {
      count: 9,
      date: '2022-07-23',
      level: 4
    },
    {
      count: 0,
      date: '2022-07-24',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-25',
      level: 0
    },
    {
      count: 0,
      date: '2022-07-26',
      level: 0
    },
    {
      count: 5,
      date: '2022-07-27',
      level: 2
    },
    {
      count: 2,
      date: '2022-07-28',
      level: 1
    },
    {
      count: 4,
      date: '2022-07-29',
      level: 2
    },
    {
      count: 4,
      date: '2022-07-30',
      level: 2
    },
    {
      count: 4,
      date: '2022-07-31',
      level: 2
    },
    {
      count: 3,
      date: '2022-08-01',
      level: 2
    },
    {
      count: 2,
      date: '2022-08-02',
      level: 1
    },
    {
      count: 5,
      date: '2022-08-03',
      level: 2
    },
    {
      count: 2,
      date: '2022-08-04',
      level: 1
    },
    {
      count: 4,
      date: '2022-08-05',
      level: 2
    },
    {
      count: 3,
      date: '2022-08-06',
      level: 2
    },
    {
      count: 5,
      date: '2022-08-07',
      level: 2
    },
    {
      count: 6,
      date: '2022-08-08',
      level: 3
    },
    {
      count: 3,
      date: '2022-08-09',
      level: 2
    },
    {
      count: 0,
      date: '2022-08-10',
      level: 0
    },
    {
      count: 4,
      date: '2022-08-11',
      level: 2
    },
    {
      count: 0,
      date: '2022-08-12',
      level: 0
    },
    {
      count: 7,
      date: '2022-08-13',
      level: 3
    },
    {
      count: 3,
      date: '2022-08-14',
      level: 2
    },
    {
      count: 0,
      date: '2022-08-15',
      level: 0
    },
    {
      count: 2,
      date: '2022-08-16',
      level: 1
    },
    {
      count: 5,
      date: '2022-08-17',
      level: 2
    },
    {
      count: 6,
      date: '2022-08-18',
      level: 3
    },
    {
      count: 0,
      date: '2022-08-19',
      level: 0
    },
    {
      count: 2,
      date: '2022-08-20',
      level: 1
    },
    {
      count: 5,
      date: '2022-08-21',
      level: 2
    },
    {
      count: 4,
      date: '2022-08-22',
      level: 2
    },
    {
      count: 0,
      date: '2022-08-23',
      level: 0
    },
    {
      count: 0,
      date: '2022-08-24',
      level: 0
    },
    {
      count: 3,
      date: '2022-08-25',
      level: 2
    },
    {
      count: 7,
      date: '2022-08-26',
      level: 3
    },
    {
      count: 3,
      date: '2022-08-27',
      level: 2
    },
    {
      count: 7,
      date: '2022-08-28',
      level: 3
    },
    {
      count: 0,
      date: '2022-08-29',
      level: 0
    },
    {
      count: 2,
      date: '2022-08-30',
      level: 1
    },
    {
      count: 8,
      date: '2022-08-31',
      level: 4
    },
    {
      count: 2,
      date: '2022-09-01',
      level: 1
    },
    {
      count: 2,
      date: '2022-09-02',
      level: 1
    },
    {
      count: 5,
      date: '2022-09-03',
      level: 2
    },
    {
      count: 1,
      date: '2022-09-04',
      level: 1
    },
    {
      count: 0,
      date: '2022-09-05',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-06',
      level: 0
    },
    {
      count: 3,
      date: '2022-09-07',
      level: 2
    },
    {
      count: 0,
      date: '2022-09-08',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-09',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-10',
      level: 0
    },
    {
      count: 4,
      date: '2022-09-11',
      level: 2
    },
    {
      count: 2,
      date: '2022-09-12',
      level: 1
    },
    {
      count: 5,
      date: '2022-09-13',
      level: 2
    },
    {
      count: 6,
      date: '2022-09-14',
      level: 3
    },
    {
      count: 0,
      date: '2022-09-15',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-16',
      level: 0
    },
    {
      count: 5,
      date: '2022-09-17',
      level: 2
    },
    {
      count: 0,
      date: '2022-09-18',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-19',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-20',
      level: 0
    },
    {
      count: 2,
      date: '2022-09-21',
      level: 1
    },
    {
      count: 0,
      date: '2022-09-22',
      level: 0
    },
    {
      count: 3,
      date: '2022-09-23',
      level: 2
    },
    {
      count: 0,
      date: '2022-09-24',
      level: 0
    },
    {
      count: 6,
      date: '2022-09-25',
      level: 3
    },
    {
      count: 0,
      date: '2022-09-26',
      level: 0
    },
    {
      count: 0,
      date: '2022-09-27',
      level: 0
    },
    {
      count: 3,
      date: '2022-09-28',
      level: 2
    },
    {
      count: 3,
      date: '2022-09-29',
      level: 2
    },
    {
      count: 0,
      date: '2022-09-30',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-01',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-02',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-03',
      level: 0
    },
    {
      count: 3,
      date: '2022-10-04',
      level: 2
    },
    {
      count: 0,
      date: '2022-10-05',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-06',
      level: 0
    },
    {
      count: 9,
      date: '2022-10-07',
      level: 4
    },
    {
      count: 7,
      date: '2022-10-08',
      level: 3
    },
    {
      count: 0,
      date: '2022-10-09',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-10',
      level: 0
    },
    {
      count: 1,
      date: '2022-10-11',
      level: 1
    },
    {
      count: 6,
      date: '2022-10-12',
      level: 3
    },
    {
      count: 0,
      date: '2022-10-13',
      level: 0
    },
    {
      count: 1,
      date: '2022-10-14',
      level: 1
    },
    {
      count: 0,
      date: '2022-10-15',
      level: 0
    },
    {
      count: 1,
      date: '2022-10-16',
      level: 1
    },
    {
      count: 9,
      date: '2022-10-17',
      level: 4
    },
    {
      count: 7,
      date: '2022-10-18',
      level: 3
    },
    {
      count: 0,
      date: '2022-10-19',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-20',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-21',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-22',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-23',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-24',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-25',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-26',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-27',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-28',
      level: 0
    },
    {
      count: 0,
      date: '2022-10-29',
      level: 0
    },
    {
      count: 1,
      date: '2022-10-30',
      level: 1
    },
    {
      count: 0,
      date: '2022-10-31',
      level: 0
    },
    {
      count: 1,
      date: '2022-11-01',
      level: 1
    },
    {
      count: 3,
      date: '2022-11-02',
      level: 2
    },
    {
      count: 6,
      date: '2022-11-03',
      level: 3
    },
    {
      count: 4,
      date: '2022-11-04',
      level: 2
    },
    {
      count: 0,
      date: '2022-11-05',
      level: 0
    },
    {
      count: 0,
      date: '2022-11-06',
      level: 0
    },
    {
      count: 3,
      date: '2022-11-07',
      level: 2
    },
    {
      count: 3,
      date: '2022-11-08',
      level: 2
    },
    {
      count: 0,
      date: '2022-11-09',
      level: 0
    },
    {
      count: 1,
      date: '2022-11-10',
      level: 1
    },
    {
      count: 6,
      date: '2022-11-11',
      level: 3
    },
    {
      count: 0,
      date: '2022-11-12',
      level: 0
    },
    {
      count: 3,
      date: '2022-11-13',
      level: 2
    },
    {
      count: 1,
      date: '2022-11-14',
      level: 1
    },
    {
      count: 3,
      date: '2022-11-15',
      level: 2
    },
    {
      count: 0,
      date: '2022-11-16',
      level: 0
    },
    {
      count: 0,
      date: '2022-11-17',
      level: 0
    },
    {
      count: 0,
      date: '2022-11-18',
      level: 0
    },
    {
      count: 2,
      date: '2022-11-19',
      level: 1
    },
    {
      count: 3,
      date: '2022-11-20',
      level: 2
    },
    {
      count: 1,
      date: '2022-11-21',
      level: 1
    },
    {
      count: 5,
      date: '2022-11-22',
      level: 2
    },
    {
      count: 0,
      date: '2022-11-23',
      level: 0
    },
    {
      count: 0,
      date: '2022-11-24',
      level: 0
    },
    {
      count: 2,
      date: '2022-11-25',
      level: 1
    },
    {
      count: 2,
      date: '2022-11-26',
      level: 1
    },
    {
      count: 1,
      date: '2022-11-27',
      level: 1
    },
    {
      count: 0,
      date: '2022-11-28',
      level: 0
    },
    {
      count: 4,
      date: '2022-11-29',
      level: 2
    },
    {
      count: 6,
      date: '2022-11-30',
      level: 3
    },
    {
      count: 0,
      date: '2022-12-01',
      level: 0
    },
    {
      count: 1,
      date: '2022-12-02',
      level: 1
    },
    {
      count: 1,
      date: '2022-12-03',
      level: 1
    },
    {
      count: 0,
      date: '2022-12-04',
      level: 0
    },
    {
      count: 2,
      date: '2022-12-05',
      level: 1
    },
    {
      count: 2,
      date: '2022-12-06',
      level: 1
    },
    {
      count: 0,
      date: '2022-12-07',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-08',
      level: 0
    },
    {
      count: 1,
      date: '2022-12-09',
      level: 1
    },
    {
      count: 0,
      date: '2022-12-10',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-11',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-12',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-13',
      level: 0
    },
    {
      count: 6,
      date: '2022-12-14',
      level: 3
    },
    {
      count: 0,
      date: '2022-12-15',
      level: 0
    },
    {
      count: 2,
      date: '2022-12-16',
      level: 1
    },
    {
      count: 0,
      date: '2022-12-17',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-18',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-19',
      level: 0
    },
    {
      count: 1,
      date: '2022-12-20',
      level: 1
    },
    {
      count: 4,
      date: '2022-12-21',
      level: 2
    },
    {
      count: 0,
      date: '2022-12-22',
      level: 0
    },
    {
      count: 3,
      date: '2022-12-23',
      level: 2
    },
    {
      count: 4,
      date: '2022-12-24',
      level: 2
    },
    {
      count: 1,
      date: '2022-12-25',
      level: 1
    },
    {
      count: 1,
      date: '2022-12-26',
      level: 1
    },
    {
      count: 8,
      date: '2022-12-27',
      level: 4
    },
    {
      count: 2,
      date: '2022-12-28',
      level: 1
    },
    {
      count: 0,
      date: '2022-12-29',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-30',
      level: 0
    },
    {
      count: 0,
      date: '2022-12-31',
      level: 0
    }
  ]}
  fontSize={16}
  labels={{
    legend: {
      less: 'Less',
      more: 'More'
    },
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    totalCount: '{{count}} contributions in {{year}}',
    weekdays: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ]
  }}
  theme={{
    level0: '#F0F0F0',
    level1: '#C4EDDE',
    level2: '#7AC7C4',
    level3: '#F73859',
    level4: '#384259'
  }}
/>
 */
