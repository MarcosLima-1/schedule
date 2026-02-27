import { useQuery } from "@tanstack/react-query";
import type { Task } from "@/schemas/task";

function getAllTasks() {
	const tasks = localStorage.getItem("tasks");
	if (!tasks) return [];

	return JSON.parse(tasks) as Task[];
}

export function useQueryGetAllTasks() {
	return useQuery({
		queryKey: ["tasks"],
		queryFn: getAllTasks,
		meta: {
			method: ["GET"],
			title: "Get All Tasks",
			desc: "Fetches all tasks stored.",
		},
	});
}
