import { type ReactNode, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { TaskForm } from "@/modules/tasks/components/task-form";
import type { CreateTaskSchema, Task } from "@/schemas/task";

interface TaskDialogFormContentProps {
	task?: Task;
	defaultValues?: Partial<CreateTaskSchema>;
	trigger?: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export function TaskDialogFormContent({ task, defaultValues, trigger, open: controlledOpen, onOpenChange }: TaskDialogFormContentProps) {
	const [internalOpen, setInternalOpen] = useState(false);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;
	const handleOpenChange = isControlled ? (onOpenChange ?? (() => {})) : setInternalOpen;

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			{trigger}
			<Dialog.Content className="max-h-[90svh] overflow-y-auto sm:max-w-md">
				<Dialog.Header>
					<Dialog.Title>{task ? "Editar tarefa" : "Nova tarefa"}</Dialog.Title>
				</Dialog.Header>
				<TaskForm defaultValues={task ?? defaultValues} taskId={task?.id} onSuccess={() => handleOpenChange(false)} />
			</Dialog.Content>
		</Dialog.Root>
	);
}
