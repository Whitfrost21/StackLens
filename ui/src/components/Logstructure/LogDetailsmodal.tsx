import { useEffect } from "react";
import type { Log } from "../../types/log";
import { motion } from "framer-motion";

interface Prop {
  log: Log;
  onClose: () => void;
}

function formatMetadata(metadata: unknown) {
  try {
    return JSON.stringify(metadata, null, 2);
  } catch {
    return "Invalid metadata";
  }
}
const levelColors = {
  error: "bg-red-500/20 text-red-400",
  warn: "bg-yellow-500/20 text-yellow-400",
  info: "bg-green-500/20 text-green-400",
  debug: "bg-gray-500/20 text-gray-400",
};

export function LogDetailsmodal({ log, onClose }: Prop) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key == "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const formatteddate = new Date(log.timestamp).toLocaleString();
  console.log("log:", log);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Side Panel */}
      <motion.div
        className="fixed right-0 top-0 z-50 h-full w-full sm:w-120 border-l border-neutral-800 bg-neutral-900 shadow-xl"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25 }}
      >
        <div className="h-full overflow-y-auto p-3 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-semibold">Log Details</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 touch-manipulation"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
            <span
              className={`px-2 py-1 text-xs rounded ${levelColors[log.level]}`}
            >
              {log.level}
            </span>
            <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400">
              {log.service}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xs sm:text-sm text-neutral-400 mb-1">
              Message
            </h3>
            <p className="text-xs sm:text-sm wrap-break-word">{log.message}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-xs sm:text-sm text-neutral-400 mb-1">
              Timestamp
            </h3>
            <p className="text-xs sm:text-sm break-all">{formatteddate}</p>
          </div>

          <div>
            <h3 className="text-xs sm:text-sm text-neutral-400 mb-1">
              Metadata
            </h3>
            <pre className="bg-neutral-800 p-3 sm:p-4 rounded text-xs overflow-x-auto max-w-full whitespace-pre-wrap wrap-break-word">
              {formatMetadata(log.metadata)}
            </pre>
          </div>
        </div>
      </motion.div>
    </>
  );
}
