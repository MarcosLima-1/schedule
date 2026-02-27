import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clamp } from "@/utils/clamp";

export interface TimeUnitProps {
	label: string;
	value: number;
	min: number;
	max: number;
	step?: number;
	onChange: (value: number) => void;
}

export function TimeUnit({ label, value, min, max, step = 1, onChange }: TimeUnitProps) {
	function handleIncrement() {
		onChange(clamp(value + step, min, max));
	}

	function handleDecrement() {
		onChange(clamp(value - step, min, max));
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const parsed = parseInt(e.target.value, 10);

		if (!Number.isNaN(parsed)) {
			onChange(clamp(parsed, min, max));
		}
	}

	return (
		<div className="flex flex-col items-center gap-2">
			<span>{label}</span>
			<Button onClick={handleIncrement} noShadow size="icon" variant="ghost">
				<ChevronUpIcon />
			</Button>
			<Input
				type="number"
				step={step}
				min={min}
				max={max}
				value={value}
				onChange={handleInputChange}
				className="aspect-square size-16 text-center font-bold text-2xl md:text-2xl"
			/>
			<Button onClick={handleDecrement} noShadow size="icon" variant="ghost">
				<ChevronDownIcon />
			</Button>
		</div>
	);
}
