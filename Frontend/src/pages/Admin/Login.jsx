import { useState } from "react";
import { apiAdmin } from "../../lib/apiAdmin";
import { Link } from "react-router-dom";

/* ── Login Component ────────────────────────────────────────────── */
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await apiAdmin.post("/api/admin/auth/login", {
        username,
        password,
      });

      const token = res.data?.token;
      if (!token) throw new Error("No token returned");

      localStorage.setItem("adminToken", token);
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("login error", error);
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: "#f5f5f5" }}
    >
      <form
        onSubmit={submit}
        className="relative z-10 w-[400px] rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
          border: "1px solid rgba(0, 0, 0, 0.04)",
        }}
      >
        {/* Red accent bar at top */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #CA0002, #e53535)" }} />

        <div className="px-10 pt-10 pb-8">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center rounded-xl mx-auto mb-4 overflow-hidden bg-white"
              style={{
                width: 52,
                height: 52,
                boxShadow: "0 4px 16px rgba(202, 0, 2, 0.25)",
              }}
            >
              <img
                src="/assets/ti_logo.png"
                alt="ARC Logo"
                className="w-full h-full object-contain p-1"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              Admin Portal
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to manage your dashboard
            </p>
          </div>

          {err && (
            <div
              className="mb-4 text-sm text-center py-2.5 rounded-lg font-medium"
              style={{
                color: "#CA0002",
                background: "rgba(202, 0, 2, 0.06)",
                border: "1px solid rgba(202, 0, 2, 0.1)",
              }}
            >
              {err}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-300 outline-none transition-all duration-200"
                style={{
                  background: "#fafafa",
                  border: "1.5px solid #e8e8e8",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#CA0002";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(202, 0, 2, 0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-300 outline-none transition-all duration-200"
                style={{
                  background: "#fafafa",
                  border: "1.5px solid #e8e8e8",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#CA0002";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(202, 0, 2, 0.08)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#e8e8e8";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-2 mb-2 relative z-20">
            <Link to="/admin/forgot-password" className="text-xs font-semibold text-[#CA0002] hover:underline transition-all">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-lg font-semibold text-white disabled:opacity-50 transition-all duration-200 cursor-pointer"
            style={{
              background: "#CA0002",
              boxShadow: "0 4px 14px rgba(202, 0, 2, 0.25)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#b10002";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(202, 0, 2, 0.35)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#CA0002";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(202, 0, 2, 0.25)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-gray-300 mt-6 tracking-wide">
            ARC Alumni Events • Admin v2.0
          </p>
        </div>
      </form>
    </div>
  );
}
