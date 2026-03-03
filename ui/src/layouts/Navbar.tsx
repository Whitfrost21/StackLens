import { useLocation } from "react-router-dom";
import { useIsFetching } from "@tanstack/react-query";
import { Loader2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/logs")) return "Logs";
  if (pathname.startsWith("/analytics")) return "Analytics";
  if (pathname.startsWith("/settings")) return "Settings";
  return "Dashboard";
}

export default function Navbar({
  mobileOpen,
  onMenuClick,
}: {
  mobileOpen: boolean;
  onMenuClick: () => void;
}) {
  const location = useLocation();
  const isFetching = useIsFetching();

  const title = getPageTitle(location.pathname);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md px-4 md:px-6">
      {/* Left */}

      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Toggle Button */}
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

        {/* Placeholder for future auth dropdown */}
        <div className="h-8 w-8 rounded-full bg-neutral-500" />
      </div>
    </header>
  );
}
