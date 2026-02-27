import { createContext, type ReactNode, use, useCallback, useState } from "react";
import { dayjs } from "@/lib/dayjs";

interface ScheduleDateContext {
	currentDate: string;
	nextDay: () => void;
	prevDay: () => void;
	goToToday: () => void;
	goToDate: (date: string) => void;
	isToday: boolean;
}

export const ScheduleDateContext = createContext<ScheduleDateContext | undefined>(undefined);

export function ScheduleDateProvider({ children }: { children: ReactNode }) {
	const [currentDate, setCurrentDate] = useState(() => dayjs().format("YYYY-MM-DD"));

	const nextDay = useCallback(() => {
		setCurrentDate((d) => dayjs(d).add(1, "day").format("YYYY-MM-DD"));
	}, []);

	const prevDay = useCallback(() => {
		setCurrentDate((d) => dayjs(d).subtract(1, "day").format("YYYY-MM-DD"));
	}, []);

	const goToToday = useCallback(() => {
		setCurrentDate(dayjs().format("YYYY-MM-DD"));
	}, []);

	const goToDate = useCallback((date: string) => {
		setCurrentDate(date);
	}, []);

	const isToday = currentDate === dayjs().format("YYYY-MM-DD");

	return <ScheduleDateContext value={{ currentDate, nextDay, prevDay, goToToday, goToDate, isToday }}>{children}</ScheduleDateContext>;
}

export function useScheduleDate() {
	const ctx = use(ScheduleDateContext);
	if (!ctx) throw new Error("useScheduleDate must be used within ScheduleDateProvider");
	return ctx;
}
