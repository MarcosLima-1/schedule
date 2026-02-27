import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { isAxiosError } from "axios";
import { LockKeyholeIcon, SearchXIcon } from "lucide-react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GenericError } from "@/components/generic-error";
import { PageNotFound } from "@/components/page-not-found";
import { SplashScreen } from "@/components/splash-screen";
import { UnavailableContent } from "@/components/unavailable-content";
import { env } from "@/lib/env";
import { queryClient } from "@/lib/tanstack-query/client";
import "./global.css";
import { ToastProvider } from "@/modules/notification/components/toast-provider";
import { routeTree } from "@/types/routeTree.generated";
import { ScheduleDateProvider } from "./modules/schedule/context/schedule-date-provider";
import { ThemeProvider } from "./modules/theme/context/theme-provider";

export const router = createRouter({
	routeTree,
	defaultErrorComponent: ({ error }) => {
		if (isAxiosError(error)) {
			if (error.response?.status === 404) {
				return <UnavailableContent icon={SearchXIcon} title="Conteudo não encontrado" />;
			}
			if (error.response?.status === 403) {
				return <UnavailableContent icon={LockKeyholeIcon} title="Você não tem permissão para acessar esse conteúdo" />;
			}
			if (error.response?.status === 400) {
				return <UnavailableContent icon={SearchXIcon} title="Parametros inválidos!" />;
			}
		}
		return <GenericError error={error} />;
	},
	defaultNotFoundComponent: () => <PageNotFound />,
	defaultPendingComponent: () => <SplashScreen />,
	defaultPreload: false,
	defaultViewTransition: true,
	context: {
		queryClient,
	},
});

const rootContainer = document.getElementById("root");

if (!rootContainer) {
	throw new Error("Missing #root container");
}

const root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<ScheduleDateProvider>
					<ToastProvider>
						<RouterProvider router={router} />
					</ToastProvider>
				</ScheduleDateProvider>
			</ThemeProvider>
			{env.VITE_DEV_MODE && (
				<TanStackDevtools
					plugins={[
						{
							name: "Tanstack Query",
							render: <ReactQueryDevtoolsPanel />,
						},
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel router={router} />,
						},
						{
							name: "TanStack Form",
							render: <FormDevtoolsPanel />,
						},
					]}
				/>
			)}
		</QueryClientProvider>
	</StrictMode>,
);

if (env.VITE_DEV_MODE) {
	import("react-scan").then(({ scan }) => {
		scan({
			enabled: true,
		});
	});
}
