import { useLocation, useNavigate } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import { Loader2, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/logs")) return "Logs";
  if (pathname.startsWith("/analytics")) return "Analytics";
  if (pathname.startsWith("/settings")) return "Settings";
  return "Dashboard";
}

export default function Navbar({
  mobileOpen,
  onMenuClick,
  user,
}: {
  mobileOpen: boolean;
  onMenuClick: () => void;
  user: User | null;
}) {
  const location = useLocation();
  const isFetching = useIsFetching();

  const title = getPageTitle(location.pathname);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-neutral-400 hover:text-white transition"
        >
          <motion.div
            initial={false}
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.div>
        </button>

        <h2 className="text-base md:text-lg font-semibold tracking-tight">
          {title}
        </h2>

        <span className="hidden sm:inline rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          Development
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 ">
        {isFetching > 0 && (
          <Loader2 className="animate-spin text-neutral-400" size={18} />
        )}

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="h-8 w-8 rounded-full bg-neutral-600 hover:bg-neutral-500 transition flex items-center justify-center text-sm font-semibold cursor-pointer"
          >
            {user?.email?.[0]?.toUpperCase() || "U"}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-64 max-w-[90vw] sm:w-64 sm:max-w-none z-50  rounded-xl bg-neutral-900 border border-neutral-800 shadow-lg p-3"
              >
                {/* Profile */}
                <div className="flex items-center gap-3 border-b border-neutral-800 pb-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-neutral-700 flex items-center justify-center font-semibold">
                    {user?.email?.[0]?.toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user?.user_metadata?.name || "User"}
                    </p>
                    <p className="text-xs text-neutral-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full cursor-pointer text-left px-2 py-2 text-sm text-red-400 hover:bg-neutral-800 rounded-lg transition"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
