import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router.tsx";
import { UISettingsProvider } from "./components/ui/uisettingscontexts.tsx";
const queryclient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryclient}>
      {/*<App />*/}
      <UISettingsProvider>
        <RouterProvider router={router} />
      </UISettingsProvider>
    </QueryClientProvider>
  </StrictMode>,
);
