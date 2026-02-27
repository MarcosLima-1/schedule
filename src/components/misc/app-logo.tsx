import { CalendarIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";

interface AppLogoProps extends ComponentProps<"div"> {
	hideName?: boolean;
	titleClassName?: string;
}

export function AppLogo({ hideName, className, titleClassName, ...props }: AppLogoProps) {
	return (
		<div className={cn("flex flex-1 items-center gap-2", className)} {...props}>
			<CalendarIcon className="size-6 text-primary" />
			{!hideName && <h2 className={cn("font-bold text-lg", titleClassName)}>Schedule</h2>}
		</div>
	);
}
