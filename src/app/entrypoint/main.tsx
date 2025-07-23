import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/index.css";
import "../styles/reset.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routes/routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Данные никогда не становятся "устаревшими"
      gcTime: Infinity, // Данные никогда не удаляются из кэша
      refetchOnMount: false, // Не перезапрашивать при монтировании
      refetchOnWindowFocus: false, // Не перезапрашивать при фокусе окна
      refetchOnReconnect: false, // Не перезапрашивать при восстановлении соединения
      retry: false, // Не пытаться повторять запрос при ошибках
    },
  },
});

const _router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof _router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={_router} />
    </QueryClientProvider>
  </StrictMode>
);
