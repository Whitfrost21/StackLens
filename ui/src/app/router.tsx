import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/Applayout";
import Logs from "../pages/Logs";
import Analytics from "../pages/Analytics";
import Dashboard from "../pages/Home";
import Settings from "../pages/Settings";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  { path: "login", element: <Login /> },
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
