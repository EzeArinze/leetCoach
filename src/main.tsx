import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./provider/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResponseProvider } from "./context/response-context.tsx";
import { LanguageProvider } from "./context/language-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={new QueryClient()}>
        <ResponseProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ResponseProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
