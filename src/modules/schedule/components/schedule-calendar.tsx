import { Calendar } from "@/components/ui/calendar";
import { dayjs } from "@/lib/dayjs";
import { useScheduleDate } from "@/modules/schedule/context/schedule-date-provider";

interface ScheduleCalendarProps {
	className?: string;
}

export function ScheduleCalendar({ className }: ScheduleCalendarProps) {
	const { currentDate, goToDate } = useScheduleDate();

	return (
		<Calendar
			mode="single"
			selected={dayjs(currentDate, "YYYY-MM-DD").toDate()}
			onSelect={(date) => goToDate(dayjs(date).format("YYYY-MM-DD"))}
			className={className}
		/>
	);
}
