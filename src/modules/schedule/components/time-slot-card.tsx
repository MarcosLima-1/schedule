import { PlusIcon } from "lucide-react";
import { cn } from "tailwind-variants";
import { Dialog } from "@/components/ui/dialog";
import { TaskCard } from "@/modules/tasks/components/task-card";
import { TaskDialogFormContent } from "@/modules/tasks/components/task-dialog-form";
import type { Task } from "@/schemas/task";

interface TimeSlotCardProps {
	tasks: Task[];
	hour: string;
	currentDate: string;
}

export function TimeSlotCard({ tasks, hour, currentDate }: TimeSlotCardProps) {
	const hasTasks = tasks.length > 0;

	const startHour = hour.split(":")[0];
	const endTime = `${parseInt(startHour, 10) + 1}:00`;

	return (
		<div className="group/time-slot flex min-h-24 w-full gap-4 border-t p-4 transition-colors hover:bg-secondary/50">
			<div className="px-2 py-1 font-bold text-muted-foreground text-sm">{hour}</div>
			<div className="w-px bg-border" />
			<div className="flex flex-1 flex-col gap-3">
				{hasTasks
					&& tasks.map((task) => {
						return <TaskCard task={task} key={task.id} />;
					})}

				<TaskDialogFormContent
					trigger={
						<Dialog.Trigger
							className={cn(
								"hidden h-full w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm group-hover/time-slot:flex",
								{
									"flex h-fit p-2": hasTasks,
								},
							)}
							type="button"
						>
							<PlusIcon className="size-4" /> Adicionar task
						</Dialog.Trigger>
					}
					defaultValues={{ scheduledDate: currentDate, startTime: hour, endTime }}
				/>
			</div>
		</div>
	);
}
