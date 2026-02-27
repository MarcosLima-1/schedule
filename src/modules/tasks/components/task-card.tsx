import { ClockIcon, UserIcon } from "lucide-react";
import { cn } from "tailwind-variants";
import { Card } from "@/components/ui/card";
import { TaskCardMenu } from "@/modules/tasks/components/task-card-menu";
import { TASK_COLOR_MAP } from "@/modules/tasks/constants/task-colors";
import type { Task } from "@/schemas/task";

interface TaskCardProps {
	task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
	const taskColors = TASK_COLOR_MAP[task.color];

	return (
		<Card.Root className={cn("border-l-4", taskColors.border)}>
			<Card.Header>
				<Card.Title className={cn("font-bold text-lg", taskColors.text)}>{task.title}</Card.Title>
				<Card.Description className={cn(taskColors.text)}>{task.description}</Card.Description>
				<Card.Action>
					<TaskCardMenu task={task} />
				</Card.Action>
			</Card.Header>

			<Card.Footer className="gap-4">
				<div className={cn("inline-flex items-center rounded-md px-2 py-1 font-medium text-xs", taskColors.badge)}>
					<ClockIcon className="mr-1 h-3 w-3" />
					{task.startTime} - {task.endTime}
				</div>
				<div className="flex flex-wrap gap-2 text-muted-foreground">
					{task.responsibles.map((name) => (
						<span key={name}>
							<UserIcon className="mr-1 inline h-3 w-3" />
							{name}
						</span>
					))}
				</div>
			</Card.Footer>
		</Card.Root>
	);
}
