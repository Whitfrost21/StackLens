import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/Applayout";
import Logs from "../pages/Logs";
import Analytics from "../pages/Analytics";
import Dashboard from "../pages/Home";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      { path: "logs", element: <Logs /> },
      { path: "analytics", element: <Analytics /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
