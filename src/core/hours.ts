export const HOURS = Array.from({ length: 11 }, (_, i) => {
	const h = i + 8;
	return `${String(h).padStart(2, "0")}:00`;
});
