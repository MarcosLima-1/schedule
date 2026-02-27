import { isValidTimeFormat } from "@/modules/form/components/form-fields/time-field/utils";

export interface TimeLimits {
	minHour: number;
	maxHour: number;
	minMinute: number;
	maxMinute: number;
}

export function extractTimeLimits(maxTime?: string, minTime?: string): TimeLimits {
	const limits: TimeLimits = {
		minHour: 0,
		maxHour: 23,
		minMinute: 0,
		maxMinute: 59,
	};

	if (maxTime) {
		if (!isValidTimeFormat(maxTime)) {
			console.warn(`[TimeField] Invalid maxTime format: "${maxTime}". Expected "HH:mm".`);
		} else {
			const [maxHour, maxMinute] = maxTime.split(":").map(Number);
			limits.maxHour = maxHour;
			limits.maxMinute = maxMinute;
		}
	}

	if (minTime) {
		if (!isValidTimeFormat(minTime)) {
			console.warn(`[TimeField] Invalid minTime format: "${minTime}". Expected "HH:mm".`);
		} else {
			const [minHour, minMinute] = minTime.split(":").map(Number);
			limits.minHour = minHour;
			limits.minMinute = minMinute;
		}
	}

	if (limits.minHour > limits.maxHour) {
		console.warn(`[TimeField] minTime (${minTime}) is greater than maxTime (${maxTime}). Limits will be ignored.`);

		return { minHour: 0, maxHour: 23, minMinute: 0, maxMinute: 59 };
	}

	return limits;
}
