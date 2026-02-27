import type { QueryClient } from "@tanstack/react-query";
import type { router } from "@/main";

export interface RouteContext {
	queryClient: QueryClient;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
