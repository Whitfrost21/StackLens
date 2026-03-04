import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Logs", path: "/logs", icon: FileText },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function AppSidebar({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  }, [collapsed]);

  return (
    <aside
      className={`
        fixed md:relative
        top-0 left-0 h-full z-40
        border-r border-neutral-800 bg-neutral-900
        transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        {!collapsed && (
          <h1 className="text-lg font-semibold tracking-wide">StackLens</h1>
        )}

        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="rounded p-1 text-neutral-400 hover:bg-neutral-800 hover:text-white transition"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => {
                if (mobile) onClose?.();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`
              }
            >
              <Icon size={18} />

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
