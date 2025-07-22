import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../styles/index.css";
import "../styles/reset.css";
import App from "../../App";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routes/routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      gcTime: 5 * 1000,
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
      <App />
    </QueryClientProvider>
  </StrictMode>
);
