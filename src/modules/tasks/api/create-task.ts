import { faker } from "@faker-js/faker";
import { useMutation } from "@tanstack/react-query";
import type { CreateTaskSchema, Task } from "@/schemas/task";
import { updateQueryItem } from "@/utils/infinite-data/update-query";

async function createTask(task: CreateTaskSchema) {
	const newTask: Task = {
		id: faker.string.uuid(),
		...task,
	};

	const tasks = JSON.parse(localStorage.getItem(`tasks`) || "[]") as Task[];
	tasks.push(newTask);

	localStorage.setItem(`tasks`, JSON.stringify(tasks));

	return newTask;
}

export function useMutationCreateTask() {
	return useMutation({
		mutationKey: ["createTask"],
		mutationFn: (task: CreateTaskSchema) => createTask(task),
		meta: {
			method: ["POST"],
			title: "Create Task",
			desc: "Create a new task with the provided details.",
			successMessage: "Task created successfully!",
		},

		onSuccess: (task) => {
			updateQueryItem<Task[]>({
				queryKey: ["tasks", { date: task.scheduledDate }],
				updater: (old) => {
					if (!old) return [task];

					old.push(task);
					return old;
				},
			});
		},
	});
}
