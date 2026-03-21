import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AppSidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FullscreenLoader from "../components/ui/Loader";
import type { User } from "@supabase/supabase-js";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
      if (!data.session) {
        navigate("/login");
      }
      setLoading(false);
    };
    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);

        if (!session) {
          navigate("/login");
        }
      },
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileOpen]);
  if (loading) return <FullscreenLoader label="Loading..." />;
  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/*desktop Sidebar*/}
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 z-40 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
              style={{ willChange: "transform" }}
            >
              <AppSidebar mobile onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar
          user={user}
          mobileOpen={mobileOpen}
          onMenuClick={() => {
            setMobileOpen((prev) => !prev);
          }}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 md:px-6 py-4">
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
