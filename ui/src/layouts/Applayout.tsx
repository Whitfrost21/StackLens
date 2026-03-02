import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AppSidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
