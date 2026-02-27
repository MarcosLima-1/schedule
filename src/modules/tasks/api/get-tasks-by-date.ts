import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/schemas/task";

interface GetTasksByDateRequest {
	date: string;
}

function getTasksByDate({ date }: GetTasksByDateRequest) {
	const tasks = localStorage.getItem(`tasks`);
	if (!tasks) return [];

	const parsedTasks = JSON.parse(tasks) as Task[];
	return parsedTasks.filter((task) => task.scheduledDate === date);
}

export function useQueryGetTasksByDate({ date }: GetTasksByDateRequest) {
	return useQuery({
		queryKey: ["tasks", { date }],
		queryFn: () => getTasksByDate({ date }),
		meta: {
			method: ["GET"],
			title: "Get Tasks by Date",
			desc: "Fetches tasks that are scheduled for a specific date.",
		},
	});
}
