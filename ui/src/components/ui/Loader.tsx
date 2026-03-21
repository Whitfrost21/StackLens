import { useEffect, useState } from "react";

interface FullscreenLoaderProps {
  label?: string;
  onDismiss?: () => void;
  dismissAfter?: number;
}

export default function FullscreenLoader({
  label = "Loading",
  onDismiss,
  dismissAfter,
}: FullscreenLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!dismissAfter) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, dismissAfter);
    return () => clearTimeout(t);
  }, [dismissAfter, onDismiss]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050a05] overflow-hidden">
      <div className="absolute w-125 h-125 rounded-full bg-green-500/10 animate-pulse pointer-events-none blur-3xl" />

      <div className="absolute w-48 h-48 rounded-full bg-white/5 animate-pulse pointer-events-none blur-2xl" />

      <svg
        className="animate-spin w-16 h-16 mb-7 drop-shadow-[0_0_12px_rgba(74,222,128,0.6)]"
        viewBox="0 0 64 64"
        fill="none"
      >
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="white"
          strokeOpacity="0.04"
          strokeWidth="2.5"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="white"
          strokeOpacity="0.15"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="20 260"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          stroke="#4ade80"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="80 220"
        />
      </svg>

      <p className="text-[11px] tracking-[0.25em] uppercase text-green-400/50 mb-5">
        {label}
      </p>

      <div className="w-36 h-px bg-white/10 rounded-full overflow-hidden mb-6">
        <div className="h-full w-1/3 rounded-full bg-green-400 animate-[shimmer_1.8s_ease-in-out_infinite] shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
      </div>

      <div className="flex gap-2 items-center">
        <span className="size-1 rounded-full bg-green-400/40 animate-[blink_1.4s_ease-in-out_infinite]" />
        <span className="size-1 rounded-full bg-green-400/40 animate-[blink_1.4s_ease-in-out_0.2s_infinite]" />
        <span className="size-1 rounded-full bg-green-400/40 animate-[blink_1.4s_ease-in-out_0.4s_infinite]" />
      </div>
    </div>
  );
}
