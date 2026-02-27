import { ClockIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "tailwind-variants";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { extractTimeLimits } from "@/modules/form/components/form-fields/time-field/utils/extract-time-limits";
import { useFieldContext } from "@/modules/form/context/app-form-context";
import { clamp } from "@/utils/clamp";
import { TimeUnit } from "./components/time-unit";
import { formatTime, parseTime } from "./utils";

export interface TimeFieldProps {
	minTime?: string;
	maxTime?: string;
	inputClassName?: string;
}

export function TimeField({ maxTime, minTime, inputClassName }: TimeFieldProps) {
	const { minHour, maxHour, minMinute, maxMinute } = extractTimeLimits(maxTime, minTime);
	const field = useFieldContext<string>();
	const fieldName = field.name;

	const parsed = parseTime(field.state.value ?? "");
	const [hour, setHour] = useState<number>(parsed?.hour ?? minHour);
	const [minute, setMinute] = useState<number>(parsed?.minute ?? minMinute);

	function handleHourChange(newHour: number) {
		const newEffectiveMaxMinute = newHour === maxHour ? maxMinute : 59;
		const newEffectiveMinMinute = newHour === minHour ? minMinute : 0;
		const clampedMinute = clamp(minute, newEffectiveMinMinute, newEffectiveMaxMinute);

		setHour(newHour);
		setMinute(clampedMinute);
		field.setValue(formatTime(newHour, clampedMinute));
	}

	function handleMinuteChange(newMinute: number) {
		setMinute(newMinute);
		field.setValue(formatTime(hour, newMinute));
	}

	const isMaxHour = hour === maxHour;
	const isMinHour = hour === minHour;

	const effectiveMaxMinute = isMaxHour ? maxMinute : 59;
	const effectiveMinMinute = isMinHour ? minMinute : 0;

	return (
		<div>
			<Popover.Root>
				<Popover.Trigger
					render={<Input name={fieldName} className={cn("cursor-pointer", inputClassName)} readOnly value={formatTime(hour, minute)} />}
				/>
				<Popover.Content>
					<Popover.Header className="mb-4 w-full border-b p-2">
						<Popover.Title className="flex items-center gap-2 font-semibold">
							<ClockIcon className="size-4" />
							Escolher horário
						</Popover.Title>
					</Popover.Header>

					<div className="flex justify-center gap-8">
						<TimeUnit label="Hora" value={hour} min={minHour} max={maxHour} step={1} onChange={handleHourChange} />
						<TimeUnit
							label="Minuto"
							value={minute}
							min={effectiveMinMinute}
							max={effectiveMaxMinute}
							step={5}
							onChange={handleMinuteChange}
						/>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	);
}
