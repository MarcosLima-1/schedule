import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Landing } from "@/components/ui/landing";
import { HOURS } from "@/core/hours";
import { ScheduleCalendar } from "@/modules/schedule/components/schedule-calendar";
import { TaskSummaryCard } from "@/modules/schedule/components/task-summary-card";
import { TimeSlotCard } from "@/modules/schedule/components/time-slot-card";
import { useScheduleDate } from "@/modules/schedule/context/schedule-date-provider";
import { useQueryGetTasksByDate } from "@/modules/tasks/api/get-tasks-by-date";
import { TaskDialogFormContent } from "@/modules/tasks/components/task-dialog-form";
import type { Task } from "@/schemas/task";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { currentDate } = useScheduleDate();
	const { data: tasks, isError } = useQueryGetTasksByDate({
		date: currentDate,
	});

	if (isError) {
		return (
			<Landing.Page className="flex h-svh w-full flex-col items-center justify-center gap-6 bg-background px-4">
				Erro ao carregar tarefas
			</Landing.Page>
		);
	}

	function getTasksInHour(tasks: Task[], hour: string) {
		return tasks.filter((task) => {
			const taskStartHour = parseInt(task.startTime.split(":")[0], 10);
			const slotHour = parseInt(hour, 10);
			return slotHour === taskStartHour;
		});
	}

	return (
		<div className="flex w-full max-md:flex-col">
			<div className="top-header-height flex h-full flex-col items-center gap-8 p-4 md:sticky md:w-75">
				<ScheduleCalendar className="hidden border-0 sm:block" />
				<TaskSummaryCard />
			</div>
			<div className="w-full flex-1 border-x">
				{HOURS.map((hour) => {
					const tasksInHour = tasks ? getTasksInHour(tasks, hour) : [];
					return <TimeSlotCard hour={hour} tasks={tasksInHour} currentDate={currentDate} key={hour} />;
				})}
			</div>
			<div className="fixed right-5 bottom-5 flex sm:hidden">
				<TaskDialogFormContent
					trigger={
						<Dialog.Trigger
							render={
								<Button size="icon">
									<PlusIcon className="size-4" />
								</Button>
							}
						/>
					}
					defaultValues={{ scheduledDate: currentDate }}
				/>
			</div>
		</div>
	);
}
