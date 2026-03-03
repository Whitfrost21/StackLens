import type { Log } from "../../types/log";
import { LogDetailsmodal } from "./LogDetailsmodal";
import EmptyState from "../ui/Emptystate";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

interface Props {
  logs: Log[];
}
const getLevelStyles = (level: string) => {
  switch (level) {
    case "error":
      return "bg-red-500/20 text-red-400";
    case "warn":
      return "bg-yellow-500/20 text-yellow-400";
    case "info":
      return "bg-green-500/20 text-green-400";
    case "debug":
      return "bg-gray-500/20 text-gray-400";
    default:
      return "bg-zinc-700 text-zinc-300";
  }
};

function LogTable({ logs }: Props) {
  const [searchparam, setsearchparam] = useSearchParams();
  const selectedid = searchparam.get("selected");
  const selectedlog = logs.find((log) => log.id === selectedid) || null;
  return (
    <div className="bg-zinc-800 rounded-xl border shadow-sm p-4">
      <div className="max-h-150 overflow-y-auto overflow-x-auto">
        <table className="min-w-17 text-left">
          <thead className="sticky top-0 bg-zinc-800 border-b border-zinc-700">
            <tr>
              <th className=" w-35 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Service
              </th>
              <th className="w-32 py-3 text-sm  font-semibold uppercase tracking-wide text-zinc-400">
                Level
              </th>
              <th className=" w-[45%] py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Message
              </th>
              <th className="w-50 py-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Timestamp
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <EmptyState
                    title="No logs found"
                    description="Try adjusting your filters or search query."
                  />
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="cursor-pointer hover:bg-zinc-700/40 transition-colors border-b border-zinc-700"
                  onClick={() => {
                    const newParams = new URLSearchParams(searchparam);
                    newParams.set("selected", log.id);
                    setsearchparam(newParams);
                  }}
                >
                  <td className="py-2.5 text-sm">{log.service}</td>
                  <td className="py-2.5 text-sm">
                    {" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelStyles(
                        log.level,
                      )}`}
                    >
                      {log.level.toUpperCase()}
                    </span>
                  </td>
                  <td
                    className="py-2.5 text-sm max-w-100 truncate"
                    title={log.message}
                  >
                    {log.message}
                  </td>
                  <td className="py-2.5 text-sm max-w-100 ">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <AnimatePresence>
          {selectedlog && (
            <LogDetailsmodal
              log={selectedlog}
              onClose={() => {
                const newParams = new URLSearchParams(searchparam);
                newParams.delete("selected");
                setsearchparam(newParams);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default LogTable;
