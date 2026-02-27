import { Link } from "@tanstack/react-router";
import { CalendarCheckIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { cn } from "tailwind-variants";
import { AppLogo } from "@/components/misc/app-logo";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Popover } from "@/components/ui/popover";
import { dayjs } from "@/lib/dayjs";
import { ScheduleCalendar } from "@/modules/schedule/components/schedule-calendar";
import { useScheduleDate } from "@/modules/schedule/context/schedule-date-provider";
import { useQueryGetTasksByDate } from "@/modules/tasks/api/get-tasks-by-date";
import { TaskDialogFormContent } from "@/modules/tasks/components/task-dialog-form";
import { ThemeToggle } from "@/modules/theme/components/theme-toggle";

function DateNavigator() {
	const { currentDate, nextDay, prevDay, goToToday, isToday } = useScheduleDate();
	const { data: tasks } = useQueryGetTasksByDate({ date: currentDate });

	const taskCount = tasks?.length ?? 0;
	const formatted = dayjs(currentDate).format("ddd, D [de] MMMM");

	return (
		<div className="flex items-center gap-1">
			<Button variant="outline" noShadow onClick={goToToday} size="sm">
				Hoje
			</Button>
			<Button variant="ghost" size="icon" onClick={prevDay} className="size-8">
				<ChevronLeftIcon className="size-4" />
			</Button>
			<Button variant="ghost" size="icon" onClick={nextDay} className="size-8">
				<ChevronRightIcon className="size-4" />
			</Button>

			<Popover.Root>
				<Popover.Trigger
					render={
						<button
							type="button"
							title="Calendário"
							className={cn(
								"flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
								isToday && "font-medium text-primary",
							)}
						>
							<span className="capitalize">{formatted}</span>
							{taskCount > 0 && (
								<span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-1.5 py-0.5 font-medium text-primary text-xs">
									<CalendarCheckIcon className="size-3" />
									{taskCount}
								</span>
							)}
						</button>
					}
				/>
				<Popover.Content className="w-auto p-3" sideOffset={6}>
					<ScheduleCalendar />
				</Popover.Content>
			</Popover.Root>
		</div>
	);
}

export function NavigationHeader() {
	const { currentDate } = useScheduleDate();
	return (
		<header className="sticky top-0 z-50 h-header-height w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
			<div className="flex items-center justify-between border-b px-4 py-2">
				<div className="flex items-center gap-6">
					<Link to="/" className="flex items-center gap-2">
						<AppLogo />
					</Link>

					<nav className="hidden items-center gap-6 md:flex" />
				</div>

				<div className="flex items-center gap-3">
					<ThemeToggle />
				</div>
			</div>
			<div className="flex items-center justify-center bg-accent/20 p-4 sm:justify-between">
				<DateNavigator />

				<TaskDialogFormContent
					trigger={
						<Dialog.Trigger
							render={
								<Button size="sm" className="hidden sm:flex">
									<PlusIcon /> Novo
								</Button>
							}
						/>
					}
					defaultValues={{ scheduledDate: currentDate }}
				/>
			</div>
		</header>
	);
}
