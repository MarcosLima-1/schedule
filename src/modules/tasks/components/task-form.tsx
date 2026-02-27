import { Field } from "@/modules/form/components/field";
import { useAppForm } from "@/modules/form/lib/app-form";
import { useMutationCreateTask } from "@/modules/tasks/api/create-task";
import { useMutationEditTask } from "@/modules/tasks/api/edit-task";
import { type CreateTaskSchema, createTaskSchema } from "@/schemas/task";

interface TaskFormProps {
	defaultValues?: Partial<CreateTaskSchema>;
	taskId?: string;
	onSuccess?: () => void;
}

export function TaskForm({ defaultValues, taskId, onSuccess }: TaskFormProps) {
	const { mutateAsync: createTask } = useMutationCreateTask();
	const { mutateAsync: editTask } = useMutationEditTask();

	const defaultValuesWithDefaults: CreateTaskSchema = {
		title: defaultValues?.title || "",
		description: defaultValues?.description || "",
		startTime: defaultValues?.startTime || "10:00",
		endTime: defaultValues?.endTime || "11:00",
		responsibles: defaultValues?.responsibles || [],
		color: defaultValues?.color || "blue",
		scheduledDate: defaultValues?.scheduledDate || new Date().toISOString().split("T")[0],
	};

	const Form = useAppForm({
		validators: {
			onChange: createTaskSchema,
			onSubmit: createTaskSchema,
			onMount: createTaskSchema,
		},
		defaultValues: defaultValuesWithDefaults,
		onSubmit: async ({ value }) => {
			if (taskId) {
				await editTask({ taskId, data: value });
			} else {
				await createTask(value);
			}
			onSuccess?.();
		},
	});

	return (
		<form
			className="w-full space-y-3"
			onSubmit={(e) => {
				e.preventDefault();
				Form.handleSubmit();
			}}
		>
			<Form.AppField
				name="title"
				children={(AppField) => {
					return (
						<Field.Wrapper>
							<Field.Label required>Título</Field.Label>
							<AppField.TextField maxLength={100} placeholder="Título da tarefa" />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
			/>
			<Form.AppField
				name="scheduledDate"
				children={(AppField) => {
					return (
						<Field.Wrapper>
							<Field.Label required>Data</Field.Label>
							<AppField.DatePickerField />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
			/>
			<div className="flex gap-3">
				<Form.AppField
					name="startTime"
					children={(AppField) => {
						return (
							<Field.Wrapper>
								<Field.Label required>Início</Field.Label>
								<AppField.TimeField minTime="8:00" maxTime="18:00" inputClassName="h-12 text-base font-medium" />
								<Field.Error />
							</Field.Wrapper>
						);
					}}
				/>
				<Form.Subscribe
					selector={(form) => form.values.startTime}
					children={(startTime) => {
						return (
							<Form.AppField
								name="endTime"
								children={(AppField) => {
									return (
										<Field.Wrapper>
											<Field.Label required>Fim</Field.Label>
											<AppField.TimeField minTime={startTime} maxTime="18:00" inputClassName="h-12 text-base font-medium" />
											<Field.Error />
										</Field.Wrapper>
									);
								}}
							/>
						);
					}}
				></Form.Subscribe>
			</div>
			<Form.AppField
				name="description"
				children={(AppField) => {
					return (
						<Field.Wrapper>
							<Field.Label>Descrição</Field.Label>
							<AppField.TextareaField maxLength={400} placeholder="Descrição da tarefa" className="h-20" />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
			/>
			<Form.AppField
				name="responsibles"
				children={(AppField) => {
					return (
						<Field.Wrapper>
							<Field.Label>Responsáveis</Field.Label>
							<AppField.TagsField maxTagCount={5} maxTagLength={20} />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
			/>
			<Form.AppField
				name="color"
				children={(AppField) => {
					return (
						<Field.Wrapper>
							<Field.Label>Cor</Field.Label>
							<AppField.ColorRadioField />
							<Field.Error />
						</Field.Wrapper>
					);
				}}
			/>
			<div className="flex w-full justify-end">
				<Form.AppForm>
					<Form.SubmitButton>{taskId ? "Salvar" : "Criar Agenda"}</Form.SubmitButton>
				</Form.AppForm>
			</div>
		</form>
	);
}
