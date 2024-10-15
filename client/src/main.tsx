import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.ts";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import GoogleOAuthProviderWrapper from "./providers/GoogleOAuthProvider.tsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <GoogleOAuthProviderWrapper>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <Toaster />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </GoogleOAuthProviderWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
