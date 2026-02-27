import { EllipsisVerticalIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useMutationDeleteTask } from "@/modules/tasks/api/delete-task-by-id";
import { TaskDialogFormContent } from "@/modules/tasks/components/task-dialog-form";
import type { Task } from "@/schemas/task";

interface TaskCardMenuProps {
	task: Task;
}

export function TaskCardMenu({ task }: TaskCardMenuProps) {
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	const { mutate: deleteTask, isPending: isDeleting } = useMutationDeleteTask();

	return (
		<>
			<TaskDialogFormContent task={task} open={editOpen} onOpenChange={setEditOpen} />
			<Dialog.Root open={deleteOpen} onOpenChange={setDeleteOpen}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Excluir tarefa</Dialog.Title>
						<Dialog.Description>
							Tem certeza que deseja excluir <strong>{task.title}</strong>? Esta ação não pode ser desfeita.
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer showCloseButton>
						<Button
							variant="destructive"
							disabled={isDeleting}
							onClick={() => {
								deleteTask({ taskId: task.id });
								setDeleteOpen(false);
							}}
						>
							Excluir
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>

			<DropdownMenu.Root>
				<DropdownMenu.Trigger
					render={
						<Button variant="ghost" size="icon">
							<EllipsisVerticalIcon />
							<span className="sr-only">Opções da tarefa</span>
						</Button>
					}
				/>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						<DropdownMenu.GroupLabel>Ações</DropdownMenu.GroupLabel>
						<DropdownMenu.Item onClick={() => setEditOpen(true)}>
							<PencilIcon />
							Editar
						</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item variant="destructive" onClick={() => setDeleteOpen(true)}>
							<Trash2Icon />
							Excluir
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</>
	);
}
