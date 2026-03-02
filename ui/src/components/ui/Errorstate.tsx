type Errorstateprops = {
  onretry: () => void;
};

export function Errorstate(refetch: Errorstateprops) {
  return (
    <div className="rounded-xl border border-red-800 bg-red-900/20 p-6">
      <h3 className="text-sm font-semibold text-red-400">
        Failed to fetch logs
      </h3>
      <p className="mt-2 text-sm text-red-300">
        Please check your connection or try again.
      </p>
      <button
        onClick={() => refetch}
        className="mt-4 rounded bg-red-500/20 px-3 py-1 text-xs text-red-300 hover:bg-red-500/30"
      >
        Retry
      </button>
    </div>
  );
}
