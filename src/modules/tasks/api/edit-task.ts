import { useMutation } from "@tanstack/react-query";
import type { CreateTaskSchema, Task } from "@/schemas/task";
import { updateQueryItem } from "@/utils/infinite-data/update-query";

interface EditTaskRequest {
	taskId: string;
	data: CreateTaskSchema;
}

async function editTask({ taskId, data }: EditTaskRequest): Promise<Task> {
	const tasks = JSON.parse(localStorage.getItem("tasks") || "[]") as Task[];
	const taskIndex = tasks.findIndex((task) => task.id === taskId);

	if (taskIndex === -1) throw new Error("Task not found");

	const updatedTask: Task = {
		...tasks[taskIndex],
		...data,
	};

	tasks[taskIndex] = updatedTask;
	localStorage.setItem("tasks", JSON.stringify(tasks));

	return updatedTask;
}

export function useMutationEditTask() {
	return useMutation({
		mutationKey: ["editTask"],
		mutationFn: (request: EditTaskRequest) => editTask(request),
		meta: {
			method: ["PUT"],
			title: "Edit Task",
			desc: "Edits an existing task by its ID.",
			successMessage: "Task updated successfully!",
		},
		onSuccess: (updatedTask) => {
			updateQueryItem<Task[]>({
				queryKey: ["tasks"],
				updater: (old) => {
					if (!old) return;

					const index = old.findIndex((task) => task.id === updatedTask.id);
					if (index !== -1) {
						old[index] = updatedTask;
					}
				},
			});
		},
	});
}
