import { cn } from "tailwind-variants";
import { Card } from "@/components/ui/card";
import { dayjs } from "@/lib/dayjs";
import { useQueryGetAllTasks } from "@/modules/tasks/api/get-all-tasks";
import { useQueryGetTasksByDate } from "@/modules/tasks/api/get-tasks-by-date";

interface SummaryRowProps {
	label: string;
	value: number;
}

function SummaryRow({ label, value }: SummaryRowProps) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-muted-foreground text-sm">{label}</span>
			<span className="font-medium text-sm">{value}</span>
		</div>
	);
}

interface TaskSummaryCardProps {
	className?: string;
}

export function TaskSummaryCard({ className }: TaskSummaryCardProps) {
	const todayDate = dayjs().format("YYYY-MM-DD");
	const todayFormatted = dayjs(todayDate).format("ddd, D MMM");
	const tomorrowDate = dayjs(todayDate, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD");

	const { data: todayTasks } = useQueryGetTasksByDate({ date: todayDate });
	const { data: tomorrowTasks } = useQueryGetTasksByDate({ date: tomorrowDate });
	const { data: allTasks } = useQueryGetAllTasks();

	const todayCount = todayTasks?.length ?? 0;
	const tomorrowCount = tomorrowTasks?.length ?? 0;
	const totalCount = allTasks?.length ?? 0;

	return (
		<Card.Root className={cn("w-full", className)}>
			<Card.Header>
				<Card.Title>Agendamentos:</Card.Title>
				<Card.Action>{todayFormatted}</Card.Action>
			</Card.Header>
			<Card.Content className="flex flex-col gap-2">
				<SummaryRow label="hoje" value={todayCount} />
				<SummaryRow label="amanhã" value={tomorrowCount} />
				<div className="my-1 border-t" />
				<SummaryRow label="total" value={totalCount} />
			</Card.Content>
		</Card.Root>
	);
}
