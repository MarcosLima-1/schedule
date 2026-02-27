import { cn } from "tailwind-variants";
import { useFieldContext } from "@/modules/form/context/app-form-context";
import type { TaskColor } from "@/schemas/task";

const COLOR_OPTIONS: { value: TaskColor; label: string; dot: string }[] = [
	{ value: "blue", label: "Blue", dot: "bg-blue-500" },
	{ value: "green", label: "Green", dot: "bg-emerald-500" },
	{ value: "orange", label: "Orange", dot: "bg-amber-500" },
	{ value: "red", label: "Red", dot: "bg-red-500" },
];

export function ColorRadioField() {
	const field = useFieldContext<TaskColor>();
	const selected = field.state.value;

	return (
		<div className="flex gap-3">
			{COLOR_OPTIONS.map(({ value, label, dot }) => (
				<button
					key={value}
					type="button"
					aria-label={label}
					onClick={() => field.handleChange(value)}
					className={cn(
						"flex size-8 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background transition-all",
						dot,
						selected === value ? "scale-110 ring-foreground/60" : "ring-transparent",
					)}
				>
					<span className="sr-only">{label}</span>
				</button>
			))}
		</div>
	);
}
