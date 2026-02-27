import { useMutation } from "@tanstack/react-query";
import type { Task } from "@/schemas/task";
import { updateQueryItem } from "@/utils/infinite-data/update-query";

interface DeleteTaskByIdRequest {
	taskId: string;
}

async function deleteTaskById({ taskId }: DeleteTaskByIdRequest) {
	const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
	const updatedTasks = tasks.filter((task: { id: string }) => task.id !== taskId);

	localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

export function useMutationDeleteTask() {
	return useMutation({
		mutationKey: ["deleteTask"],
		mutationFn: ({ taskId }: DeleteTaskByIdRequest) => deleteTaskById({ taskId }),
		meta: {
			method: ["DELETE"],
			title: "Delete Task",
			desc: "Deletes a task by its ID.",
		},
		onSuccess: (_, { taskId }) => {
			updateQueryItem<Task[]>({
				queryKey: ["tasks"],
				updater: (old) => {
					const index = old.findIndex((task) => task.id === taskId);
					if (index !== -1) old.splice(index, 1);
				},
			});
		},
	});
}
