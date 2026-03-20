import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    setError("");

    const { error } = isSignup
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#080c0a] flex items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-sm bg-[#0d1410] border border-green-900/40 rounded-2xl p-8 shadow-[0_0_60px_rgba(34,197,94,0.07)]">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-900/40 flex items-center justify-center mb-3">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-mono">
            Stack<span className="text-green-500">Lens</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-1 tracking-wide">
            Monitor and analyze your logs
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-green-900/30" />
          <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
            {isSignup ? "create account" : "sign in"}
          </span>
          <div className="flex-1 h-px bg-green-900/30" />
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-green-900/30 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/20 transition-colors"
            />
          </div>

          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/30 border border-green-900/30 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/20 transition-colors"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mt-3 px-3 py-2 bg-red-500/8 border border-red-500/20 rounded-lg">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-red-400 text-xs">{error}</p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full mt-5 py-2.5 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-bold font-mono tracking-wide text-[#031a0a] transition-colors"
        >
          {loading
            ? isSignup
              ? "Creating..."
              : "Signing in..."
            : isSignup
              ? "Create Account →"
              : "Sign In →"}
        </button>

        {/* Toggle */}
        <p className="text-center text-xs text-neutral-500 mt-5">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span
            onClick={() => {
              setIsSignup((p) => !p);
              setError("");
            }}
            className="text-green-500 hover:text-green-400 cursor-pointer transition-colors"
          >
            {isSignup ? "Sign in" : "Sign up"}
          </span>
        </p>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-neutral-700 uppercase">
            Secure Connection
          </span>
        </div>
      </div>
    </div>
  );
}
