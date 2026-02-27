import z from "zod/v4";

const taskColorsEnum = ["blue", "green", "orange", "red"] as const;

const timeRegex = /^\d{1,2}:\d{2}$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

function timeToMinutes(time: string) {
	const [h, m] = time.split(":").map(Number);
	return h * 60 + m;
}

export type TaskColor = (typeof taskColorsEnum)[number];

export const taskSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1, "Título é obrigatório").max(100, "Título deve ter no máximo 100 caracteres"),
	description: z.string().max(400, "Descrição deve ter no máximo 400 caracteres").optional(),
	startTime: z.string().regex(timeRegex, "Formato inválido — use H:MM ou HH:MM"),
	endTime: z.string().regex(timeRegex, "Formato inválido — use H:MM ou HH:MM"),
	scheduledDate: z.string().regex(dateRegex, "Formato inválido — use YYYY-MM-DD"),
	responsibles: z
		.array(z.string().min(1, "Nome do responsável não pode ser vazio").max(20, "Nome do responsável deve ter no máximo 20 caracteres"))
		.max(5, "Máximo de 5 responsáveis"),
	color: z.enum(taskColorsEnum),
});

export const createTaskSchema = taskSchema
	.omit({ id: true })
	.refine((data) => timeToMinutes(data.endTime) > timeToMinutes(data.startTime), {
		message: "Horário de término deve ser após o início",
		path: ["endTime"],
	});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type Task = z.infer<typeof taskSchema>;
