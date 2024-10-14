import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.ts";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import GoogleOAuthProviderWrapper from "./providers/GoogleOAuthProvider.tsx";
import AppRouter from "./router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <GoogleOAuthProviderWrapper>
            <AppRouter />
            <Toaster />
          </GoogleOAuthProviderWrapper>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
