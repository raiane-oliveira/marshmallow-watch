import dayjs from "dayjs";

import "dayjs/locale/en";
import "dayjs/locale/pt-br";

import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";

const config = {
	thresholds: [
		{ l: "s", r: 1 },
		{ l: "m", r: 1 },
		{ l: "mm", r: 59, d: "minute" },
		{ l: "h", r: 1 },
		{ l: "hh", r: 23, d: "hour" },
		{ l: "d", r: 1 },
		{ l: "dd", r: 29, d: "day" },
		{ l: "M", r: 1 },
		{ l: "MM", r: 11, d: "month" },
		{ l: "y", r: 1 },
		{ l: "yy", d: "year" },
	],
	rounding: Math.floor,
};

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime, config);