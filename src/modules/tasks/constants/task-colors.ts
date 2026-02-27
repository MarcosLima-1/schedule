import type { TaskColor } from "@/schemas/task";

export const TASK_COLOR_MAP: Record<TaskColor, { bg: string; border: string; text: string; badge: string }> = {
	blue: {
		bg: "bg-blue-50 dark:bg-blue-900/20",
		border: "border-l-blue-500 dark:border-l-blue-400",
		text: "text-blue-700 dark:text-blue-300",
		badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
	},
	green: {
		bg: "bg-emerald-50 dark:bg-emerald-900/20",
		border: "border-l-emerald-500 dark:border-l-emerald-400",
		text: "text-emerald-700 dark:text-emerald-300",
		badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
	},
	orange: {
		bg: "bg-amber-50 dark:bg-amber-900/20",
		border: "border-l-amber-500 dark:border-l-amber-400",
		text: "text-amber-700 dark:text-amber-300",
		badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
	},
	red: {
		bg: "bg-red-50 dark:bg-red-900/20",
		border: "border-l-red-500 dark:border-l-red-400",
		text: "text-red-700 dark:text-red-300",
		badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
	},
};
