const TIME_REGEX = /^([01]?\d|2[0-3]):([0-5]\d)$/;

export function isValidTimeFormat(time: string): boolean {
	return TIME_REGEX.test(time);
}

export function padTime(value: number): string {
	return value.toString().padStart(2, "0");
}

export function formatTime(hour: number, minute: number): string {
	return `${padTime(hour)}:${padTime(minute)}`;
}

export function parseTime(value: string): { hour: number; minute: number } | null {
	if (!isValidTimeFormat(value)) return null;

	const [hour, minute] = value.split(":").map(Number);
	return { hour, minute };
}
