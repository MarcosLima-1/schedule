import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover } from "@/components/ui/popover";
import { dayjs } from "@/lib/dayjs";
import { useFieldContext } from "@/modules/form/context/app-form-context";

export function DatePickerField() {
	const field = useFieldContext<string>();
	const value = field.state.value;

	return (
		<Popover.Root>
			<Popover.Trigger
				render={<Input id={field.name} name={field.name} readOnly className="cursor-pointer" placeholder="DD/MM/AAAA" value={value} />}
			/>
			<Popover.Content className="w-auto p-3" sideOffset={6}>
				<Calendar
					onSelect={(date) => {
						if (date) {
							field.handleChange(dayjs(date).format("YYYY-MM-DD"));
						}
					}}
					selected={value ? dayjs(value, "YYYY-MM-DD").toDate() : undefined}
					mode="single"
					className="rounded-lg border"
				/>
			</Popover.Content>
		</Popover.Root>
	);
}
